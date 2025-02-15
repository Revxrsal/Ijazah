import {Match, Switch} from "solid-js";
import StringField from "~/metadata/StringField";
import DecimalField from "~/metadata/DecimalField";
import {
  BooleanPropertyMetadata,
  DecimalPropertyMetadata,
  EnumPropertyMetadata,
  JavaObjectPropertyMetadata,
  ListPropertyMetadata,
  MapPropertyMetadata,
  Metadata,
  StringPropertyMetadata
} from "~/metadata/Metadata";
import BooleanField from "~/metadata/BooleanField";
import ListField from "~/metadata/ListField";
import EnumField from "~/metadata/EnumField";
import MapField from "~/metadata/MapField";
import JavaObjectField from "~/metadata/JavaObjectField";

export const DynamicField = (props: {
  class?: string;
  key: string;
  value: any;
  metadata: Metadata;
  onUpdate: (value: any) => void,
  nesting: number
}) => {
  const metadata = props.metadata
  return (
    <div class={`m-4 py-4 px-2 ${props.class || ""}`}>
      <div style={{"margin-inline-start": `${props.nesting * 4}px`}}>
        <Switch>
          <Match when={metadata.type === "string"}>
            <StringField value={props.value}
                         onUpdate={props.onUpdate}
                         key={props.key}
                         metadata={metadata as StringPropertyMetadata}
            />
          </Match>

          <Match when={metadata.type == "decimal"}>
            <DecimalField value={props.value}
                          onUpdate={props.onUpdate}
                          key={props.key}
                          metadata={metadata as DecimalPropertyMetadata}
            />
          </Match>

          {/* TODO: Add something dedicated for integers */}
          <Match when={metadata.type == "integer"}>
            <DecimalField value={props.value}
                          onUpdate={props.onUpdate}
                          key={props.key}
                          metadata={metadata as DecimalPropertyMetadata}
            />
          </Match>

          <Match when={metadata.type === "boolean"}>
            <BooleanField value={props.value}
                          onUpdate={props.onUpdate}
                          key={props.key}
                          metadata={metadata as BooleanPropertyMetadata}
            />
          </Match>

          <Match when={metadata.type === "enum"}>
            <EnumField value={props.value}
                       onUpdate={props.onUpdate}
                       key={props.key}
                       metadata={metadata as EnumPropertyMetadata}
            />
          </Match>

          <Match when={metadata.type === "list"}>
            <ListField value={props.value}
                       onUpdate={props.onUpdate}
                       key={props.key}
                       metadata={metadata as ListPropertyMetadata}
                       nesting={props.nesting + 1}
            />
          </Match>

          <Match when={metadata.type === "map"}>
            <MapField value={props.value}
                      onUpdate={props.onUpdate}
                      key={props.key}
                      metadata={metadata as MapPropertyMetadata}
                      nesting={props.nesting + 1}
            />
          </Match>
          <Match when={metadata.type === "object"}>
            <JavaObjectField value={props.value}
                             onUpdate={props.onUpdate}
                             key={props.key}
                             metadata={metadata as JavaObjectPropertyMetadata}
                             nesting={props.nesting + 1}
            />
          </Match>
        </Switch>
      </div>
    </div>
  );
};
