import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd';
import { PollService } from 'src/app/services/poll.service';
import { HideLoading, ShowLoading } from 'src/app/shared/shared.actions';
import { SharedState } from 'src/app/shared/shared.reducer';

@Component({
  selector: 'app-vote-pool',
  templateUrl: './vote-pool.component.html',
  styleUrls: ['./vote-pool.component.css']
})
export class VotePoolComponent {
  form: FormGroup;
  poll_description = ""
  options = []
  optionSelected = 0
  pool_id

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private pollService: PollService,
    private notification: NzNotificationService,
    private router: Router,
    private state: Store<SharedState>) {

    this.getParamsUrl(this.route);

    this.form = this.fb.group({
      option:  this.fb.control(null, [Validators.required]),
    })
  }

  selectOption(id) {
    this.form.controls['option'].setValue(id)
    this.optionSelected = id
  }

  private getParamsUrl(route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.pool_id = params.id
      this.getPoll()
    });
  }

  getPoll() {
    this.pollService.getPoll(this.pool_id).subscribe( (response: any) => {
      this.options = response.options;
      this.poll_description = response.poll_description;
    })
  }

  votePoll() {
    if (!this.form.invalid) {
      const data = this.form.getRawValue();
      this.showLoading()
      this.pollService.votePoll(this.pool_id, {option_id: data.option}).subscribe( (responde: any) => {
        this.hideLoading()
        this.showSucessNotification("Voto Enviado Com Sucesso!")
        this.navigateToSuccesPage()
      }, (error: any) => {
        this.hideLoading()
        this.showErrorNotification(error.message)
      })
    } else {
      this.showErrorNotification("Escolha Pelo Menos Uma Opção!")
    }
  }

  showErrorNotification(message) {
    this.notification.error(message,"")
  }

  showSucessNotification(message) {
    this.notification.success(message, "")
  }

  navigateToSuccesPage(){
    this.router.navigate(['/success']);
  }

  showLoading(){
    this.state.dispatch(new ShowLoading());
  }

  hideLoading(){
    this.state.dispatch(new HideLoading());
  }
}
