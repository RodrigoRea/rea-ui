import { IConfirm } from './../rea-ui-modal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ReaModalService {

  private loading: boolean | undefined;

  private param_confirm: IConfirm = {} as IConfirm;

  private _stateClose = new Subject<boolean>();
  public stateClose$ = this._stateClose.asObservable();

  private _stateConfirm = new Subject<IConfirm>();
  public stateConfirm$ = this._stateConfirm.asObservable();

  private _stateRespConfirm = new Subject<boolean>();
  public stateRespConfirm$ = this._stateRespConfirm.asObservable();

  private _stateLoading = new Subject<boolean>();
  public stateLoading$ = this._stateLoading.asObservable();


  toModal(action: 'open'|'close'): void{
    this._stateClose.next( (action === 'open') );
  }

  toRespConfirm(resp: boolean){
    this._stateRespConfirm.next(resp);
  }

  getParamConfirm(): IConfirm{
    return this.param_confirm;
  }

  toConfirm(confirm: IConfirm){
    this.param_confirm = confirm;
    this._stateConfirm.next(confirm);
  }

  getLoading(){
    return this.loading;
  }

  setLoading(loading: boolean){
    this.loading = loading;
    this._stateLoading.next(loading);
  }

}