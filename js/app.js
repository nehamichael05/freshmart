/* =====================================================
   FreshMart – Smart Grocery Management System
   app.js — All application logic (modular sections)
   ===================================================== */

"use strict";

/* =====================================================
   SECTION 1: DEFAULT / SEED DATA
   ===================================================== */

/** Users who can log in */
const DEFAULT_USERS = [
  { username: "admin",    password: "admin123", role: "admin",    name: "Store Manager" },
  { username: "cashier1", password: "cash123",  role: "staff",    name: "Raj Kumar" },
  { username: "customer", password: "cust123",  role: "customer", name: "Guest Customer" },
];

/** Seed product catalogue with Indian grocery items */
const DEFAULT_PRODUCTS = [
  { id:"P001", barcode:"8901234560001", name:"Fresh Milk (1L)",          category:"Dairy",      price:65,  quantity:48, minStock:10, supplier:"S001" },
  { id:"P002", barcode:"8901234560002", name:"Amul Butter (100g)",       category:"Dairy",      price:55,  quantity:30, minStock:8,  supplier:"S001" },
  { id:"P003", barcode:"8901234560003", name:"Basmati Rice (5kg)",       category:"Grains",     price:380, quantity:25, minStock:5,  supplier:"S002" },
  { id:"P004", barcode:"8901234560004", name:"Whole Wheat Bread",        category:"Bakery",     price:45,  quantity:20, minStock:5,  supplier:"S003" },
  { id:"P005", barcode:"8901234560005", name:"Red Apples (1kg)",         category:"Fruits",     price:180, quantity:35, minStock:10, supplier:"S004" },
  { id:"P006", barcode:"8901234560006", name:"Bananas (dozen)",          category:"Fruits",     price:60,  quantity:40, minStock:10, supplier:"S004" },
  { id:"P007", barcode:"8901234560007", name:"Tomatoes (1kg)",           category:"Vegetables", price:50,  quantity:5,  minStock:8,  supplier:"S004" },
  { id:"P008", barcode:"8901234560008", name:"Onions (1kg)",             category:"Vegetables", price:40,  quantity:3,  minStock:10, supplier:"S004" },
  { id:"P009", barcode:"8901234560009", name:"Lays Classic Chips",       category:"Snacks",     price:30,  quantity:60, minStock:15, supplier:"S005" },
  { id:"P010", barcode:"8901234560010", name:"Coca Cola (2L)",           category:"Beverages",  price:95,  quantity:45, minStock:12, supplier:"S006" },
  { id:"P011", barcode:"8901234560011", name:"Tropicana Orange Juice",   category:"Beverages",  price:120, quantity:28, minStock:8,  supplier:"S006" },
  { id:"P012", barcode:"8901234560012", name:"Paneer (200g)",            category:"Dairy",      price:80,  quantity:15, minStock:5,  supplier:"S001" },
  { id:"P013", barcode:"8901234560013", name:"Aashirvaad Atta (5kg)",    category:"Grains",     price:260, quantity:18, minStock:5,  supplier:"S002" },
  { id:"P014", barcode:"8901234560014", name:"Maggi Noodles (6-pack)",   category:"Snacks",     price:90,  quantity:42, minStock:10, supplier:"S005" },
  { id:"P015", barcode:"8901234560015", name:"Eggs (dozen)",             category:"Dairy",      price:90,  quantity:2,  minStock:5,  supplier:"S001" },
  { id:"P016", barcode:"8901234560016", name:"Spinach (bunch)",          category:"Vegetables", price:30,  quantity:20, minStock:5,  supplier:"S004" },
  { id:"P017", barcode:"8901234560017", name:"Cheddar Cheese (200g)",    category:"Dairy",      price:150, quantity:12, minStock:5,  supplier:"S001" },
  { id:"P018", barcode:"8901234560018", name:"Parle-G Biscuits",         category:"Snacks",     price:10,  quantity:100,minStock:20, supplier:"S005" },
  { id:"P019", barcode:"8901234560019", name:"Green Tea (25 bags)",      category:"Beverages",  price:130, quantity:22, minStock:6,  supplier:"S006" },
  { id:"P020", barcode:"8901234560020", name:"Potato Chips (Large)",     category:"Snacks",     price:50,  quantity:55, minStock:15, supplier:"S005" },
];

/** Seed supplier data */
const DEFAULT_SUPPLIERS = [
  { id:"S001", name:"Amul Dairy Co.",           contact:"+91 9876543210", email:"amul@supplier.com",       address:"Anand, Gujarat",        products:"Dairy" },
  { id:"S002", name:"Golden Grains Ltd.",        contact:"+91 9876543211", email:"golden@supplier.com",     address:"Pune, Maharashtra",     products:"Grains" },
  { id:"S003", name:"Fresh Bake Industries",     contact:"+91 9876543212", email:"freshbake@supplier.com",  address:"Mumbai, Maharashtra",   products:"Bakery" },
  { id:"S004", name:"Farm Fresh Produce",        contact:"+91 9876543213", email:"farmfresh@supplier.com",  address:"Nashik, Maharashtra",   products:"Fruits, Vegetables" },
  { id:"S005", name:"Snack World Distributors",  contact:"+91 9876543214", email:"snackworld@supplier.com", address:"Delhi, NCR",            products:"Snacks" },
  { id:"S006", name:"Beverage Hub Pvt. Ltd.",    contact:"+91 9876543215", email:"bevhub@supplier.com",     address:"Bengaluru, Karnataka",  products:"Beverages" },
];

