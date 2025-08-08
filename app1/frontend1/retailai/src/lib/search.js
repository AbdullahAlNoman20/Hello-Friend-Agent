import { supabaseClient as supabase } from "./supabaseClient";

export async function searchFootwear(query) {
  if (!query.trim()) {
    return [];
  }

  try {
    // First try textSearch with search_vector (if it exists)
    try {
      const { data: textSearchData, error: textSearchError } = await supabase
        .from("footwear")
        .select("*")
        .textSearch("search_vector", query, {
          type: "websearch",
          config: "english",
        });

      if (!textSearchError && textSearchData && textSearchData.length > 0) {
        console.log("Using textSearch with search_vector");
        return textSearchData;
      }
    } catch (textSearchError) {
      console.log("textSearch not available, falling back to ilike search");
    }

    // Fallback to ilike search - this will work with the current database structure
    const { data: ilikeData, error: ilikeError } = await supabase
      .from("footwear")
      .select("*")
      .or(
        `productname.ilike.%${query}%,brandname.ilike.%${query}%,maincatcode.ilike.%${query}%,details.ilike.%${query}%`
      )
      .order("id", { ascending: true })
      .limit(20);

    if (ilikeError) {
      console.error("Search error:", ilikeError);
      return [];
    }

    console.log("Using ilike search, found", ilikeData?.length || 0, "results");
    return ilikeData || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
