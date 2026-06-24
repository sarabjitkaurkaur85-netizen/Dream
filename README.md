# 🏖️ The Beach Hotel - Full Stack Booking Application

A modern, full-featured hotel booking application with a beautiful Soft UI design and comprehensive admin CMS panel.

![Tech Stack](https://img.shields.io/badge/React-19.2.4-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![UI](https://img.shields.io/badge/Design-Soft%20UI-orange)

---

## ✨ Features

### 🌐 Public Website
- **Responsive Landing Page** with hero section and booking widget
- **Room Browsing** with advanced filters (type, price, rating, capacity)
- **Room Details** with amenities, pricing, and instant booking
- **Services Showcase** (Spa, Dining, Pool, Fitness)
- **User Authentication** (Login/Signup with JWT)
- **Booking System** with checkout flow
- **User Profile** management
- **Contact Page** with form and map

### 🔐 Admin CMS Panel
- **Dashboard** with statistics and recent bookings
- **Rooms Management** - Full CRUD operations
- **Bookings Management** - View, update status, delete
- **Services Management** - Full CRUD operations
- **Testimonials Management** - Full CRUD operations
- **Users Management** - View users, toggle roles, delete
- **Role-Based Access Control** (Admin/User)
- **Mobile Responsive** admin interface

### 🎨 Design
- **Soft UI / Neumorphism** design system
- **Consistent Color Palette** (Deep green + Metallic gold)
- **Glassmorphism** effects on key components
- **Smooth Animations** and transitions
- **Mobile-First** responsive design
- **Accessibility** compliant (ARIA labels, keyboard navigation)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
cd server && npm install && cd ..
```

### 2. Configure Environment
```bash
# Copy the example env file
cp server/.env.example server/.env

# Edit server/.env with your MongoDB URI and JWT secret
```

### 3. Seed Database
```bash
cd server
node seeder.js
```

### 4. Start Development Servers
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
npm start
```

**Access:**
- Frontend: http://localhost:3001
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3001/admin

**Default Admin Login:**
- Email: `admin@beachhotel.com`
- Password: `admin123`

📖 **For detailed instructions, see [QUICK_START.md](./QUICK_START.md)**

---

## 🏗️ Tech Stack

### Frontend
- **React 19.2.4** - UI library
- **React Router DOM 7.13.2** - Client-side routing
- **React Context API** - State management
- **React Icons** - Icon library
- **React DatePicker** - Date selection
- **CSS Modules** - Scoped styling

### Backend
- **Node.js** - Runtime environment
- **Express 4.21.0** - Web framework
- **MongoDB** - Database
- **Mongoose 9.6.1** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Architecture
- **MVC Pattern** - Model-View-Controller
- **RESTful API** - Standard HTTP methods
- **JWT Authentication** - Secure token-based auth
- **Role-Based Access Control** - Admin/User roles

---

## 📁 Project Structure

```
dream/
├── public/                      # Static assets
├── src/                         # Frontend source
│   ├── components/
│   │   ├── Admin/              # Admin panel components
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RoomsManager.jsx
│   │   │   ├── BookingsManager.jsx
│   │   │   ├── ServicesManager.jsx
│   │   │   ├── TestimonialsManager.jsx
│   │   │   └── UsersManager.jsx
│   │   ├── Auth/               # Login/Signup
│   │   ├── BookingPage/        # Booking form
│   │   ├── Checkout/           # Checkout flow
│   │   ├── Contact/            # Contact page
│   │   ├── Home/               # Landing page
│   │   ├── Profile/            # User profile
│   │   ├── RoomDetail/         # Single room view
│   │   ├── RoomList/           # Rooms listing
│   │   └── Services/           # Services page
│   ├── context/
│   │   ├── AdminContext.jsx    # Admin API helpers
│   │   ├── AuthContext.jsx     # Authentication state
│   │   └── CartContext.jsx     # Shopping cart state
│   ├── layouts/
│   │   ├── Header/             # Navigation header
│   │   ├── Footer/             # Site footer
│   │   └── Layout.jsx          # Page wrapper
│   ├── App.js                  # Main app component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── server/                      # Backend source
│   ├── controllers/            # MVC Controllers
│   │   ├── adminDashboardController.js
│   │   ├── adminRoomController.js
│   │   ├── adminBookingController.js
│   │   ├── adminServiceController.js
│   │   ├── adminTestimonialController.js
│   │   └── adminUserController.js
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── adminMiddleware.js  # Admin role check
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   ├── Room.js
│   │   ├── Booking.js
│   │   ├── Service.js
│   │   └── Testimonial.js
│   ├── routes/                 # API routes
│   │   ├── admin.js            # Admin endpoints
│   │   ├── auth.js             # Auth endpoints
│   │   ├── bookings.js         # Booking endpoints
│   │   └── rooms.js            # Room endpoints
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── data/
│   │   └── db.json             # Seed data
│   ├── index.js                # Server entry point
│   ├── seeder.js               # Database seeder
│   └── .env                    # Environment variables
├── MASTER_PROMPT.md            # Original requirements
├── IMPLEMENTATION_COMPLETE.md  # Implementation details
├── QUICK_START.md              # Setup guide
└── README.md                   # This file
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Public
- `GET /api/rooms` - List rooms (with filters)
- `GET /api/rooms/:id` - Get room details
- `GET /api/services` - List services
- `GET /api/testimonials` - List testimonials
- `POST /api/bookings` - Create booking
- `GET /api/health` - Health check

### Admin (Protected)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/rooms` - List all rooms
- `POST /api/admin/rooms` - Create room
- `PUT /api/admin/rooms/:id` - Update room
- `DELETE /api/admin/rooms/:id` - Delete room
- `GET /api/admin/bookings` - List all bookings
- `PUT /api/admin/bookings/:id/status` - Update booking status
- `DELETE /api/admin/bookings/:id` - Delete booking
- `GET /api/admin/services` - List all services
- `POST /api/admin/services` - Create service
- `PUT /api/admin/services/:id` - Update service
- `DELETE /api/admin/services/:id` - Delete service
- `GET /api/admin/testimonials` - List all testimonials
- `POST /api/admin/testimonials` - Create testimonial
- `PUT /api/admin/testimonials/:id` - Update testimonial
- `DELETE /api/admin/testimonials/:id` - Delete testimonial
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id/role` - Toggle user role
- `DELETE /api/admin/users/:id` - Delete user

---

## 🎨 Design System

### Color Palette
```css
--primary: #0a1f1c;           /* Deep forest green */
--primary-light: #163832;     /* Lighter green */
--accent: #d4af37;            /* Metallic gold */
--accent-light: #f3e5ab;      /* Soft champagne */
--bg: #fdfdfc;                /* Warm off-white */
--card-bg: #ffffff;           /* Pure white */
--text: #1a2421;              /* Dark text */
--text-secondary: #4a635d;    /* Secondary text */
--text-muted: #859c96;        /* Muted text */
```

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

### Soft UI Shadows
```css
/* Raised element */
box-shadow: 6px 6px 16px rgba(10, 31, 28, 0.10), 
            -4px -4px 12px rgba(255, 255, 255, 0.85);

/* Hover state */
box-shadow: 10px 10px 24px rgba(10, 31, 28, 0.14), 
            -6px -6px 18px rgba(255, 255, 255, 0.9);

/* Inset (focus) */
box-shadow: inset 4px 4px 10px rgba(10, 31, 28, 0.08), 
            0 0 0 3px var(--accent-glow);
```

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Role-Based Access Control** - Admin/User permissions
- **Protected Routes** - Middleware authentication
- **Input Validation** - Server-side validation
- **CORS Configuration** - Controlled cross-origin access
- **Environment Variables** - Sensitive data protection

---

## 📱 Responsive Design

- **Mobile-First** approach
- **Breakpoints:**
  - Mobile: < 600px
  - Tablet: 600px - 960px
  - Desktop: > 960px
- **Touch-Friendly** UI elements
- **Hamburger Menu** on mobile
- **Collapsible Sidebar** in admin panel

---

## ♿ Accessibility

- **ARIA Labels** on interactive elements
- **Keyboard Navigation** support
- **Focus Indicators** on all inputs
- **Semantic HTML** structure
- **Alt Text** on images
- **Color Contrast** WCAG AA compliant

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Browse and filter rooms
- [ ] View room details
- [ ] Create booking
- [ ] Admin login
- [ ] Admin CRUD operations
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `build/` folder
3. Set environment variables

### Backend (Heroku/Railway/Render)
1. Push to Git repository
2. Connect to deployment platform
3. Set environment variables:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster
2. Get connection string
3. Update `MONGO_URI` in `.env`
4. Whitelist deployment IP

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ for The Beach Hotel

---

## 🙏 Acknowledgments

- **React** - UI library
- **Express** - Backend framework
- **MongoDB** - Database
- **Pexels** - Stock images
- **Google Fonts** - Typography

---

## 📞 Support

For issues or questions:
1. Check [QUICK_START.md](./QUICK_START.md)
2. Review [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)
3. Check the troubleshooting section

---

**Happy Coding! 🏖️✨**
