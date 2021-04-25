import { IDS } from "./ID.type";

export enum RecordType {
  Movie = "movie",
  Show = "show"
}

export interface Record {
  type: RecordType
  title: string
  year: number
  ids: IDS
  watchers?: number
}
