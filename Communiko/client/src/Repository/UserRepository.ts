import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../model/user";
import { UserForm } from "../model/UserForm";
import client from "../api/requestClient";
import { repository } from "./Repository";
import { router } from "../router/Router";

export default class UserRepository {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this)
  }


  auth = async (credentials: UserForm) => {
    try {
      const user = await client.Account.auth(credentials);
      repository.authRepo.setToken(user.token);
      runInAction(() => { this.user = user; });
      router.navigate('/activenessItems');
    } catch (error) {
      throw error;
    }
  }

  logout = async () => {
    repository.authRepo.setToken(null);
    localStorage.removeItem('user-jwt');
    this.user = null;
    router.navigate('/');
  }
}