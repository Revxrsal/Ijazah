import {EnumPropertyMetadata} from "~/metadata/Metadata";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";

export default function EnumField(props: {
  key: string;
  value: string;
  onUpdate: (value: string) => void;
  metadata: EnumPropertyMetadata
}) {
  return (
    <>
      <label class="font-semibold p-2 m-2">
        {props.key}
      </label>
      <Select
        options={props.metadata.options}
        placeholder="Select a value..."
        itemComponent={(props) => (
          <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
        )}
        value={props.value}
        onChange={(e) => props.onUpdate(e!)}
      >
        <SelectTrigger class="min-w-[180px]">
          <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
        </SelectTrigger>
        <SelectContent/>
      </Select>
    </>
  )
}