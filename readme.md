# Full-Stack TypeScript Boilerplate Backend

A professional-grade full-stack application boilerplate Node.js (TypeScript/Express) backend.

## 🚀 Tech Stack

### Backend
- **Node.js** with TypeScript
- **Express.js** framework
- **PostgreSQL** database
- **Prisma** ORM
- **JWT** authentication
- **Swagger** API documentation
- **Winston** logging
- **Joi** validation

## 📁 Project Structure

```
├── src/          # Node.js backend
└── README.md         # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/zainbinshakoor/PERN-BOLIER-BE.git
cd PERN-BOLIER-BE

# Install dependencies
npm run install
```

### 2. Database Setup

```bash
# Start PostgreSQL service
# Create a new database for the project

# In the backend directory:
cp .env.example .env

# Update .env with your database credentials
# Run database migrations
npm run db:migrate
npm run db:seed
```

### 3. Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

### 4. Development

```bash
# start individually:
npm run dev
```

### 5. Production

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:5000/api-docs`

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📝 Available Scripts

- `npm run dev` - Start backend in development
- `npm run build` - Build both applications for production
- `npm run start` - Start production servers
- `npm run test` - Run all tests
- `npm run lint` - Lint all code
- `npm run format` - Format code with Prettier

## 🏗️ Architecture

### Backend Architecture
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic layer
- **Middleware**: Authentication, validation, logging
- **Routes**: API endpoint definitions
- **Utils**: Helper functions and utilities

## 🔐 Authentication

The boilerplate includes JWT-based authentication with:
- User registration and login
- Protected routes
- Token refresh mechanism
- Role-based access control

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.