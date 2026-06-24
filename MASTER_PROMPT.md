# MASTER PROMPT — Beach Hotel App: Full Upgrade

## Project Overview

This is a React 19 + Node.js/Express + MongoDB hotel booking app called **"The Beach Hotel"**.
- Frontend: `src/` (React, react-router-dom v7, react-icons, react-datepicker)
- Backend: `server/` (Express, Mongoose, bcryptjs, jsonwebtoken)
- Frontend runs on port 3001, backend on port 5000
- Frontend proxy is set to `http://localhost:5000` in package.json

---

## EXISTING COLOR SYSTEM — DO NOT CHANGE THESE VALUES

All colors are already defined as CSS variables in `src/index.css`. You MUST use these exact variables everywhere. Never hardcode hex values.

```css
--primary: #0a1f1c;
--primary-light: #163832;
--accent: #d4af37;
--accent-light: #f3e5ab;
--accent-glow: rgba(212, 175, 55, 0.3);
--bg: #fdfdfc;
--card-bg: #ffffff;
--text: #1a2421;
--text-secondary: #4a635d;
--text-muted: #859c96;
--border: #dbe4e0;
--border-light: #eff3f1;
--surface: #f4f7f6;
--shadow-xs: 0 2px 4px rgba(10, 31, 28, 0.04);
--shadow-sm: 0 4px 12px rgba(10, 31, 28, 0.06);
--shadow-md: 0 12px 30px -8px rgba(10, 31, 28, 0.12);
--shadow-lg: 0 24px 40px -12px rgba(10, 31, 28, 0.18);
--shadow-hover: 0 30px 60px -15px rgba(10, 31, 28, 0.22);
--glass-bg: rgba(255, 255, 255, 0.85);
--glass-border: rgba(255, 255, 255, 0.4);
--glass-blur: blur(20px);
--radius-sm: 12px;
--radius-md: 20px;
--radius-lg: 32px;
--radius-xl: 48px;
--radius-full: 9999px;
--font-heading: 'Playfair Display', serif;
--font-body: 'Inter', sans-serif;
--transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
--transition: 0.4s cubic-bezier(0.25, 1, 0.5, 1);
--transition-slow: 0.7s cubic-bezier(0.25, 1, 0.5, 1);
--max-width: 1280px;
```

---

## TASK 1 — FIX ALL BUGS (Do This First)

### 1.1 Fix Missing Routes in `src/App.js`

The following components exist but have NO `<Route>` defined. Add them all:

```jsx
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './components/Profile/Profile';
import Checkout from './components/Checkout/Checkout';
import Contact from './components/Contact/Contact';
import Footer from './layouts/Footer/Footer';
import Layout from './layouts/Layout';  // if it exists, use it; otherwise add Footer manually

// Add these routes:
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/profile" element={<Profile />} />
<Route path="/checkout" element={<Checkout />} />
<Route path="/contact" element={<Contact />} />
```

Also wrap the app so `<Footer />` renders on every page. The current `App.js` renders `<Header />` but no `<Footer />`. Either use the existing `Layout.jsx` (Header + Outlet + Footer) or add `<Footer />` directly after `<Routes>`.

### 1.2 Fix `clearCart` Missing from CartContext

`src/components/Checkout/Checkout.jsx` calls `clearCart()` but it is not defined in `src/context/CartContext.jsx`. Add it:

```jsx
const clearCart = useCallback(() => {
  setCartItems([]);
}, []);

// Add clearCart to the Provider value and export it
```

### 1.3 Fix Cart Deduplication Bug

`CartContext.jsx` checks `item.id` for duplicates but MongoDB documents use `item._id`. Fix the `addToCart` function:

```jsx
const addToCart = useCallback((room) => {
  setCartItems((prev) => {
    const exists = prev.find((item) => (item._id || item.id) === (room._id || room.id));
    if (exists) return prev;
    return [...prev, { ...room, quantity: 1 }];
  });
}, []);
```

### 1.4 Fix Duplicate Provider Wrapping

`src/index.js` wraps the app in `<AuthProvider>` and `<CartProvider>`, and `src/App.js` also wraps in the same providers. Remove the duplicate providers from `App.js` — keep them only in `index.js`.

### 1.5 Fix Style Inconsistency

The following files use hardcoded hex values instead of CSS variables. Replace all hardcoded colors with the correct CSS variables:

