import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface Exercise {
  id: number;
  name: string;
  type: string;
  duration: number;
  calories: number;
  notes?: string;
  date?: Date;
}

interface ExerciseCategory {
  name: string;
  icon: string;
  type: string;
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ExercisePage implements OnInit {
  currentDate: Date = new Date();
  todaysExercises: Exercise[] = [
    {
      id: 1,
      name: 'Running',
      type: 'cardio',
      duration: 30,
      calories: 300,
      notes: 'Morning jog in the park',
      date: new Date()
    },
    {
      id: 2,
      name: 'Weight Training',
      type: 'strength',
      duration: 45,
      calories: 250,
      notes: 'Upper body workout',
      date: new Date()
    }
  ];

  recentExercises: Exercise[] = [
    {
      id: 3,
      name: 'Swimming',
      type: 'cardio',
      duration: 30,
      calories: 350
    },
    {
      id: 4,
      name: 'Yoga',
      type: 'flexibility',
      duration: 60,
      calories: 180
    },
    {
      id: 5,
      name: 'Cycling',
      type: 'cardio',
      duration: 45,
      calories: 400
    },
    {
      id: 6,
      name: 'Push-ups',
      type: 'strength',
      duration: 15,
      calories: 80
    }
  ];

  exerciseCategories: ExerciseCategory[] = [
    { name: 'Cardio', icon: 'heart-outline', type: 'cardio' },
    { name: 'Strength', icon: 'barbell-outline', type: 'strength' },
    { name: 'Flexibility', icon: 'body-outline', type: 'flexibility' },
    { name: 'Sports', icon: 'football-outline', type: 'sports' },
    { name: 'Walking', icon: 'walk-outline', type: 'walking' },
    { name: 'Other', icon: 'ellipsis-horizontal-outline', type: 'other' }
  ];

  // Calculated values
  totalCaloriesBurned: number = 0;
  totalMinutes: number = 0;
  exerciseCount: number = 0;
  weeklyCalories: number = 1850;
  weeklyMinutes: number = 320;
  workoutDays: number = 5;

  constructor(private router: Router) { }

  ngOnInit() {
    this.calculateTodaysSummary();
  }

  calculateTodaysSummary() {
    this.totalCaloriesBurned = this.todaysExercises.reduce((total, exercise) => total + exercise.calories, 0);
    this.totalMinutes = this.todaysExercises.reduce((total, exercise) => total + exercise.duration, 0);
    this.exerciseCount = this.todaysExercises.length;
  }

  previousDay() {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() - 1);
    this.currentDate = newDate;
    // In a real app, you would load exercises for this date
  }

  nextDay() {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + 1);
    this.currentDate = newDate;
    // In a real app, you would load exercises for this date
  }

  goToAddExercise() {
    this.router.navigate(['/add-exercise']);
  }

  editExercise(exercise: Exercise) {
    this.router.navigate(['/add-exercise'], { 
      queryParams: { 
        id: exercise.id,
        edit: true 
      } 
    });
  }

  deleteExercise(exercise: Exercise) {
    const index = this.todaysExercises.findIndex(e => e.id === exercise.id);
    if (index > -1) {
      this.todaysExercises.splice(index, 1);
      this.calculateTodaysSummary();
    }
  }

  addRecentExercise(exercise: Exercise) {
    this.router.navigate(['/add-exercise'], { 
      queryParams: { 
        name: exercise.name,
        type: exercise.type 
      } 
    });
  }

  browseCategory(category: ExerciseCategory) {
    this.router.navigate(['/add-exercise'], { 
      queryParams: { 
        category: category.type 
      } 
    });
  }

  getExerciseIcon(type: string): string {
    switch(type) {
      case 'cardio':
        return 'heart-outline';
      case 'strength':
        return 'barbell-outline';
      case 'flexibility':
        return 'body-outline';
      case 'sports':
        return 'football-outline';
      case 'walking':
        return 'walk-outline';
      default:
        return 'fitness-outline';
    }
  }
}