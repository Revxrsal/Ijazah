import {createEmptyValue, MapPropertyMetadata} from "~/metadata/Metadata";
import {For} from "solid-js";
import {DynamicField} from "~/metadata/DynamicField";
import {Button} from "~/components/ui/button";
import {createStore} from "solid-js/store";

export default function MapField(props: {
  key: any;
  onUpdate: (value: any) => void;
  value: any;
  metadata: MapPropertyMetadata;
  nesting: number;
}) {
  const [value, setValue] = createStore<Record<any, any>>(props.value);
  return (
    <div class={"flex flex-col justify-around w-full"}>
      <label class="font-semibold p-2 m-2">
        {props.key}
      </label>
      <For each={Object.entries(value)}>{([subKey, value]) => (
        <div class={"flex align-middle rounded-md my-4 p-2 mx-4"}>
          <DynamicField
            class={"mx-4 my-4"}
            metadata={props.metadata.keyType}
            nesting={props.nesting}
            key={"Key"}
            value={subKey}
            onUpdate={(newKey) => {
                // setValue(prev => {
                //   const { [subKey]: value, ...rest } = prev; // Extract the old key, keep the rest
                //   return { ...rest, [newKey]: value }; // Create a new object with the renamed key
                // });
                setValue(subKey, undefined)
                setValue(newKey, value)
              // delete props.value[subKey]
              // props.onUpdate({...props.value, [newKey]: value})
              // if (value[newKey] == undefined) {
              // setValue(subKey, undefined)
              // setValue(newKey, value)
              // } else {
              //   setValue(newKey + " - Duplicate", undefined)
              //   setValue(newKey, value)
              // }
            }}/>
          <DynamicField
            class={"mx-4"}
            metadata={props.metadata.valueType}
            nesting={props.nesting}
            key={`Value`}
            value={value}
            onUpdate={(val) => {
              setValue(subKey, val)
            }}/>
        </div>
      )}</For>
      <Button
        style={{"margin-inline-start": `${(props.nesting) * 4}px`}}
        class={"my-4"}
        onClick={() => {
          const k = createEmptyValue(props.metadata.keyType)
          props.onUpdate({...props.value, [k]: createEmptyValue(props.metadata.valueType)})
        }}
        disabled={Object.keys(props.nesting).length >= props.metadata.maxSize}
      >
        Add new entry
      </Button>
    </div>
  )
}
