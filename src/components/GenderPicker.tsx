import {createSignal, For} from "solid-js";
import {Gender} from "~/types";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemLabel,
  RadioGroupLabel
} from "~/components/ui/radio-group";

export function createGenderPicker() {
  const [gender, setGender] = createSignal<Gender | null>(null)
  return {
    GenderPicker: () => (
      <RadioGroup class="grid gap-2 my-6" onChange={setGender}>
        <RadioGroupLabel>الجنس</RadioGroupLabel>
        <For each={["ذكر", "أنثى"]}>
          {(g) => (
            <RadioGroupItem value={g} class="flex items-center gap-2">
              <RadioGroupItemControl/>
              <RadioGroupItemLabel class="text-sm">{g}</RadioGroupItemLabel>
            </RadioGroupItem>
          )}
        </For>
      </RadioGroup>
    ),
    gender
  }
}