/** Generate realistic mock transaction history for the past 7 days */
function generateMockTransactions() {
  const txns = [];
  const cashiers = ["Raj Kumar", "Priya Singh", "admin"];
  const now = Date.now();
  const day = 86400000;

  for (let d = 0; d < 7; d++) {
    const billsCount = Math.floor(Math.random() * 6) + 3; // 3-8 bills per day
    for (let b = 0; b < billsCount; b++) {
      const products = getProducts();
      const itemCount = Math.floor(Math.random() * 4) + 1;
      const items = [];
      let subtotal = 0;
      for (let i = 0; i < itemCount; i++) {
        const p = products[Math.floor(Math.random() * products.length)];
        const qty = Math.floor(Math.random() * 3) + 1;
        items.push({ productId: p.id, name: p.name, price: p.price, qty });
        subtotal += p.price * qty;
      }
      const tax   = parseFloat((subtotal * 0.05).toFixed(2));
      const total = parseFloat((subtotal + tax).toFixed(2));
      txns.push({
        id:       `BILL-${String(txns.length + 1).padStart(4, "0")}`,
        date:     new Date(now - d * day - Math.random() * day * 0.8).toISOString(),
        customer: "Walk-in Customer",
        items,
        subtotal,
        tax,
        total,
        cashier: cashiers[Math.floor(Math.random() * cashiers.length)],
      });
    }
  }
  return txns.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/* =====================================================
   SECTION 2: LOCALSTORAGE HELPERS
   ===================================================== */

/** Retrieve products array from localStorage (or seed defaults) */
function getProducts() {
  const raw = localStorage.getItem("fm_products");
  return raw ? JSON.parse(raw) : DEFAULT_PRODUCTS;
}

/** Persist products array to localStorage */
function saveProducts(products) {
  localStorage.setItem("fm_products", JSON.stringify(products));
}

/** Retrieve suppliers */
function getSuppliers() {
  const raw = localStorage.getItem("fm_suppliers");
  return raw ? JSON.parse(raw) : DEFAULT_SUPPLIERS;
}

/** Persist suppliers */
function saveSuppliers(suppliers) {
  localStorage.setItem("fm_suppliers", JSON.stringify(suppliers));
}

/** Retrieve transactions */
function getTransactions() {
  const raw = localStorage.getItem("fm_transactions");
  if (raw) return JSON.parse(raw);
  // Seed mock data on first run
  const mock = generateMockTransactions();
  saveTransactions(mock);
  return mock;
}

/** Persist transactions */
function saveTransactions(txns) {
  localStorage.setItem("fm_transactions", JSON.stringify(txns));
}

/** Generate a new product ID */
function generateProductId() {
  const products = getProducts();
  const maxNum = products.reduce((max, p) => {
    const n = parseInt(p.id.replace("P", ""), 10);
    return n > max ? n : max;
  }, 0);
  return "P" + String(maxNum + 1).padStart(3, "0");
}

/** Generate a new supplier ID */
function generateSupplierId() {
  const suppliers = getSuppliers();
  const maxNum = suppliers.reduce((max, s) => {
    const n = parseInt(s.id.replace("S", ""), 10);
    return n > max ? n : max;
  }, 0);
  return "S" + String(maxNum + 1).padStart(3, "0");
}

/** Generate a random barcode string */
function generateBarcode() {
  return "89012345" + String(Math.floor(Math.random() * 99999)).padStart(5, "0");
}

/* =====================================================
   SECTION 3: AUTHENTICATION
   ===================================================== */

/** Currently logged-in user object (null when logged out) */
let currentUser = null;

/** Handle login form submission */
function handleLogin() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const role     = document.getElementById("loginRole").value;
  const errEl    = document.getElementById("loginError");

  // Basic validation
  if (!username || !password) {
    errEl.textContent = "Please enter username and password.";
    errEl.classList.remove("hidden");
    return;
  }

  // Find matching user
  const user = DEFAULT_USERS.find(
    u => u.username === username && u.password === password && u.role === role
  );

  if (!user) {
    errEl.textContent = "Invalid username, password, or role. Check demo credentials below.";
    errEl.classList.remove("hidden");
    return;
  }

  // Successful login
  currentUser = user;
  errEl.classList.add("hidden");
  showApp();
}

/** Handle logout */
function handleLogout() {
  currentUser = null;
  cart = [];
  document.getElementById("mainApp").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
  // Clear form fields
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";
}

