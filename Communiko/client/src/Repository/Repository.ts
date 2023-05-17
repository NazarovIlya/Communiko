import { createContext, useContext } from "react";
import CurrentRepository from "./CurrentRepository";
import UserRepository from "./UserRepository";
import AuthRepository from "./AuthRepository";
import ModalRepository from "./ModalRepository";
import CommentRepository from "./CommentRepository";

export interface Repository {
  repo: CurrentRepository;
  userRepo: UserRepository;
  authRepo: AuthRepository;
  modalRepo: ModalRepository;
  commentRepo: CommentRepository;
}

export const repository: Repository = {
  repo: new CurrentRepository(),
  userRepo: new UserRepository(),
  authRepo: new AuthRepository(),
  modalRepo: new ModalRepository(),
  commentRepo: new CommentRepository()
}

export const RepositoryContext = createContext(repository);

export function useRepository() {
  return useContext(RepositoryContext);
}