import {TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AutocompleteComponent} from "./autocomplete/autocomplete.component";
import {HttpClientModule} from "@angular/common/http";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, AutocompleteComponent
      ],
      imports: [HttpClientModule,]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
