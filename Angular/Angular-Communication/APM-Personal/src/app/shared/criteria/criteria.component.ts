import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('filterElement') filterElementRef: ElementRef;
  // method3
  // @ViewChild(NgModel) filterInput: NgModel;
  // @ViewChildren(NgModel) inputElementRefs: QueryList<NgModel>;

  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  hitMessage: string;

  private _listFilter: string;

  constructor() { }

  ngAfterViewInit(): void {
    this.filterElementRef.nativeElement.focus();
    // method3
    // this.filterInput.valueChanges.subscribe(
        // () => this.performFilter(this.listFilter));
}

  // method1
  // onFilterChange(filter: string): void {
  //     this._listFilter = filter;
  //     this.performFilter(this._listFilter);
  // }
  ngOnInit() {
  }

  // used when input variables are changed from the parent:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount;
    }
  }

  // method2
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

}
