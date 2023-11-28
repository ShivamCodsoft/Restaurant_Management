const express = require("express");
const session = require("express-session");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
require("./db/conn");
const axios = require('axios');
const cheerio = require('cheerio');
const natural = require('natural');
const Weblink = require("./db/weblink");
const Login = require("./models/login");
const Admin = require("./models/login2");
const Order = require("./models/order");
const port = process.env.PORT || 3000;
const app = express();
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const PUBLISHABLE_KEY ="pk_test_51O9qYUL4Nbp759n2FT3siSxhf7CqALjEQLOsCURHh1VFTXw40okwK2faVCc5ZIghroG9j9Szf3181GPauMToi5SB00Oy8mobFZ";
const SECRET_KEY ="sk_test_51O9qYUL4Nbp759n25osryxFuzpgI1KVhouRSDtrOLTwayIaySkqScKX8HIfyXpzQIu3Qj1zL7XQZKdWLulyxvgWA00ks7agYtf";
const stripe = require("stripe")(SECRET_KEY);
const cors = require("cors");
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../template/views");
const partials_path = path.join(__dirname, "../template/partials");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
// ... (existing code)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cart = [];
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
// Initialize passport
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/paysucess", (req, res) => {
  res.render("paysucess");
});
// New route for admin login
app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/payment", (req, res) => {
  res.render("payment");
});

app.get("/cart", (req, res) => {
  res.render("cart", { cart: cart });
});
app.get("/maps", (req, res) => {
  res.render("maps");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/checkout", (req, res) => {
  res.render("checkout");
});
app.post("/checkoutPost", (req, res) => {
  console.log(req.body);
  res.send({ msg: "Done" });
});
app.post("/checkoutPost", async (req, res) => {
  try {
    // Create a new order instance using the Order model
    const newOrder = new Order({
      product: req.body.product,
      quantity: req.body.quantity,
      // Map other fields as needed
    });

    // Save the order to the database
    await newOrder.save();

    console.log("Order saved to the database:", newOrder);
    res.send({ msg: "Order successfully saved" });
  } catch (error) {
    console.error("Error saving order to the database:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmpassword, role } = req.body;

    if (password === confirmpassword) {
      const loginem = new Login({
        name,
        email,
        password,
        role, // Set the role based on user input (e.g., "user" or "admin")
      });

      const token = await loginem.generateToken();
      const registered = await loginem.save();
      console.log("User registered successfully");
      // res.status(201).render("login");
      res.json("User Registered Successfully")
    } else {
      console.log("Password does not match!");
      res.send("Password does not match!");
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).send("An error occurred during registration");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const useremail = await Login.findOne({ email });

    if (!useremail) {
      console.log("User not found");
      return res.status(401).render("login", { error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, useremail.password);

    if (isMatch) {
      if (useremail.role === "admin") {
        console.log("Admin logged in successfully");
        res.status(201).render("admin-dashboard"); // Redirect to the admin dashboard for admins
      } else {
        console.log("User logged in successfully");
        res.status(201).render("payment");
        // res.json("Login sucessfull")
      }
    } else {
      console.log("Incorrect password");
      res.send("Incorrect Password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).render("login");
  }
});
app.post("/admin-register", async (req, res) => {
  try {
    const { name, email, password, confirmpassword, role } = req.body;

    if (password === confirmpassword) {
      const loginem = new Admin({
        name,
        email,
        password,
        role, // Set the role based on user input (e.g., "user" or "admin")
      });

      const token = await loginem.generateToken();
      const registered = await loginem.save();
      console.log("User registered successfully");
      res.status(201).render("admin");
    } else {
      console.log("Password does not match!");
      res.send("Password does not match!");
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).send("An error occurred during registration");
  }
});
app.post("/admin-login", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const useremail = await Admin.findOne({ email });

    if (!useremail) {
      console.log("User not found");
      return res.status(401).render("admin", { error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, useremail.password);

    if (isMatch) {
      console.log("Admin logged in successfully");
      res.status(201).render("admin2"); // Redirect to the admin dashboard for admins
    } else {
      console.log("Incorrect password");
      res.send("Incorrect Password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).render("admin");
  }
});

app.post("/add-to-cart", (req, res) => {
  const productId = req.body.productId; // Assuming you send the product ID from the frontend
  const product = products.find((p) => p.id === productId);

  if (product) {
    // Add the product to the cart
    cart.push(product);
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Product not found" });
  }
});
app.post("/payment", (req, res) => {
  // console.log(totalPrice)
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Shivam Patil",
      address: {
        line1: "Mehta Hostel Mumbai",
        postal_code: "425001",
        city: "Mumbai",
        state: "Maharashtra",
        country: "USA", // Use the ISO 3166-1 alpha-2 country code (e.g., 'IN' for India)
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: "7000", // Amount should be in cents, so 7000 is $70.00
        description: "Food",
        currency: "usd",
        customer: customer.id,
      });
    })
    .then((charge) => {
      console.log(charge);
      res.render("paysucess");
      // res.send("Success");
    })
    .catch((err) => {
      console.error(err);
      console.log(err)
      res.status(500).send("Error"); // You should handle the error more gracefully in a production environment
    });
});
const tokenizer = new natural.WordTokenizer();
const MAX_DEPTH = 10;
const MAX_LINKS_PER_PAGE = 5;
//Function to crawl a page
async function crawl(seedUrl) {
  const visitedUrls = new Set();
  const queue = [{ url: seedUrl, depth: 0 }];
  while (queue.length > 0) {
    const { url, depth } = queue.shift();
    if (depth > MAX_DEPTH) {
      continue;
    }
    if (!visitedUrls.has(url)) {
      visitedUrls.add(url);
      try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        // Extract keywords from the current page's content
        const pageText = $("body").text();
        const keywords = extractKeywords(pageText);
        console.log(`Found relevant content at ${url}`);
        // Add data to MongoDB
        saveToDatabase(url, depth, keywords);
        // Extract links and add them to the queue
        const links = [];
        $("a").each((i, element) => {
          const link = $(element).attr("href");
          if (link) {
            links.push(link);
          }
        });
        const uniqueLinks = [...new Set(links)];
        const linksToCrawl = uniqueLinks.slice(0, MAX_LINKS_PER_PAGE);
        for (const link of linksToCrawl) {
          queue.push({ url: link, depth: depth + 1 });
        }
      } catch (error) {
        // console.error(`Error crawling ${url}:${error.message}`);
        // Continue to the next link in case of an error
        continue;
      }
    }
  }
}
function extractKeywords(text) {
  // Tokenize the text and extract keywords
  const tokens = tokenizer.tokenize(text);
  const keywords = tokens.filter((token) => token.length > 2); //Filter out short words
  return Array.from(new Set(keywords)); // Remove duplicates
}
// Function to save data to MongoDB
async function saveToDatabase(url, depth, keywords) {
  const weblink = new Weblink({
    url,
    depth,
    keywords,
  });
  try {
    await weblink.save();
    console.log(`Data saved for ${url}`);
  } catch (err) {
    // console.error(`Error saving data for ${url}:${err.message}`);
  }
}
// Seed link for the crawler
// const seedLink = 'http://localhost:3000';
// const seedLink = 'https://www.geeksforgeeks.org/softwareengineering-introduction-to-software-engineering/';
// const seedLink = "https://www.linkedin.com";
const seedLink = "https://www.wikipedia.org/";
// Start crawling
crawl(seedLink);

app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});

