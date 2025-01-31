import {JavaObjectPropertyMetadata} from "~/metadata/Metadata";
import {For} from "solid-js";
import {DynamicField} from "~/metadata/DynamicField";

export default function JavaObjectField(props: {
  key: string;
  value: any;
  onUpdate: (value: any) => void;
  metadata: JavaObjectPropertyMetadata;
  nesting: number;
}) {
  return (
    <>
      <label class="font-semibold">{props.key}</label>
      <For each={Object.entries(props.metadata.fields)}>{([fieldName, fieldMeta]) => (
        <DynamicField
          metadata={fieldMeta}
          nesting={props.nesting}
          key={fieldName}
          value={props.value[fieldName]}
          onUpdate={(val) => {
            props.onUpdate({...props.value, [fieldName]: val})
          }}/>
      )}</For>
    </>
  )
}