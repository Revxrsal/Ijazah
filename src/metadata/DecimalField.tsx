import {DecimalPropertyMetadata} from "~/metadata/Metadata";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldErrorMessage,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel
} from "~/components/ui/number-field";
import {Show} from "solid-js";

export default function DecimalField(props: {
  key: string;
  value: number;
  onUpdate: (value: number) => void;
  metadata: DecimalPropertyMetadata
}) {
  const min = props.metadata.min
  const max = props.metadata.max
  const invalid = () => {
    const value = props.value;
    return value < min || value > max
  }
  return (
    <NumberField
      class={"p-2"}
      defaultValue={props.value || 0}
      minValue={min}
      maxValue={max}
      validationState={invalid() ? "invalid" : "valid"}
      onRawValueChange={(e) => props.onUpdate(e)}
    >
      <NumberFieldLabel>{props.key}</NumberFieldLabel>
      <NumberFieldGroup>
        <NumberFieldDecrementTrigger aria-label="Decrement"/>
        <NumberFieldInput/>
        <NumberFieldIncrementTrigger aria-label="Increment"/>
      </NumberFieldGroup>
      <Show when={invalid()}>
        <NumberFieldErrorMessage>
          <Show when={props.value < min}>
            Value must be at least {min}
          </Show>
          <Show when={props.value > max}>
            Value must be at most {max}
          </Show>
        </NumberFieldErrorMessage>
      </Show>
    </NumberField>
  )
}