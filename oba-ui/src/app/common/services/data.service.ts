import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private scaMethods = new BehaviorSubject(null);
  currentScaMethods = this.scaMethods.asObservable();

  constructor() { }

  setScaMethods(scaMethods: string) {
    this.scaMethods.next(scaMethods)
  }

}
