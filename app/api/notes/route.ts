// app/api/notes/route.ts — ⚠️ CODE VOLONTAIREMENT VULNÉRABLE (labo)
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/sqldb";

export const runtime = "nodejs";

// GET /api/notes → "mes" notes (celles du user connecté)
export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("mininotes_session")?.value;
  if (!sessionId) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }
  const db = getDb();

  // Securité(requête paramétrée)
  const rows = db(
  "SELECT * FROM notes WHERE userId = ?", 
  [Number(sessionId)]
) as any[];

  return NextResponse.json({ notes: rows });
}

// POST /api/notes → créer une note
export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get("mininotes_session")?.value;
  if (!sessionId) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  // ⚠️ FAILLE : AUCUNE validation d'entrée (pas de Zod). On accepte n'importe quoi.
  // ⚠️ FAILLE : pas de jeton anti-CSRF sur cette écriture.
  const { titre, contenu } = await req.json();
  const db = getDb();

  const nextId =
    (db("SELECT MAX(id) AS m FROM notes") as { m: number | null }[])[0].m! + 1;

  // Securité
  db(
  "INSERT INTO notes VALUES (?, ?, ?, ?)",
  [Number(nextId), Number(sessionId), titre, contenu]
);

  return NextResponse.json({ message: "Note créée", id: nextId });
}