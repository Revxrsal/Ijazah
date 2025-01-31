import {createEmptyValue, MapPropertyMetadata} from "~/metadata/Metadata";
import {For} from "solid-js";
import {DynamicField} from "~/metadata/DynamicField";
import {Button} from "~/components/ui/button";

export default function MapField(props: {
  key: string;
  value: any;
  onUpdate: (value: any) => void;
  metadata: MapPropertyMetadata;
  nesting: number;
}) {
  return (
    <>
      <label class="font-semibold">{props.key}</label>
      <For each={Object.entries(props.value)}>{([subKey, value]) => (
        <>
          <DynamicField
            metadata={props.metadata.keyType}
            nesting={props.nesting}
            key={"Key"}
            value={subKey}
            onUpdate={(val) => {
              delete props.value[subKey]
              props.onUpdate({...props.value, [val]: value})
            }}/>
          <DynamicField
            metadata={props.metadata.valueType}
            nesting={props.nesting}
            key={`Value`}
            value={value}
            onUpdate={(val) => {
              props.onUpdate({...props.value, [subKey]: val})
            }}/>
        </>
      )}</For>
      <Button style={{"margin-inline-start": `${(props.nesting + 1) * 4}px`}} onClick={() => {
        props.onUpdate({...props.value, [""]: createEmptyValue(props.metadata.valueType)})
      }}>
        Add new entry
      </Button>
    </>
  )
}