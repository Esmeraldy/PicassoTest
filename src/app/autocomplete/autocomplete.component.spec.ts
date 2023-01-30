import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CompaniesService} from "../services/companies.service";
import {Observable, of} from "rxjs";
import {ICompany} from "../models/company";

const mockCompanies = [{logo: 'лого', domain: 'домен', name: 'Сбербанк'}];
const companiesServiceMock = {
  getCompanies(query: string): Observable<ICompany[]> {
    return of(mockCompanies)
  }
};

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
      ],
      providers: [{provide: CompaniesService, useValue: companiesServiceMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should load companies', fakeAsync(() => {
    expect(component.valueSubscription).not.toBeNull();

    component.updateCompanies('Сбер');
    tick();

    expect(component.companies)
      .withContext(`Expected list of companies`)
      .toBe(mockCompanies);

    expect(component.openedList)
      .withContext('Expected opened list')
      .toBe(true);
  }));

  it('Should close list on select', fakeAsync(() => {
    component.updateCompanies('Сбер');
    tick();
    fixture.detectChanges();

    spyOn(component, "selectCompany").and.callThrough();
    let options = document.querySelectorAll('.autocomplete-input__company') as NodeListOf<HTMLElement>;
    options[0].click();
    expect(component.selectCompany).toHaveBeenCalled();
    tick();
    fixture.detectChanges();

    expect(component.openedList)
      .withContext('Expected closed list')
      .toBe(false);

    expect(component.value)
      .withContext('Expected value change')
      .toBe('Сбербанк');
  }));
});
