import { notFound } from "next/navigation";

export default function CatchAllPage() {
  // Esto invoca el not-found.tsx que acabamos de crear arriba
  notFound();
}
