# 🚀 Quick Start Guide - The Beach Hotel

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

---

## 📦 Installation

### Step 1: Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

---

## ⚙️ Configuration

### Step 2: Setup Environment Variables

Create a file `server/.env` with the following content:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/dreamhotel
JWT_SECRET=beach_hotel_secret_key_2025
```

**Note:** 
- If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string
- Change `JWT_SECRET` to a secure random string in production

---

## 🗄️ Database Setup

### Step 3: Seed the Database

This will populate your database with sample data and create the default admin user:

```bash
cd server
node seeder.js
```

**Expected Output:**
```
MongoDB Connected: 127.0.0.1
✅ Database Seeded Successfully!
📧 Admin login: admin@beachhotel.com / admin123
```

---

## 🎬 Running the Application

### Step 4: Start Both Servers

**Option A: Run Both Servers Separately (Recommended for Development)**

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Expected output: `🏖️  Beach Hotel API running on http://localhost:5000`

**Terminal 2 - Frontend Server:**
```bash
npm start
```
Expected output: Opens browser at `http://localhost:3001`

**Option B: Run Both Servers Concurrently (Single Command)**

```bash
npm run dev
```

---

## 🌐 Access the Application

### Public Website
- **URL:** http://localhost:3001
- Browse rooms, services, make bookings
- Create user account or login

### Admin Panel
1. Login with admin credentials:
   - **Email:** `admin@beachhotel.com`
   - **Password:** `admin123`
2. Click the **"Admin"** link in the header
3. **Admin Panel URL:** http://localhost:3001/admin

---

## 🔑 Default Credentials

### Admin Account
- **Email:** admin@beachhotel.com
- **Password:** admin123
- **Access:** Full admin panel access

### Creating Regular Users
- Click "Login" → "Sign Up"
- Fill in the registration form
- Regular users can browse and book rooms but cannot access admin panel

---

## 🛠️ Admin Panel Features

Once logged in as admin, you can:

1. **Dashboard** - View statistics and recent bookings
2. **Rooms Manager** - Add, edit, delete rooms
3. **Bookings Manager** - View all bookings, change status, delete
4. **Services Manager** - Manage hotel services
5. **Testimonials Manager** - Manage customer testimonials
6. **Users Manager** - View users, toggle admin role, delete users

---

## 📱 Testing the Application

### Test User Flow:
1. Visit http://localhost:3001
2. Browse rooms and services
3. Click "Book Now" or select a room
4. Fill booking form
5. View profile after login

### Test Admin Flow:
1. Login as admin
2. Navigate to `/admin`
3. Add a new room
4. View bookings
5. Toggle user roles

---

## 🐛 Troubleshooting

### MongoDB Connection Error
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Ensure MongoDB is running: `mongod` or start MongoDB service
- Check `MONGO_URI` in `.env` file
- If using MongoDB Atlas, check your connection string and IP whitelist

### Port Already in Use
**Error:** `Port 5000 is already in use`

**Solution:**
- Change `PORT` in `server/.env` to another port (e.g., 5001)
- Or kill the process using port 5000

### Frontend Not Loading
**Error:** Blank page or errors in console

**Solution:**
- Clear browser cache
- Check if backend is running on port 5000
- Check browser console for errors
- Ensure `proxy` in `package.json` is set to `http://localhost:5000`

### Admin Panel Not Accessible
**Error:** Redirected to home page

**Solution:**
- Ensure you're logged in with admin account
- Check user role in database: `db.users.find({ email: "admin@beachhotel.com" })`
- Re-run seeder if admin user is missing

---

## 📂 Project Structure

```
dream/
├── public/              # Static files
├── src/                 # Frontend React app
│   ├── components/      # React components
│   │   ├── Admin/       # Admin panel components
│   │   ├── Auth/        # Login/Signup
│   │   ├── Home/        # Landing page
│   │   └── ...
│   ├── context/         # React Context (Auth, Cart, Admin)
│   ├── layouts/         # Header, Footer, Layout
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── server/              # Backend Node.js/Express
│   ├── controllers/     # MVC Controllers
│   ├── middleware/      # Auth & Admin middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── config/          # Database config
│   ├── data/            # Seed data
│   ├── index.js         # Server entry point
│   └── seeder.js        # Database seeder
└── package.json         # Dependencies
```

---

## 🎨 Design System

### Colors
- **Primary:** Deep forest green (`#0a1f1c`)
- **Accent:** Metallic gold (`#d4af37`)
- **Background:** Warm off-white (`#fdfdfc`)

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

### UI Style
- **Soft UI / Neumorphism** design
- Dual-tone shadows (light + dark)
- Pill-shaped buttons
- Large border radius

---

## 🔄 Development Workflow

### Making Changes

**Frontend Changes:**
- Edit files in `src/`
- Hot reload is enabled (changes reflect automatically)

**Backend Changes:**
- Edit files in `server/`
- Server auto-restarts with `--watch` flag

**Database Changes:**
- Modify models in `server/models/`
- Re-run seeder: `cd server && node seeder.js`

### Adding New Features

**New Admin Feature:**
1. Create controller in `server/controllers/`
2. Add routes in `server/routes/admin.js`
3. Create React component in `src/components/Admin/`
4. Add API helpers in `src/context/AdminContext.jsx`

**New Public Feature:**
1. Create component in `src/components/`
2. Add route in `src/App.js`
3. Create backend API if needed

---

## 📚 API Endpoints

### Public Endpoints
- `GET /api/rooms` - List all rooms
- `GET /api/rooms/:id` - Get single room
- `GET /api/services` - List services
- `GET /api/testimonials` - List testimonials
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/bookings` - Create booking

### Protected Endpoints (Require Login)
- `GET /api/auth/profile` - Get user profile

### Admin Endpoints (Require Admin Role)
- `GET /api/admin/stats` - Dashboard stats
- `GET /api/admin/rooms` - List rooms (admin)
- `POST /api/admin/rooms` - Create room
- `PUT /api/admin/rooms/:id` - Update room
- `DELETE /api/admin/rooms/:id` - Delete room
- `GET /api/admin/bookings` - List all bookings
- `PUT /api/admin/bookings/:id/status` - Update booking status
- `DELETE /api/admin/bookings/:id` - Delete booking
- `GET /api/admin/services` - List services (admin)
- `POST /api/admin/services` - Create service
- `PUT /api/admin/services/:id` - Update service
- `DELETE /api/admin/services/:id` - Delete service
- `GET /api/admin/testimonials` - List testimonials (admin)
- `POST /api/admin/testimonials` - Create testimonial
- `PUT /api/admin/testimonials/:id` - Update testimonial
- `DELETE /api/admin/testimonials/:id` - Delete testimonial
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id/role` - Toggle user role
- `DELETE /api/admin/users/:id` - Delete user

---

## 🎉 You're All Set!

Your Beach Hotel application is now running with:
- ✅ Beautiful Soft UI design
- ✅ Full admin CMS panel
- ✅ User authentication
- ✅ Booking system
- ✅ Mobile responsive
- ✅ Production-ready code

**Need Help?** Check `IMPLEMENTATION_COMPLETE.md` for detailed documentation.

Happy coding! 🏖️✨
