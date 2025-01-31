import {Metadata} from "~/metadata/Metadata";

export interface EditRequest {
  value: any,
  metadata: Metadata
}

export interface EditResponse {
  value: any,
  metadata: Metadata
}