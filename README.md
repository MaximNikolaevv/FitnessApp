# FitnessApp

FitnessApp is a cross-platform fitness and nutrition app built with React Native and Expo. Users can browse workouts, view exercises and video demonstrations, track nutrition, and create their own workout and diet entries.

![FitnessApp Home](https://raw.githubusercontent.com/MaximNikolaevv/FitnessApp/main/img/HomePage.jpg)

## Features

- Sign up and log in with Supabase
- Browse workouts and view their details
- View exercises with sets, reps, descriptions, and YouTube demonstrations
- Create workouts and add exercises to them
- Browse meals and their calorie and macronutrient information
- Create diet entries with calories, protein, carbohydrates, and fat
- Edit and delete entries owned by the signed-in user
- Continue as a guest to browse workouts and meals
- Pull-to-refresh lists
- Run on Android, iOS, and web

## How It Works

The app starts in `src/index.jsx`. It wraps the application in an authentication provider and a React Navigation container.

`src/context/context.jsx` listens for Supabase authentication changes and provides the current user and guest status to the screens. `src/navigation/RootNavigator.jsx` selects the app’s initial screen, while `src/navigation/MainTabs.jsx` provides the Workout, Create, Diet, and Profile tabs.

Supabase provides authentication and the app’s data API. The configuration in `src/backend/api.js` creates the Supabase client and Axios clients, and adds the current access token to data requests. Workout, exercise, and diet operations are organized in `src/backend/`.

Guests can browse workouts and meals. Creating content and accessing the Profile tab require an account.

## Project Structure

```text
src/
├── backend/
│   ├── api.js               Supabase and Axios configuration
│   ├── auth/auth.js         Authentication operations
│   ├── workout.js/          Workout operations
│   ├── exercise.api.js      Exercise operations
│   └── diet/diet.js         Diet operations
├── components/
│   ├── EditSheet.jsx        Shared edit form
│   ├── FormField.jsx        Reusable form input
│   ├── GuestAccessModal.jsx Guest access prompt
│   ├── ItemActions.jsx      Edit and delete controls
│   └── SignOutModal.jsx     Sign-out confirmation
├── context/
│   └── context.jsx          Authentication state
├── navigation/
│   ├── RootNavigator.jsx    Root navigation
│   └── MainTabs.jsx         Main app tabs
└── screens/
    ├── HomeScreen.jsx
    ├── Loginscreen.jsx
    ├── Registerscreen.jsx
    ├── WorkoutScreen.jsx
    ├── workoutDetails.jsx
    ├── CreateScreen.jsx
    ├── CreateWorkoutScreen.jsx
    ├── CreateExercises.jsx
    ├── DietScreen.jsx
    ├── CreateDietScreen.jsx
    └── ProfileScreen.jsx
assets/                       App icons and splash images
img/                          App background and screen images
```

## Tech Stack

- Expo SDK 58
- React Native 0.88 and React 19
- React Navigation 7
- Supabase Auth and REST API
- Axios
- AsyncStorage
- Expo Image and Expo Linear Gradient
- React Native YouTube iframe
- Expo Vector Icons
- Oswald and Open Sans fonts

## Getting Started

### Requirements

- Node.js 22.13 or later
- npm
- Expo Go or an Android/iOS simulator
- A Supabase project

### 1. Clone the repository

```bash
git clone https://github.com/MaximNikolaevv/FitnessApp.git
cd FitnessApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

Create a `.env` file in the project root and add your Supabase project URL and publishable key:

```env
EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

The app reads these variables in `src/backend/api.js`. They are required for authentication and data access.

The screens expect Supabase data for workouts, exercises, and diet entries. Fields used by the app include:

- **Workouts:** `name`, `description`, `type`, `duration`, `image_URL`, `user_id`
- **Exercises:** `name`, `sets`, `reps`, `description`, `exerciseVideoLink`, `workout_id`, `user_id`
- **Diet entries:** `food`, `calories`, `protein`, `carbs`, `fat`, `img`, `user_id`

### 4. Start the app

```bash
npx expo start --tunnel
```

Then scan the QR code with Expo Go, or open the app in a simulator.

## Screens

| Screen | Purpose |
|---|---|
| Home | Introduction and links to registration or login |
| Register | Create an account or continue as a guest |
| Login | Sign in to an existing account |
| Workout | Browse workouts |
| Workout Details | View workout information, exercises, and video demonstrations |
| Create | Choose whether to create a workout or diet entry |
| Create Workout | Enter workout details |
| Create Exercises | Add exercises to a workout |
| Diet | Browse meals and nutrition information |
| Create Diet | Add a meal and its nutrition values |
| Profile | Sign out |
