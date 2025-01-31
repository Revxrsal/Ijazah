import {createSignal} from "solid-js";
import {Sample} from "~/metadata/Sample";
import {DynamicField} from "~/metadata/DynamicField";

export default function Home() {
  const [v, setV] = createSignal(Sample.value)
  return (
    <main class="flex flex-col mx-auto p-4 w-full min-h-screen">
      <p>{JSON.stringify(v(), null, 4)}</p>
      <h1>Discord Bot Builder - Web</h1>
      <h2 class={"my-8"}>Web Editor</h2>
      <DynamicField metadata={Sample.metadata} nesting={0} key={"hi"} value={v()} onUpdate={setV}/>
    </main>
  );
}
