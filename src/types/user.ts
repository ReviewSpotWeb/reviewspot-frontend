export enum Role {
  GENERAL = "GENERAL",
  MODERATOR = "MODERATOR",
}

export interface User {
  _id: string;
  loggedIn: boolean;
  username: string;
  banned: boolean;
  role: Role | null;
}
