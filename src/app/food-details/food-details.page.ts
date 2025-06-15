import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface Food {
  id: number;
  name: string;
  brand: string;
  calories: number;
  serving: string;
  carbs: number;
  fat: number;
  protein: number;
  sodium?: number;
  sugar?: number;
  fiber?: number;
  cholesterol?: number;
}

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.page.html',
  styleUrls: ['./food-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FoodDetailsPage implements OnInit {
  selectedFood: Food | null = null;
  selectedMeal: string = 'breakfast';
  servings: number = 1;
  notes: string = '';
  isFavorite: boolean = false;

  // Calculated nutrition values
  calculatedCalories: number = 0;
  calculatedCarbs: number = 0;
  calculatedFat: number = 0;
  calculatedProtein: number = 0;
  calculatedSodium: number = 0;
  calculatedSugar: number = 0;
  calculatedFiber: number = 0;
  calculatedCholesterol: number = 0;

  // Sample food database
  foods: Food[] = [
    {
      id: 1,
      name: 'Banana',
      brand: 'Generic',
      calories: 105,
      serving: '1 medium',
      carbs: 27,
      fat: 0.3,
      protein: 1.3,
      sodium: 1,
      sugar: 14,
      fiber: 3,
      cholesterol: 0
    },
    {
      id: 2,
      name: 'Greek Yogurt',
      brand: 'Chobani',
      calories: 130,
      serving: '1 container (170g)',
      carbs: 6,
      fat: 0,
      protein: 23,
      sodium: 65,
      sugar: 6,
      fiber: 0,
      cholesterol: 10
    },
    {
      id: 3,
      name: 'Chicken Breast',
      brand: 'Generic',
      calories: 165,
      serving: '100g',
      carbs: 0,
      fat: 3.6,
      protein: 31,
      sodium: 74,
      sugar: 0,
      fiber: 0,
      cholesterol: 85
    },
    {
      id: 4,
      name: 'Brown Rice',
      brand: 'Uncle Ben\'s',
      calories: 216,
      serving: '1 cup cooked',
      carbs: 45,
      fat: 1.8,
      protein: 5,
      sodium: 10,
      sugar: 0.7,
      fiber: 4,
      cholesterol: 0
    },
    {
      id: 5,
      name: 'Almonds',
      brand: 'Generic',
      calories: 161,
      serving: '1 oz (28g)',
      carbs: 6,
      fat: 14,
      protein: 6,
      sodium: 0,
      sugar: 1,
      fiber: 4,
      cholesterol: 0
    },
    {
      id: 6,
      name: 'Apple',
      brand: 'Generic',
      calories: 95,
      serving: '1 medium',
      carbs: 25,
      fat: 0.3,
      protein: 0.5,
      sodium: 2,
      sugar: 19,
      fiber: 4,
      cholesterol: 0
    },
    {
      id: 7,
      name: 'Oatmeal',
      brand: 'Quaker',
      calories: 150,
      serving: '1 packet',
      carbs: 27,
      fat: 3,
      protein: 5,
      sodium: 160,
      sugar: 1,
      fiber: 4,
      cholesterol: 0
    },
    {
      id: 8,
      name: 'Salmon',
      brand: 'Generic',
      calories: 208,
      serving: '100g',
      carbs: 0,
      fat: 12,
      protein: 25,
      sodium: 59,
      sugar: 0,
      fiber: 0,
      cholesterol: 70
    },
    {
      id: 9,
      name: 'Eggs',
      brand: 'Generic',
      calories: 155,
      serving: '2 large',
      carbs: 1.1,
      fat: 11,
      protein: 13,
      sodium: 124,
      sugar: 1,
      fiber: 0,
      cholesterol: 372
    },
    {
      id: 10,
      name: 'Avocado',
      brand: 'Generic',
      calories: 234,
      serving: '1 medium',
      carbs: 12,
      fat: 21,
      protein: 3,
      sodium: 11,
      sugar: 1,
      fiber: 10,
      cholesterol: 0
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['foodId']) {
        const foodId = parseInt(params['foodId']);
        this.selectedFood = this.foods.find(food => food.id === foodId) || null;
        this.updateNutrition();
      }
      if (params['meal']) {
        this.selectedMeal = params['meal'];
      }
    });
  }

  updateNutrition() {
    if (this.selectedFood) {
      this.calculatedCalories = Math.round(this.selectedFood.calories * this.servings);
      this.calculatedCarbs = Math.round((this.selectedFood.carbs * this.servings) * 10) / 10;
      this.calculatedFat = Math.round((this.selectedFood.fat * this.servings) * 10) / 10;
      this.calculatedProtein = Math.round((this.selectedFood.protein * this.servings) * 10) / 10;
      this.calculatedSodium = Math.round((this.selectedFood.sodium || 0) * this.servings);
      this.calculatedSugar = Math.round((this.selectedFood.sugar || 0) * this.servings * 10) / 10;
      this.calculatedFiber = Math.round((this.selectedFood.fiber || 0) * this.servings * 10) / 10;
      this.calculatedCholesterol = Math.round((this.selectedFood.cholesterol || 0) * this.servings);
    }
  }

  onMealChange(event: any) {
    this.selectedMeal = event.detail.value;
  }

  addToMeal() {
    if (this.selectedFood && this.servings > 0) {
      // Here you would typically save to a service or storage
      console.log('Adding to meal:', {
        food: this.selectedFood,
        meal: this.selectedMeal,
        servings: this.servings,
        notes: this.notes,
        calculatedNutrition: {
          calories: this.calculatedCalories,
          carbs: this.calculatedCarbs,
          fat: this.calculatedFat,
          protein: this.calculatedProtein
        }
      });
      
      // Navigate back to diary
      this.router.navigate(['/diary']);
    }
  }

  addToFavorites() {
    this.isFavorite = true;
    console.log('Added to favorites:', this.selectedFood);
  }

  removeFromFavorites() {
    this.isFavorite = false;
    console.log('Removed from favorites:', this.selectedFood);
  }

  saveToFavorites() {
    this.addToFavorites();
  }
}