- `src/components/css/Navbar.css` — replace `#0b2b26`, `#c89d66`, `#c5a059` with `var(--primary)`, `var(--accent)`
- `src/components/BookingPage/BookingPage.css` — same replacements
- `src/layouts/Header/Header.module.css` — replace `#0a2a1f` → `var(--primary)`, `#c5a059` → `var(--accent)`, `#333` → `var(--text)`
- `src/components/Contact/Contact.css` — replace `#f5b400` → `var(--accent)`, align with the rest of the design system

### 1.6 Fix BookingPage Backend Connection

`src/components/BookingPage/BookingPage.jsx` is a standalone form with no backend connection. Connect it to `POST /api/bookings`. On submit, send:

```json
{
  "roomId": "000000000000000000000000",
  "roomTitle": "General Inquiry",
  "checkIn": "<selected date>",
  "checkOut": "<selected date + 1 day>",
  "adults": "<persons count>",
  "guestName": "<name>",
  "guestEmail": "<email>"
}
```

Show a success message on 201 response, or an error message on failure.

---

## TASK 2 — SOFT UI REDESIGN (Apply to ALL Components)

Apply **Soft UI / Neumorphism** design principles to every component. The goal is soft, elevated, tactile surfaces — NOT flat design, NOT harsh shadows. Keep all existing colors exactly as defined above.

### Soft UI Rules to Follow

1. **Backgrounds**: Use `var(--bg)` (`#fdfdfc`) as the page background. Cards use `var(--card-bg)` (`#ffffff`).
2. **Soft shadows**: Replace all existing box-shadows with dual-tone soft shadows:
   ```css
   /* Soft UI raised element */
   box-shadow: 6px 6px 16px rgba(10, 31, 28, 0.10), -4px -4px 12px rgba(255, 255, 255, 0.85);
   
   /* Soft UI pressed/inset (for active inputs, pressed buttons) */
   box-shadow: inset 4px 4px 10px rgba(10, 31, 28, 0.08), inset -3px -3px 8px rgba(255, 255, 255, 0.9);
   
   /* Soft UI hover (slightly more elevated) */
   box-shadow: 10px 10px 24px rgba(10, 31, 28, 0.14), -6px -6px 18px rgba(255, 255, 255, 0.9);
   ```
3. **Border radius**: Use `var(--radius-lg)` (32px) for cards, `var(--radius-md)` (20px) for inputs/buttons, `var(--radius-full)` for pill buttons.
4. **Inputs**: Inputs should have the inset soft shadow on focus, with `border-color: var(--accent)` and `box-shadow: inset 4px 4px 10px rgba(10, 31, 28, 0.08), 0 0 0 3px var(--accent-glow)`.
5. **Buttons**: Primary buttons use `background: var(--primary)`, `color: var(--accent)`, soft raised shadow. On hover: slightly more elevated shadow + `translateY(-2px)`. Pill shape with `border-radius: var(--radius-full)`.
6. **Cards**: All cards get the raised soft shadow. On hover: elevated shadow + `translateY(-6px)`.
7. **Glassmorphism** (keep existing): Auth card, booking widget, and header already use glassmorphism — keep those as-is, just ensure shadows are soft.
8. **Section backgrounds**: Alternate between `var(--bg)` and `var(--surface)` (`#f4f7f6`) for visual rhythm.

### Apply Soft UI to These Specific Components

#### Header (`src/layouts/Header/Header.module.css`)
- Change `box-shadow: 0 2px 10px rgba(0,0,0,0.05)` to soft UI shadow
- Book Now button: pill shape, `var(--primary)` bg, `var(--accent)` text, soft raised shadow
- Active nav link: underline in `var(--accent)` color
- Cart badge: `var(--accent)` background, `var(--primary)` text

#### Footer (`src/layouts/Footer/Footer.module.css`)
- Background: `var(--primary)` (dark green)
- Text: white / `rgba(255,255,255,0.7)`
- Social icons: soft raised circles with `var(--primary-light)` background, `var(--accent)` icon color on hover
- Divider: `rgba(255,255,255,0.1)`

#### Home Page (`src/components/Home/Home.module.css`)
- Booking widget: keep glassmorphism, add soft shadow underneath
- Offer cards, room cards, service cards, story cards, blog cards: all get soft UI raised shadow
- Weekend banner: keep `var(--primary)` background, add subtle radial glow with `var(--accent-glow)`
- Section titles: keep `::after` gold underline

