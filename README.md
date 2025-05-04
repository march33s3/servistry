# Service Registry Web Application

A MERN stack web application that allows users to create registries, add services, and receive contributions.

## Features

### User Authentication
- Email and password authentication
- Password reset functionality
- JWT for secure session management

### Registry Management
- Create, view, edit, and delete registries
- Custom shareable URL for each registry
- Easy-to-use dashboard interface

### Service Management
- Add, edit, and remove services to/from registries
- Link to external service providers
- Track funding progress

### Contribution System
- Secure payment processing with Stripe
- Progress tracking for each service
- Email confirmations for both contributors and registry owners

### User Experience
- Mobile-friendly responsive design
- Interactive funding progress indicators
- Simple copy-to-clipboard sharing

## Technology Stack

- **MongoDB**: Database for users, registries, services, and transactions
- **Express.js**: Backend API framework
- **React**: Frontend UI library
- **Node.js**: JavaScript runtime
- **Stripe**: Payment processing integration
- **JWT**: Authentication tokens
- **Nodemailer**: Email notifications

## Installation & Setup

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local instance or MongoDB Atlas)
- Stripe account for payment processing
- Email account for sending notifications

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gift-registry.git
   cd gift-registry
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   FRONTEND_URL=http://localhost:3000
   EMAIL_SERVICE=gmail
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password
   EMAIL_FROM=your_email@gmail.com
   ADMIN_EMAIL=admin@example.com
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory:
   ```
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

## Deployment

### Backend Deployment

1. Ensure your MongoDB instance is accessible from your deployment environment.

2. Set up environment variables on your hosting platform with the same variables from your local `.env` file.

3. Deploy the Node.js application:
   ```bash
   npm run build
   npm start
   ```

### Frontend Deployment

1. Build the production-ready React application:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the static files from the `client/build` directory to your preferred static hosting service (Netlify, Vercel, AWS S3, etc.).

3. Make sure to update the `FRONTEND_URL` environment variable on your backend to match your deployed frontend URL.

### Stripe Webhook Setup

1. In your Stripe dashboard, create a webhook endpoint pointing to:
   ```
   https://your-backend-url.com/api/payment/webhook
   ```

2. Configure the webhook to listen for these events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

3. Get the webhook signing secret and add it to your backend environment variables.

## Project Structure

```
.
├── client/                    # Frontend React application
│   ├── public/                # Static files
│   ├── src/                   # React source files
│   │   ├── components/        # UI components
│   │   ├── context/           # React context (state management)
│   │   ├── App.js             # Main application component
│   │   └── ...
│   └── package.json           # Frontend dependencies
├── models/                    # MongoDB models
│   ├── User.js                # User model
│   ├── Registry.js            # Registry model
│   ├── Service.js             # Service model
│   └── Transaction.js         # Transaction model
├── routes/                    # Express routes
│   ├── auth.js                # Authentication routes
│   ├── registry.js            # Registry routes
│   ├── service.js             # Service routes
│   ├── payment.js             # Payment routes
│   └── admin.js               # Admin routes
├── middleware/                # Express middleware
│   ├── auth.js                # Authentication middleware
│   └── admin.js               # Admin access middleware
├── server.js                  # Express server entry point
└── package.json               # Backend dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in and get token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/user` - Get user info (protected)

### Registry
- `POST /api/registry` - Create a registry (protected)
- `GET /api/registry/user` - Get user's registries (protected)
- `GET /api/registry/:id` - Get registry by ID (protected)
- `GET /api/registry/public/:slug` - Get registry by slug (public)
- `PUT /api/registry/:id` - Update registry (protected)
- `DELETE /api/registry/:id` - Delete registry (protected)

### Service
- `POST /api/service` - Create a service (protected)
- `GET /api/service/registry/:registryId` - Get services for a registry (protected)
- `GET /api/service/:id` - Get service by ID (protected)
- `PUT /api/service/:id` - Update service (protected)
- `DELETE /api/service/:id` - Delete service (protected)

### Payment
- `POST /api/payment/create-payment-intent` - Create payment intent
- `POST /api/payment/webhook` - Stripe webhook
- `GET /api/payment/transactions/:serviceId` - Get transactions for a service (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin)
- `GET /api/admin/registries` - Get all registries (admin)
- `GET /api/admin/transactions` - Get all transactions (admin)
- `GET /api/admin/transactions/failed` - Get failed transactions (admin)

## License

[MIT](LICENSE)

## Authors

- Your Name

## Acknowledgments

- [Stripe Documentation](https://stripe.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Express Documentation](https://expressjs.com/)