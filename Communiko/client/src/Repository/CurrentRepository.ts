import { makeAutoObservable, runInAction } from "mobx";
import { Activeness } from "../model/Activeness";
import client from "../api/requestClient";
import { v4 as uuidv4 } from 'uuid';
import { SyntheticEvent } from "react";

export default class CurrentRepository {
  selectedActiveness: Activeness | undefined = undefined;
  mapActivities: Map<string, Activeness> = new Map<string, Activeness>();
  editMode: boolean = false;
  loadingInit: boolean = false;
  loading: boolean = false;
  btnId: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.loadingInit = true;
    try {
      const activities = await client.Activities.items();
      runInAction(() => {
        activities.forEach((e) => {
          this.mapActivities.set(e.id, e);
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

  loadActiveness = async (id: string) => {
    let item = this.mapActivities.get(id);
    if (item) this.selectedActiveness = item;
    else {
      this.loadingInit = true;
      try {
        item = await client.Activities.item(id);
        this.selectedActiveness = item;
        this.loadingInit = !true;
      } catch (error) {
        console.log(error);
        this.loadingInit = !true;
      }
    }
  }

  setEditMode = (mode: boolean) => { this.editMode = mode; }

  createActiveness = async (item: Activeness) => {
    this.loading = true;
    item.id = uuidv4();
    try {
      await client.Activities.create(item);
      runInAction(() => {
        this.mapActivities.set(item.id, item);
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

  updateActiveness = async (item: Activeness) => {
    this.loading = true;
    try {
      await client.Activities.update(item);
      runInAction(() => {
        this.mapActivities.set(item.id, item);
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

  removeActiveness = async (id: string) => {
    this.loading = true;
    try {
      await client.Activities.remove(id);
      runInAction(() => {
        this.mapActivities.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  deleteActiveness = async (arg: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.btnId = arg.currentTarget.name;
    this.removeActiveness(id);
  }


  sortByTitle = (x: Activeness, y: Activeness): number => {
    return x.title.toLowerCase().localeCompare(y.title.toLowerCase());
  }

  get activities() {
    return Array.from(
      this.mapActivities
        .values())
      .sort(this.sortByTitle);
  }
}