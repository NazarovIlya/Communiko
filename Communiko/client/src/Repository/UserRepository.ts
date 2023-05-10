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

  login = async (credentials: UserForm) => {
    try {
      const user = await client.Account.auth(credentials);
      this.user = user;
      repository.authRepo.setToken(user.token);
      runInAction(() => { this.user = user; });
      router.navigate('/activenessItems');
      repository.modalRepo.hide();
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

  get isLoggedIn() {
    return !!this.user;
  }

  getCurrentUser = async () => {
    try {
      const user = await client.Account.current();
      runInAction(() => { this.user = user; });
    } catch (error) {
      console.log(error);
    }
  }

  signUp = async (credentials: UserForm) => {
    try {
      const user = await client.Account.register(credentials);
      this.user = user;
      repository.authRepo.setToken(user.token);
      runInAction(() => { this.user = user; });
      router.navigate('/activenessItems');
      repository.modalRepo.hide();
    } catch (error) {
      throw error;
    }
  }
}