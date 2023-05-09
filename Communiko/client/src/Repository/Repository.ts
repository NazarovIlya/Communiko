import { createContext, useContext } from "react";
import CurrentRepository from "./CurrentRepository";
import UserRepository from "./UserRepository";
import AuthRepository from "./AuthRepository";

export interface Repository {
  repo: CurrentRepository;
  userRepo: UserRepository;
  authRepo: AuthRepository;
}

export const repository: Repository = {
  repo: new CurrentRepository(),
  userRepo: new UserRepository(),
  authRepo: new AuthRepository()
}

export const RepositoryContext = createContext(repository);

export function useRepository() {
  return useContext(RepositoryContext);
}