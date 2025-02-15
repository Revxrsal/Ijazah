import {StringPropertyMetadata} from "~/metadata/Metadata";
import {TextField, TextFieldErrorMessage, TextFieldLabel, TextFieldRoot} from "~/components/ui/textfield";
import {Show} from "solid-js";

export default function StringField(props: {
  key: string;
  value: string;
  onUpdate: (value: string) => void;
  metadata: StringPropertyMetadata
}) {
  const min = props.metadata.minLength
  const max = props.metadata.maxLength
  const invalid = () => {
    const length = props.value.length;
    return length < min || length > max
  }
  return (
    <TextFieldRoot validationState={invalid() ? "invalid" : "valid"}>
      <TextFieldLabel class={"font-semibold p-2 m-2"}>
        {props.key}
      </TextFieldLabel>
      <TextField
        value={props.value}
        onChange={(e: { currentTarget: { value: string; }; }) => props.onUpdate(e.currentTarget.value)}
        class={"m-2"}
      />
      <Show when={invalid()}>
        <Show when={length < min}>
          <TextFieldErrorMessage>
            The value length must be at least {min} character{min == 1 ? "" : "s"}.
          </TextFieldErrorMessage>
        </Show>
        <Show when={length > max}>
          <TextFieldErrorMessage>
            The value length must be at most {max} character{max == 1 ? "" : "s"}.
          </TextFieldErrorMessage>
        </Show>
      </Show>
    </TextFieldRoot>
  )
}