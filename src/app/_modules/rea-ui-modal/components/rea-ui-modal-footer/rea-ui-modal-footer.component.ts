import { Subscription } from 'rxjs';
import { ReaModalService } from './../../services/rea-modal.service';
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { IConfirm } from '../../rea-ui-modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'rea-ui-modal-footer',
  templateUrl: './rea-ui-modal-footer.component.html',
  styleUrls: ['./rea-ui-modal-footer.component.scss']
})
export class ReaUiModalFooterComponent implements OnInit, OnDestroy {

  @Input() btnCloseText: string = 'Fechar';
  @Input() btnCancelText: string = 'Cancelar';
  @Input() btnConfirmText: string = 'Confirmar';

  @ViewChild('_formulario')  _formulario: NgForm | undefined; 
  txt_value: string = '';

  param_confirm: IConfirm = {} as IConfirm;

  loading: boolean = false;

  subscription: Subscription |undefined

  constructor(
    private reaModalService: ReaModalService
  ) { }

  ngOnInit(): void {
    this.txt_value = '';
    this.param_confirm = this.reaModalService.getParamConfirm();

    this.toStateLoading();
  }

  toClose(){
    this.reaModalService.toModal('close');
  }

  toConfirm(valid: boolean | any){
    if( typeof valid === 'boolean' ){
      if( valid && (this.txt_value).toLowerCase() === (this.param_confirm.confirmText).toLowerCase() ){
        this.reaModalService.toRespConfirm(true);
        this.txt_value = ''; 
      }
    }
  }

  toCancel(){
    this.reaModalService.toRespConfirm(false);
  }

  toStateLoading(){
    this.loading = <any> this.reaModalService.getLoading();
    this.subscription = this.reaModalService.stateLoading$.subscribe((loading: boolean) => { this.loading = loading; } )
  }


  ngOnDestroy(): void {
    if( this.subscription ){ this.subscription.unsubscribe(); }
  }

}
