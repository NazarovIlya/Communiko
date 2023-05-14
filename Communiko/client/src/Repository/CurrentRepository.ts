import { makeAutoObservable, runInAction } from "mobx";
import { Activeness } from "../model/Activeness";
import client from "../api/requestClient";
import { v4 as uuidv4 } from 'uuid';
import { SyntheticEvent } from "react";
import { repository } from "./Repository";
import { UserProfile } from "../model/UserProfile";


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

  private setActiveness = (activeness: Activeness) => {
    const user = repository.userRepo.user;
    if (user) {
      activeness.isGoing = activeness.users!.some(
        e => e.userName === user.username
      );
      activeness.isAuthor = activeness.authorName === user.username;
      activeness.author = activeness.users?.find(
        e => e.userName === activeness.authorName
      );
    }
    this.mapActivities.set(activeness.id, activeness);
  }

  private setLoadingInit = (value: boolean) => {
    runInAction(() => { this.loadingInit = value; });
  }

  loadActivities = async () => {
    this.setLoadingInit(true);
    try {
      const activities = await client.Activities.items();
      runInAction(() => {
        activities.forEach((e) => {
          this.setActiveness(e);
        });
        this.setLoadingInit(!true);
      });
    } catch (error) {
      runInAction(() => {
        console.log(`error = ${error}`);
        this.setLoadingInit(!true);
      });
    }
  }

  loadActiveness = async (id: string) => {
    let item = this.mapActivities.get(id);
    if (item) {
      this.selectedActiveness = item;
      return item;
    }
    else {
      this.setLoadingInit(true);

      try {
        item = await client.Activities.item(id);
        runInAction(() => { this.selectedActiveness = item; });
        this.setLoadingInit(!true);
        return item;
      } catch (error) {
        console.log(error);
        this.setLoadingInit(!true);
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
        this.setActiveness(item);
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
        this.setActiveness(item);
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

  joinActivities = async () => {
    const user = repository.userRepo.user;
    this.loading = true;
    try {
      await client.Activities.join(this.selectedActiveness!.id);
      runInAction(() => {
        if (this.selectedActiveness?.isGoing) {
          this.selectedActiveness.users =
            this.selectedActiveness.users?.filter(e => e.userName !== user?.username);
          this.selectedActiveness.isGoing = false;
        } else {
          const participant = new UserProfile(user!);
          this.selectedActiveness?.users?.push(participant);
          this.selectedActiveness!.isGoing = true;
          this.selectedActiveness!.authorName = user?.nickName;
        }
        this.mapActivities.set(this.selectedActiveness!.id, this.selectedActiveness!);
      })
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.loading = false);
    }
  }
}