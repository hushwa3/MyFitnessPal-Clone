# MyFitnessPal Clone - Ionic Angular

A comprehensive fitness and nutrition tracking application built with Ionic Angular, featuring calorie counting, meal planning, and exercise tracking capabilities.

## 📱 Overview

This MyFitnessPal clone provides users with a complete fitness tracking experience, including daily calorie monitoring, macronutrient tracking, meal logging, and exercise recording. The app features an intuitive interface with seamless navigation between key functionalities.

## 🚀 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (Latest LTS version recommended)
- **Angular CLI** (Latest version)
- **npm** or **yarn** package manager

## 🛠️ Installation & Setup

### 1. Install Global Dependencies

Open your terminal/command prompt and run the following commands:

```bash
# Install Ionic CLI globally
npm install -g @ionic/cli

# Install Capacitor CLI and Core globally
npm install -g @capacitor/core @capacitor/cli
```

### 2. Install Project Dependencies

Navigate to your project directory and install the required dependencies:

```bash
# Install Ionic Storage for data persistence
npm install @ionic/storage-angular

# Install all other project dependencies
npm install
```

### 3. Build and Run the Application

```bash
# Build the project
ionic build

# Serve the application locally
ionic serve
```

The application will be available at `http://localhost:8100` by default.

## ✅ Key Features Implemented

### 🏠 Home Page (Dashboard)
- **Daily Calorie Summary**: Visual breakdown of goal vs. consumed vs. burned calories
- **Macronutrient Progress**: Interactive progress bars for proteins, carbs, and fats
- **Recent Entries**: Quick view of latest food and exercise entries
- **Quick Actions**: Fast access buttons for common tasks
- **Navigation Grid**: Easy access to all app sections

### 📖 Food Diary Page
- **Date Navigation**: Browse through different days with intuitive date picker
- **Calorie Summary Card**: Real-time calorie tracking with visual indicators
- **Meal Organization**: Structured sections for:
  - 🌅 Breakfast
  - 🌞 Lunch  
  - 🌙 Dinner
  - 🍎 Snacks
- **Exercise Integration**: Track workouts and calories burned
- **Entry Management**: Edit and add buttons for seamless food/exercise logging

### 🎯 Navigation Flow

The app follows an intuitive navigation structure:

```
🏠 Home (Dashboard)
├── 📖 Diary → 🔍 Food Search → 📋 Food Details
├── 🏃 Exercise → ➕ Add Exercise
└── ⚙️ More → 👤 Profile / 🎯 Goals / 📊 Progress
```

## 📁 Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── home/
│   │   ├── diary/
│   │   ├── food-search/
│   │   ├── food-details/
│   │   ├── exercise/
│   │   └── profile/
│   ├── services/
│   ├── components/
│   └── models/
├── assets/
└── theme/
```

## 🔧 Development Commands

```bash
# Start development server
ionic serve

# Build for production
ionic build --prod

# Run tests
npm test

# Lint code
ionic lint

# Generate new page
ionic generate page page-name

# Generate new service
ionic generate service service-name
```

## 📱 Platform Support

This application supports:
- **Web Browser** (Development & Production)
- **iOS** (via Capacitor)
- **Android** (via Capacitor)

### Building for Mobile

```bash
# Add iOS platform
ionic capacitor add ios

# Add Android platform
ionic capacitor add android

# Build and sync
ionic capacitor build ios
ionic capacitor build android
```

## 🎨 UI/UX Features

- **Responsive Design**: Optimized for all device sizes
- **Material Design**: Following Google's Material Design principles
- **Dark/Light Theme**: Automatic theme switching support
- **Smooth Animations**: Enhanced user experience with Ionic animations
- **Touch Gestures**: Native mobile gestures support

## 🔐 Data Management

- **Local Storage**: Persistent data storage using Ionic Storage
- **Real-time Updates**: Immediate UI updates on data changes
- **Data Validation**: Form validation and error handling
- **Backup Ready**: Architecture supports cloud sync integration

## 🚀 Performance Optimizations

- **Lazy Loading**: Pages loaded on-demand for faster initial load
- **Optimized Images**: Compressed assets for better performance
- **Minimal Bundle Size**: Tree-shaking and dead code elimination
- **Progressive Web App**: PWA capabilities for web deployment

## 🐛 Troubleshooting

### Common Issues:

1. **Ionic CLI not found**
   ```bash
   npm install -g @ionic/cli
   ```

2. **Capacitor build errors**
   ```bash
   npm install -g @capacitor/core @capacitor/cli
   ionic capacitor sync
   ```

3. **Storage issues**
   ```bash
   npm install @ionic/storage-angular
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the [Ionic Documentation](https://ionicframework.com/docs)
- Visit [Angular Documentation](https://angular.io/docs)

---

**Happy Coding and Stay Fit 💪🍎📱**
