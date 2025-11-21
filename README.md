# Xionco

Xionco is a comprehensive e-commerce backend platform built with Node.js, featuring product management, stock tracking, purchase handling, user authentication, and an AI-powered chatbot. It includes an admin dashboard for easy management and uses modern web technologies for a seamless experience.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Product Management**: Full CRUD operations for products (create, read, update, delete)
- **Stock Management**: Track and manage product inventory
- **Purchase Management**: Handle customer purchases and order history
- **Admin Dashboard**: Web-based admin interface for managing the platform
- **AI Chatbot**: Integrated Ollama-powered chatbot using Llama 3.2 model for customer interactions
- **Responsive UI**: Bootstrap-based frontend for admin panel and chatbot interface

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: OpenAI API
- **Frontend**: EJS templating engine, Bootstrap CSS framework
- **Validation**: Express-validator
- **File Upload**: Express-fileupload
- **Security**: bcryptjs for password hashing, CORS support

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Mysql (comes with Prisma)
- Ollama (for AI chatbot functionality)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd xionco
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. Create a `.env` file in the backend directory and add your environment variables:
   ```
   JWT_SECRET=your_jwt_secret_here
   DATABASE_URL="mysql://username:password@localhost:3306/xionco_db"
   ```

   Note: The AI chatbot uses Ollama with Llama 3.2 model running locally on port 11434. Make sure Ollama is installed and the model is available.

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   - Home page: `http://localhost:3000`
   - Admin login: `http://localhost:3000/login`
   - Chatbot: `http://localhost:3000/chatbot`

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Products
- `GET /api/produk` - Get all products (requires authentication)
- `POST /api/produk` - Create a new product (requires authentication)
- `GET /api/produk/:id` - Get product by ID (requires authentication)
- `PUT /api/produk/:id` - Update product (requires authentication)
- `DELETE /api/produk/:id` - Delete product (requires authentication)

### Stock
- `GET /api/stock` - Get all stock items (requires authentication)
- `POST /api/stock` - Create a new stock entry (requires authentication)
- `GET /api/stock/:id` - Get stock by ID (requires authentication)
- `PUT /api/stock/:id` - Update stock (requires authentication)
- `DELETE /api/stock/:id` - Delete stock (requires authentication)

### Purchases
- `GET /api/pembelian` - Get all purchases (requires authentication)
- `POST /api/pembelian` - Create a new purchase (requires authentication)
- `GET /api/pembelian/:id` - Get purchase by ID (requires authentication)
- `PUT /api/pembelian/:id` - Update purchase (requires authentication)
- `DELETE /api/pembelian/:id` - Delete purchase (requires authentication)

### Chatbot
- `POST /api/chat` - Send a message to the AI chatbot

## Project Structure

```
backend/
├── controllers/          # Route controllers
│   ├── ChatbotController.js
│   ├── LoginController.js
│   ├── PembelianController.js
│   ├── ProdukController.js
│   ├── RegisterController.js
│   ├── StockController.js
│   └── UserController.js
├── middlewares/          # Custom middlewares
│   ├── auth.js
│   └── errorHandler.js
├── prisma/               # Database schema and migrations
│   ├── schema.prisma
│   ├── client/
│   └── migrations/
├── public/               # Static files
│   └── js/
├── routes/               # API routes
│   ├── index.js
│   └── chatbotRoutes.js
├── utils/                # Utility functions and validators
│   └── validators/
├── views/                # EJS templates
│   ├── index.ejs
│   ├── admin/
│   └── chatbot/
├── chatbot/              # Chatbot specific files
│   └── openai.js
├── index.js              # Main application file
├── package.json
└── package-lock.json
```

## Database Schema

The application uses three main models:

- **User**: Stores user information including username, email, password, and role
- **Produk**: Manages product details like name, description, price, category, image, and stock
- **Pembelian**: Handles purchase records linking products to transactions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support or questions, please contact the development team or create an issue in the repository.