/** Show the main app after login */
function showApp() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");

  // Update sidebar user info
  document.getElementById("sidebarName").textContent = currentUser.name;
  document.getElementById("sidebarRole").textContent =
    currentUser.role === "admin" ? "Administrator" :
    currentUser.role === "staff" ? "Cashier / Staff" : "Customer";
  document.getElementById("sidebarAvatar").textContent = currentUser.name[0].toUpperCase();
  document.getElementById("topbarUserName").textContent = currentUser.name;

  // Show/hide admin-only nav items
  document.querySelectorAll(".admin-only").forEach(el => {
    el.style.display = currentUser.role === "admin" ? "flex" : "none";
  });

  // Default landing page based on role
  const landingPage = currentUser.role === "customer" ? "search" : "dashboard";
  navigateTo(landingPage);
  updateTopbarDate();
}

/* =====================================================
   SECTION 4: NAVIGATION / ROUTING
   ===================================================== */

/** Navigate to a named page section */
function navigateTo(page) {
  // Hide all sections
  document.querySelectorAll(".page-section").forEach(s => s.classList.add("hidden"));

  // Show target section
  const target = document.getElementById(page + "Page");
  if (target) target.classList.remove("hidden");

  // Update active nav item
  document.querySelectorAll(".nav-item").forEach(a => {
    a.classList.toggle("active", a.dataset.page === page);
  });

  // Update page title in top bar
  const titles = {
    dashboard: "Dashboard",
    inventory: "Inventory",
    billing:   "Billing / POS",
    search:    "Product Search",
    reports:   "Reports & Analytics",
    suppliers: "Supplier Management",
  };
  document.getElementById("pageTitle").textContent = titles[page] || page;

  // Render the section content
  switch (page) {
    case "dashboard":  renderDashboard();   break;
    case "inventory":  renderInventoryTable(); break;
    case "billing":    renderBillingProducts(); break;
    case "search":     renderCustomerSearch(); renderCategoryPills(); break;
    case "reports":    renderReports();      break;
    case "suppliers":  renderSupplierTable(); break;
  }

  // Close sidebar on mobile after navigation
  if (window.innerWidth <= 768) {
    document.getElementById("sidebar").classList.remove("open");
  }
}

/** Toggle sidebar on mobile */
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

/** Update date in top bar */
function updateTopbarDate() {
  const now = new Date();
  document.getElementById("topbarDate").textContent = now.toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric"
  });
}

/* =====================================================
   SECTION 5: DASHBOARD
   ===================================================== */

/** Render the dashboard with stats, recent transactions, low stock */
function renderDashboard() {
  const products     = getProducts();
  const transactions = getTransactions();
  const today        = new Date().toDateString();

  // Today's transactions
  const todayTxns = transactions.filter(t => new Date(t.date).toDateString() === today);
  const todayRevenue = todayTxns.reduce((sum, t) => sum + t.total, 0);

  // Low stock count
  const lowStockCount = products.filter(p => p.quantity <= p.minStock).length;

  // Update stat cards
  document.getElementById("statTotalProducts").textContent = products.length;
  document.getElementById("statTodaySales").textContent    = "₹" + todayRevenue.toFixed(0);
  document.getElementById("statLowStock").textContent      = lowStockCount;
  document.getElementById("statTotalBills").textContent    = todayTxns.length;

  // Recent transactions (last 5)
  const recentTbody = document.getElementById("recentTransactions");
  const recent5     = transactions.slice(0, 5);

  if (recent5.length === 0) {
    recentTbody.innerHTML = `<tr><td colspan="5" class="empty-state"><p>No transactions yet.</p></td></tr>`;
  } else {
    recentTbody.innerHTML = recent5.map(t => `
      <tr>
        <td><strong>${t.id}</strong></td>
        <td>${formatDateTime(t.date)}</td>
        <td>${t.items.length} item${t.items.length !== 1 ? "s" : ""}</td>
        <td><strong>₹${t.total.toFixed(2)}</strong></td>
        <td>${t.cashier}</td>
      </tr>
    `).join("");
  }

  // Low stock list
  const lowStockEl = document.getElementById("lowStockList");
  const lowItems   = products.filter(p => p.quantity <= p.minStock);

  if (lowItems.length === 0) {
    lowStockEl.innerHTML = `<div class="empty-state"><div class="empty-icon">✅</div><p>All products are well-stocked!</p></div>`;
  } else {
    lowStockEl.innerHTML = lowItems.map(p => `
      <div class="low-stock-item">
        <div>
          <div class="low-stock-name">${p.name}</div>
          <div class="low-stock-qty">${p.category} • Min: ${p.minStock}</div>
        </div>
        <span class="badge ${p.quantity === 0 ? "badge-red" : "badge-orange"}">
          ${p.quantity === 0 ? "Out of Stock" : p.quantity + " left"}
        </span>
      </div>
    `).join("");
  }
}

/* =====================================================
   SECTION 6: INVENTORY MANAGEMENT
   ===================================================== */

