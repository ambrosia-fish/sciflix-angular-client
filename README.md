# Sci-Flix Angular Frontend

A modern Angular application providing users with an interactive interface for exploring science fiction movies.

## Overview

The Sci-Flix Angular Frontend is a responsive single-page application built with Angular 18, designed to showcase sci-fi movies and provide a rich user experience. This application connects to the [Sci-Flix Movie API](https://github.com/ambrosia-fish/sci-flix) for retrieving movie data, user authentication, and managing user interactions.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Technologies Used](#technologies-used)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)

## Features

- **Material Design UI**: Modern and responsive interface using Angular Material
- **Interactive Movie Browsing**: Dynamic filtering and searching capabilities
- **User Authentication**: Complete login and registration system
- **User Profile Management**: Update personal information and preferences
- **Favorites Management**: Add, view, and remove favorite movies
- **Detailed Movie Information**: View comprehensive data about each movie
- **Director & Genre Views**: Dedicated pages for directors and genres
- **Responsive Design**: Optimized for all device sizes and orientations

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ambrosia-fish/sciflix-angular-client.git
   cd sciflix-angular-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to http://localhost:4200 to view the application.

## Usage

The Sci-Flix Angular Frontend allows users to:
- Browse a list of sci-fi movies with filtering options
- Search for movies by title, director, or genre
- View detailed information about each movie
- Create an account and manage their profile
- Save favorite movies for quick access
- Explore movies by director or genre

## Project Structure

```
sciflix-angular-client/
├── src/
│   ├── app/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Main application pages
│   │   ├── services/         # Data services and API connections
│   │   ├── models/           # TypeScript interfaces
│   │   ├── guards/           # Route guards for authentication
│   │   ├── shared/           # Shared utilities and components
│   │   ├── app.module.ts     # Main application module
│   │   └── app-routing.module.ts  # Application routing
│   ├── assets/               # Static assets and images
│   ├── environments/         # Environment configuration
│   └── theme/                # Global styles and theming
├── angular.json              # Angular configuration
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## API Integration

This application integrates with the [Sci-Flix Movie API](https://github.com/ambrosia-fish/sci-flix) to:
- Fetch movie data and metadata
- Handle user registration and authentication
- Manage user profiles and favorites
- Process search and filtering requests

The API connection is configured to work with both development and production environments.

## Technologies Used

- **Angular 18**: Core framework for building the application
- **Angular Material**: UI component library implementing Material Design
- **RxJS**: Reactive programming library for asynchronous operations
- **TypeScript**: Type-safe programming language
- **Angular Router**: For navigation and routing
- **HttpClient**: For API communication
- **Angular SSR**: Server-side rendering for improved performance
- **Express**: Lightweight server for SSR implementation

## Development

This project uses the Angular CLI for development. Here are some useful commands:

- `ng serve`: Start the development server
- `ng build`: Build the application for production
- `ng test`: Run unit tests
- `ng lint`: Run linting checks
- `ng generate component <name>`: Generate a new component

## Deployment

The application is configured for deployment to GitHub Pages using the Angular CLI:

```bash
npm run build
npm run deploy
```

The deployed application can be accessed at: https://ambrosia-fish.github.io/sciflix-angular-client/

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Related Projects

- [Sci-Flix API](https://github.com/ambrosia-fish/sci-flix) - Backend API for this application
- [Sci-Flix React Client](https://github.com/ambrosia-fish/sci-flix-client) - React implementation of this client
