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

export interface UserProfile {
  numComments: number;
  numReviews: number;
  userInfo: User;
}
