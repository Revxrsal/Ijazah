import {EditResponse} from "~/metadata/editor";

export const Sample: EditResponse = {
  "value": {
    "cap": 1420,
    "list": [
      {
        "x": "hello"
      }
    ],
    "map": {
      "v": {
        "x": "nooo"
      }
    }
  },
  "metadata": {
    "type": "object",
    "fields": {
      "map": {
        "type": "map",
        "minSize": 0,
        "maxSize": 2147483647,
        "keyType": {
          "type": "string",
          "minLength": 0,
          "maxLength": 2147483647
        },
        "valueType": {
          "type": "object",
          "fields": {
            "x": {
              "type": "string",
              "minLength": 0,
              "maxLength": 2147483647
            }
          }
        }
      },
      "list": {
        "type": "list",
        "minSize": 0,
        "maxSize": 2147483647,
        "entryType": {
          "type": "object",
          "fields": {
            "x": {
              "type": "string",
              "minLength": 0,
              "maxLength": 2147483647
            }
          }
        }
      },
      "cap": {
        "type": "integer",
        "min": -2147483648,
        "max": 2147483647
      }
    }
  }
}