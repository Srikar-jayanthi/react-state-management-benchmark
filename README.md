# React State Management Comparison

A benchmarking project comparing React Context API, Zustand, and Redux Toolkit.

## Project Structure

- `/context-version`: Naive single-context implementation.
- `/context-split-version`: Optimized multi-context implementation.
- `/zustand-version`: Minimalist store with selectors.
- `/redux-version`: Modern Redux Toolkit with slices.

## Getting Started

Each version is a standalone Vite project. To run any of them:

```bash
cd <version-folder>
npm install
npm run dev
```

## Results

Detailed benchmarking results and a decision guide can be found in [RESULTS.md](./RESULTS.md).

## Docker

You can run the production version of the Redux implementation using Docker:

```bash
docker-compose up --build
```
