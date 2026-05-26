# 🛒 FreshMart — Smart Grocery Store Management System

A fully responsive, feature-rich grocery store management web application built
with vanilla HTML, CSS, and JavaScript. No build step required — just open in a
browser or serve with VS Code Live Server.

---

## 🚀 Quick Start

### Option 1 — VS Code Live Server (Recommended)
1. Open the project folder in **VS Code**
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. Browser opens at `http://127.0.0.1:5500`

### Option 2 — Direct File Open
- Double-click `index.html` to open in any browser
- Note: Some browsers may block localStorage on `file://` — use Live Server if you hit issues

---

## 🔐 Login Credentials

| Role             | Username   | Password   |
|------------------|------------|------------|
| Admin / Manager  | `admin`    | `admin123` |
| Staff / Cashier  | `cashier1` | `cash123`  |
| Customer         | `customer` | `cust123`  |

> Admin sees all pages including Reports and Suppliers.  
> Customer only sees the Product Search page.

---

## 📁 Project Structure

```
grocery-store/
├── index.html          ← Main HTML (single-page app shell)
├── css/
│   └── styles.css      ← All styles, responsive design
├── js/
│   └── app.js          ← All JavaScript logic (modular sections)
└── README.md           ← This file
```

### Inside `app.js` (Sectioned by comments)
| Section | Description |
|---------|-------------|
| 1. Default Data | Seed products, suppliers, mock transactions |
| 2. LocalStorage Helpers | get/save wrappers for persistent data |
| 3. Authentication | Login / logout logic |
| 4. Navigation | SPA page routing |
| 5. Dashboard | Stats, recent transactions, low-stock alerts |
| 6. Inventory | Product CRUD (add, edit, delete, filter) |
| 7. Billing / POS | Cart, barcode sim, receipt generation |
| 8. Product Search | Customer-facing search with category filters |
| 9. Reports | Chart.js bar + doughnut charts, transaction history |
| 10. Suppliers | Supplier CRUD |
| 11. Utilities | Toast notifications, date formatter, emoji mapper |
| 12. Initialisation | DOMContentLoaded setup |

---

## ✨ Features

### 🔑 Authentication
- Login for Admin, Staff, and Customer roles
- Role-based access (admin-only pages hidden for customers/staff)
- Redirect to appropriate landing page per role

### 📦 Inventory Management (Admin/Staff)
- View all products in a sortable, searchable table
- Add / Edit / Delete products
- Filter by category, stock level, or search term
- Low-stock badge alerts (orange = low, red = out of stock)

### 🧾 Billing / POS
- Click product cards or enter barcode to add to cart
- Barcode scanner simulation (enter barcode ID in input field)
- Adjust quantities with +/− controls
- Auto-calculate subtotal + GST (5%) + total
- Print-ready receipt with customer name, date, itemised breakdown
- Stock auto-deducted on bill generation

### 📊 Reports & Analytics
- Period filter: Today / This Week / This Month
- Revenue, bills count, items sold, average bill value
- **Bar chart** — daily revenue for last 7 days
- **Doughnut chart** — revenue breakdown by category
- Full transaction history table with search

### 🔍 Customer Search
- Real-time product search by name or category
- Category pill filters
- Shows stock availability and price
- Out-of-stock products visually dimmed

### 🚚 Supplier Management (Admin only)
- Add / Edit / Delete suppliers
- Link suppliers to product categories
- Contact info, email, and address stored

---

## 💾 Data Storage

All data is stored in **localStorage** under these keys:

| Key | Contents |
|-----|----------|
| `fm_products` | Product catalogue array |
| `fm_suppliers` | Supplier records array |
| `fm_transactions` | Bill/transaction history array |

> Data resets if you clear browser storage. Products and suppliers persist between sessions.

---

## 📱 Responsive Design

- **Desktop**: Full sidebar + content layout
- **Tablet**: Collapsed stats grid, single-column charts
- **Mobile**: Hamburger menu, slide-in sidebar, stacked layout

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Custom properties, flexbox, grid, animations |
| Vanilla JavaScript (ES6+) | All app logic, no frameworks |
| [Chart.js 4](https://www.chartjs.org/) | Bar and doughnut charts in Reports |
| [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) | Typography |
| localStorage API | Client-side data persistence |

---

## 🌐 Pushing to GitHub

```bash
# 1. Create a new repo on github.com first, then:

cd grocery-store
git init
git add .
git commit -m "Initial commit: FreshMart grocery management system"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/freshmart.git
git push -u origin main
```

---

## 📋 Demo Data

The app ships with:
- **20 products** across 7 categories (Dairy, Fruits, Vegetables, Grains, Bakery, Snacks, Beverages)
- **6 suppliers** (Amul Dairy, Golden Grains, Farm Fresh, etc.)
- **~45 mock transactions** spread over the last 7 days

---

## 👥 Target Users

| User | Access Level |
|------|-------------|
| Store Manager (Admin) | All pages |
| Staff / Cashier | Inventory, Billing, Search |
| Customer | Product Search only |

---

*Built as a college project demonstration — FreshMart © 2024*
