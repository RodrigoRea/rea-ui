import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { ReaUiModule } from './_modules/modules.module';
import { UiModalComponent } from './pages/ui-modal/ui-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UiModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    ReaUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
