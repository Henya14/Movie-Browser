import { IDS } from "./ID.type";

export interface MovieDetails {
  title:                  string;
  year:                   number;
  ids:                    IDS;
  tagline:                string;
  overview:               string;
  released:               string;
  runtime:                number;
  country:                string;
  updated_at:             string;
  trailer:                null;
  homepage:               string;
  status:                 string;
  rating:                 number;
  votes:                  number;
  comment_count:          number;
  language:               string;
  available_translations: string[];
  genres:                 string[];
  certification:          string;
}
