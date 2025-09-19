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

The **Public Landing Section** serves as the **first point of interaction** for visitors, offering an engaging and informative introduction to the **Digital Wallet System**. It is **accessible without authentication** and designed to create a **strong first impression** with a clean, responsive, and user-friendly interface. This section ensures an **inviting, informative, and professional** experience that encourages users to explore the platform before signing up or logging in.

---

#### ✨ Key Components

#### 🏠 Home Page
- A professionally designed landing page featuring a **theme-colored navigation bar** with at least three fully functional routes.  
- Includes a **sticky header** (and an optional mega menu for enhanced navigation) for seamless browsing.  
- Features a striking **hero banner** highlighting the platform’s tagline and key **call-to-action buttons**.  
- Incorporates **skeleton loaders** for smooth data loading, **animated transitions**, and a **fully responsive layout** for desktop, tablet, and mobile devices.

#### ℹ️ About Page
- Showcases the **service’s mission, vision, and story**, building trust and credibility.  
- Introduces the **team behind the platform**, giving visitors insight into the people powering the system.

#### 🚀 Features Page
- A visually appealing showcase of the wallet’s **core features**, enhanced with icons and engaging visuals.  
- Helps users quickly understand the platform’s primary offerings.

#### 💰 Pricing Page
- Provides a clear and structured overview of **service fees, transaction charges, and optional subscription tiers**.  
- Enables users to make **informed financial decisions** before signing up.

#### 📩 Contact Page
- A **user-friendly inquiry form** for visitors to submit questions or feedback.  
- Includes **simulated submission** to demonstrate functionality.

#### ❓ FAQ Page
- A well-organized list of **frequently asked questions** to provide quick answers to common queries.  
- Helps users find important information effortlessly.

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
   - Filtering
   - Pagination
- Profile management 
    - Edit Profile
    - Change Password

---

### **4️⃣ Agent Dashboard**

- Overview with cash-in/out summary and recent activity
- Add money to a user’s wallet
- Withdraw money from a user’s wallet
- View all transactions handled by the agent
   - Filtering
   - Pagination
- Commission history 
   - Filtering
   - Pagination
- Profile management 
    - Edit Profile
    - Change Password
---

### **5️⃣ Admin Dashboard**

- Overview with total users, agents, transaction count, and volume
- Manage users (view, block/unblock) 
   - Searching
   - Filtering
   - Pagination
   - Page Limit
- Manage agents (approve, suspend)
   - Searching
   - Filtering
   - Pagination
   - Page Limit
- View all transactions (with advanced filters)
   - Searching
   - Filtering
   - Pagination
- Profile management 
    - Edit Profile
    - Change Password

---

### **6️⃣ General Features**

- Role-based navigation menu (different for each role)
- Loading indicators and global error handling
- Form validations (required fields, numeric checks, positive amounts) and anvanced filtering.
- Pagination for long lists
- Use data visualization components like cards, bar charts, pie charts, and tables—all dynamically updated.
- Show success/error messages with sonner toast package/library.

- **Guided Tour (react-joyride)**
    - Run tour only once for new users (use `localStorage`).
    - “Restart Tour” option in **Settings**.
    - Give a overview of navbar, login, register, settings, light and dark mode
- **UI/UX Considerations:**
    - Fully responsive design for all devices
    - Interactive and Maintain consistent side margins and appropriate spacing between sections throughout the project. Avoid any clashing color combinations, especially in dark mode.
    - Clear color theme, typography, and iconography
    - Improve performance through lazy-loading and ensure accessibility standards are met.
    - Avoid placeholder text; populate the project with realistic data to give a professional finish.

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
