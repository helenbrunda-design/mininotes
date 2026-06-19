import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/sqldb";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // 1) On identifie le demandeur via le cookie de session
  const sessionId = req.cookies.get("mininotes_session")?.value;
  if (!sessionId) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  const db = getDb();

  // 2) On ne renvoie la note QUE si elle appartient au demandeur (Filtre AND userId = ?)
  const rows = db(
    "SELECT * FROM notes WHERE id = ? AND userId = ?",
    [Number(id), Number(sessionId)]
  ) as any[];

  if (!rows.length) {
    // 404 volontaire : on ne dit pas "elle existe mais elle n'est pas à toi"
    return NextResponse.json({ error: "Note introuvable" }, { status: 404 });
  }

  // 3) La note est sécurisée, on peut la renvoyer
  return NextResponse.json({ note: rows[0] });
}