#### Auth Pages (`src/components/Auth/Auth.module.css`)
- Auth card: keep glassmorphism, add soft shadow
- Inputs: inset soft shadow on focus
- Submit button: pill shape, soft raised shadow

#### Room List (`src/components/RoomList/RoomList.module.css`)
- Filter sidebar: soft raised card with `var(--card-bg)` background
- Filter inputs/checkboxes: soft inset style
- Room cards: horizontal layout, soft raised shadow on hover
- Price range slider: style with `var(--accent)` track color

#### Room Detail (`src/components/RoomDetail/RoomDetail.module.css`)
- Hero section: keep dark overlay gradient
- Meta grid cards: soft raised UI
- Amenity tags: soft raised pill badges, `var(--surface)` background, `var(--primary)` text
- Booking sidebar: soft raised card, sticky positioning

#### Checkout (`src/components/Checkout/Checkout.module.css`)
- Two-column layout: both columns as soft raised cards
- Form inputs: inset soft shadow on focus
- Order summary: `var(--surface)` background with soft shadow
- Success screen: centered, soft raised card with gold accent

#### Profile (`src/components/Profile/Profile.module.css`)
- Profile card: centered, soft raised, large border radius
- User avatar placeholder: soft raised circle, `var(--primary)` background, initials in `var(--accent)`
- Logout button: outlined style, `var(--primary)` border, soft shadow

#### Services (`src/components/Services/Services.module.css`)
- Service cards: soft raised, image on top, content below
- Hours badge: pill shape, `var(--surface)` background

#### Contact (`src/components/Contact/Contact.css`)
- Completely redesign to match the rest of the app (currently uses a completely different style)
- Add a proper contact form (name, email, subject, message) with soft UI inputs
- Map section: soft raised card wrapper around the iframe
- Contact info cards: soft raised, icon + text layout

#### BookingPage (`src/components/BookingPage/BookingPage.css`)
- Redesign from dark card to soft UI card on `var(--bg)` background
- All inputs: soft inset shadow
- Submit button: pill, `var(--primary)` + `var(--accent)` text

---

## TASK 3 — BUILD CMS ADMIN PANEL (MVC Architecture, Backend + Frontend)

Build a complete CMS admin panel using strict **MVC (Model-View-Controller)** architecture. The admin panel is accessible at `/admin` on the frontend and all admin API routes are under `/api/admin/`.

### Architecture Requirements

**Backend MVC Structure:**
```
server/
├── controllers/
│   ├── adminRoomController.js      ← Room CRUD logic
│   ├── adminBookingController.js   ← Booking management logic
│   ├── adminServiceController.js   ← Service CRUD logic
│   ├── adminTestimonialController.js ← Testimonial CRUD logic
│   └── adminUserController.js      ← User management logic
├── routes/
│   ├── admin.js                    ← All admin routes (protected)
│   └── ... (existing routes)
├── middleware/
│   ├── authMiddleware.js           ← existing (protect)
│   ├── adminMiddleware.js          ← NEW: check user.role === 'admin'
│   └── ... (existing)
├── models/
│   ├── User.js                     ← Add `role` field (enum: ['user','admin'], default: 'user')
│   ├── Room.js                     ← existing
│   ├── Booking.js                  ← existing
│   ├── Service.js                  ← existing
│   └── Testimonial.js              ← existing
└── index.js                        ← Register admin routes
```

**Frontend MVC-inspired Structure:**
```
src/
├── components/
│   └── Admin/
│       ├── AdminLayout.jsx         ← Sidebar + Header + Outlet wrapper
│       ├── AdminLayout.module.css
│       ├── Dashboard.jsx           ← Stats overview
│       ├── Dashboard.module.css
│       ├── RoomsManager.jsx        ← Room CRUD table + modal form
│       ├── RoomsManager.module.css
│       ├── BookingsManager.jsx     ← Bookings table + status toggle
│       ├── BookingsManager.module.css
│       ├── ServicesManager.jsx     ← Services CRUD
│       ├── ServicesManager.module.css
│       ├── TestimonialsManager.jsx ← Testimonials CRUD
│       ├── TestimonialsManager.module.css
│       └── UsersManager.jsx        ← Users list + role toggle
│           UsersManager.module.css
└── context/
    └── AdminContext.jsx            ← Admin auth state + API helpers
```

