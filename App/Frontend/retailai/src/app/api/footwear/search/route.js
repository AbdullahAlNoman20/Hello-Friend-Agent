import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return Response.json({ message: "Missing search query" }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseServer
      .from("footwear")
      .select("*")
      .or(`productname.ilike.%${q}%,brand.ilike.%${q}%,category.ilike.%${q}%`)
      .order("id", { ascending: true })
      .limit(20);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ results: data });
  } catch (error) {
    return Response.json({ error: "Search failed" }, { status: 500 });
  }
}
