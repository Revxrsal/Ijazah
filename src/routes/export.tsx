import {Button} from "~/components/ui/button";
import {useNavigate} from "@solidjs/router";
import {Filter, Gender} from "~/types";
import {Title} from "@solidjs/meta";
import {Separator} from "~/components/ui/separator";

export default function ForgotSerial() {
  const navigate = useNavigate();
  return (
    <main class="flex flex-col items-center mx-auto p-4 w-full">
      <Title>
        تحميل قوائم الشهادات والإجازات - همم 3
      </Title>
      <h1 class={"my-8 leading-relaxed direction-rtl text-center"}>
        تحميل قوائم الشهادات والإجازات
      </h1>
      <form>
        <div class={"flex flex-col"}>
          <h3 class={"text-center my-4"}>
            قوائم الذكور
          </h3>
          <Button class={"my-3"} onClick={() => downloadExcel("ذكر")}>
            تحميل قوائم الذكور
          </Button>
          <Button class={"my-3"} onClick={() => downloadExcel("ذكر", "Ijazat only")}>
            تحميل قوائم الذكور - إجازات فقط
          </Button>
          <Button class={"my-3"} onClick={() => downloadExcel("ذكر", "Certs only")}>
            تحميل قوائم الذكور - الشهادات بلا إجازات
          </Button>
        </div>
        <Separator/>
        <div class={"flex flex-col"}>
          <h3 class={"text-center my-4"}>
            قوائم الإناث
          </h3>
          <Button class={"my-3"} onClick={() => downloadExcel("أنثى")}>
            تحميل قوائم الإناث
          </Button>
          <Button class={"my-3"} onClick={() => downloadExcel("أنثى", "Ijazat only")}>
            تحميل قوائم الإناث - إجازات فقط
          </Button>
          <Button class={"my-3"} onClick={() => downloadExcel("أنثى", "Certs only")}>
            تحميل قوائم الإناث - الشهادات بلا إجازات
          </Button>
        </div>
      </form>
      <Button variant={"ghost"} onClick={() => navigate("/")}>
        العودة
      </Button>
    </main>
  )
}

async function downloadExcel(gender: Gender, filter: Filter | null = null) {
  const response = await fetch("/api/export-to-excel", {
    method: "POST",
    body: JSON.stringify({gender, filter}),
  });

  if (!response.ok) {
    console.error("Failed to download file");
    return;
  }

  // Convert response to blob and create a download link
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  let name = gender == "ذكر" ? "قوائم الذكور" : "قوائم الإناث"
  if (filter == "Certs only")
    name += "- الشهادات فقط"
  else if (filter == "Ijazat only")
    name += "- الإجازات فقط"
  name += ".xlsx"

  a.download = name
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
