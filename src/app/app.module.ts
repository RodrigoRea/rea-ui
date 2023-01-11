import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UiModalComponent } from './pages/ui-modal/ui-modal.component';
import { ReaUiModalModule } from './_modules/rea-ui-modal/rea-ui-modal.module';

@NgModule({
  declarations: [
    AppComponent,
    UiModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReaUiModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
