import { makeAutoObservable } from "mobx";
import { Activeness } from "../model/Activeness";
import client from "../api/requestClient";

export default class CurrentRepository {
  selectActiveness: Activeness | null = null;
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
      activities.forEach((e) => {
        this.activities.push(e);
      });
      this.loadingInit = !true;
    } catch (error) {
      console.log(`error = ${error}`);
      this.loadingInit = !true;
    }
  }
}