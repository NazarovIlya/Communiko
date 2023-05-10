import { makeAutoObservable } from "mobx"

interface Modal {
  open: boolean;
  content: JSX.Element | null;
}

export default class ModalRepository {
  modal: Modal = {
    open: false,
    content: null
  }

  constructor() {
    makeAutoObservable(this);
  }

  show = (content: JSX.Element) => {
    this.modal.open = true;
    this.modal.content = content;
  }

  hide = () => {
    this.modal.open = false;
    this.modal.content = null;
  }
}