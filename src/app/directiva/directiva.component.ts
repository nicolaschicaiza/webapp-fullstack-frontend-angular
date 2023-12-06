import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {

  listCurse: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];
  enable: boolean = true;

  setEnable(): void {
    this.enable = !this.enable;
  }

}
