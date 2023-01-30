import {Component, HostListener} from '@angular/core';
import {UtilService} from "./services/util.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  autocompleteValue: string = '';

  constructor(private util: UtilService) {}

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.util.documentClicked.next(event.target);
  }
}
