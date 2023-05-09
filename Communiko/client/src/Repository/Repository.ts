import { createContext, useContext } from "react";
import CurrentRepository from "./CurrentRepository";
import UserRepository from "./UserRepository";

export interface Repository {
  repo: CurrentRepository;
  userRepo: UserRepository;
}

export const repository: Repository = {
  repo: new CurrentRepository(),
  userRepo: new UserRepository()
}

export const RepositoryContext = createContext(repository);

export function useRepository() {
  return useContext(RepositoryContext);
}