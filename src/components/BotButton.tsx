import {Button} from "~/components/ui/button";
import {BOT_URL} from "~/types";

export default function BotButton() {
  return (
    <Button class={"my-2"} variant="secondary" onClick={() => window.open(BOT_URL)}>
      التواصل عبر البوت
    </Button>
  )
}