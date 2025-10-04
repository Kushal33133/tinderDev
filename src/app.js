const express = require("express");

const connectDB = require("./config/database");

const User = require("./modals/user");

const app = express();

app.use(express.json());


app.post("/singup",async (req,res)=>{
  try {
      const user = new User(req.body);
   await  user.save();
    res.send("User Created");
    
  } catch (error) {

    res.status(500).send("Error creating user");
    
  }
  

})

connectDB()
  .then(() => {
    console.log("Database connected");

    app.listen(7777, () => {
      console.log("Server is Running");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
