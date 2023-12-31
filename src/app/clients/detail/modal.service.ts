import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal: boolean = false;
  private _notificationUpload: EventEmitter<any> = new EventEmitter();

  constructor() {}

  get notificationUpload(): EventEmitter<any> {
    return this._notificationUpload;
  }

  set notificationUpload(value: EventEmitter<any>) {
    this._notificationUpload = value;
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}
