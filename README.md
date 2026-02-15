# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

# Frontend Admin Dashboard

## Project Overview

This project is a frontend admin dashboard for managing products and users. It provides authentication, CRUD-style user and product views, analytics charts for quick insights, and common admin UX such as tables, confirm dialogs, notifications, and a responsive layout. The app is intended for internal use by operations or product teams to monitor inventory, manage user accounts, and view key metrics.

## Features

- Authentication (login and protected routes)
- Product list and product detail pages
- User list and user detail pages
- Dashboard with charts and stat cards
- Data table with filtering and custom column renderers
- Confirm dialogs and toast notifications
- Favorite (bookmark) actions and small UI utilities
- Centralized API service layer and global state management

## Technologies Used

- React: UI framework for building the SPA.
- TypeScript: static typing across components and services.
- Vite: fast development server and build tool.
- React Router: client-side routing and protected routes.
- Redux Toolkit: application state management and slices.
- RTK Query (`@reduxjs/toolkit/query`): data fetching, caching and mutation layer integrated with Redux Toolkit.
- Chart library (Recharts): charts on the dashboard.
- ESLint / Prettier: code quality and formatting tools.
- CSS / utility CSS: styling (project uses `App.css` and component styles).
- Chakra UI: component library and theming system used across the app for layout and controls.

## How These Technologies Are Used (Examples)

- API service (example pattern using RTK Query):

  ```ts
  // src/services/api/baseApi.ts
  import { fetchBaseQuery } from "@reduxjs/toolkit/query";
  import { createApi } from "@reduxjs/toolkit/query/react";
  import type { RootState } from "./store/store";

  export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.API_BASE_URL || "/api",
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
      },
    }),
    tagTypes: ["Users", "Products"],
    endpoints: () => ({}),
  });
  ```

  ```ts
  // src/services/api/productsApi.ts
  import { baseApi } from "./baseApi";
  import type { Product } from "../types/product";

  export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query<
        { products: Product[]; total: number },
        { limit?: number; skip?: number }
      >({
        query: ({ limit = 10, skip = 0 }) =>
          `products?limit=${limit}&skip=${skip}`,
        providesTags: ["Products"],
      }),
      // other endpoints: getProductById, createProduct, updateProduct, deleteProduct
    }),
  });

  export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
  ```

  ## UI Library (Chakra UI)

  This project uses Chakra UI as the primary component library and theming system. The app wraps the root with `ChakraProvider` (see `src/main.tsx`) and supplies a custom `system` from `src/theme/index.ts`. Components use Chakra's style props, responsive props and built-in primitives (Box, Flex, Button, Input, etc.) to keep layouts consistent and accessible.

  Common usage patterns:
  - Wrap the app with `ChakraProvider` and pass a custom theme/system.
  - Compose UI using Chakra primitives and style props instead of raw CSS for most layouts.
  - Use Chakra tokens (spacing, colors, breakpoints) from the `system` to ensure consistent design.
    - Redux Toolkit slice (example pattern):

  ```ts
  // src/store/slices/authSlice.ts (example)
  import { createSlice } from "@reduxjs/toolkit";

  const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null },
    reducers: {
      setCredentials(state, action) {
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
      logout(state) {
        state.user = null;
        state.token = null;
      },
    },
  });

  export const { setCredentials, logout } = authSlice.actions;
  export default authSlice.reducer;
  ```

  - Protected route example (concept):

  ```tsx
  // src/PrivateRoute.tsx (pattern)
  import { Navigate, Outlet } from "react-router-dom";
  import { useAppSelector } from "./store/hooks";

  export default function PrivateRoute() {
    const token = useAppSelector((state) => state.auth.token);
    return token ? <Outlet /> : <Navigate to="/login" replace />;
  }
  ```

  - Running locally

  ```bash
  # Install dependencies
  npm install

  # Start dev server
  npm run dev

  # Build for production
  npm run build
  ```

  ## Project Structure (high-level)
  - `src/` - application source
    - `pages/` - views for auth, dashboard, products, users
    - `services/api/` - API wrappers
    - `store/` - Redux store and slices
    - `components/` - reusable UI components (tables, dialogs, toasts)
    - `layout/` - header, sidebar, and layout components

  ## Business Context

  This dashboard is designed for teams who need a compact administrative interface to:
  - Monitor product inventories and trends
  - Manage user accounts and roles
  - Perform one-off or bulk actions (e.g., flagging, deleting, updating)
  - View quick KPI summaries and charts to support operational decisions

  The UI focuses on clarity and efficiency: searchable tables, quick actions (favorites/toasts), and role-protected pages to keep operations safe.

  ## Next Steps / Suggestions
  - Add end-to-end tests (Cypress) for critical flows (login, product management).
  - Add type-safe API layer (e.g., using OpenAPI or better TypeScript DTOs).
  - Integrate feature flags or role-based permissions for multi-tenant usage.

  ***
