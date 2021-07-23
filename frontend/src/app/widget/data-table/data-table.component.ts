import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
  ) { }

  // tslint:disable-next-line: no-empty
  ngOnInit(): void {
  }

  onScroll() {
    this.config.endItem += this.config.scrollSize;
  }
  onClickEdit(entity: any): void {
    this.config.view = 'list';
    this.router.navigateByUrl(`${this.router.url}/${entity._id}`, { state: { view: 'list' } });
  }

  onClickDelete(entity: any): void {
    this.deleteClick.emit(entity);
  }

}
