import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(request, { params }) {
  const { id } = params;

  if (!id) {
    return Response.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseServer
      .from("footwear")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return Response.json({ error: "Product not found" }, { status: 404 });
      }
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
