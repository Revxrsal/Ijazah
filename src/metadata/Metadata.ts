type PropertyType =
  | "string"
  | "integer"
  | "decimal"
  | "boolean"
  | "list"
  | "enum"
  | "map"
  | "object";

export type Metadata = BooleanPropertyMetadata
  | StringPropertyMetadata
  | DecimalPropertyMetadata
  | LongPropertyMetadata
  | EnumPropertyMetadata
  | ListPropertyMetadata
  | MapPropertyMetadata
  | JavaObjectPropertyMetadata

export interface BooleanPropertyMetadata {
  type: "boolean";
}

export interface DecimalPropertyMetadata {
  type: "decimal";
  min: number;
  max: number;
}

export interface LongPropertyMetadata {
  type: "integer";
  min: number;
  max: number;
}

export interface EnumPropertyMetadata {
  type: "enum";
  options: string[];
}

export interface ListPropertyMetadata {
  type: "list";
  minSize: number;
  maxSize: number;
  entryType: Metadata;
}

export interface MapPropertyMetadata {
  type: "map";
  minSize: number;
  maxSize: number;
  keyType: Metadata;
  valueType: Metadata;
}

export interface JavaObjectPropertyMetadata {
  type: "object";
  fields: Record<string, Metadata>;
}

export interface StringPropertyMetadata {
  type: "string";
  minLength: number;
  maxLength: number;
}

export function createEmptyValue(metadata: Metadata): any {
  switch (metadata.type) {
    case "string":
      return "";
    case "integer":
      return 0;
    case "decimal":
      return 0.0;
    case "boolean":
      return false;
    case "list":
      return [];
    case "enum":
      return "";
    case "map":
      return {};
    case "object":
      let v: Record<string, any> = {}
      for (const [key, value] of Object.entries(metadata.fields)) {
        v[key] = createEmptyValue(value);
      }
      return v;
  }
}