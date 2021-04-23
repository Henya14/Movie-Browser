import { IDS } from "./ID.type";

export interface PeopleOverview {
  name: string,
  ids: IDS
}


export interface PeopleDetails extends  PeopleOverview{
  social_ids: SocialIDS;
  biography:  string;
  birthday:   string;
  death:      null;
  birthplace: string;
  homepage:   string;
}

export interface SocialIDS {
  twitter:   string;
  facebook:  string;
  instagram: string;
  wikipedia: null;
}
