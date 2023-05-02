import { makeAutoObservable, runInAction } from "mobx";
import { Activeness } from "../model/Activeness";
import client from "../api/requestClient";
import { v4 as uuidv4 } from 'uuid';

export default class CurrentRepository {
  selectedActiveness: Activeness | undefined = undefined;
  activities: Activeness[] = [];
  editMode: boolean = false;
  loadingInit: boolean = false;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.loadingInit = true;
    try {
      const activities = await client.Activities.items();
      runInAction(() => {
        activities.forEach((e) => {
          this.activities.push(e);
        });
        this.loadingInit = !true;
      });
    } catch (error) {
      runInAction(() => {
        console.log(`error = ${error}`);
        this.loadingInit = !true;
      });
    }
  }

  handleViewActiveness = async (id: string) => {
    this.selectedActiveness = this.activities.find(e => e.id === id);
  }

  handleCancelViewActiveness = async () => {
    console.log("+");

    this.selectedActiveness = undefined;
    this.handleCloseForm();
  }

  setEditMode = (mode: boolean) => { this.editMode = mode; }

  handleOpenForm = async (id?: string) => {
    if (id) { this.handleViewActiveness(id); }
    else { this.handleCancelViewActiveness(); }
    this.setEditMode(true);
  }

  handleCloseForm = async () => {
    this.setEditMode(false);
  }

  handleCreateActiveness = async (item: Activeness) => {
    this.loading = true;
    item.id = uuidv4();
    try {
      await client.Activities.create(item);
      runInAction(() => {
        this.activities.push(item);
        this.selectedActiveness = item;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  handleEditActiveness = async (item: Activeness) => {
    this.loading = true;
    try {
      await client.Activities.update(item);
      runInAction(() => {
        this.activities = [...this.activities.filter(e => e.id !== item.id), item];
        this.selectedActiveness = item;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  handleRemoveActiveness = async (id: string) => {
    this.loading = true;
    try {
      await client.Activities.remove(id);
      runInAction(() => {
        this.activities = [...this.activities.filter(x => x.id !== id)];
        this.handleCancelViewActiveness();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}