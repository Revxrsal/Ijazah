import type {APIEvent} from "@solidjs/start/server";
import {Submission} from "~/types";

import {createClient} from "@supabase/supabase-js"
import {Database} from "~/database.types";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE
)

export async function POST(event: APIEvent) {
  const json: Submission = await event.request.json()
  if (json.gender == "ذكر") {
    const {data, error} = await supabase.from("males")
      .insert({name: json.name, watched_all: json.watchedAll})
      .select("id")
    if (data)
      return Response.json({success: true, id: data[0].id})
    else
      return Response.json({"success": false, "error": error})
  } else {
    const {data, error} = await supabase.from("females")
      .insert({name: json.name, watched_all: json.watchedAll})
      .select("id")
    if (data)
      return Response.json({success: true, id: data[0].id})
    else
      return Response.json({"success": false, "error": error})
  }
}