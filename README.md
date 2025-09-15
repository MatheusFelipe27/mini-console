# Mini Console Seller - Frontend Challenge

This project is a technical challenge for **Mini Console Seller**, focusing on **clean code**, **modern feature implementation**, and **best practices** using **React 19 with Vite** and **TypeScript**.

The system includes features like **dynamic modals for managing leads and opportunities**, **form validation**, **data fetching with caching**, smooth animations, and a clean architecture following industry best practices.

---

## Technologies Used

- **React 19 + Vite** → Main framework and bundler for fast development and optimized builds.
- **TypeScript** → Static typing for better safety, readability, and maintainability.
- **Tailwind CSS** → Fast, responsive, and consistent styling.
- **Zod** → Type-safe form validation and schema enforcement.
- **React Hook Form** → Efficient form handling and validation.
- **React Query** → State management for asynchronous data, caching, and local state updates.
- **Framer Motion** → Smooth animations for UI transitions and modals.
- **React Icons** → Iconography for interface elements.
- **JSON Data Simulation** → Simulated API responses for development.
- **ESLint & Prettier** → Code quality, formatting, and consistency.
- **GitFlow** → Branching and commit organization following best practices.

---

## Best Practices Applied

- **Componentization** → Reusable UI components for maintainability.
- **Separation of Concerns** → Organized code structure for easier navigation.
- **Type-safe validation with Zod** → Ensures forms are validated correctly before submission.
- **React Query caching** → Local state synchronization after mutations.
- **Clean commit and branch practices** → Organized version control.
- **Pagination for data** → Leads and opportunities are paginated for smoother browsing experience.

---

## Features

### Lead Management
- **Lead Details Modal**
  - View detailed lead information in a slide-over modal.
  - Edit lead email and status with validation.
  - Updates reflected immediately in local cache using React Query.
- **Form Validation**
  - Email and status fields validated using Zod schemas.
  - Inline error messages displayed for better UX.
- **Smooth Animations**
  - Modal slide-in/out with Framer Motion.
  - Hover and scale animations for buttons.
- **Pagination**
  - Leads are paginated for smoother browsing of large datasets.
- **Persisted Filters and Sorting**
  - Filter and sort selections are saved in localStorage.
  - User preferences remain even after page reload, improving UX.
  

### Opportunities
- **Opportunity View**
  - View a list of potential opportunities associated with leads.
  - Convert leads into opportunities with a single action.
  - Updates immediately reflected in the system using React Query cache.
- **Status Management**
  - Type-safe state updates across the app ensure consistency.
- **Pagination**
  - Opportunities are also paginated for better data handling.

### Simulated API
- Leads and opportunities are fetched from **local JSON files** with simulated network delay.
- All mutations (email/status updates, conversions) are reflected in the cache to mimic backend interactions.

---

## Project Structure

The project follows a **modular and scalable folder structure**, ensuring separation of concerns, reusability, and maintainability.  
This structure is based on common patterns for **React + Vite** applications, keeping the codebase organized and easy to navigate.  

src/ \
├─ components/ # Reusable components \
│ └─ UI/ # UI components (buttons, inputs, modals, etc.) \
├─ assets/ # Static assets like JSON data \
├─ hooks/ # Custom React hooks \
├─ lib/ # Utility functions and helpers \
├─ pages/ # Application pages \
├─ schemas/ # Zod schemas for form validation \
└─ types/ # Global TypeScript types 


## How to Run the Application

Make sure Node.js is installed, then follow the steps below to run the project locally:

1. Install dependencies
npm install

2. Run the application
npm run dev
