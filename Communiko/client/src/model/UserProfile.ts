import { User } from "./user";

export interface UserProfile {
  userName?: string;
  nickName?: string
  fullName?: string;
}
export class UserProfile implements UserProfile {
  constructor(user: User) {
    this.userName = user.username;
    this.nickName = user.nickName;
  }
}