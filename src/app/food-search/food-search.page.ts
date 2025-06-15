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
}

interface Category {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.page.html',
  styleUrls: ['./food-search.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FoodSearchPage implements OnInit {
  searchTerm: string = '';
  selectedMeal: string = 'breakfast';
  filteredFoods: Food[] = [];

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
      protein: 1.3
    },
    {
      id: 2,
      name: 'Greek Yogurt',
      brand: 'Chobani',
      calories: 130,
      serving: '1 container (170g)',
      carbs: 6,
      fat: 0,
      protein: 23
    },
    {
      id: 3,
      name: 'Chicken Breast',
      brand: 'Generic',
      calories: 165,
      serving: '100g',
      carbs: 0,
      fat: 3.6,
      protein: 31
    },
    {
      id: 4,
      name: 'Brown Rice',
      brand: 'Uncle Ben\'s',
      calories: 216,
      serving: '1 cup cooked',
      carbs: 45,
      fat: 1.8,
      protein: 5
    },
    {
      id: 5,
      name: 'Almonds',
      brand: 'Generic',
      calories: 161,
      serving: '1 oz (28g)',
      carbs: 6,
      fat: 14,
      protein: 6
    },
    {
      id: 6,
      name: 'Apple',
      brand: 'Generic',
      calories: 95,
      serving: '1 medium',
      carbs: 25,
      fat: 0.3,
      protein: 0.5
    },
    {
      id: 7,
      name: 'Oatmeal',
      brand: 'Quaker',
      calories: 150,
      serving: '1 packet',
      carbs: 27,
      fat: 3,
      protein: 5
    },
    {
      id: 8,
      name: 'Salmon',
      brand: 'Generic',
      calories: 208,
      serving: '100g',
      carbs: 0,
      fat: 12,
      protein: 25
    },
    {
      id: 9,
      name: 'Eggs',
      brand: 'Generic',
      calories: 155,
      serving: '2 large',
      carbs: 1.1,
      fat: 11,
      protein: 13
    },
    {
      id: 10,
      name: 'Avocado',
      brand: 'Generic',
      calories: 234,
      serving: '1 medium',
      carbs: 12,
      fat: 21,
      protein: 3
    }
  ];

  recentFoods: Food[] = [
    {
      id: 1,
      name: 'Banana',
      brand: 'Generic',
      calories: 105,
      serving: '1 medium',
      carbs: 27,
      fat: 0.3,
      protein: 1.3
    },
    {
      id: 2,
      name: 'Greek Yogurt',
      brand: 'Chobani',
      calories: 130,
      serving: '1 container',
      carbs: 6,
      fat: 0,
      protein: 23
    },
    {
      id: 3,
      name: 'Chicken Breast',
      brand: 'Generic',
      calories: 165,
      serving: '100g',
      carbs: 0,
      fat: 3.6,
      protein: 31
    }
  ];

  frequentFoods: Food[] = [
    {
      id: 7,
      name: 'Oatmeal',
      brand: 'Quaker',
      calories: 150,
      serving: '1 packet',
      carbs: 27,
      fat: 3,
      protein: 5
    },
    {
      id: 9,
      name: 'Eggs',
      brand: 'Generic',
      calories: 155,
      serving: '2 large',
      carbs: 1.1,
      fat: 11,
      protein: 13
    },
    {
      id: 6,
      name: 'Apple',
      brand: 'Generic',
      calories: 95,
      serving: '1 medium',
      carbs: 25,
      fat: 0.3,
      protein: 0.5
    }
  ];

  categories: Category[] = [
    { name: 'Fruits', icon: 'nutrition-outline' },
    { name: 'Vegetables', icon: 'leaf-outline' },
    { name: 'Proteins', icon: 'fitness-outline' },
    { name: 'Grains', icon: 'grain-outline' },
    { name: 'Dairy', icon: 'wine-outline' },
    { name: 'Snacks', icon: 'fast-food-outline' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get meal parameter from route
    this.route.queryParams.subscribe(params => {
      if (params['meal']) {
        this.selectedMeal = params['meal'];
      }
    });
  }

  onSearchInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchTerm = query;
    
    if (query.trim() === '') {
      this.filteredFoods = [];
      return;
    }

    this.filteredFoods = this.foods.filter(food => 
      food.name.toLowerCase().includes(query) || 
      food.brand.toLowerCase().includes(query)
    );
  }

  onMealChange(event: any) {
    this.selectedMeal = event.detail.value;
  }

  selectFood(food: Food) {
    this.router.navigate(['/food-details'], { 
      queryParams: { 
        foodId: food.id, 
        meal: this.selectedMeal 
      } 
    });
  }

  quickAddCalories() {
    // Implementation for quick add calories
    console.log('Quick add calories');
  }

  scanBarcode() {
    // Implementation for barcode scanning
    console.log('Scan barcode');
  }

  createRecipe() {
    // Implementation for recipe creation
    console.log('Create recipe');
  }

  createCustomFood() {
    // Implementation for custom food creation
    console.log('Create custom food');
  }

  selectCategory(category: Category) {
    this.searchTerm = category.name.toLowerCase();
    this.onSearchInput({ target: { value: this.searchTerm } });
  }
}
