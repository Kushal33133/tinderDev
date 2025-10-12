const express = require("express");

const connectDB = require("./config/database");

const { validateSihnUp } = require("./utils/validation");

const User = require("./modals/user");

const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());

app.post("/singup", async (req, res) => {
  try {
    validateSihnUp(req);
    const passwordHash  = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwordHash;
    const user = new User(req.body);
    await user.save();
    res.send("User Created");
  } catch (error) {
    res.status(500).send("Error creating user",error.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).send("Email and password are required");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid email or password");
    }
    res.send("Login successful");
  } catch (error) {
    res.status(500).send("Error creating user",error.message);
  }
});


app.get("/feed", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    //  const user =  await User.find({emailId:userEmail});
    const user = await User.findOne({ emailId: userEmail });
    res.send(user);
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      res.send(user);
    }

    //  if(user.length === 0){
    //   return res.status(404).send("User not found");
    //  }else{

    //  res.send(user);
    //  }
  } catch (error) {
    res.status(500).send("Cannot make get request");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted");
  } catch (error) {
    res.status(500).send("Cannot make get request");
  }
});
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const allowedUpdates = ["photoUrl", "about", "skills", "gender", "age"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Invalid updates!");
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findOneAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated", user);
  } catch (error) {
    res.status(500).send("Cannot make get request", error.message);
  }
});

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
