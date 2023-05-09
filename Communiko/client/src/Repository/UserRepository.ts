import { makeAutoObservable } from "mobx";
import { User } from "../model/user";
import { UserForm } from "../model/UserForm";
import client from "../api/requestClient";

export default class UserRepository {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this)
  }

  auth = async (credentials: UserForm) => {
    try {
      const user = await client.Account.auth(credentials);
      console.log(user);
    } catch (error) {
      throw error;
    }
  }
}