/** Render the inventory table with search and filter */
function renderInventoryTable() {
  const products   = getProducts();
  const searchTerm = (document.getElementById("inventorySearch")?.value || "").toLowerCase();
  const catFilter  = document.getElementById("categoryFilter")?.value || "";
  const stkFilter  = document.getElementById("stockFilter")?.value || "";

  // Apply filters
  let filtered = products.filter(p => {
    const matchSearch = !searchTerm ||
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.barcode.includes(searchTerm) ||
      p.id.toLowerCase().includes(searchTerm);
    const matchCat    = !catFilter || p.category === catFilter;
    const matchStock  = !stkFilter ||
      (stkFilter === "low" && p.quantity <= p.minStock) ||
      (stkFilter === "ok"  && p.quantity > p.minStock);
    return matchSearch && matchCat && matchStock;
  });

  const tbody = document.getElementById("inventoryBody");

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="empty-state"><div class="empty-icon">🔍</div><p>No products found.</p></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const isLow = p.quantity <= p.minStock;
    const statusBadge = p.quantity === 0
      ? `<span class="badge badge-red">Out of Stock</span>`
      : isLow
        ? `<span class="badge badge-orange">Low Stock</span>`
        : `<span class="badge badge-green">In Stock</span>`;

    return `
      <tr>
        <td><code>${p.id}</code></td>
        <td><code>${p.barcode}</code></td>
        <td><strong>${p.name}</strong></td>
        <td><span class="badge badge-blue">${p.category}</span></td>
        <td>₹${p.price.toFixed(2)}</td>
        <td class="${isLow ? "text-orange" : ""}">${p.quantity}</td>
        <td>${p.minStock}</td>
        <td>${statusBadge}</td>
        <td>
          <button class="btn btn-sm" onclick="openProductModal('${p.id}')">✏️ Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteProduct('${p.id}')" style="margin-left:4px;">🗑️</button>
        </td>
      </tr>
    `;
  }).join("");
}

/** Open Add/Edit Product modal */
function openProductModal(productId = null) {
  const modal     = document.getElementById("productModal");
  const titleEl   = document.getElementById("productModalTitle");
  const supplierSel = document.getElementById("pSupplier");

  // Populate supplier dropdown
  const suppliers = getSuppliers();
  supplierSel.innerHTML = `<option value="">Select supplier...</option>` +
    suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join("");

  if (productId) {
    // Edit mode: pre-fill form
    const p = getProducts().find(x => x.id === productId);
    if (!p) return;
    titleEl.textContent = "Edit Product";
    document.getElementById("editProductId").value = p.id;
    document.getElementById("pName").value      = p.name;
    document.getElementById("pCategory").value  = p.category;
    document.getElementById("pPrice").value     = p.price;
    document.getElementById("pQuantity").value  = p.quantity;
    document.getElementById("pMinStock").value  = p.minStock;
    document.getElementById("pBarcode").value   = p.barcode;
    document.getElementById("pSupplier").value  = p.supplier || "";
  } else {
    // Add mode: clear form
    titleEl.textContent = "Add New Product";
    document.getElementById("editProductId").value = "";
    ["pName","pPrice","pQuantity","pBarcode"].forEach(id =>
      document.getElementById(id).value = ""
    );
    document.getElementById("pCategory").value = "Dairy";
    document.getElementById("pMinStock").value = "5";
    document.getElementById("pSupplier").value = "";
  }

  modal.classList.remove("hidden");
}

/** Close product modal */
function closeProductModal() {
  document.getElementById("productModal").classList.add("hidden");
}

/** Save product (add or update) */
function saveProduct() {
  const name     = document.getElementById("pName").value.trim();
  const category = document.getElementById("pCategory").value;
  const price    = parseFloat(document.getElementById("pPrice").value);
  const qty      = parseInt(document.getElementById("pQuantity").value, 10);
  const minStock = parseInt(document.getElementById("pMinStock").value, 10) || 5;
  let   barcode  = document.getElementById("pBarcode").value.trim();
  const supplier = document.getElementById("pSupplier").value;
  const editId   = document.getElementById("editProductId").value;

  // Validation
  if (!name || isNaN(price) || isNaN(qty)) {
    showToast("Please fill in all required fields.", "error");
    return;
  }
  if (price < 0 || qty < 0) {
    showToast("Price and quantity cannot be negative.", "error");
    return;
  }

  if (!barcode) barcode = generateBarcode();

  const products = getProducts();

  if (editId) {
    // Update existing product
    const idx = products.findIndex(p => p.id === editId);
    if (idx > -1) {
      products[idx] = { ...products[idx], name, category, price, quantity: qty, minStock, barcode, supplier };
      saveProducts(products);
      showToast("Product updated successfully!", "success");
    }
  } else {
    // Add new product
    products.push({
      id: generateProductId(),
      barcode, name, category, price,
      quantity: qty, minStock, supplier,
    });
    saveProducts(products);
    showToast("Product added successfully!", "success");
  }

  closeProductModal();
  renderInventoryTable();
}

