import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit {
  @Input() paginator: any;
  pages: number[];

  ngOnInit(): void {
    this.pages = new Array(this.paginator.totalPages)
      .fill(0)
      .map((_valor, indice) => indice + 1);
  }
}
