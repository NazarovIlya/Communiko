import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { UserComment } from "../model/UserComment";
import { repository } from "./Repository";

export default class CommentRepository {
  comments: UserComment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (activitiesId: string) => {
    if (repository.repo.selectedActiveness) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:11222/comment?activitiesId=' + activitiesId, {
          accessTokenFactory: () => repository.userRepo.user?.token!
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection.start().catch(error => console.log('Ошибка: ', error));

      this.hubConnection.on('WaitComments', (comments: UserComment[]) => {
        runInAction(() => {
          comments.forEach(comment => {
            comment.create = new Date(comment.create);
          });
          this.comments = comments;
        });
      });

      this.hubConnection.on('GetComment', comment => {
        runInAction(() => {
          comment.create = new Date(comment.create);
          this.comments.unshift(comment);
        })
      })
    }
  }

  stopHubConnection = () => {
    this.hubConnection?.stop().catch(error => console.log('Ошибка: ', error));
  }

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  }

  addComment = async (values: any) => {
    values.activitiesId = repository.repo.selectedActiveness?.id;
    try {
      await this.hubConnection?.invoke('SendComment', values);
    } catch (error) {
      console.log(error);
    }
  }
}