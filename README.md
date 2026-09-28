# HomelyHub

HomelyHub is a full-stack property rental and vacation booking platform. Users can discover accommodations, view property details, create accounts, manage profiles, make bookings, and generate personalized AI-powered travel plans.

## Live Demo

Frontend: https://homelyhub-three.vercel.app

Repository: https://github.com/Johan621/HomelyHub

---

## Features

### Authentication

- User registration and login
- JWT authentication
- HTTP-only authentication cookies
- Logout functionality
- Protected routes
- Profile management
- Password update
- Forgot-password functionality
- Password reset through email
- Password hashing with bcrypt

### Property Listings

- Browse available properties
- Search and filter accommodations
- View property details
- View property images
- View amenities and location information
- View check-in and check-out times
- Create new accommodation listings
- View accommodations created by the logged-in user
- Image uploads through ImageKit

### Booking System

- Select check-in and check-out dates
- Select the number of guests
- Create booking orders
- Confirm payments
- Save booking details
- View user bookings
- View individual booking details
- Store reserved dates for properties

> The current payment system is a simulated payment flow and can be replaced with a production payment provider.

### AI Trip Planner

The Trip Genie feature creates personalized travel plans based on:

- Destination
- Budget
- Number of days
- Number of travelers
- Selected interests

The generated plan includes:

- Trip summary
- Day-by-day activities
- Morning, afternoon, and evening suggestions
- Travel tips
- Matching property recommendations
- Estimated nightly budget

### AI Property Description Generator

Property owners can generate professional property descriptions based on:

- Property type
- Room type
- Maximum guest capacity
- Amenities
- Price
- Location
- Additional property information

---

## Technology Stack

### Frontend

- React
- Vite
- React Router DOM
- Redux Toolkit
- React Redux
- Axios
- Ant Design
- React Hot Toast
- Leaflet
- React Leaflet
- GSAP
- Lucide React
- React Datepicker
- Moment.js

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- Cookie Parser
- CORS
- Dotenv
- Nodemailer
- Mailgen
- ImageKit
- Groq SDK
- Slugify
- Validator

---

## Project Structure

```text
HomelyHub/
├── backend/
│   ├── src/
│   │   ├── Models/
│   │   │   ├── bookingModel.js
│   │   │   ├── propertyModel.js
│   │   │   └── userModel.js
│   │   │
│   │   ├── ai/
│   │   │   ├── aiClient.js
│   │   │   ├── generateDescription.js
│   │   │   └── tripPlanner.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── bookingController.js
│   │   │   ├── propertyController.js
│   │   │   └── tripController.js
│   │   │
│   │   ├── routes/
│   │   │   ├── bookingRouter.js
│   │   │   ├── propertyRouter.js
│   │   │   ├── tripRouter.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── utils/
│   │   │   ├── APIFeatures.js
│   │   │   ├── ImagekitIO.js
│   │   │   ├── db.js
│   │   │   ├── mail.js
│   │   │   └── token.js
│   │   │
│   │   └── index.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   └── assets/
│   │
│   ├── src/
│   │   ├── ai/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── accomodation/
│   │   │   ├── aiTripPlanner/
│   │   │   ├── home/
│   │   │   ├── myBookings/
│   │   │   ├── payment/
│   │   │   ├── propertyListing/
│   │   │   └── user/
│   │   │
│   │   ├── css/
│   │   ├── data/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── .gitignore
└── README.md
```

---

## Frontend Routes

| Route | Description |
|---|---|
| `/` | Homepage and property listings |
| `/propertylist/:id` | Property details |
| `/login` | Login page |
| `/signup` | Registration page |
| `/profile` | User profile |
| `/editprofile` | Edit profile |
| `/accomodation` | User accommodations |
| `/accomodationform` | Create accommodation |
| `/user/forgotPassword` | Request password reset |
| `/user/resetPassword/:token` | Reset password |
| `/user/updatepassword` | Update password |
| `/user/mybookings` | User bookings |
| `/user/mybookings/:bookingId` | Booking details |
| `/payment/:propertyId` | Payment page |
| `/ai-trip-planner` | AI Trip Genie |

---

## Backend API

The backend API uses the following base path:

```text
/api/v1/rent
```

### User and Authentication Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `POST` | `/user/signup` | Create a new account | No |
| `POST` | `/user/login` | Log in | No |
| `GET` | `/user/logout` | Log out | No |
| `GET` | `/user/me` | Get current user | Yes |
| `PATCH` | `/user/updateMe` | Update profile | Yes |
| `PATCH` | `/user/updateMyPassword` | Update password | Yes |
| `POST` | `/user/forgotPassword` | Request password reset | No |
| `PATCH` | `/user/resetPassword/:token` | Reset password | No |
| `POST` | `/user/generateDescription` | Generate property description | Yes |
| `POST` | `/user/newAccommodation` | Create accommodation | Yes |
| `GET` | `/user/myAccommodation` | Get user accommodations | Yes |

### Property Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/listing` | Get all properties | No |
| `GET` | `/listing/:id` | Get one property | No |

