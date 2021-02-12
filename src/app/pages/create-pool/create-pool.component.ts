import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PollService } from 'src/app/services/poll.service';
import { Store } from '@ngrx/store';
import { SharedState } from '../../shared/shared.reducer'
import { HideLoading, ShowLoading } from 'src/app/shared/shared.actions';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-pool',
  templateUrl: './create-pool.component.html',
  styleUrls: ['./create-pool.component.css']
})
export class CreatePoolComponent {
  form: FormGroup;
  
  constructor(private fb: FormBuilder,
    private pollService: PollService,
    private state: Store<SharedState>,
    private notification: NzNotificationService,
    private router: Router,) {

    this.form = this.fb.group({
      poll_description: this.fb.control("", [Validators.required, Validators.maxLength(255)]),
      options: this.fb.array([], [Validators.required]),
    })
  }

  createNewQuestion() {
    if (this.options.length != 0) {
      if (this.getOptionValue(this.options.length - 1, 'option') == "" && this.options.length != 0) {
        this.showErrorNotification("termine de criar a opção anterior!")
      } else {
        this.options.push(this.createOption(""))
      }
    } else {
      this.options.push(this.createOption(""))
    }
  }

  createOption(value): FormGroup {
    return this.fb.group({
      option: this.fb.control(value, [Validators.required, Validators.maxLength(150)]),
      edit: this.fb.control(true, [Validators.required]),
    })
  }

  send() {
    if (!this.form.invalid) {
      const rawForm = this.form.getRawValue()
      const data = {poll_description: rawForm.poll_description, options: rawForm.options.map(this.mapOptions)}
      this.showLoading()
      this.pollService.postPoll(data).subscribe( (response : any) => {
        this.hideLoading()
        this.showSucessNotification("Enquete Criada Com Sucesso")
        this.navigateToStatusPage(response.poll_id)
      }, (error : any) => {
        this.hideLoading()
        this.showErrorNotification(error.message)
      })
    } else {
      this.errorInFormAlert()
    }
  }

  errorInFormAlert() {
    if (this.poll_description.value == "") {
      this.showErrorNotification("preencha o campo de descrição")
    }

    if (this.options.length < 2) {
      this.showErrorNotification("you must register at least 2 options")
    }

    this.options.controls.forEach( (option : any) => {
      if (option.controls.option.value == "") {
        this.showErrorNotification("Existem Opções Com Valores Em Branco")
      }
    })
  }
  
  get poll_description(): AbstractControl {
    return this.form.get("poll_description");
  }

  get options(): FormArray {
    return this.form.get("options") as FormArray;
  }

  editQuestion(index) {
    this.options.controls[index].get('edit').setValue(true)
  }

  deleteQuestion(index) {
    this.options.removeAt(index)
  }

  getOptionValue(index, field) {
    return this.options.controls[index].get(field).value
  }

  mapOptions(data) {
    return data.option
  }

  showErrorNotification(message) {
    this.notification.error(message,"")
    return true;
  }

  showSucessNotification(message) {
    this.notification.success(message, "")
  }

  showLoading(){
    this.state.dispatch(new ShowLoading());
  }

  hideLoading(){
    this.state.dispatch(new HideLoading());
  }

  navigateToStatusPage(id){
    this.router.navigate(['/status/' + id]);
  }
}
