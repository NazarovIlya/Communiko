import { makeAutoObservable, reaction } from "mobx";

export default class AuthRepository {
  token: string | null = localStorage.getItem('user-jwt');
  appLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      token => {
        if (token) {
          localStorage.setItem('user-jwt', token)
        } else {
          localStorage.removeItem('user-jwt')
        }
      }
    )
  }

  setToken = (token: string | null) => {
    if (token) localStorage.setItem('user-jwt', token)
    this.token = token;
  }

  setAppLoaded = () => {
    this.appLoaded = true;
  }
}