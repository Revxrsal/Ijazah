import {Button} from "~/components/ui/button";
import {useNavigate} from "@solidjs/router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main class="flex flex-col justify-center items-center mx-auto p-4 w-full ">
      <h1 class={"my-8"}>
        نموذج الإجازة والشهادة
      </h1>
      <h2 class={"my-4"}>
        التّعليق على سنن النّسائيّ
      </h2>
      <h3 class={"my-4"}>
        الدّورة العلميّة المكثفّة - همم ٣
      </h3>
      <Button class={"mt-8 mb-2 text-xl p-7"} onClick={() => navigate("/fill")}>
        تعبئة نموذج الإجازة
      </Button>
      <Button variant={"ghost"} class={"mt-2 mb-8 p-6"} onClick={() => navigate("/forgot-serial")}>
        نسيت الرقم التسلسلي
      </Button>
    </main>
  );
}
