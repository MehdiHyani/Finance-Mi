
# Finance-MI

Finance-MI is a financial management application designed to help users track their spending, analyze consumption trends, and forecast future expenditures. Built with a modern tech stack, Finance-MI features an intuitive UI and robust API to deliver actionable insights.

---

## Demo

https://github.com/user-attachments/assets/321b886e-5c57-4d0b-b9e9-ba64e721d352

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Directory Overview](#directory-overview)
- [Database Model](#database-model)
- [Key Pages](#key-pages)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Dashboard
- **Transaction Summary**: Get statistics like total spending, highest, and lowest transactions.
- **Forecasting**: Predict expenditures for the next 15 days.
- **Visual Trends**: Interactive charts showing spending patterns.

### Transactions List
- **Transaction History**: Detailed list of all transactions.
- **Categorization**: Transactions grouped by user-defined categories.

### Extensibility
- **User Roles**: Supports `customer` and `admin` roles.
- **Payment Methods**: Tracks multiple payment methods like `cash` and `creditCard`.

---

## Tech Stack

### Frontend (UI)
- **React** (via Vite)
- **Mantine** for UI components and hooks
- **React Query** for data fetching and caching
- **ECharts** for data visualization
- **Day.js** for date manipulation
- **Zustand** for state management

### Backend (API)
- **NestJS** for the application framework
- **Prisma** as the ORM
- **PostgreSQL** as the database
- **JWT** for authentication
- **Simple Statistics** for financial forecasting

---

## Project Structure

```
.
├── finance-mi-ui          # Frontend code
├── finance-mi-api         # Backend code
└── prisma                 # Database schema and seed scripts
```

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** v16 or later
- **Yarn** or **npm**
- **PostgreSQL** database

---

## Setup

### Clone the Repository
```bash
git clone https://github.com/your-username/finance-mi.git
cd finance-mi
```

### Install Dependencies
#### Frontend
```bash
cd finance-mi-ui
yarn install
```

#### Backend
```bash
cd finance-mi-api
yarn install
```

### Configure Environment Variables
#### Backend (`finance-mi-api/.env`)
```env
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/finance_mi
JWT_SECRET=<your_secret>
```

#### Frontend (`finance-mi-ui/.env`)
```env
VITE_API_URL=http://localhost:7981
```

### Migrate and Seed the Database
```bash
cd finance-mi-api
npx prisma migrate dev
npx prisma db seed
```

---

## Usage

### Start the Application
#### Backend
```bash
cd finance-mi-api
yarn start:dev
```

#### Frontend
```bash
cd finance-mi-ui
yarn dev
```

### Access the Application
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API Documentation**: [http://localhost:7981/docs](http://localhost:7981/docs)

---

## Directory Overview

### `finance-mi-ui`
- **Purpose**: Contains the React-based frontend.
- **Key Files**:
  - `src/pages/Dashboard.tsx`: Dashboard page implementation.
  - `src/pages/Transactions.tsx`: Transactions list page.

### `finance-mi-api`
- **Purpose**: Houses the backend, built with NestJS.
- **Key Files**:
  - `src/app.controller.ts`: Base API controller.
  - `src/transactions`: Contains transaction-related API endpoints.

### `prisma`
- **Purpose**: Defines the database schema and seed data.
- **Key Files**:
  - `schema.prisma`: Database schema.
  - `seeders/seed.ts`: Seeds the database with initial data.

---

## Database Model

### User
Tracks user details and their associated transactions.

| Field       | Type       | Description           |
|-------------|------------|-----------------------|
| `id`        | `String`   | Unique user ID.       |
| `email`     | `String`   | User email.           |
| `role`      | `UserRole` | `customer` or `admin`.|
| `createdAt` | `DateTime` | Account creation date.|

### Transaction
Logs user transactions with details like amount, category, and payment method.

| Field          | Type               | Description                  |
|-----------------|--------------------|------------------------------|
| `id`           | `String`           | Unique transaction ID.       |
| `amount`       | `Float`            | Transaction amount.          |
| `categoryName` | `String`           | Associated category name.    |
| `paymentMethod`| `PaymentMethodEnum`| `cash` or `creditCard`.      |

### Category
Defines categories for transactions.

| Field       | Type     | Description          |
|-------------|----------|----------------------|
| `name`      | `String` | Unique category name.|
| `IconUrl`   | `String` | Icon for the category.|

---

## Key Pages

### Dashboard
- **Purpose**: Provide insights into user spending.
- **Features**:
  - Spending summary.
  - Visualized trends.
  - Forecasting.

### Transactions
- **Purpose**: List all user transactions.
- **Features**:
  - Filter and sort transactions.
  - Categorize spending.

---

## Scripts

### Frontend Scripts
| Command         | Description                    |
|------------------|--------------------------------|
| `yarn dev`      | Start the development server.  |
| `yarn build`    | Build the frontend for production.|
| `yarn lint`     | Lint the codebase.            |

### Backend Scripts
| Command          | Description                    |
|-------------------|--------------------------------|
| `yarn start:dev` | Start the backend in development. |
| `yarn test`      | Run tests.                    |
| `yarn lint`      | Lint the codebase.            |

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

--- 

For questions or support, feel free to reach out to the contributors or open an issue in the repository.
