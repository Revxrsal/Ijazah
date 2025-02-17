import {TextField, TextFieldLabel, TextFieldRoot} from "~/components/ui/textfield";
import {createSignal, For} from "solid-js";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import {Button} from "~/components/ui/button";
import {createGenderPicker} from "~/components/GenderPicker";
import {useNavigate} from "@solidjs/router";
import {Title} from "@solidjs/meta";

type Entry = {
  id: number,
  name: string,
}

export default function ForgotSerial() {
  const navigate = useNavigate();
  const [name, setName] = createSignal("");
  const {gender, GenderPicker} = createGenderPicker()
  const [results, setResults] = createSignal<Entry[]>([])

  async function search() {
    const response = await fetch("/api/search-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: name(),
        gender: gender()!,
      }),
    });

    const data: Entry[] = (await response.json()).data;
    setResults(data)
  }

  return (
    <main class="flex flex-col items-center mx-auto p-4 w-full ">
      <Title>
        استرجاع الرقم التسلسلي - همم 3
      </Title>
      <h1 class={"my-8 leading-relaxed text-center"}>
        استرجاع الرقم التسلسلي
      </h1>
      <Button variant={"ghost"} onClick={() => navigate("/")}>
        العودة
      </Button>
      <div class={"flex flex-col my-4 border rounded-xl p-8 direction-rtl w-full max-w-md"}>
        <TextFieldRoot
          class="w-full max-w-md direction-rtl my-4 min-h-12 leading-10"
          value={name()}
          onChange={setName}
        >
          <TextFieldLabel class={"text-xl"}>
            الاسم الذي سجلت به
          </TextFieldLabel>
          <TextField type="name" placeholder="الاسم" class={"min-h-12 leading-10"}/>
        </TextFieldRoot>
        <GenderPicker/>
        <Button onClick={search} disabled={gender() == null || name().length == 0}>البحث</Button>
      </div>
      <div class="my-4">
        <Table class={'w-full justify-center'}>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[300px]">الرقم التسلسلي</TableHead>
              <TableHead class={"text-start"}>الاسم</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <For each={results()}>
              {entry => (
                <ResultEntry name={entry.name} serial={entry.id}/>
              )}
            </For>
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

function ResultEntry(props: { name: string, serial: number }) {
  return (
    <TableRow>
      <TableCell class="w-[300px]">{props.serial}</TableCell>
      <TableCell class={"text-start"}>{props.name}</TableCell>
    </TableRow>
  )
}