/** Delete a product after confirmation */
function deleteProduct(productId) {
  if (!confirm(`Are you sure you want to delete this product?\nThis action cannot be undone.`)) return;

  const products = getProducts().filter(p => p.id !== productId);
  saveProducts(products);
  renderInventoryTable();
  showToast("Product deleted.", "info");
}

/* =====================================================
   SECTION 7: BILLING / POS
   ===================================================== */

/** Shopping cart array: [{ productId, name, price, qty }] */
let cart = [];

/** Render the quick-pick product grid in billing */
function renderBillingProducts() {
  const query    = (document.getElementById("billingSearch")?.value || "").toLowerCase();
  const products = getProducts().filter(p =>
    !query || p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
  );

  const grid = document.getElementById("billingProductGrid");

  grid.innerHTML = products.map(p => {
    const isOut   = p.quantity === 0;
    const emoji   = categoryEmoji(p.category);
    return `
      <div
        class="billing-product-card ${isOut ? "out-of-stock" : ""}"
        onclick="addToCart('${p.id}')"
        title="${p.name}"
      >
        <div class="bp-emoji">${emoji}</div>
        <div class="bp-name">${p.name}</div>
        <div class="bp-price">₹${p.price}</div>
        <div class="bp-qty">${isOut ? "Out of stock" : p.quantity + " in stock"}</div>
      </div>
    `;
  }).join("") || `<div class="empty-state"><p>No products found.</p></div>`;
}

/** Add a product to the cart by its ID */
function addToCart(productId) {
  const products = getProducts();
  const product  = products.find(p => p.id === productId);
  if (!product) return;
  if (product.quantity === 0) { showToast("This product is out of stock.", "error"); return; }

  const existing = cart.find(c => c.productId === productId);
  if (existing) {
    // Check stock before incrementing
    if (existing.qty >= product.quantity) {
      showToast("Cannot add more — insufficient stock.", "error"); return;
    }
    existing.qty++;
  } else {
    cart.push({ productId, name: product.name, price: product.price, qty: 1 });
  }

  renderCart();
}

/** Add to cart via barcode input */
function addToCartByBarcode() {
  const input   = document.getElementById("barcodeInput");
  const code    = input.value.trim();
  if (!code) return;

  const product = getProducts().find(p => p.barcode === code || p.id === code);
  if (!product) {
    showToast(`No product found for: ${code}`, "error");
  } else {
    addToCart(product.id);
    showToast(`${product.name} added to cart.`, "success");
  }
  input.value = "";
  input.focus();
}

/** Change quantity of a cart item (+1 or -1) */
function changeQty(productId, delta) {
  const idx = cart.findIndex(c => c.productId === productId);
  if (idx === -1) return;

  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }
  renderCart();
}

/** Clear the cart */
function clearCart() {
  cart = [];
  renderCart();
}

