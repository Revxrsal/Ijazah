import {Button} from "~/components/ui/button";
import {useNavigate} from "@solidjs/router";
import {Gender} from "~/types";

export default function ForgotSerial() {
  const navigate = useNavigate();
  return (
    <main class="flex flex-col items-center mx-auto p-4 w-full">
      <h1 class={"my-8"}>
        تحميل قوائم الشهادات والإجازات
      </h1>
      <Button variant={"ghost"} onClick={() => navigate("/")}>
        العودة
      </Button>
      <div class={"flex flex-col"}>
        <Button class={"my-4"} onClick={() => downloadExcel("ذكر")}>
          تحميل قوائم الذكور
        </Button>
        <Button class={"my-2"} onClick={() => downloadExcel("أنثى")}>
          تحميل قوائم الإناث
        </Button>
      </div>
    </main>
  )
}

async function downloadExcel(gender: Gender) {
  const response = await fetch("/api/export-to-excel", {
    method: "POST",
    body: JSON.stringify({gender}),
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
    a.download = "قوائم الذكور.xlsx";
  } else {
    a.download = "قوائم الإناث.xlsx";
  }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
