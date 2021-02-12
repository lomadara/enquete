import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PollService } from 'src/app/services/poll.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-status-pool',
  templateUrl: './status-pool.component.html',
  styleUrls: ['./status-pool.component.css']
})
export class StatusPoolComponent implements OnInit{
  @ViewChild('modal', {}) modalComponent: ModalComponent;
  views :number = 0
  votes = []
  options = []
  vote_link

  constructor(private route: ActivatedRoute,
    private pollService: PollService) {
    this.getParamsUrl(this.route);
  }

  private getParamsUrl(route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.vote_link = environment.baseFrontUrl+'vote/'+params['id']
      this.getPollStatusById(params['id'])
      this.getPollById(params['id'])
    });
  }

  ngOnInit() {
    this.showModal()
  }

  getPollStatusById(id) {
    this.pollService.statsPoll(id).subscribe( (response: any) => {
      this.votes = response.votes;
      this.views = response.views;
    })
  }

  getPollById(id) {
    this.pollService.getPoll(id).subscribe( (response: any) => {
      this.options = response.options;
    })
  }

  getOptionDescription(id) {
    const index = this.options.findIndex( (option: any) => option.option_id == id);
    return this.options[index].option_description;
  }

  hideModal() {
    this.modalComponent.hideModal();
  }

  showModal() {
    this.modalComponent.showModal()
  }

}