/** Render the cart items and totals */
function renderCart() {
  const cartEl = document.getElementById("cartItems");

  if (cart.length === 0) {
    cartEl.innerHTML = `<div class="empty-state" style="padding:32px 16px;"><div class="empty-icon">🛒</div><p>Cart is empty</p></div>`;
  } else {
    cartEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price} × ${item.qty} = ₹${(item.price * item.qty).toFixed(2)}</div>
        </div>
        <div class="cart-qty-ctrl">
          <button onclick="changeQty('${item.productId}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.productId}', 1)">+</button>
        </div>
      </div>
    `).join("");
  }

  // Update totals
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax      = subtotal * 0.05;
  const total    = subtotal + tax;

  document.getElementById("cartSubtotal").textContent = "₹" + subtotal.toFixed(2);
  document.getElementById("cartTax").textContent      = "₹" + tax.toFixed(2);
  document.getElementById("cartTotal").textContent    = "₹" + total.toFixed(2);
}

/** Generate bill: deduct stock, save transaction, show receipt */
function generateBill() {
  if (cart.length === 0) {
    showToast("Cart is empty. Add products first.", "error"); return;
  }

  const products  = getProducts();
  const customer  = document.getElementById("customerName").value.trim() || "Walk-in Customer";
  const subtotal  = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax       = parseFloat((subtotal * 0.05).toFixed(2));
  const total     = parseFloat((subtotal + tax).toFixed(2));
  const txns      = getTransactions();
  const billId    = "BILL-" + String(txns.length + 1).padStart(4, "0");
  const now       = new Date().toISOString();

  // Deduct quantities from stock
  cart.forEach(item => {
    const idx = products.findIndex(p => p.id === item.productId);
    if (idx > -1) products[idx].quantity = Math.max(0, products[idx].quantity - item.qty);
  });
  saveProducts(products);

  // Save transaction
  const transaction = {
    id:       billId,
    date:     now,
    customer,
    items:    cart.map(i => ({ productId: i.productId, name: i.name, price: i.price, qty: i.qty })),
    subtotal,
    tax,
    total,
    cashier: currentUser.name,
  };
  txns.unshift(transaction);
  saveTransactions(txns);

  // Show receipt modal
  showBillReceipt(transaction);

  // Clear cart
  cart = [];
  renderCart();
  document.getElementById("customerName").value = "";
  renderBillingProducts(); // refresh stock display
}

/** Render and show the bill receipt modal */
function showBillReceipt(txn) {
  const billContent = document.getElementById("billContent");
  const dateStr     = formatDateTime(txn.date);

  billContent.innerHTML = `
    <div class="bill-receipt">
      <div class="bill-store-name">🛒 FreshMart</div>
      <p style="text-align:center;color:#666;font-size:11px;">Smart Grocery Store</p>
      <hr class="bill-divider" />
      <p><strong>Bill #:</strong> ${txn.id}</p>
      <p><strong>Date:</strong> ${dateStr}</p>
      <p><strong>Customer:</strong> ${txn.customer}</p>
      <p><strong>Cashier:</strong> ${txn.cashier}</p>
      <hr class="bill-divider" />
      <div class="bill-items-header">
        <span>Item</span><span>Qty</span><span>Rate</span><span>Amount</span>
      </div>
      <hr class="bill-divider" />
      ${txn.items.map(item => `
        <div class="bill-item-row">
          <span>${item.name}</span>
          <span>${item.qty}</span>
          <span>₹${item.price}</span>
          <span>₹${(item.price * item.qty).toFixed(2)}</span>
        </div>
      `).join("")}
      <hr class="bill-divider" />
      <div class="bill-total-row"><span>Subtotal</span><span>₹${txn.subtotal.toFixed(2)}</span></div>
      <div class="bill-total-row"><span>GST (5%)</span><span>₹${txn.tax.toFixed(2)}</span></div>
      <div class="bill-total-row" style="font-size:16px;border-top:2px solid #333;padding-top:4px;margin-top:4px;">
        <span>TOTAL</span><span>₹${txn.total.toFixed(2)}</span>
      </div>
      <hr class="bill-divider" />
      <div class="bill-thank">Thank you for shopping at FreshMart! 😊</div>
    </div>
  `;

  document.getElementById("billModal").classList.remove("hidden");
}

/** Close the bill modal */
function closeBillModal() {
  document.getElementById("billModal").classList.add("hidden");
}

/** Print the bill receipt */
function printBill() {
  window.print();
}

/* =====================================================
   SECTION 8: PRODUCT SEARCH (Customer View)
   ===================================================== */

let activeCategory = ""; // currently selected category pill

/** Render category filter pills */
function renderCategoryPills() {
  const categories = ["Dairy","Fruits","Vegetables","Grains","Bakery","Snacks","Beverages"];
  const container  = document.getElementById("categoryPills");
  container.innerHTML = categories.map(cat => `
    <span
      class="cat-pill ${activeCategory === cat ? "active" : ""}"
      onclick="filterByCategory('${cat}')"
    >${cat}</span>
  `).join("");
}

/** Filter by category pill click */
function filterByCategory(cat) {
  activeCategory = activeCategory === cat ? "" : cat; // toggle
  renderCategoryPills();
  renderCustomerSearch();
}

/** Render product search results for customer view */
function renderCustomerSearch() {
  const query    = (document.getElementById("customerSearch")?.value || "").toLowerCase();
  const products = getProducts().filter(p => {
    const matchQ   = !query || p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
    const matchCat = !activeCategory || p.category === activeCategory;
    return matchQ && matchCat;
  });

  const resultsEl = document.getElementById("customerSearchResults");

  if (products.length === 0) {
    resultsEl.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <div class="empty-icon">🔍</div>
        <p>No products found. Try a different search.</p>
      </div>`;
    return;
  }

  resultsEl.innerHTML = products.map(p => {
    const isAvail   = p.quantity > 0;
    const stockText = p.quantity === 0
      ? "❌ Out of stock"
      : p.quantity <= p.minStock
        ? `⚠️ Only ${p.quantity} left`
        : `✅ In stock (${p.quantity})`;

    return `
      <div class="product-card ${isAvail ? "" : "unavailable"}">
        <span class="product-card-emoji">${categoryEmoji(p.category)}</span>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-cat">${p.category}</div>
        <div class="product-card-price">₹${p.price.toFixed(2)}</div>
        <div class="product-card-stock">${stockText}</div>
      </div>
    `;
  }).join("");
}

/* =====================================================
   SECTION 9: REPORTS & ANALYTICS
   ===================================================== */

/** References to Chart.js instances (to destroy before re-rendering) */
let salesChartInstance    = null;
let categoryChartInstance = null;

