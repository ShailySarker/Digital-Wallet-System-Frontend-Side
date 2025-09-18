# Digital Wallet System Frontend Side

## 🏆 Project Overview

A secure, role-based, and user-friendly frontend application for a digital wallet system named **Digi Wallet**. This project provides a public landing experience and role-tailored dashboards for **Users**, **Agents**, and **Admins**, enabling wallet management and common financial operations (**deposit**, **withdraw**, **send**, **cash-in/out**) while integrating with a backend API via RTK Query. The UI is responsive and accessible, built with modern React patterns and design systems to ensure maintainability, extensibility, and a polished user experience.

---

## 🔗 Website Link:

https://digital-wallet-system-frontend-side.vercel.app

---

## 🚀 Project Technologies

| Tech                 | Purpose                                   |
|----------------------|-------------------------------------------|
| **React**            | UI framework                              |
| **React Router**     | Routing across pages                      |
| **Redux Toolkit**    | Global state management                   |
| **RTK Query**        | Data fetching and caching                 |
| **TypeScript**       | Type safety                               |
| **Tailwind CSS**     | Styling framework                         |
| **ShadCN UI**        | UI Component                              |
| **Sonner**           | Alert and confirmation dialogs            |
| **Vite**             | Build tool and dev server                 |
| **Lazy Loadding**    | Basic loading indicators                  |

---

## 📌 Project Features

### **1️⃣ Public Landing Section**

Accessible without login, including:

- **Home Page —** A polished landing page with a theme-colored navigation bar containing at least 3 functional routes, a sticky navbar (and mega menu if applicable), and a hero banner with a tagline and call-to-action buttons. Include a matching footer, skeleton loading for data delays, smooth transitions, and ensure all links and buttons work. The design must be responsive for all devices.
- **About Page** — Service story, mission, and team details
- **Features Page** — List of features with visuals/icons
- **Pricing Page** (optional) — Service fees and possible subscription tiers
- **Contact Page** — Inquiry form (simulated submission)
- **FAQ Page** — Common questions and answers

---

### **2️⃣ Authentication**

- Login form with JWT-based authentication
- Registration form with role selection (**User** or **Agent**)
- Role-based redirection after login
- Persisted authentication state (remains logged in after refresh)
- Logout functionality

---

### **3️⃣ User Dashboard**

- Overview with wallet balance, quick actions, and recent transactions
- Deposit money (via agent cash-in simulation)
- Withdraw money
- Send money to another user (search by phone/email)
- Transaction history with:
    - Pagination
    - Filtering by type/date range
- Profile management — update name, phone, and password

---

### **4️⃣ Agent Dashboard**

- Overview with cash-in/out summary and recent activity
- Add money to a user’s wallet
- Withdraw money from a user’s wallet
- View all transactions handled by the agent
- Commission history (optional)
- Profile management — update personal info and password

---

### **5️⃣ Admin Dashboard**

- Overview with total users, agents, transaction count, and volume
- Manage users (view, block/unblock)
- Manage agents (approve, suspend)
- View all transactions (with advanced filters)
- Implement search bars and multiple filters (category, status, amount, etc.) on listing pages with pagination for better usability.
- Adjust system fees/limits (optional)
- Profile management — update admin account settings

---

### **6️⃣ General Features**

- Role-based navigation menu (different for each role)
- Loading indicators and global error handling
- Form validations (required fields, numeric checks, positive amounts) and anvanced filtering.
- Pagination for long lists
- Use data visualization components like cards, bar charts, pie charts, and tables—all dynamically updated.
- **Toast Notifications**
    - Show success/error messages with any toast package/library.
    - Makes UI feedback snappy.
- **Guided Tour (driver.js / shepherd.js / react-joyride)**
    - At least **5 steps**, highlight key features.
    - Steps to include (you make your choice):
        1. Navigation menu – explain section switching.
        2. Dashboard stats cards – quick data summary.
        3. Chart section – visualize trends.
        4. Table search/filter – find and filter records.
        5. Theme toggle – switch light/dark mode.
    - Attach steps to actual DOM elements.
    - Run tour only once for new users (use `localStorage`).
    - “Restart Tour” option in **Settings**.
    - Tooltip styling and UX improvements encouraged.
- **UI/UX Considerations:**
    - Fully responsive design for all devices
    - Interactive and Maintain consistent side margins and appropriate spacing between sections throughout the project. Avoid any clashing color combinations, especially in dark mode.
    - Clear color theme, typography, and iconography
    - Improve performance through lazy-loading or skeleton loaders and ensure accessibility standards are met.
    - Avoid placeholder text; populate the project with real or realistic data to give a professional finish.

---

## 🔧 Setup & Installation

### 1. Clone the project

```bash
git clone https://github.com/ShailySarker/Digital-Wallet-System-Frontend-Side
```
```bash
cd Digital-Wallet-System-Frontend-Side
```

### 2. Install dependencies

```bash

npm install

```

### 3. Create a .env file:

```bash

VITE_BASE_URL = https://digital-wallet-system-backend-side.vercel.app/api/v1

```
### 4. Run development server

```bash

npm run dev

```
