import {Title} from "@solidjs/meta";
import BotButton from "~/components/BotButton";
import {useNavigate} from "@solidjs/router";
import {Button} from "~/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main
      class="flex flex-col h-screen content-center text-center min-h-screen justify-center items-center mx-auto p-4 w-full select-none">
      <Title>
        لعلك أخطأت؟ - همم 3
      </Title>
      <h1>
        404
      </h1>
      <p>لم أجد ذاك الذي تبعث عنه</p>
      <p class={"text-xl my-4"}>:(</p>
      <div class={"flex flex-col"}>
        <Button onClick={() => navigate("/")}>
           العودة إلى الصفحة الرئيسة
        </Button>
        <BotButton/>
      </div>
    </main>
  );
}
