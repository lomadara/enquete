import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePoolComponent } from './pages/create-pool/create-pool.component';
import { StatusPoolComponent } from './pages/status-pool/status-pool.component';
import { VotePoolComponent } from './pages/vote-pool/vote-pool.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';



import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { NgZorroAntdModule, NZ_I18N, pt_BR } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { NzNotificationModule } from 'ng-zorro-antd';
import { ModalComponent } from './components/modal/modal.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { SucessPageComponent } from './pages/sucess-page/sucess-page.component';

registerLocaleData(pt);


@NgModule({
  declarations: [
    AppComponent,
    CreatePoolComponent,
    StatusPoolComponent,
    VotePoolComponent,
    LoadingComponent,
    ModalComponent,
    TitleBarComponent,
    SucessPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    NgZorroAntdModule,
    BrowserAnimationsModule,
    NzNotificationModule,
  ],
  providers: [
    
  { provide: NZ_I18N, useValue: pt_BR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
