import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [MatCardModule],
  template: `
    <mat-card align="center">
      <mat-card-title style="margin: 2rem">
        <div>Case Study</div>
        <div style="font-size: small">v1.0</div>
      </mat-card-title>
      <mat-card-footer align="end">
        <span style="padding-right: 1em">&copy;INFO 5153 - 2025</span>
      </mat-card-footer>
    </mat-card>
  `,
  styles: ``
})
export class Home {

}