/** Render all reports content */
function renderReports() {
  const period    = document.getElementById("reportPeriod")?.value || "week";
  const allTxns   = getTransactions();
  const filtered  = filterTxnsByPeriod(allTxns, period);
  const products  = getProducts();

  // Calculate summary stats
  const revenue   = filtered.reduce((s, t) => s + t.total, 0);
  const bills     = filtered.length;
  const itemsSold = filtered.reduce((s, t) => s + t.items.reduce((is, i) => is + i.qty, 0), 0);
  const avgBill   = bills > 0 ? revenue / bills : 0;

  document.getElementById("rptRevenue").textContent  = "₹" + revenue.toFixed(0);
  document.getElementById("rptBills").textContent    = bills;
  document.getElementById("rptItemsSold").textContent = itemsSold;
  document.getElementById("rptAvgBill").textContent  = "₹" + avgBill.toFixed(0);

  // Render charts
  renderSalesChart(allTxns);
  renderCategoryChart(filtered, products);
  renderTransactionTable(filtered);
}

/** Filter transactions by selected period */
function filterTxnsByPeriod(txns, period) {
  const now   = new Date();
  const day   = 86400000;
  let start;
  if (period === "today") start = new Date(now.toDateString()).getTime();
  else if (period === "week")  start = now.getTime() - 7 * day;
  else                         start = now.getTime() - 30 * day;
  return txns.filter(t => new Date(t.date).getTime() >= start);
}

/** Bar chart: daily revenue for last 7 days */
function renderSalesChart(allTxns) {
  const labels = [];
  const data   = [];
  const day    = 86400000;
  const now    = Date.now();

  for (let i = 6; i >= 0; i--) {
    const dayStart = new Date(new Date(now - i * day).toDateString()).getTime();
    const dayEnd   = dayStart + day;
    const rev      = allTxns
      .filter(t => { const d = new Date(t.date).getTime(); return d >= dayStart && d < dayEnd; })
      .reduce((s, t) => s + t.total, 0);
    labels.push(new Date(dayStart).toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }));
    data.push(parseFloat(rev.toFixed(2)));
  }

  const ctx = document.getElementById("salesChart").getContext("2d");
  if (salesChartInstance) salesChartInstance.destroy();

  salesChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Revenue (₹)",
        data,
        backgroundColor: "rgba(37,99,235,0.75)",
        borderColor:     "#2563eb",
        borderWidth:     1.5,
        borderRadius:    6,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: v => "₹" + v },
          grid: { color: "#f1f5f9" },
        },
        x: { grid: { display: false } },
      },
    },
  });
}

/** Doughnut chart: sales by category */
function renderCategoryChart(txns, products) {
  // Build a product-to-category map
  const catMap = {};
  products.forEach(p => { catMap[p.id] = p.category; });

  // Sum revenue per category
  const catRevenue = {};
  txns.forEach(t => {
    t.items.forEach(item => {
      const cat = catMap[item.productId] || "Other";
      catRevenue[cat] = (catRevenue[cat] || 0) + item.price * item.qty;
    });
  });

  const labels = Object.keys(catRevenue);
  const data   = Object.values(catRevenue).map(v => parseFloat(v.toFixed(2)));
  const colors = ["#2563eb","#16a34a","#ea580c","#7c3aed","#0891b2","#b45309","#be185d","#65a30d"];

  const ctx = document.getElementById("categoryChart").getContext("2d");
  if (categoryChartInstance) categoryChartInstance.destroy();

  categoryChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 2,
        borderColor: "#fff",
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom", labels: { padding: 12, font: { size: 12 } } },
      },
      cutout: "60%",
    },
  });
}

