import * as XLSX from "xlsx";
import type {APIEvent} from "@solidjs/start/server";
import {supabase} from "~/routes/api/database";
import {Filter, Gender} from "~/types";

export async function POST({request}: APIEvent) {
  // Fetch table data from Supabase
  const {gender, filter}: { gender: Gender, filter: Filter | null } = await request.json()
  let query = supabase.from(gender == "ذكر" ? "males" : "females")
    .select("*")

  if (filter == "Certs only") {
    query = query.eq("watched_all", false)
  } else if (filter == "Ijazat only") {
    query = query.eq("watched_all", true)
  }

  let {data, error} = await query
  if (error) {
    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
      headers: {"Content-Type": "application/json"},
    });
  }

  const renamedData = data!.map(entry => ({
    "الرقم التسلسلي": entry.id,
    "الاسم": entry.name,
    "شاهد جميع المحاضرات": entry.watched_all ? "نعم" : "لا",
  }));

  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(renamedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Create buffer
  const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});

  // Return as downloadable response
  return new Response(new Uint8Array(excelBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="exported_data.xlsx"',
    },
  });
}
