import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export interface Repository {
  repo: CurrentRepository
}

export default class CurrentRepository {
  text = 'Hello MobX!';

  constructor() {
    makeAutoObservable(this);
    // makeObservable(this, {
    //   text: observable,
    //   setText: action
    // });
  }

  setText = () => {
    this.text = `${this.text}!`;
  }
}
export const repository: Repository = {
  repo: new CurrentRepository()
}

export const RepositoryContext = createContext(repository);

export function useStore() {
  return useContext(RepositoryContext);
}