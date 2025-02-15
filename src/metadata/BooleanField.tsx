import {BooleanPropertyMetadata} from "~/metadata/Metadata";
import {Switch, SwitchControl, SwitchLabel, SwitchThumb} from "~/components/ui/switch";

export default function BooleanField(props: {
  key: string;
  value: boolean;
  onUpdate: (value: boolean) => void;
  metadata: BooleanPropertyMetadata
}) {
  return (
    <Switch class={"my-2 mx-2"}
            onChange={e => props.onUpdate(e)}
            checked={props.value}
    >
      <SwitchLabel class="text-sm leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 p-2">
        {props.key}
      </SwitchLabel>
      <SwitchControl class="flex items-center space-x-2">
        <SwitchThumb/>
      </SwitchControl>
    </Switch>
  )
}