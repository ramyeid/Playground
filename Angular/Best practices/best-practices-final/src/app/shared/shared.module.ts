import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner.component';

@NgModule({
  imports: [ CommonModule ],
  exports: [ LoadingSpinnerComponent, CommonModule ],
  declarations: [ LoadingSpinnerComponent ],
})
export class SharedModule { };

