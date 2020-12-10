import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  articles: any;
  year_data: any;
  form: FormGroup;
  isLoading: Boolean = false;
  filters = [
    {
      name: 'launch_year',
      displayName: "Launch Year",
      value: []
    },
    {
      name: 'launch_success',
      displayName: "Successful Launch",
      value: ['true', 'false']
    },
    {
      name: 'land_success',
      displayName: "Successful Landing",
      value: ['true', 'false']
    }
  ];
  filterQuery = { "launch_year": null, "launch_success": null, "land_success": null };

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.form = fb.group({});
    this.filters.forEach(question => {
      this.form.addControl(question.name, fb.control(null, Validators.required));
    })
  }
  ngOnInit(): void {
    this.getApiData();
    this.form.valueChanges.subscribe(() => {
      this.isLoading = true;
      let myObj = this.form.value;
      Object.keys(myObj).forEach((key) => (myObj[key] == null) && delete myObj[key]);
      this.dataService.getData(myObj).subscribe((data) => {
        this.isLoading = false;
        this.articles = data;
      });
    });
  }

  getApiData() {
    this.isLoading = true;
    this.dataService.getData(null).subscribe((data) => {
      this.isLoading = false;
      this.articles = data;
      this.year_data = [...new Set(this.articles.map(item => item.launch_year))];
      this.filters[0].value = this.year_data;
    });
  }
  onClear() {
    this.form.reset();
  }

}
