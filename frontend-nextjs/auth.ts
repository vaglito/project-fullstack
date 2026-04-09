import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch("http://localhost:8000/auth/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Enviamos el refresh token guardado para obtener un nuevo access token
      body: JSON.stringify({ refresh: token.refreshToken }),
    });

    const refreshedTokens = await res.json();

    if (!res.ok) {
      throw refreshedTokens;
    }

    const payload = JSON.parse(Buffer.from(refreshedTokens.access.split('.')[1], "base64").toString());

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: payload.exp * 1000,
      refreshToken: refreshedTokens.refresh ?? token.refreshToken, // DRF a veces conserva el refresh token anterior
    };
  } catch (error) {
    console.error("Error al refrescar el access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "ejemplo@ejemplo.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8000/auth/api/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const data = await res.json();
        if (res.ok && data.access) {
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            groups: data.user.groups,
            accessToken: data.access,
            refreshToken: data.refresh,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.groups = user.groups;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        // Extraemos la fecha de expiración del JWT (decodificando la carga útil base64)
        const payload = JSON.parse(Buffer.from((user as any).accessToken.split('.')[1], "base64").toString());
        token.accessTokenExpires = payload.exp * 1000;
        
        return token;
      }

      // Si el access token aún es válido, lo retornamos sin hacer llamadas a la API
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Si el access token ya expiró, llamamos a la API de DRF para refrescarlo
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.groups = token.groups;
      session.accessToken = token.accessToken;
      (session as any).error = token.error;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
