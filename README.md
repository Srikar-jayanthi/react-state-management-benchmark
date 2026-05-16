# React State Management Benchmarking: Context vs. Zustand vs. Redux Toolkit

This repository contains a comprehensive comparison of three popular React state management solutions: **React Context API**, **Zustand**, and **Redux Toolkit (RTK)**. 

The goal of this project is to benchmark performance (specifically re-renders), bundle size impact, and developer experience (boilerplate and API ergonomics) by implementing the same shopping cart application three times.

[**View Detailed Walkthrough & Visuals 🚀**](./WALKTHROUGH.md)

## 🚀 Implementations

1.  **React Context API (`/context-version`)**
    *   **Naive**: A single context holding the entire state tree.
    *   **Optimized**: Split contexts (Cart, User, UI) to minimize unnecessary re-renders.
2.  **Zustand (`/zustand-version`)**
    *   A minimalist, selector-based store that prevents re-renders by default.
3.  **Redux Toolkit (`/redux-version`)**
    *   The industry standard with `createSlice`, `configureStore`, and DevTools integration.

## 📊 Key Features

- **Render Counting**: Every key component displays its render count in real-time (`data-testid="render-count"`).
- **Profiling**: React DevTools Profiler traces for all implementations.
- **Bundle Analysis**: Visualizations of the bundle size impact of each library.
- **Dockerized**: A production-ready environment for the Redux implementation.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20+)
- npm or yarn
- Docker (optional)

### Running Locally

Each version is a standalone Vite project. To run a specific version:

```bash
cd <version-directory>
npm install
npm run dev
```

### Running with Docker

To serve the production-built Redux version:

```bash
docker-compose up --build
```

## 📈 Benchmarking Results

For a deep dive into the performance metrics, bundle sizes, and the **Decision Guide**, see [RESULTS.md](./RESULTS.md).

---
*Created as part of the React State Management Comparison Task.*
