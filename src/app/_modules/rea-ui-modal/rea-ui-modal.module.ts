import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReaUiModalComponent } from './rea-ui-modal.component';
import { ReaUiModalHeaderComponent } from './components/rea-ui-modal-header/rea-ui-modal-header.component';
import { ReaUiModalBodyComponent } from './components/rea-ui-modal-body/rea-ui-modal-body.component';
import { ReaUiModalFooterComponent } from './components/rea-ui-modal-footer/rea-ui-modal-footer.component';


@NgModule({
  declarations: [
    ReaUiModalComponent,
    ReaUiModalHeaderComponent,
    ReaUiModalBodyComponent,
    ReaUiModalFooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReaUiModalComponent,
    ReaUiModalHeaderComponent,
    ReaUiModalBodyComponent,
    ReaUiModalFooterComponent
  ]
})
export class ReaUiModalModule { }
