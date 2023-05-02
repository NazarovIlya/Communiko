import { makeAutoObservable, runInAction } from "mobx";
import { Activeness } from "../model/Activeness";
import client from "../api/requestClient";

export default class CurrentRepository {
  selectedActiveness: Activeness | undefined = undefined;
  activities: Activeness[] = [];
  editMode: boolean = false;
  loading: boolean = false;
  loadingInit: boolean = false;

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
}