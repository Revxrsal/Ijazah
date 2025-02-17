import {Button} from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "~/components/ui/alert-dialog";
import {useNavigate} from "@solidjs/router";
import {TextField, TextFieldLabel, TextFieldRoot} from "~/components/ui/textfield";
import {Switch, SwitchControl, SwitchLabel, SwitchThumb} from "~/components/ui/switch";
import {
  Accessor,
  createEffect,
  createResource,
  createSignal,
  JSXElement,
  Match,
  Show,
  Switch as MSwitch
} from "solid-js";
import {Submission} from "~/types";
import {createGenderPicker} from "~/components/GenderPicker";
import {Title} from "@solidjs/meta";

function createConfirmationBox(label: string | Accessor<string>): [Accessor<boolean>, () => JSXElement] {
  const [confirmed, setConfirmed] = createSignal(false)
  return [
    confirmed,
    () => <Switch
      class="flex items-center space-x-2 my-4" checked={confirmed()}
      onChange={setConfirmed}>
      <SwitchControl class={"direction-ltr"}>
        <SwitchThumb/>
      </SwitchControl>
      <SwitchLabel
        class="text-sm font-medium leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70">
        {typeof label === "function" ? label() : label}
      </SwitchLabel>
    </Switch>
  ]
}

function Warning() {
  return (
    <p class={"direction-rtl text-red-300 max-w-96 my-4"}>
      لا نُبيح الإجازة إلّا لمن تـابع المجالس وجاهيًا أو عـبر البثّ المُباشر؛ أي: لا تُمنح الإجازة لمن سمع المجالس
      مُسجلة!
    </p>
  )
}

async function generateSerial(data: Submission): Promise<number> {
  const response = await fetch('/api/generate-serial', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`HTTP error await fetch("/api/generate-serial"`)
  }
  const r: { success: string; id: number } = await response.json();
  console.log("Resp", r)
  return r.id
}

export default function Fill() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = createSignal(false)
  const [watchedAll, WatchedAllLive] = createConfirmationBox(
    "نعم، استوفيت شرط الإجازة"
  )
  const {name, NameField} = createNameField(watchedAll)
  const [agree, AgreeBox] = createConfirmationBox(
    "حسنًا، أعي ذلك"
  )
  const {gender, GenderPicker} = createGenderPicker()

  const [willAttendTomorrow, WillAttendTomorrow] = createConfirmationBox(
 "سأستلم الإجازة غدًا في مجمع مكين - يدويًا"    
  )
  return (
    <main class="flex flex-col items-center mx-auto p-4 w-full direction-rtl">
      <Title>
        تعبئة نموذج الإجازة - همم 3
      </Title>
      <h1 class={"my-8"}>
        نموذج الإجازة
      </h1>
      <h3 class={"my-4"}>
        التّعليق على سنن النّسائيّ
      </h3>
      <Button variant={"ghost"} onClick={() => navigate("/")}>
        العودة
      </Button>
      <form class={"flex flex-col my-4 border rounded-xl p-8"}>
        <NameField/>
        <GenderPicker/>
        <Warning/>
<p><strong>شرط الإجازة: </strong>حضور جميع المجالس بشكل حي</p>
        <WatchedAllLive/>
        <AgreeBox/>
        <WillAttendTomorrow/>

        {/*<p class={"my-4 text-green-200"}>*/}
        {/*  {watchedAll() ? "ستحصل غدًا على الإجازة والشهادة" : "ستحصل غدًا على الشهادة فقط"}*/}
        {/*</p>*/}
        <AlertDialog open={openDialog()}>
          <Alert onDismissRequest={() => setOpenDialog(false)} data={{
            name: name(),
            gender: gender() || "ذكر",
            watchedAll: watchedAll(),
          }}/>
        </AlertDialog>
        <Button
          onClick={() => setOpenDialog(true)}
          disabled={
            name() == "" ||
            !agree() ||
            !willAttendTomorrow() ||
            !watchedAllLive() ||
            gender() == null
          }
        >
          إرسال النموذج
        </Button>
      </form>
    </main>
  )
}

