import {useNavigate, useParams} from "@solidjs/router";
import {Button} from "~/components/ui/button";
import {BOT_URL} from "~/types";
import BotButton from "~/components/BotButton";

export default function Finished() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <main
      class="flex flex-col h-screen justify-center content-center text-center items-center mx-auto p-4 w-full direction-rtl min-h-screen">
      <h3 class={"my-8 text-green-200"}>تم قبول نموذجك</h3>
      <h3>رقمك التسلسلي هو</h3>
      <h1 class={"my-8"}>{params.id}</h1>
      <p class={"my-4 text-red-300"}>يمنع إرسال أكثر من نموذج للإجازة</p>
      <form class={"flex flex-col max-w-md justify-center"}>
        <Button onClick={() => navigate("/")}>
          الرجوع إلى الصفحة الرئيسة
        </Button>
        <BotButton/>
      </form>
      <p>
        بوركت خطواتكم، وأتمّ الله لكم العلم بالنفع والفائدة وجعلكم من أهل الحديث 🌱🤍 ...
      </p>
    </main>
  )
}