import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface ExerciseTemplate {
  id: number;
  name: string;
  type: string;
  caloriesPerMinute: number;
}

interface ExerciseCategory {
  name: string;
  icon: string;
  type: string;
}

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.page.html',
  styleUrls: ['./add-exercise.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AddExercisePage implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedExercise: ExerciseTemplate | null = null;
  duration: number = 0;
  calculatedCalories: number = 0;
  customCalories: number = 0;
  manualCalories: boolean = false;
  notes: string = '';
  selectedDate: string = new Date().toISOString();
  isEditing: boolean = false;
  editingId: number | null = null;

  // Custom exercise form
  showCustomForm: boolean = false;
  customExerciseName: string = '';
  customExerciseType: string = '';
  customCaloriesPerMinute: number = 0;

  durationPresets: number[] = [15, 30, 45, 60, 90];

  exerciseCategories: ExerciseCategory[] = [
    { name: 'Cardio', icon: 'heart-outline', type: 'cardio' },
    { name: 'Strength', icon: 'barbell-outline', type: 'strength' },
    { name: 'Flexibility', icon: 'body-outline', type: 'flexibility' },
    { name: 'Sports', icon: 'football-outline', type: 'sports' },
    { name: 'Walking', icon: 'walk-outline', type: 'walking' },
    { name: 'Other', icon: 'ellipsis-horizontal-outline', type: 'other' }
  ];

  allExercises: ExerciseTemplate[] = [
    // Cardio
    { id: 1, name: 'Running', type: 'cardio', caloriesPerMinute: 10 },
    { id: 2, name: 'Cycling', type: 'cardio', caloriesPerMinute: 8 },
    { id: 3, name: 'Swimming', type: 'cardio', caloriesPerMinute: 12 },
    { id: 4, name: 'Elliptical', type: 'cardio', caloriesPerMinute: 9 },
    { id: 5, name: 'Jump Rope', type: 'cardio', caloriesPerMinute: 11 },
    { id: 6, name: 'Rowing', type: 'cardio', caloriesPerMinute: 10 },
    
    // Strength
    { id: 7, name: 'Weight Training', type: 'strength', caloriesPerMinute: 6 },
    { id: 8, name: 'Push-ups', type: 'strength', caloriesPerMinute: 5 },
    { id: 9, name: 'Pull-ups', type: 'strength', caloriesPerMinute: 7 },
    { id: 10, name: 'Squats', type: 'strength', caloriesPerMinute: 5 },
    { id: 11, name: 'Deadlifts', type: 'strength', caloriesPerMinute: 6 },
    { id: 12, name: 'Bench Press', type: 'strength', caloriesPerMinute: 6 },
    
    // Flexibility
    { id: 13, name: 'Yoga', type: 'flexibility', caloriesPerMinute: 3 },
    { id: 14, name: 'Pilates', type: 'flexibility', caloriesPerMinute: 4 },
    { id: 15, name: 'Stretching', type: 'flexibility', caloriesPerMinute: 2 },
    
    // Sports
    { id: 16, name: 'Basketball', type: 'sports', caloriesPerMinute: 8 },
    { id: 17, name: 'Tennis', type: 'sports', caloriesPerMinute: 7 },
    { id: 18, name: 'Soccer', type: 'sports', caloriesPerMinute: 9 },
    { id: 19, name: 'Golf', type: 'sports', caloriesPerMinute: 4 },
    
    // Walking
    { id: 20, name: 'Walking', type: 'walking', caloriesPerMinute: 4 },
    { id: 21, name: 'Hiking', type: 'walking', caloriesPerMinute: 6 },
    { id: 22, name: 'Treadmill Walking', type: 'walking', caloriesPerMinute: 5 }
  ];

  filteredExercises: ExerciseTemplate[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.filteredExercises = this.allExercises;
    
    // Check for query parameters
    this.route.queryParams.subscribe(params => {
      if (params['edit']) {
        this.isEditing = true;
        this.editingId = params['id'];
        // Load exercise data for editing
      }
      
      if (params['name']) {
        this.searchTerm = params['name'];
        this.onSearchChange();
      }
      
      if (params['category']) {
        this.selectCategory(params['category']);
      }
    });
  }

  onSearchChange() {
    if (this.searchTerm.trim() === '') {
      this.filteredExercises = this.selectedCategory 
        ? this.allExercises.filter(exercise => exercise.type === this.selectedCategory)
        : this.allExercises;
    } else {
      this.filteredExercises = this.allExercises.filter(exercise =>
        exercise.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedCategory === '' || exercise.type === this.selectedCategory)
      );
    }
  }

  selectCategory(categoryType: string) {
    this.selectedCategory = this.selectedCategory === categoryType ? '' : categoryType;
    this.onSearchChange();
  }

  selectExercise(exercise: ExerciseTemplate) {
    this.selectedExercise = exercise;
    this.duration = 30; // Default duration
    this.calculateCalories();
  }

  goBackToSearch() {
    this.selectedExercise = null;
    this.showCustomForm = false;
  }

  setDuration(minutes: number) {
    this.duration = minutes;
    this.calculateCalories();
  }

  calculateCalories() {
    if (this.selectedExercise && this.duration > 0) {
      this.calculatedCalories = Math.round(this.selectedExercise.caloriesPerMinute * this.duration);
    } else {
      this.calculatedCalories = 0;
    }
  }

  onManualToggle() {
    if (!this.manualCalories) {
      this.calculateCalories();
    } else {
      this.customCalories = this.calculatedCalories;
    }
  }

  createCustomExercise() {
    this.showCustomForm = true;
    this.selectedExercise = null;
  }

  saveCustomExercise() {
    if (this.isCustomFormValid()) {
      const newExercise: ExerciseTemplate = {
        id: Date.now(),
        name: this.customExerciseName,
        type: this.customExerciseType,
        caloriesPerMinute: this.customCaloriesPerMinute
      };
      
      this.allExercises.push(newExercise);
      this.selectExercise(newExercise);
      this.showCustomForm = false;
      
      // Reset custom form
      this.customExerciseName = '';
      this.customExerciseType = '';
      this.customCaloriesPerMinute = 0;
    }
  }

  isCustomFormValid(): boolean {
    return this.customExerciseName.trim() !== '' && 
           this.customExerciseType !== '' && 
           this.customCaloriesPerMinute > 0;
  }

  isFormValid(): boolean {
    return this.selectedExercise !== null && this.duration > 0;
  }

  saveExercise() {
    if (this.isFormValid()) {
      const finalCalories = this.manualCalories ? this.customCalories : this.calculatedCalories;
      
      const exerciseData = {
        id: this.isEditing ? this.editingId : Date.now(),
        name: this.selectedExercise!.name,
        type: this.selectedExercise!.type,
        duration: this.duration,
        calories: finalCalories,
        notes: this.notes,
        date: new Date(this.selectedDate)
      };
      
      // In a real app, you would save this to your data service
      console.log('Saving exercise:', exerciseData);
      
      this.router.navigate(['/exercise']);
    }
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