import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';


@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  public result = true ;

  constructor(public bsModalRef: BsModalRef,
              public router: Router) {}

  public ngOnInit(): void {
  }

  public close(): void {
    this.bsModalRef.hide();
  }
  public decline(): void {
    this.bsModalRef.hide();
    this.router.navigate(['/login']);
  }
  public nextPage(): void {
    this.bsModalRef.hide();
    this.router.navigate(['/login']); // please insert the next url on this line
  }
}

