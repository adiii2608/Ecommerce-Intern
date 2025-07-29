const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const MySQLStore = require('express-mysql-session')(session);

const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const app = express();
const PORT = 5000;
const crypto = require('crypto');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aditya',
  database: 'ecommerce'
});

const sessionStore = new MySQLStore({}, db.promise());
app.use(express.json()); // built-in JSON parser

//cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//session setup
app.use(session({
  secret: 'secretKey123',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { secure: false }
}));

app.post('/order', async (req, res) => {
  const {
    order_instructions,
    delivery_instructions,
    address_line1,
    address_line2,
    city,
    state,
    zip_code,
    country
  } = req.body;

  const userId = req.session.user?.id;
  if (!userId) {
    return res.status(403).json({ success: false, message: 'User not logged in' });
  }

  db.query(
    `INSERT INTO orders (user_id, order_instructions, delivery_instructions,
      address_line1, address_line2, city, state, zip_code, country)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      order_instructions,
      delivery_instructions,
      address_line1,
      address_line2,
      city,
      state,
      zip_code,
      country
    ],
    (err, result) => {
      if (err) {
        console.error("Order insert error:", err);
        return res.status(500).json({ success: false, error: err });
      }
      res.json({ success: true, message: 'Order placed successfully', orderId: result.insertId });
    }
  );
});

//razorpay
// Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_o08YVZwKcCbv9M',
  key_secret: 'Kk7Sp1T1mDRiFU4Px2hBNWsR'
});

// UPDATED: Create order route with better error handling
app.post('/create-order', async (req, res) => {
  try {
    console.log("📥 Received /create-order body:", req.body);
    console.log("👤 Session user:", req.session.user);

    // Check if user is logged in
    if (!req.session.user) {
      console.log("❌ User not logged in");
      return res.status(403).json({ error: "User not logged in" });
    }

    if (!req.body || typeof req.body.amount === 'undefined') {
      console.log("❌ Bad Request: Missing amount in body");
      return res.status(400).json({ error: "Amount is required" });
    }

    const { amount } = req.body;

    if (amount <= 0) {
      console.log("❌ Invalid amount:", amount);
      return res.status(400).json({ error: "Amount must be greater than 0" });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${req.session.user.id}`
    };

    console.log("🔧 Creating Razorpay order with options:", options);
    const order = await razorpay.orders.create(options);
    console.log("✅ Razorpay Order Created:", order);
    
    res.json(order);

  } catch (err) {
    console.error("❌ Razorpay order creation failed:", err);
    res.status(500).json({ 
      error: "Failed to create order", 
      details: err.message 
    });
  }
});

// UPDATED: Verify payment route with proper data handling
app.post('/verify-payment', (req, res) => {
  const { 
    razorpay_order_id, 
    razorpay_payment_id, 
    razorpay_signature, 
    cart, 
    user_id, 
    instructions, 
    delivery, 
    totalAmount,
    addressData 
  } = req.body;

  console.log("🔍 Verifying payment:", {
    razorpay_order_id,
    razorpay_payment_id,
    user_id,
    totalAmount
  });

  // Get user_id from session if not provided
  const userId = user_id || req.session.user?.id;
  
  if (!userId) {
    console.log("❌ No user ID found");
    return res.status(403).json({ success: false, message: 'User not logged in' });
  }

  // Verify signature
  const hmac = crypto.createHmac('sha256', 'Kk7Sp1T1mDRiFU4Px2hBNWsR');
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest('hex');

  console.log("🔐 Signature verification:", {
    provided: razorpay_signature,
    generated: generatedSignature,
    match: generatedSignature === razorpay_signature
  });

  if (generatedSignature === razorpay_signature) {
    console.log("✅ Payment signature verified, saving order...");
    
    // Save the order to database
    db.query(
      `INSERT INTO orders (
        user_id, 
        cart_data, 
        total_amount, 
        order_instructions, 
        delivery_instructions, 
        payment_id, 
        payment_status,
        address_line1,
        address_line2,
        city,
        state,
        zip_code,
        country
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId, 
        JSON.stringify(cart), 
        totalAmount, 
        instructions, 
        delivery, 
        razorpay_payment_id, 
        'SUCCESS',
        addressData?.address_line1 || '',
        addressData?.address_line2 || '',
        addressData?.city || '',
        addressData?.state || '',
        addressData?.zip_code || '',
        addressData?.country || ''
      ],
      (err, result) => {
        if (err) {
          console.error("❌ Database error:", err);
          return res.status(500).json({ success: false, error: err.message });
        }
        
        console.log("✅ Order saved successfully, ID:", result.insertId);
        res.json({ 
          success: true, 
          message: "Payment verified and order saved",
          orderId: result.insertId 
        });
      }
    );
  } else {
    console.log("❌ Payment signature verification failed");
    return res.status(400).json({ 
      success: false, 
      message: "Payment verification failed" 
    });
  }
});

app.post('/save-order', (req, res) => {
  const { user_id, cartItems, totalAmount, deliveryInstructions, orderInstructions } = req.body;

  db.query(
    'INSERT INTO orders (user_id, order_items, total_amount, delivery_instructions, order_instructions, status) VALUES (?, ?, ?, ?, ?, ?)',
    [user_id, JSON.stringify(cartItems), totalAmount, deliveryInstructions, orderInstructions, 'paid'],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, error: err });
      res.json({ success: true, orderId: result.insertId });
    }
  );
});

// SAVE Cart
app.post('/cart', (req, res) => {
  const { cartItems } = req.body;
  const userId = req.session.user?.id;
  if (!userId) return res.status(403).json({ error: 'Not logged in' });

  db.query('DELETE FROM cart WHERE user_id = ?', [userId], () => {
    const values = cartItems.map(item => [userId, item.id, item.quantity]);
    if (values.length === 0) return res.json({ success: true });

    db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES ?', [values], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
    });
  });
});

// GET Cart
app.get('/cart', (req, res) => {
  const userId = req.session.user?.id;
  if (!userId) return res.status(403).json({ error: 'Not logged in' });

  db.query('SELECT product_id AS id, quantity FROM cart WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ cartItems: rows });
  });
});

// REGISTER TESTING
app.post('/register', async (req, res) => {
  const { full_name, email, phone, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10); // hash the password

  db.query(
    'INSERT INTO users (full_name, email, phone, username, password) VALUES (?, ?, ?, ?, ?)',
    [full_name, email, phone, username, hashedPassword],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ success: false, message: 'Username or email already exists' });
        }
        return res.status(500).json({ success: false, error: err });
      }
      res.json({ success: true, message: 'Registration successful' });
    }
  );
});

//login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("🔐 Login attempt - Username:", username, "Password:", password);

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: 'Database error', error: err });
    }

    if (results.length === 0) {
      console.log("❌ No user found with username:", username);
      return res.status(401).json({ success: false, message: 'Invalid credentials (user not found)' });
    }

    const user = results[0];
    console.log("✅ User found:", {
      id: user.id,
      username: user.username,
      passwordHash: user.password.substring(0, 20) + "..." // Show first 20 chars of hash
    });

    // Compare hashed password with entered password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password comparison result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ success: false, message: 'Invalid credentials (wrong password)' });
    }
//session created upon login
    req.session.user = { id: user.id, username: user.username };
    console.log("✅ Login successful, session created");
    return res.json({ success: true, user: req.session.user });
  });
});

// SESSION Check
app.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// LOGOUT
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Logout error');
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});