### Booking Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/user/booking` | Get user bookings | Yes |
| `GET` | `/user/booking/:bookingId` | Get booking details | Yes |
| `POST` | `/user/booking/create-order` | Create booking order | Yes |
| `POST` | `/user/booking/verify-payment` | Verify payment | Yes |

### Trip Planner Route

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `POST` | `/trip` | Generate an AI trip plan | No |

---

## Database Models

### User

The user model stores:

- Name
- Email
- Password
- Phone number
- Role
- Avatar
- Password reset token
- Password reset expiration
- Password change timestamp

Passwords are hashed before they are stored in MongoDB.

### Property

The property model stores:

- Property name
- Description
- Property type
- Room type
- Maximum guests
- Amenities
- Images
- Price per night
- Address
- Check-in time
- Check-out time
- Current bookings
- Property owner

### Booking

The booking model stores:

- User reference
- Property reference
- Price
- Check-in date
- Check-out date
- Number of guests
- Number of nights
- Payment status
- Booking timestamps

---

## Installation

### Clone the repository

```bash
git clone https://github.com/Johan621/HomelyHub.git
cd HomelyHub
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a file named `.env` inside the `backend` folder:

```env
PORT=8080

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7

ORIGIN_ACCESS_URL=http://localhost:5173

GROQ_API_KEY=your_groq_api_key

IMAGEKIT_PUBLICKEY=your_imagekit_public_key
IMAGEKIT_PRIVATEKEY=your_imagekit_private_key
IMAGEKIT_URLENDPOINT=your_imagekit_url_endpoint

MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_mailtrap_username
MAILTRAP_SMTP_PASS=your_mailtrap_password
```

For the frontend, create `frontend/.env` if needed:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

For production, use the deployed backend URL:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

---

## Running Locally

### Start the backend

From the `backend` folder:

```bash
npm run dev
```

The backend starts on the port configured in `.env`.

### Start the frontend

From the `frontend` folder:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal.

---

## Available Scripts

### Backend

```bash
npm run dev
```

Starts the backend server.

```bash
npm start
```

Starts the backend server.

### Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build.

```bash
npm run lint
```

Runs ESLint checks.

---

## Authentication

HomelyHub uses JWT authentication.

1. The user signs up or logs in.
2. The backend creates a JWT.
3. The JWT is stored in an HTTP-only cookie.
4. The browser sends the cookie with future requests.
5. Protected routes validate the token.
6. The authenticated user is attached to `req.user`.

The backend also supports Bearer token authentication:

```http
Authorization: Bearer your_token_here
```

---

## Image Uploads

Property and profile images are uploaded to ImageKit.

Only the following information is stored in MongoDB:

- Image URL
- ImageKit file ID

The original image files are stored by ImageKit.

---

## AI Integration

HomelyHub uses the Groq API for AI features.

The trip planner accepts information such as:

```json
{
  "destination": "Goa",
  "budget": 15000,
  "days": 3,
  "people": 2,
  "interests": ["Beach", "Food", "Nature"]
}
```

The response contains:

- Trip summary
- Daily activities
- Travel tips
- Matching properties
- Estimated nightly budget

The property description generator creates a professional description from the host's property information.

---

## Deployment

### Frontend Deployment

The frontend can be deployed using Vercel.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Add this environment variable in Vercel:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

After adding or changing environment variables, redeploy the frontend.

### Backend Deployment

The backend can be deployed using Render, Railway, Fly.io, or another Node.js hosting platform.

Start command:

```bash
npm start
```

Configure the following backend environment variables on the hosting platform:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `JWT_COOKIE_EXPIRES_IN`
- `ORIGIN_ACCESS_URL`
- `GROQ_API_KEY`
- `IMAGEKIT_PUBLICKEY`
- `IMAGEKIT_PRIVATEKEY`
- `IMAGEKIT_URLENDPOINT`
- `MAILTRAP_SMTP_HOST`
- `MAILTRAP_SMTP_PORT`
- `MAILTRAP_SMTP_USER`
- `MAILTRAP_SMTP_PASS`

For production, set:

```env
ORIGIN_ACCESS_URL=https://your-frontend-domain.com
```

---

## Security Notes

- Never commit `.env` files.
- Never expose private API keys in frontend code.
- Use a strong production JWT secret.
- Use HTTPS in production.
- Keep authentication cookies HTTP-only.
- Configure CORS with the exact frontend domain.
- Rotate API keys if they are accidentally exposed.
- Use real payment verification before processing real payments.
- Validate and sanitize user input before saving it.

---

## Future Improvements

- Add a real payment gateway
- Add booking date conflict validation
- Add property reviews and ratings
- Add favorites and saved properties
- Add property editing and deletion
- Add admin management features
- Add automated frontend and backend tests
- Add API documentation
- Add advanced property filters
- Add real-time availability
- Add email booking confirmations
- Add error monitoring
- Improve loading and error states

---

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Test the application.
5. Commit your changes:

```bash
git add .
git commit -m "Add your feature"
```

6. Push your branch:

```bash
git push origin feature/your-feature-name
```

7. Open a pull request.

---

---

## Author

Created by [Johan621](https://github.com/Johan621).

## Repository

[https://github.com/Johan621/HomelyHub](https://github.com/Johan621/HomelyHub)
