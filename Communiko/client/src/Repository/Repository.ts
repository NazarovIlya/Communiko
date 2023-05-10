import { createContext, useContext } from "react";
import CurrentRepository from "./CurrentRepository";
import UserRepository from "./UserRepository";
import AuthRepository from "./AuthRepository";
import ModalRepository from "./ModalRepository";

export interface Repository {
  repo: CurrentRepository;
  userRepo: UserRepository;
  authRepo: AuthRepository;
  modalRepo: ModalRepository;
}

export const repository: Repository = {
  repo: new CurrentRepository(),
  userRepo: new UserRepository(),
  authRepo: new AuthRepository(),
  modalRepo: new ModalRepository()
}

export const RepositoryContext = createContext(repository);

export function useRepository() {
  return useContext(RepositoryContext);
}