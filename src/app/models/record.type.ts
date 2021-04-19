

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




export interface IDS {
  trakt: number;
  slug:  string;
  imdb:  string;
  tmdb:  number;
}
