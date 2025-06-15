import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomePage {

  constructor(private router: Router) { }

  getCurrentDate(): string {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  goToDiary() {
    this.router.navigate(['/diary']);
  }

  goToFoodSearch() {
    this.router.navigate(['/food-search']);
  }

  goToExercise() {
    this.router.navigate(['/exercise']);
  }

  goToProgress() {
    this.router.navigate(['/progress']);
  }

  goToGoals() {
    this.router.navigate(['/goals']);
  }

  goToMore() {
    this.router.navigate(['/more']);
  }
}
