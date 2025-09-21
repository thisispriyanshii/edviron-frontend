# Edviron School Payments Frontend

A modern React dashboard for managing school payments and transactions, built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Authentication**: JWT-based authentication with protected routes
- **Transaction Management**: Comprehensive transaction overview with filtering and pagination
- **School-specific Views**: Filter transactions by school
- **Status Checking**: Real-time transaction status lookup
- **Responsive Design**: Mobile-first responsive design
- **Real-time Updates**: Live data updates and status tracking
- **Advanced Filtering**: Multiple filter options with URL persistence

## 📋 Prerequisites

- Node.js (>= 18.0.0)
- npm or yarn package manager
- Running Edviron backend API

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd edviron-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your backend API URL:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 UI Components

### Pages
- **Login**: User authentication with demo credentials
- **Register**: User registration with role selection
- **Transactions Overview**: Main dashboard with transaction list and statistics
- **Transactions by School**: School-specific transaction filtering
- **Status Check**: Individual transaction status lookup

### Components
- **Layout**: Main application layout with header and navigation
- **TransactionTable**: Sortable, paginated transaction table
- **TransactionFilters**: Advanced filtering with URL persistence
- **StatsCards**: Transaction statistics overview
- **AuthProvider**: Authentication context and state management

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL | Yes |

### API Integration

The frontend integrates with the following backend endpoints:

- **Authentication**: `/auth/login`, `/auth/register`, `/auth/profile`
- **Transactions**: `/transactions`, `/transactions/school/:id`, `/transactions/status/:id`
- **Statistics**: `/transactions/stats`

## 🎯 Usage

### Authentication

1. **Login** with demo credentials:
   - Email: `admin@edviron.com`
   - Password: `password123`

2. **Register** a new account with role selection

### Transaction Management

1. **View All Transactions**: Navigate to the main dashboard
2. **Filter Transactions**: Use the filter panel to narrow down results
3. **Sort Data**: Click column headers to sort by different fields
4. **Paginate**: Navigate through large datasets with pagination
5. **Check Status**: Use the status check page for individual transactions

### School-specific Views

1. Navigate to `/schools/:schoolId` to view transactions for a specific school
2. Use the same filtering and sorting capabilities

## 🎨 Styling

The application uses Tailwind CSS with custom design system:

- **Primary Colors**: Blue-based color palette
- **Secondary Colors**: Gray-based neutral palette
- **Components**: Pre-built component classes for consistency
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Ready for dark mode implementation

### Custom CSS Classes

```css
.btn-primary     /* Primary button styling */
.btn-secondary   /* Secondary button styling */
.input-field     /* Form input styling */
.card           /* Card container styling */
.table-header   /* Table header styling */
.table-cell     /* Table cell styling */
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Link your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard

2. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-api.com
   ```

3. **Deploy**
   - Automatic deployment on git push
   - Custom domain configuration available

### Netlify Deployment

1. **Connect Repository**
   - Link your GitHub repository to Netlify
   - Set environment variables in Netlify dashboard

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Deploy**
   - Automatic deployment on git push

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Collapsible navigation
- Touch-friendly interface
- Optimized table scrolling
- Mobile-optimized forms

## 🔒 Security Features

- **JWT Token Management**: Secure token storage and automatic refresh
- **Protected Routes**: Route protection based on authentication status
- **Input Validation**: Client-side validation with error handling
- **XSS Protection**: Built-in React XSS protection
- **HTTPS Ready**: Production-ready HTTPS configuration

## 🧪 Testing

### Manual Testing

1. **Authentication Flow**
   - Test login with valid/invalid credentials
   - Test registration process
   - Test logout functionality

2. **Transaction Features**
   - Test transaction filtering
   - Test pagination
   - Test sorting
   - Test status checking

3. **Responsive Design**
   - Test on different screen sizes
   - Test mobile navigation
   - Test touch interactions

### Browser Compatibility

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 🎯 Performance Optimization

- **Code Splitting**: Automatic code splitting with Vite
- **Lazy Loading**: Route-based lazy loading
- **Image Optimization**: Optimized asset loading
- **Bundle Analysis**: Built-in bundle analysis tools

## 🔄 State Management

The application uses React Context for state management:

- **AuthContext**: User authentication state
- **Local State**: Component-level state with hooks
- **URL State**: Filter state persisted in URL parameters

## 📊 Data Visualization

- **Statistics Cards**: Transaction overview statistics
- **Status Badges**: Visual status indicators
- **Progress Indicators**: Loading states and progress bars
- **Charts**: Ready for integration with chart libraries

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure

```
src/
├── api/              # API integration
├── components/       # Reusable components
│   ├── Layout/       # Layout components
│   └── Transactions/ # Transaction-specific components
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@edviron.com or create an issue in the repository.

## 🔮 Future Enhancements

- **Real-time Updates**: WebSocket integration for live updates
- **Advanced Charts**: Data visualization with charts
- **Export Features**: CSV/PDF export functionality
- **Bulk Operations**: Bulk transaction management
- **Advanced Analytics**: Detailed analytics dashboard
- **Mobile App**: React Native mobile application

---

**Built with ❤️ using React, TypeScript, Vite, and Tailwind CSS**