### Backend Implementation

#### Step 1: Update User Model (`server/models/User.js`)

Add a `role` field:
```js
role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user',
}
```

#### Step 2: Create Admin Middleware (`server/middleware/adminMiddleware.js`)

```js
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin only.' });
  }
};
module.exports = { adminOnly };
```

#### Step 3: Create Controllers

Each controller follows this pattern (example for rooms):

**`server/controllers/adminRoomController.js`**
```js
// getAllRooms — GET /api/admin/rooms
// createRoom  — POST /api/admin/rooms
// updateRoom  — PUT /api/admin/rooms/:id
// deleteRoom  — DELETE /api/admin/rooms/:id
```

**`server/controllers/adminBookingController.js`**
```js
// getAllBookings    — GET /api/admin/bookings
// updateBookingStatus — PUT /api/admin/bookings/:id/status (confirmed/cancelled)
// deleteBooking    — DELETE /api/admin/bookings/:id
```

**`server/controllers/adminServiceController.js`**
```js
// getAllServices  — GET /api/admin/services
// createService  — POST /api/admin/services
// updateService  — PUT /api/admin/services/:id
// deleteService  — DELETE /api/admin/services/:id
```

**`server/controllers/adminTestimonialController.js`**
```js
// getAllTestimonials  — GET /api/admin/testimonials
// createTestimonial  — POST /api/admin/testimonials
// updateTestimonial  — PUT /api/admin/testimonials/:id
// deleteTestimonial  — DELETE /api/admin/testimonials/:id
```

**`server/controllers/adminUserController.js`**
```js
// getAllUsers    — GET /api/admin/users
// updateUserRole — PUT /api/admin/users/:id/role (toggle user/admin)
// deleteUser    — DELETE /api/admin/users/:id
```

**`server/controllers/adminDashboardController.js`**
```js
// getStats — GET /api/admin/stats
// Returns: { totalRooms, totalBookings, totalUsers, totalServices, recentBookings (last 5) }
```

#### Step 4: Create Admin Routes (`server/routes/admin.js`)

```js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// Apply protect + adminOnly to ALL admin routes
router.use(protect, adminOnly);

// Dashboard
router.get('/stats', adminDashboardController.getStats);

// Rooms
router.get('/rooms', adminRoomController.getAllRooms);
router.post('/rooms', adminRoomController.createRoom);
router.put('/rooms/:id', adminRoomController.updateRoom);
router.delete('/rooms/:id', adminRoomController.deleteRoom);

// Bookings
router.get('/bookings', adminBookingController.getAllBookings);
router.put('/bookings/:id/status', adminBookingController.updateBookingStatus);
router.delete('/bookings/:id', adminBookingController.deleteBooking);

// Services
router.get('/services', adminServiceController.getAllServices);
router.post('/services', adminServiceController.createService);
router.put('/services/:id', adminServiceController.updateService);
router.delete('/services/:id', adminServiceController.deleteService);

// Testimonials
router.get('/testimonials', adminTestimonialController.getAllTestimonials);
router.post('/testimonials', adminTestimonialController.createTestimonial);
router.put('/testimonials/:id', adminTestimonialController.updateTestimonial);
router.delete('/testimonials/:id', adminTestimonialController.deleteTestimonial);

// Users
router.get('/users', adminUserController.getAllUsers);
router.put('/users/:id/role', adminUserController.updateUserRole);
router.delete('/users/:id', adminUserController.deleteUser);

module.exports = router;
```

#### Step 5: Register Admin Routes in `server/index.js`

```js
const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter);
```

Also add an admin seeder endpoint or update `server/seeder.js` to create a default admin user:
- Email: `admin@beachhotel.com`
- Password: `admin123`
- Role: `admin`

#### Step 6: Update Auth Route to Return Role

In `server/routes/auth.js`, update the login and register responses to include `role`:
```js
res.json({
  _id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,   // ADD THIS
  token: generateToken(user._id),
});
```

### Frontend Implementation

#### Step 1: Update `AuthContext.jsx`

Store `user.role` in state. Add a helper:
```jsx
const isAdmin = user?.role === 'admin';
// Expose isAdmin in context value
```

#### Step 2: Create `AdminContext.jsx` (`src/context/AdminContext.jsx`)

