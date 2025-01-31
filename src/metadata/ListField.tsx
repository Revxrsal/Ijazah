import {createEmptyValue, ListPropertyMetadata} from "~/metadata/Metadata";
import {For} from "solid-js";
import {DynamicField} from "~/metadata/DynamicField";
import {Button} from "~/components/ui/button";

export default function ListField(props: {
  key: string;
  value: any[];
  onUpdate: (value: any[]) => void;
  metadata: ListPropertyMetadata;
  nesting: number;
}) {
  return (
    <>
      <label class="font-semibold">{props.key}</label>
      <For each={props.value}>{(item, index) => (
        <DynamicField
          metadata={props.metadata.entryType}
          nesting={props.nesting}
          key={`${props.key}[${index()}]`}
          value={item}
          onUpdate={(val) => {
            const updatedArray = [...props.value];
            updatedArray[index()] = val;
            props.onUpdate(updatedArray);
          }}/>
      )}</For>
      <Button onClick={() => {
        props.onUpdate([...props.value, createEmptyValue(props.metadata.entryType)]);
      }}>
        Add new value
      </Button>
    </>
  )
}