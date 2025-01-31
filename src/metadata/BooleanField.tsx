import {BooleanPropertyMetadata} from "~/metadata/Metadata";
import {SwitchControl, SwitchLabel, SwitchThumb} from "~/components/ui/switch";

export default function BooleanField(props: {
  key: string;
  value: boolean;
  onUpdate: (value: boolean) => void;
  metadata: BooleanPropertyMetadata
}) {
  return (
    <SwitchControl
      class="flex items-center space-x-2"
      checked={props.value}
      onChange={(e: { currentTarget: { checked: boolean; }; }) => props.onUpdate(e.currentTarget.checked)}
    >
      <SwitchControl>
        <SwitchThumb/>
      </SwitchControl>
      <SwitchLabel class="text-sm leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70">
        {props.key}
      </SwitchLabel>
    </SwitchControl>
  )
}