function createNameField(watchedAll: () => boolean) {
  const [name, setName] = createSignal("")
  return {
    NameField: () => <TextFieldRoot
      class="w-full max-w-md direction-rtl my-4 min-h-12 leading-10"
      value={name()}
      onChange={setName}
    >
      <TextFieldLabel class={"text-xl"}>
        {watchedAll() ? "الاسم كما تود أن يظهر في الشهادة والإجازة" : "الاسم كما تود أن يظهر في الشهادة"}
      </TextFieldLabel>
      <TextField type="name" placeholder="الاسم" class={"min-h-12 leading-10"}/>
    </TextFieldRoot>,
    name
  }
}

type Phase = "Instructions" | "ShowingSerial"

function Alert(props: { onDismissRequest: () => void, data: Submission }) {
  const [phase, setPhase] = createSignal<Phase>("Instructions");
  return (
    <AlertDialogContent class={"direction-rtl w-11/12"}>
      <MSwitch>
        <Match when={phase() == "Instructions"}>
          <InstructionsAlert onClick={() => setPhase("ShowingSerial")} onDismissRequest={props.onDismissRequest}/>
        </Match>
        <Match when={phase() == "ShowingSerial"}>
          <ShowingSerialAlert onDismissRequest={props.onDismissRequest} data={props.data}/>
        </Match>
      </MSwitch>
    </AlertDialogContent>
  )
}

function ShowingSerialAlert(props: { onDismissRequest: () => void, data: Submission }) {
  const navigate = useNavigate()
  const [serial] = createResource(async () => generateSerial(props.data))
  createEffect(() => {
    console.log(serial.state)
    if (serial.state == "ready" && serial() != undefined) {
      localStorage.setItem("serial", JSON.stringify(serial()));
    }
  })
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle as={"h3"} class={"direction-rtl text-center text-2xl my-4"}>
          رقمك التسلسلي هو
        </AlertDialogTitle>
        <AlertDialogDescription>
          <Show when={serial.state == "ready"}>
            <p class={"text-7xl font-bold text-center my-8"}>
              {serial()}
            </p>
          </Show>
          <p class={"text-center my-8"}>
            الاسم: {props.data.name}
          </p>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter class={"text-right direction-rtl w-max flex flex-row justify-between"}>
        <AlertDialogAction onClick={() => navigate(`/finished/${serial()}`)}>
          حسنًا
        </AlertDialogAction>
        <div class={"mx-3"}/>
        <AlertDialogClose class={"my-0"} onClick={props.onDismissRequest}>الرجوع</AlertDialogClose>
      </AlertDialogFooter>
    </>
  )
}

function InstructionsAlert(props: { onClick: () => void, onDismissRequest: () => void }) {
  const [understood, Understood] = createConfirmationBox("حسنًا، قرأت التعليمات وفهمتها")
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle as={"h3"} class={"direction-rtl text-center text-2xl my-4"}>
          تعليمات استلام الإجازات والشهادات
        </AlertDialogTitle>
        <AlertDialogDescription class={"text-right"}>
          <ol dir="rtl" class={"text-right list-decimal pr-4 pt-2"}>
            <li>سيظهر أمامك رقمٌ تسلسلي خاصٌّ بك</li>
            <li>في آخر المجلس، سينادي المشرفون على الأرقام التسلسلية لتسليم الشهادات والإجازات</li>
            <li class={"text-red-200"}>تذكر رقمك التسلسلي جيّدًا، والتقط له صورةً حتى لا تنساه!</li>
          </ol>
          <Understood/>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter class={"text-right direction-rtl w-max flex flex-row justify-between"}>
        <AlertDialogAction
          disabled={!understood()}
          onClick={props.onClick}
        >
          أعطني الرقم التسلسلي
        </AlertDialogAction>
        <div class={"mx-3"}/>
        <AlertDialogClose class={"my-0"} onClick={props.onDismissRequest}>الرجوع</AlertDialogClose>
      </AlertDialogFooter>
    </>
  )
}