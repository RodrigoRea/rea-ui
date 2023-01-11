import { Subscription } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ReaModalService } from './services/rea-modal.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IConfirm } from './rea-ui-modal';

@Component({
  selector: 'rea-ui-modal',
  templateUrl: './rea-ui-modal.component.html',
  styleUrls: ['./rea-ui-modal.component.scss'],
  providers: [
    ReaModalService
  ],
  animations: [
    trigger('fade', [
        state('visible', style({ opacity: 1 })),
        state('hide', style({ opacity: 0, top: '-38%' })),
        transition('void => visible', [
            style({ opacity: 0, top: '-38%' }),
            animate('0.3s ease-out')
        ]),
        transition('visible => hide', animate('0.3s ease-out'))
    ])
  ]
})
export class ReaUiModalComponent implements OnInit, OnDestroy {

  param_confirm: IConfirm = {} as IConfirm;
  /* BEGIN - Parametros para modo confirmacao */
  private _confirm: boolean = false;
  private _confirmText: string = 'Confirmo';

  @Input() set confirm(v: boolean){
    this._confirm = v;
    this.param_confirm.confirm = this._confirm;
    this.param_confirm.confirmText = this._confirmText;
  }
  @Input() set confirmText(v: string){
    this._confirmText = v;
    this.param_confirm.confirmText = this._confirmText;
    this.param_confirm.confirm = this._confirm;    
  }

  /* END --- Parametros para modo confirmacao */

  subscription: Subscription | undefined;
  subscriptionI: Subscription | undefined;

  @Input() autoClose: boolean = true;
  @Input() title: any | undefined;
  @Input() maxWidth: number = 500;

  @Input() set window( size: 'small' | 'medium' | 'large' | 'big' | 'full' ){
    switch (size) {
      case 'small': this.maxWidth   = 300; break;
      case 'medium': this.maxWidth  = 500; break;
      case 'large': this.maxWidth   = 900; break;
      case 'big': this.maxWidth     = 1100; break;
      case 'full': this.maxWidth     = 1400; break;
    }
  }

 
  // psg
  private _open: boolean = false;
  @Input() set open(open: boolean){
    this._open = open;
    this.fixed_body((open) ? 'on' : 'off');
  }
  get open(): boolean { return this._open; }

  private _loading: boolean = false;
  @Input() set loading(loading: boolean){ 
    this._loading = loading;
    this.reaModalService.setLoading(loading);
  }
  get loading(): boolean { return this._loading; }
  
  @Output() openChange = new EventEmitter<boolean>();

  @Output() toConfirm = new EventEmitter<boolean>();
  @Output() toCancel = new EventEmitter<boolean>();
  @Output() toAction = new EventEmitter<'confirmed'|'cancel'|'close'>();

  constructor(
    private reaModalService: ReaModalService
  ) { }

  ngOnInit(): void {

    this.subscription = this.reaModalService.stateClose$.subscribe((open: boolean)=>{
      if( open ){
        /* OPEN */
      }

      if( !open ){
        /* CLOSE */
        this.toClose();
      }
    });

    this.subscriptionI = this.reaModalService.stateRespConfirm$.subscribe((resp: boolean)=>{
      if( resp ){
        /* CONFIRMADO */
        this.toConfirm.emit(resp);
        this.toClose('confirmed');

      }

      if( !resp ){
        /* CANCELADO */
        this.toCancel.emit(resp);
        this.toClose('cancel');
      }
    })
    
    this.reaModalService.toConfirm( this.param_confirm );
  }

  toClose(action?: any | undefined){
    if( this.autoClose ){
      this.open = false;
      this.openChange.emit(false);
    }
    
    action = (action) ? action : 'close';
    this.toAction.emit(action);
    this.fixed_body('off');
  }

  checkIsOpen(){
    if( this.open ){
      this.fixed_body('on');
    }else{
      this.fixed_body('off');
    }
  }

  fixed_body(fixed: 'on'|'off'){    
    let body = <any> document.getElementsByTagName("BODY")[0];
    if( body && body.style ){
      if( fixed === 'on' ){
        body.style.overflowY = "hidden";
      }
      if( fixed === 'off' ){
        body.style.removeProperty('overflow-y');
      }
    }
  }

  ngOnDestroy(){
    if( this.subscription ){ this.subscription.unsubscribe(); }
  }


}
