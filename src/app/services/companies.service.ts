import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ICompany} from "../models/company";

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  constructor(public http: HttpClient) {}

  getCompanies(query: string): Observable<ICompany[]> {
    return this.http.get<ICompany[]>('https://autocomplete.clearbit.com/v1/companies/suggest', { params: { query } });
  }
}
