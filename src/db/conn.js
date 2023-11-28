const mongoose = require("mongoose");

// const databaseURL = "mongodb://localhost:27017/mydatabase"; // Replace with your own URL
const databaseURL = "mongodb+srv://shivampatil:Suchita%403022@cluster0.rnvmmio.mongodb.net/mydatabase"; // Replace with your own URL

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true,
  })
  .then(() => {
    console.log(`Database connection successful`);
  })
  .catch((error) => {
    console.error(`Database connection failed: ${error}`);
  });
