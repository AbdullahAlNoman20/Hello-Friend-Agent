import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(request) {
  // Get limit from query parameters, default to 12
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit")) || 12;

  // Ensure limit is between 1 and 50 for safety
  const safeLimit = Math.min(Math.max(limit, 1), 50);

  const { data, error } = await supabaseServer
    .from("footwear")
    .select("*")
    .order("id", { ascending: true })
    .limit(safeLimit);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const { data, error } = await supabaseServer.from("footwear").insert([body]);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data, { status: 201 });
}
