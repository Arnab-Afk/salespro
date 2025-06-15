# SalesPro - Lead Management System

## Project Overview

SalesPro is a modern, responsive web application built with Next.js, designed for comprehensive lead tracking and management across multiple departments. The system facilitates efficient lead distribution, seamless interdepartmental collaboration, and detailed progress monitoring through an intuitive user interface.

## Core Features

### Dashboard Overview
- Real-time metrics and KPI visualization
- Customizable widgets with drag-and-drop functionality
- Activity feed showing recent updates
- Performance analytics with conversion rates
- Quick actions for lead management

### Lead Management
- Advanced sortable and filterable lead tables
- Detailed lead profiles with tabbed interfaces
- Bulk operations for efficient processing
- Comprehensive search and filtering system
- Document attachment capabilities

### Department Collaboration
- Visual department assignment interface
- Team workload management
- Internal commenting system with @mentions
- Shared notes and transfer history
- Real-time notifications

### Analytics & Reporting
- Custom report generation
- Department-specific KPIs
- Performance metrics visualization
- Exportable data in multiple formats
- Historical trend analysis

## Technology Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **UI Components**: Custom components with Shadcn UI
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Authentication**: NextAuth.js

## Getting Started

1. **Clone the repository**

```bash
git clone github.com/arnab-afk/salespro
cd salespro
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key UI Screens

1. **Dashboard** - Central hub for metrics and activity
2. **Lead Management** - Comprehensive lead listing and details
3. **Department Views** - Department-specific interfaces
4. **Reports & Analytics** - Data visualization and reporting
5. **Settings** - System configuration and preferences
6. **User Management** - Role and permission management

## Development Guidelines

### Code Structure
- \`/src/components\` - Reusable UI components
- \`/src/app\` - Next.js application routes
- \`/src/lib\` - Utility functions and helpers
- \`/src/store\` - Redux store configuration
- \`/public\` - Static assets

### Best Practices
- Follow TypeScript strict mode guidelines
- Implement responsive design principles
- Ensure WCAG 2.1 AA compliance
- Write unit tests for critical components
- Use appropriate error boundaries

## Accessibility Features

- Keyboard navigation support
- Screen reader compatibility
- High contrast mode
- ARIA labels and roles
- Focus management

## Performance Optimizations

- Lazy loading for large datasets
- Image optimization
- Code splitting
- Caching strategies
- Real-time updates

## Deployment

The application is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy with one click

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript](https://www.typescriptlang.org/docs/)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Project File Structure

```
salespro/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── layout.tsx
│   │   ├── leads/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── departments/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── metrics-cards.tsx
│   │   │   ├── activity-feed.tsx
│   │   │   ├── department-chart.tsx
│   │   │   └── quick-actions.tsx
│   │   ├── leads/
│   │   │   ├── lead-table.tsx
│   │   │   ├── lead-filters.tsx
│   │   │   ├── lead-form.tsx
│   │   │   └── lead-details.tsx
│   │   ├── departments/
│   │   │   ├── department-card.tsx
│   │   │   ├── assignment-panel.tsx
│   │   │   └── workload-view.tsx
│   │   ├── shared/
│   │   │   ├── navigation/
│   │   │   │   ├── sidebar.tsx
│   │   │   │   └── top-bar.tsx
│   │   │   ├── ui/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown.tsx
│   │   │   │   └── table.tsx
│   │   │   └── charts/
│   │   │       ├── bar-chart.tsx
│   │   │       ├── pie-chart.tsx
│   │   │       └── line-chart.tsx
│   │   └── layout/
│   │       ├── header.tsx
│   │       └── footer.tsx
│   ├── lib/
│   │   ├── auth/
│   │   │   └── auth-options.ts
│   │   ├── utils/
│   │   │   ├── date-utils.ts
│   │   │   └── format-utils.ts
│   │   └── api/
│   │       └── api-client.ts
│   ├── store/
│   │   ├── slices/
│   │   │   ├── leads-slice.ts
│   │   │   └── departments-slice.ts
│   │   └── store.ts
│   └── types/
│       ├── lead.ts
│       ├── department.ts
│       └── user.ts
├── public/
│   ├── images/
│   │   └── logo.svg
│   └── icons/
├── styles/
│   └── globals.css
├── tests/
│   ├── components/
│   └── utils/
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Directory Structure Overview

### `/src/app`
- Next.js 13+ app directory with route groups and layouts
- Organized by feature (dashboard, leads, departments)
- Includes loading states and error boundaries

### `/src/components`
- Feature-based component organization
- Shared UI components and layouts
- Chart components for data visualization
- Reusable form components

### `/src/lib`
- Authentication configuration
- Utility functions
- API client setup

### `/src/store`
- Redux store configuration
- Feature-based slices
- Type-safe state management

### `/src/types`
- TypeScript interfaces and types
- Shared type definitions

### `/public`
- Static assets
- Images and icons
- Fonts and other resources

### `/styles`
- Global CSS configurations
- Tailwind CSS utilities
- Theme definitions

### `/tests`
- Component tests
- Utility function tests
- Integration tests

## License

This project is licensed under the MIT License - see the LICENSE file for details.
