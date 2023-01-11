import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rea-ui-modal-header',
  templateUrl: './rea-ui-modal-header.component.html',
  styleUrls: ['./rea-ui-modal-header.component.scss']
})
export class ReaUiModalHeaderComponent implements OnInit {

  @Input() mode: 'info' | 'success' | 'danger' | 'warning' = 'info';
  @Input() title: any | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
