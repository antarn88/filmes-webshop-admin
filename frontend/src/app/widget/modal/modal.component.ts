import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalTitle: string = 'ModalTitle';
  @Input() modalText: string = 'ModalText';
  @Output() onClickAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickDelete(): void {
    this.onClickAction.emit(true);
  }

}
