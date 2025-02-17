import {Button} from "~/components/ui/button";
import {useNavigate} from "@solidjs/router";
import {Gender} from "~/types";
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
          <Button class={"my-3"} onClick={() => downloadExcel("ذكر")}>
            تحميل قوائم الذكور
          </Button>
          <Button class={"my-3"} onClick={() => downloadExcel("ذكر", true)}>
            تحميل قوائم الذكور - إجازات فقط
          </Button>
        </div>
        <Separator/>
        <div class={"flex flex-col"}>
          <Button class={"my-3"} onClick={() => downloadExcel("ذكر")}>
            تحميل قوائم الإناث
          </Button>
          <Button class={"my-3"} onClick={() => downloadExcel("أنثى", true)}>
            تحميل قوائم الإناث - إجازات فقط
          </Button>
        </div>
      </form>
      <Button variant={"ghost"} onClick={() => navigate("/")}>
        العودة
      </Button>
    </main>
  )
}

async function downloadExcel(gender: Gender, watchedAllOnly: boolean = false) {
  const response = await fetch("/api/export-to-excel", {
    method: "POST",
    body: JSON.stringify({gender, watchedAllOnly}),
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
  if (gender === "ذكر") {
    if (watchedAllOnly)
      a.download = "قوائم الذكور - الإجازات فقط.xlsx";
    else
      a.download = "قوائم الذكور.xlsx";
  } else {
    if (watchedAllOnly)
      a.download = "قوائم الإناث - الإجازات فقط.xlsx";
    else
      a.download = "قوائم الإناث.xlsx";
  }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