Provides admin-specific API helpers (all calls include `Authorization: Bearer <token>` header):
```jsx
// fetchStats(), fetchRooms(), createRoom(data), updateRoom(id, data), deleteRoom(id)
// fetchBookings(), updateBookingStatus(id, status), deleteBooking(id)
// fetchServices(), createService(data), updateService(id, data), deleteService(id)
// fetchTestimonials(), createTestimonial(data), updateTestimonial(id, data), deleteTestimonial(id)
// fetchUsers(), updateUserRole(id, role), deleteUser(id)
```

#### Step 3: Create `AdminLayout.jsx`

A sidebar layout with:
- Left sidebar (240px wide): Hotel logo/name, nav links (Dashboard, Rooms, Bookings, Services, Testimonials, Users), logout button at bottom
- Top bar: Page title + logged-in admin name
- Main content area: `<Outlet />`
- Sidebar uses `var(--primary)` background, `var(--accent)` active link color, white text
- Main area uses `var(--surface)` background
- Soft UI cards throughout

#### Step 4: Create Dashboard (`src/components/Admin/Dashboard.jsx`)

Shows stat cards:
- Total Rooms (icon: 🏨)
- Total Bookings (icon: 📅)
- Total Users (icon: 👥)
- Total Services (icon: 🛎️)

Each stat card: soft raised UI, `var(--card-bg)` background, large number in `var(--accent)`, label in `var(--text-secondary)`.

Below stats: a table of the 5 most recent bookings (guest name, room, check-in, check-out, status badge).

#### Step 5: Create RoomsManager (`src/components/Admin/RoomsManager.jsx`)

- Table with columns: Image (thumbnail), Title, Type, Price/night, Capacity, Rating, Actions (Edit / Delete)
- "Add New Room" button opens a modal form
- Modal form fields: Title, Type (select: Standard/Deluxe/Suite/Villa), Description (textarea), Price, Adults capacity, Children capacity, Amenities (comma-separated input), Rating (0-5), Image URL
- Edit button pre-fills the modal
- Delete button shows a confirmation dialog before deleting
- All operations call the admin API and refresh the table

#### Step 6: Create BookingsManager (`src/components/Admin/BookingsManager.jsx`)

- Table with columns: Guest Name, Email, Room, Check-In, Check-Out, Adults, Children, Status (badge), Actions
- Status badge: green for "confirmed", red for "cancelled"
- Actions: Toggle Status button (confirmed ↔ cancelled), Delete button
- Filter bar at top: filter by status (All / Confirmed / Cancelled)

#### Step 7: Create ServicesManager (`src/components/Admin/ServicesManager.jsx`)

- Grid of service cards (same style as public Services page but with Edit/Delete overlays)
- "Add New Service" button opens modal
- Modal fields: Title, Description, Image URL, Hours

#### Step 8: Create TestimonialsManager (`src/components/Admin/TestimonialsManager.jsx`)

- Table with columns: Text (truncated), Author, Location, Actions (Edit / Delete)
- "Add New Testimonial" button opens modal
- Modal fields: Text (textarea), Author, Location

#### Step 9: Create UsersManager (`src/components/Admin/UsersManager.jsx`)

- Table with columns: Name, Email, Role (badge), Member Since, Actions
- Role badge: gold for "admin", grey for "user"
- Actions: Toggle Role button (user ↔ admin), Delete button (cannot delete yourself)

#### Step 10: Add Admin Routes to `src/App.js`

```jsx
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import RoomsManager from './components/Admin/RoomsManager';
import BookingsManager from './components/Admin/BookingsManager';
import ServicesManager from './components/Admin/ServicesManager';
import TestimonialsManager from './components/Admin/TestimonialsManager';
import UsersManager from './components/Admin/UsersManager';
import AdminContext from './context/AdminContext';

// Admin routes (nested under AdminLayout, protected by isAdmin check)
<Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
  <Route index element={<Dashboard />} />
  <Route path="rooms" element={<RoomsManager />} />
  <Route path="bookings" element={<BookingsManager />} />
  <Route path="services" element={<ServicesManager />} />
  <Route path="testimonials" element={<TestimonialsManager />} />
  <Route path="users" element={<UsersManager />} />
</Route>
```

Create a `ProtectedAdminRoute` component that redirects to `/login` if not authenticated, or to `/` if authenticated but not admin.

#### Step 11: Add Admin Link to Header

