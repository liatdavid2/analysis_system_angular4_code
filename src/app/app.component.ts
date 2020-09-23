import {ChangeDetectionStrategy, Component} from '@angular/core';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {




}
