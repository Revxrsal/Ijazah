import {createEmptyValue, ListPropertyMetadata} from "~/metadata/Metadata";
import {For} from "solid-js";
import {DynamicField} from "~/metadata/DynamicField";
import {Button} from "~/components/ui/button";
import {createStore} from "solid-js/store";

export default function ListField(props: {
  key: string;
  value: any[];
  onUpdate: (value: any[]) => void;
  metadata: ListPropertyMetadata;
  nesting: number;
}) {
  const [value, setValue] = createStore<any[]>(props.value);
  return (
    <div class={"flex flex-col my-4"}>
      <label class="font-semibold p-2 m-2">
        {props.key}
      </label>
      <For each={props.value}>{(item, index) => (
        <DynamicField
          class={"my-4"}
          metadata={props.metadata.entryType}
          nesting={props.nesting}
          key={`${props.key}[${index() + 1}]`}
          value={item}
          onUpdate={(val) => {
            setValue(index(), val)
          }}/>
      )}</For>
      <div class={"my-4"}/>
      <Button
        style={{"margin-inline-start": `${(props.nesting + 1) * 4}px`}}
        onClick={() => {
          setValue(value.length, createEmptyValue(props.metadata.entryType));
        }}
        disabled={value.length >= props.metadata.maxSize}
      >
        Add new value
      </Button>
      <div class={"my-4"}/>
    </div>
  )
}