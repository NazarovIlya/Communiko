import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export interface Repository {
  repo: CurrentRepository
}

export default class CurrentRepository {
  constructor() {
    makeAutoObservable(this);
  }
}
export const repository: Repository = {
  repo: new CurrentRepository()
}

export const RepositoryContext = createContext(repository);

export function useStore() {
  return useContext(RepositoryContext);
}