import type {APIEvent} from "@solidjs/start/server";

import {createClient} from "@supabase/supabase-js"
import {Database} from "~/database.types";
import {Gender} from "~/types";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE
)

export async function POST(event: APIEvent) {
  const json: { query: string, gender: Gender } = await event.request.json()

  const {data, error} = await supabase.from("males")
    .select("*")
    .ilike("name", `%${json.query}%`)
    .select("id, name")
  if (data)
    return Response.json({success: true, data})
  else
    return Response.json({success: false, error})
}