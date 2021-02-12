import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }

  getPoll(id: number) {
    return this.http.get(environment.baseApiUrl+'poll/'+id);
  }

  postPoll(data: object) {
    return this.http.post(environment.baseApiUrl+'poll/', data);
  }

  votePoll(id: number, data: object) {
    return this.http.post(environment.baseApiUrl+'poll/'+id+'/vote', data);
  }

  statsPoll(id: number) {
    return this.http.get(environment.baseApiUrl+'poll/'+id+'/stats');
  }
}
