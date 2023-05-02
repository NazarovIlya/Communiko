import { createContext, useContext } from "react";
import CurrentRepository from "./CurrentRepository";

export interface Repository {
  repo: CurrentRepository
}

export const repository: Repository = {
  repo: new CurrentRepository()
}

export const RepositoryContext = createContext(repository);

export function useStore() {
  return useContext(RepositoryContext);
}