import {TextField, TextFieldErrorMessage, TextFieldRoot} from "~/components/ui/textfield";
import {Button} from "~/components/ui/button";

export default function Home() {
  return (
    <main class="mx-auto p-4">
      <h1>Discord Bot Builder - Web</h1>
      <h2 class={"my-8"}>Web Editor</h2>
      <TextFieldRoot  validationState="invalid">
        <TextField type="email" placeholder="Email" />
        <TextFieldErrorMessage>Email is required.</TextFieldErrorMessage>
        <Button type="button">Subscribe</Button>
      </TextFieldRoot>
    </main>
  );
}
