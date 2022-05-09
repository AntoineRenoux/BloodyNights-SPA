import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './rituals.component.html',
  styleUrls: ['./rituals.component.scss']
})
export class RitualsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("RitualsComponent loaded");
  }

}
