import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../common/services/data.service";

@Component({
  selector: 'app-tan-selection',
  templateUrl: './sca-selection.component.html',
  styleUrls: ['./sca-selection.component.scss']
})
export class ScaSelectionComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentScaMethods.subscribe(result => {
      console.log(result)
    });
  }

  onCancel() {

  }

  onNext() {

  }

}
