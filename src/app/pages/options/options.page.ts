import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  private _darkModeToggleModel;

  set darkModeToggleModel(model) {
    this._darkModeToggleModel = model;
  }

  constructor() { }

  ngOnInit() {
    // console.log(localStorage.getItem("darkMode"));
    
    if (localStorage.getItem("darkMode") == "1") {
      this.darkModeToggleModel = true; 
    }
  }

  // Listen for the toggle check/uncheck to toggle the dark class on the <body>
  public darkModeToggleOnChange() {
    document.body.classList.toggle('dark', this._darkModeToggleModel);
    localStorage.setItem("darkMode", this._darkModeToggleModel ? "1" : "0")
  }
  
  
}
