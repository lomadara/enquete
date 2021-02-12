import { Component } from '@angular/core';
import { State, select } from '@ngrx/store';
import { SharedState } from './shared/shared.reducer';
import { selectLoading } from './shared/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'enquete';
  public showLoading$ = this.state.pipe(select(selectLoading));

  constructor(private state: State<SharedState>) { }

}
