import {Button} from "~/components/ui/button";
import {useNavigate} from "@solidjs/router";
import {Title} from "@solidjs/meta";
import BotButton from "~/components/BotButton";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main
      class="flex flex-col h-screen content-center text-center min-h-screen justify-center items-center mx-auto p-4 w-full select-none">
      <Title>
        نموذج الإجازة والشهادة - همم 3
      </Title>
      <h1 class={"my-8 leading-relaxed text-center"}>
        نموذج الإجازة والشهادة
      </h1>
      <h2 class={"my-4"}>
        التّعليق على سنن النّسائيّ
      </h2>
      <h4 class={"my-4"}>
        الدّورة العلميّة المكثفّة - همم ٣
      </h4>
      <p class={"my-4 text-red-200 text-3xl font-bold direction-rtl"}>
    انتهى موعد التسجيل - نعتذكر منكم!
      </p>
      <Button variant={"ghost"} class={"mt-2 mb-2 p-6"} onClick={() => navigate("/forgot-serial")}>
        نسيت الرقم التسلسلي؟
      </Button>
      <BotButton/>
    </main>
  );
}

