import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  memberSince: Date;
  currentWeight: number;
  goalWeight: number;
  height: string;
  age: number;
  weightUnit: string;
  heightUnit: string;
  dateOfBirth: Date;
  gender: string;
  activityLevel: string;
  goalType: string;
  dailyCalorieGoal: number;
  weeklyGoal: number;
  notifications: boolean;
  privacy: string;
}

interface Achievement {
  id: number;
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ProfilePage implements OnInit {
  userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: '',
    memberSince: new Date('2023-01-15'),
    currentWeight: 180,
    goalWeight: 165,
    height: '5\'10"',
    age: 28,
    weightUnit: 'lbs',
    heightUnit: 'ft',
    dateOfBirth: new Date('1995-03-20'),
    gender: 'male',
    activityLevel: 'moderately_active',
    goalType: 'Lose Weight',
    dailyCalorieGoal: 1500,
    weeklyGoal: 1,
    notifications: true,
    privacy: 'private'
  };

  achievements: Achievement[] = [
    {
      id: 1,
      name: 'First Week',
      icon: 'trophy-outline',
      unlocked: true,
      description: 'Complete your first week of logging'
    },
    {
      id: 2,
      name: 'Streak Master',
      icon: 'flame-outline',
      unlocked: true,
      description: 'Log food for 7 days in a row'
    },
    {
      id: 3,
      name: 'Goal Achiever',
      icon: 'medal-outline',
      unlocked: false,
      description: 'Reach your weight goal'
    },
    {
      id: 4,
      name: 'Exercise Enthusiast',
      icon: 'fitness-outline',
      unlocked: true,
      description: 'Log 10 workouts'
    },
    {
      id: 5,
      name: 'Calorie Counter',
      icon: 'calculator-outline',
      unlocked: false,
      description: 'Log 1000 food items'
    },
    {
      id: 6,
      name: 'Water Champion',
      icon: 'water-outline',
      unlocked: false,
      description: 'Meet water goal for 30 days'
    }
  ];

  Math = Math; // Make Math available in template

  constructor(
    private router: Router,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // In a real app, load from storage or API
    console.log('Loading user profile...');
  }

  getActivityLevelLabel(level: string): string {
    switch(level) {
      case 'sedentary':
        return 'Sedentary (little/no exercise)';
      case 'lightly_active':
        return 'Lightly Active (light exercise 1-3 days/week)';
      case 'moderately_active':
        return 'Moderately Active (moderate exercise 3-5 days/week)';
      case 'very_active':
        return 'Very Active (hard exercise 6-7 days/week)';
      case 'extremely_active':
        return 'Extremely Active (very hard exercise, physical job)';
      default:
        return 'Not specified';
    }
  }

  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Edit Profile',
      message: 'Profile editing feature coming soon!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async changeAvatar() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Change Profile Picture',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera-outline',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Choose from Gallery',
          icon: 'images-outline',
          handler: () => {
            this.chooseFromGallery();
          }
        },
        {
          text: 'Remove Photo',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.removePhoto();
          }
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  takePhoto() {
    // Implement camera functionality
    console.log('Taking photo...');
  }

  chooseFromGallery() {
    // Implement gallery selection
    console.log('Choosing from gallery...');
  }

  removePhoto() {
    this.userProfile.avatar = '';
  }

  goToGoals() {
    this.router.navigate(['/goals']);
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      message: 'Password change feature coming soon!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async exportData() {
    const alert = await this.alertController.create({
      header: 'Export Data',
      message: 'Your data will be exported as a CSV file. This feature is coming soon!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Delete Account',
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.confirmDeleteAccount();
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmDeleteAccount() {
    const alert = await this.alertController.create({
      header: 'Account Deleted',
      message: 'Account deletion feature coming soon!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.performLogout();
          }
        }
      ]
    });
    await alert.present();
  }

  performLogout() {
    // Clear user data and navigate to login
    this.router.navigate(['/login']);
  }
}