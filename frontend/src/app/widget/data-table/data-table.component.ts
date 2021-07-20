import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T extends { [propname: string]: any }> implements OnInit {

  @Input() tableColumns: ITableColumn[] = [];
  @Input() list$: Observable<T[]> | null = null;
  @Input() tableTitle: string = '';
  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();

  constructor(
    public config: ConfigService,
  ) { }

  // tslint:disable-next-line: no-empty
  ngOnInit(): void {
  }

  onScroll() {
    this.config.endItem += this.config.scrollSize;
  }
  onClickEdit(entity: any): void {
    this.editClick.emit(entity);
  }

  onClickDelete(entity: any): void {
    this.deleteClick.emit(entity);
  }

}
