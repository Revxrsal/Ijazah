import {JavaObjectPropertyMetadata} from "~/metadata/Metadata";
import {For} from "solid-js";
import {DynamicField} from "~/metadata/DynamicField";
import {createStore} from "solid-js/store";

export default function JavaObjectField(props: {
  key: string;
  value: any;
  onUpdate: (value: any) => void;
  metadata: JavaObjectPropertyMetadata;
  nesting: number;
}) {
  const [value, setValue] = createStore<any>(props.value);
  return (
    <div class={"flex flex-col border rounded-md p-4 m-4"}>
      <label class="font-semibold p-2 m-2">{props.key}</label>
      <For each={Object.entries(props.metadata.fields)}>{([fieldName, fieldMeta]) => (
        <DynamicField
          class={"p-2 mx-16"}
          metadata={fieldMeta}
          nesting={props.nesting}
          key={fieldName}
          value={value[fieldName]}
          onUpdate={(val) => {
            setValue(fieldName, val)
          }}/>
      )}</For>
    </div>
  )
}