In `src/layouts/Header/Header.jsx`, if `user?.role === 'admin'`, show an "Admin" link in the nav pointing to `/admin`.

### Admin Panel Soft UI Design

Apply the same Soft UI principles to the admin panel:
- Sidebar: `var(--primary)` background, soft inner shadow on active item
- Stat cards: `var(--card-bg)` background, soft raised shadow, `var(--accent)` numbers
- Tables: `var(--card-bg)` background, soft raised card wrapper, `var(--border)` row dividers
- Modal: centered overlay, `var(--card-bg)` background, soft raised shadow, `var(--radius-xl)` border radius
- Form inputs in modal: soft inset shadow on focus
- Buttons: pill shape, soft raised shadow
- Status badges: pill shape, soft raised, color-coded

---

## TASK 4 — BACKEND HEALTH CHECK & FIXES

### 4.1 Verify MongoDB Connection

In `server/config/db.js`, the connection string falls back to `mongodb://127.0.0.1:27017/dreamhotel`. Ensure the `.env` file has `MONGO_URI` set. If not, the local fallback will be used.

### 4.2 Add Missing Admin Route Registration

After creating `server/routes/admin.js`, register it in `server/index.js`:
```js
const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter);
```

### 4.3 Add Services and Testimonials Admin Routes

Currently `GET /api/services` and `GET /api/testimonials` are inline in `server/index.js`. Move them to proper route files:
- Create `server/routes/services.js` with `GET /` (public) + admin CRUD via admin router
- Create `server/routes/testimonials.js` with `GET /` (public) + admin CRUD via admin router
- Update `server/index.js` to use these route files

### 4.4 Add Input Validation to Booking Route

In `server/routes/bookings.js`, validate that `checkIn` is before `checkOut`:
```js
if (new Date(checkIn) >= new Date(checkOut)) {
  return res.status(400).json({ error: 'Check-out must be after check-in' });
}
```

### 4.5 Ensure CORS Allows Admin Panel

The current CORS config allows `localhost:3000` and `localhost:3001`. Since the frontend runs on 3001, this is fine. No change needed unless you add a separate admin port.

---

## TASK 5 — FINAL CHECKLIST

After completing all tasks, verify:

- [ ] All routes in App.js are defined: `/`, `/rooms`, `/rooms/:id`, `/services`, `/book`, `/login`, `/signup`, `/profile`, `/checkout`, `/contact`, `/admin/*`
- [ ] Footer renders on every page
- [ ] `clearCart` is defined and exported from CartContext
- [ ] Cart deduplication uses `_id || id`
- [ ] No duplicate AuthProvider/CartProvider wrapping
- [ ] All CSS files use CSS variables, no hardcoded hex colors
- [ ] BookingPage connects to `POST /api/bookings`
- [ ] Soft UI shadows applied to all cards, inputs, buttons
- [ ] All existing colors preserved exactly
- [ ] Admin panel accessible at `/admin`
- [ ] Admin routes protected by `protect` + `adminOnly` middleware
- [ ] Admin seeder creates default admin user
- [ ] Auth responses include `role` field
- [ ] `isAdmin` available in AuthContext
- [ ] Admin link visible in Header for admin users
- [ ] All admin CRUD operations work end-to-end
- [ ] MVC structure: controllers in `server/controllers/`, routes in `server/routes/`, models in `server/models/`
- [ ] No `console.log` left in production code (use `console.error` only for errors)

---

## IMPORTANT CONSTRAINTS

1. **Do NOT change any color values.** Use only the CSS variables defined in `src/index.css`.
2. **Do NOT install new npm packages** unless absolutely necessary. The existing stack (React, react-router-dom, react-icons, react-datepicker, Express, Mongoose, bcryptjs, jsonwebtoken) covers everything needed.
3. **Do NOT change the API URL** — frontend uses proxy `http://localhost:5000`, so all fetch calls use relative paths like `/api/rooms` (no `http://localhost:5000` prefix needed in components).
4. **MVC is mandatory** for the backend — no business logic in route files, all logic goes in controllers.
5. **CSS Modules** for all new React components (`.module.css` files), consistent with the existing codebase.
6. **Accessibility**: All interactive elements must have proper `aria-label`, `role`, and keyboard navigation support.
7. **Mobile responsive**: All new components must be responsive. Admin panel sidebar collapses to a hamburger on mobile.