/** Render the transaction history table */
function renderTransactionTable(txns) {
  const tbody = document.getElementById("transactionBody");

  if (txns.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="empty-state"><p>No transactions in this period.</p></td></tr>`;
    return;
  }

  tbody.innerHTML = txns.map(t => `
    <tr>
      <td><strong>${t.id}</strong></td>
      <td>${formatDateTime(t.date)}</td>
      <td>${t.customer}</td>
      <td>${t.items.length} item${t.items.length !== 1 ? "s" : ""}</td>
      <td>₹${t.subtotal.toFixed(2)}</td>
      <td>₹${t.tax.toFixed(2)}</td>
      <td><strong>₹${t.total.toFixed(2)}</strong></td>
      <td>${t.cashier}</td>
    </tr>
  `).join("");
}

/** Filter transaction table by search input */
function filterTransactions() {
  const query = (document.getElementById("txnSearch")?.value || "").toLowerCase();
  const txns  = filterTxnsByPeriod(getTransactions(), document.getElementById("reportPeriod")?.value || "week");
  const filtered = txns.filter(t =>
    t.id.toLowerCase().includes(query) ||
    t.customer.toLowerCase().includes(query) ||
    t.cashier.toLowerCase().includes(query)
  );
  renderTransactionTable(filtered);
}

/* =====================================================
   SECTION 10: SUPPLIER MANAGEMENT
   ===================================================== */

/** Render the supplier table */
function renderSupplierTable() {
  const suppliers = getSuppliers();
  const tbody     = document.getElementById("supplierBody");

  tbody.innerHTML = suppliers.map(s => `
    <tr>
      <td><code>${s.id}</code></td>
      <td><strong>${s.name}</strong></td>
      <td>${s.contact}</td>
      <td><a href="mailto:${s.email}" style="color:var(--primary);">${s.email}</a></td>
      <td>${s.address}</td>
      <td>${s.products.split(",").map(p => `<span class="badge badge-blue" style="margin:1px;">${p.trim()}</span>`).join("")}</td>
      <td>
        <button class="btn btn-sm" onclick="openSupplierModal('${s.id}')">✏️ Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteSupplier('${s.id}')" style="margin-left:4px;">🗑️</button>
      </td>
    </tr>
  `).join("");
}

/** Open Add/Edit Supplier modal */
function openSupplierModal(supplierId = null) {
  const modal   = document.getElementById("supplierModal");
  const titleEl = document.getElementById("supplierModalTitle");

  if (supplierId) {
    const s = getSuppliers().find(x => x.id === supplierId);
    if (!s) return;
    titleEl.textContent = "Edit Supplier";
    document.getElementById("editSupplierId").value = s.id;
    document.getElementById("sName").value     = s.name;
    document.getElementById("sContact").value  = s.contact;
    document.getElementById("sEmail").value    = s.email;
    document.getElementById("sAddress").value  = s.address;
    document.getElementById("sProducts").value = s.products;
  } else {
    titleEl.textContent = "Add New Supplier";
    document.getElementById("editSupplierId").value = "";
    ["sName","sContact","sEmail","sAddress","sProducts"].forEach(id =>
      document.getElementById(id).value = ""
    );
  }
  modal.classList.remove("hidden");
}

/** Close supplier modal */
function closeSupplierModal() {
  document.getElementById("supplierModal").classList.add("hidden");
}

/** Save supplier (add or update) */
function saveSupplier() {
  const name     = document.getElementById("sName").value.trim();
  const contact  = document.getElementById("sContact").value.trim();
  const email    = document.getElementById("sEmail").value.trim();
  const address  = document.getElementById("sAddress").value.trim();
  const products = document.getElementById("sProducts").value.trim();
  const editId   = document.getElementById("editSupplierId").value;

  if (!name || !contact) {
    showToast("Supplier name and contact are required.", "error"); return;
  }

  const suppliers = getSuppliers();

  if (editId) {
    const idx = suppliers.findIndex(s => s.id === editId);
    if (idx > -1) { suppliers[idx] = { ...suppliers[idx], name, contact, email, address, products }; }
    showToast("Supplier updated!", "success");
  } else {
    suppliers.push({ id: generateSupplierId(), name, contact, email, address, products });
    showToast("Supplier added!", "success");
  }

  saveSuppliers(suppliers);
  closeSupplierModal();
  renderSupplierTable();
}

/** Delete supplier */
function deleteSupplier(supplierId) {
  if (!confirm("Delete this supplier?")) return;
  saveSuppliers(getSuppliers().filter(s => s.id !== supplierId));
  renderSupplierTable();
  showToast("Supplier removed.", "info");
}

/* =====================================================
   SECTION 11: UTILITIES
   ===================================================== */

/**
 * Return an emoji for a product category
 * @param {string} category
 * @returns {string}
 */
function categoryEmoji(category) {
  const map = {
    Dairy:      "🥛",
    Fruits:     "🍎",
    Vegetables: "🥬",
    Grains:     "🌾",
    Bakery:     "🍞",
    Snacks:     "🍟",
    Beverages:  "🥤",
  };
  return map[category] || "🛍️";
}

/**
 * Format an ISO date string to a readable local time
 * @param {string} isoDate
 * @returns {string}
 */
function formatDateTime(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-IN", { day:"2-digit", month:"short" }) +
    " " + d.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" });
}

/**
 * Show a toast notification
 * @param {string} message
 * @param {"success"|"error"|"info"} type
 */
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast     = document.createElement("div");
  const icons     = { success: "✅", error: "❌", info: "ℹ️" };

  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  container.appendChild(toast);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity    = "0";
    toast.style.transform  = "translateX(20px)";
    toast.style.transition = "opacity .3s, transform .3s";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* =====================================================
   SECTION 12: INITIALISATION
   ===================================================== */

/** Runs when the page loads */
document.addEventListener("DOMContentLoaded", () => {
  // Seed data into localStorage if not already present
  if (!localStorage.getItem("fm_products"))  saveProducts(DEFAULT_PRODUCTS);
  if (!localStorage.getItem("fm_suppliers")) saveSuppliers(DEFAULT_SUPPLIERS);
  if (!localStorage.getItem("fm_transactions")) {
    const mock = generateMockTransactions();
    saveTransactions(mock);
  }

  // Allow pressing Enter to log in
  document.getElementById("loginPassword").addEventListener("keypress", e => {
    if (e.key === "Enter") handleLogin();
  });

  // Initialise cart display
  renderCart();

  console.log("✅ FreshMart initialised. Use admin/admin123 to log in.");
});
