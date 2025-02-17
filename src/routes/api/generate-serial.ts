import type {APIEvent} from "@solidjs/start/server";
import {Submission} from "~/types";
import {supabase} from "~/routes/api/database";

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