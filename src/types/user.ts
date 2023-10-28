export enum Role {
  GENERAL = "GENERAL",
  MODERATOR = "MODERATOR",
}

export interface User {
  username: string;
  password: string;
  role: Role;
  banned: boolean;
  // bio
}
