# Library Management System - Frontend

A modern frontend for the Library Management System built with **Svelte 5**, demonstrating clean MVC architecture principles.

## Tech Stack

- **Framework**: Svelte 5 with runes-based reactivity
- **Build Tool**: Vite 5
- **Language**: TypeScript 5
- **Package Manager**: Bun
- **Styling**: Scoped CSS in Svelte components

## MVC Architecture

This frontend follows strict MVC principles:

### Model Layer (`src/models/`)
- **Book.ts**: Book entity with display logic
- **Member.ts**: Member entity with UI helpers
- **Loan.ts**: Loan entity with formatting methods

**Constraints**:
- No API calls
- No View imports
- Pure business logic for UI display only

### View Layer (`src/views/`)
- **Components**: Reusable UI components (BookCard, MemberCard, SearchBar, LoanBadge)
- **Pages**: Page-level components (BookListPage, DashboardPage)
- **Layouts**: Layout wrappers (MainLayout)

**Constraints**:
- Only render data from stores/controllers
- No business logic
- No direct API calls
- Observe models through stores

### Controller Layer (`src/controllers/`)
- **BookController**: Coordinates book operations
- **MemberController**: Coordinates member operations
- **LoanController**: Coordinates loan operations
- **DashboardController**: Coordinates dashboard data

**Constraints**:
- Handle user input
- Call API services
- Update stores (notify views)
- No business rules (format validation only)

### Service Layer (`src/services/`)
- **apiClient.ts**: Base HTTP client
- **bookService.ts**: Book API functions
- **memberService.ts**: Member API functions
- **loanService.ts**: Loan API functions
- **dashboardService.ts**: Dashboard API functions

**Constraints**:
- Pure API functions
- No business logic
- HTTP requests only

### Store Layer (`src/stores/`)
- **bookStore.ts**: Book state management
- **memberStore.ts**: Member state management
- **uiStore.ts**: Global UI state

**Purpose**:
- Act as Model observers
- Notify Views when data changes
- Maintain application state

## Project Structure

```
frontend/
├── src/
│   ├── models/              # Client-side models with display logic
│   │   ├── Book.ts
│   │   ├── Member.ts
│   │   └── Loan.ts
│   ├── views/               # Svelte components (View layer)
│   │   ├── components/    # Reusable components
│   │   │   ├── BookCard.svelte
│   │   │   ├── MemberCard.svelte
│   │   │   ├── SearchBar.svelte
│   │   │   └── LoanBadge.svelte
│   │   ├── pages/         # Page components
│   │   │   ├── BookListPage.svelte
│   │   │   └── DashboardPage.svelte
│   │   └── layouts/       # Layout components
│   │       └── MainLayout.svelte
│   ├── controllers/         # MVC Controllers
│   │   ├── BookController.ts
│   │   ├── MemberController.ts
│   │   ├── LoanController.ts
│   │   └── DashboardController.ts
│   ├── services/           # API Services
│   │   ├── apiClient.ts
│   │   ├── bookService.ts
│   │   ├── memberService.ts
│   │   ├── loanService.ts
│   │   └── dashboardService.ts
│   ├── stores/             # Svelte Stores (Model Observers)
│   │   ├── bookStore.ts
│   │   ├── memberStore.ts
│   │   └── uiStore.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── App.svelte          # Root component
│   ├── main.ts             # Entry point
│   └── app.css             # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
└── svelte.config.js       # Svelte config
```

## Installation

```bash
cd frontend

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Development

The development server runs on `http://localhost:5173` by default.

API requests are proxied to `http://localhost:3000` (backend) via Vite proxy.

## Key Features

### Dashboard
- Statistics overview (books, members, loans)
- Recent activity feed
- Visual status indicators

### Book Management
- List view with pagination
- Search functionality
- Genre filtering
- Status-based filtering

### UI Components
- Responsive design
- Accessible (ARIA labels, keyboard navigation)
- Loading states
- Error handling
- Success notifications

## Anti-Patterns Avoided

✅ **No business logic in Views** - Views only render data
✅ **No View imports in Models** - Models are pure
✅ **No business rules in Controllers** - Only format validation
✅ **No direct View-Model communication** - All through Controllers
✅ **No circular dependencies** - Clear dependency flow

## Data Flow

```
User Action → View (Svelte) → Controller → API Service → Backend API
                                              ↓
                                        Store (Model Observer)
                                              ↓
                                        View (Auto-update)
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
