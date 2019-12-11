import { Component, EventEmitter, OnInit, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

const DEBOUNCE_TIME = 500;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @Input() control: FormControl;
  @Output() searchChange = new EventEmitter<string>();

  ngOnInit() {
    if (!this.hasOwnProperty('control')) {
      throw new Error(`Attribute 'control' is required`);
    }

    this.control.valueChanges
      .pipe(
        debounceTime(DEBOUNCE_TIME)
      )
      .subscribe((value: string) => {
        this.searchChange.emit(value);
      });
  }

  reset() {
    this.control.setValue('');
  }
}
