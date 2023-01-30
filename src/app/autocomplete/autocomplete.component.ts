import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {ICompany} from "../models/company";
import {CompaniesService} from "../services/companies.service";
import {debounceTime, Subject, distinctUntilChanged, Subscription} from "rxjs";
import {UtilService} from "../services/util.service";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements AfterViewInit, OnDestroy {
  @ViewChild('autocompleteElement', {static: false}) autocompleteElement: ElementRef | undefined;
  @Input() value: string = '';
  valueChanged: Subject<string> = new Subject<string>();
  valueSubscription: Subscription | null = null;
  clickSubscription: Subscription | null = null;

  companies: ICompany[] = [];
  openedList: boolean = false;
  loadList: boolean = false;

  constructor(private companiesService: CompaniesService, private util: UtilService) {}

  ngAfterViewInit() {
    this.clickSubscription = this.util.documentClicked.subscribe(target => this.clickOutside(target));
    this.valueSubscription = this.valueChanged
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(newValue => {
        this.updateCompanies(newValue);
      });
  }

  updateCompanies(query: string): void {
    if (!query) {
      this.openedList = false;
      return;
    }
    this.loadList = true;
    this.openedList = true;
    this.companiesService.getCompanies(query).subscribe({
      next: (res: ICompany[]) => {
        if (!res.length) {
          this.openedList = false;
        }
        this.companies = res;
        this.loadList = false;
      },
      error: () => {
        this.loadList = false;
        this.openedList = false;
      },
    });
  }

  selectCompany(company: ICompany): void {
    this.value = company.name;
    this.openedList = false;
  }

  changeValue(): void {
    this.valueChanged.next(this.value);
  }

  clickOutside(target: HTMLElement): void {
    if (!this.autocompleteElement?.nativeElement.contains(target)) {
      this.openedList = false;
    }
  }

  ngOnDestroy() {
    this.valueSubscription?.unsubscribe();
    this.clickSubscription?.unsubscribe();
  }
}
