const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function dashboard(req,res){
  return res.status(200).json({message: 'welcome to specific dashboard'})
}
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      if (password == user.password) {
        var token = generateToken(user);
        console.log('token of user',token);
        return res.status(200).json({
          message: "Login Successful",
          email: email,
          fullname: user.name,
          userid: user._id,
          token: token,
        });
      } else {
        res.status(401).json({ message: "Password didn't match" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}
function generateToken(User) {
  const payload = {
    role: User.role,
    id: User._id,
  };
  const token = jwt.sign(payload, "Mianwali");
  return token;
}

async function createUser(req, res) {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(500).json({ message: "User already registered" });
    } else {
      const user = new User(req.body);
      await user.save();
      res
        .status(201)
        .json({ message: "Successfully registered, please login now." });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndRemove(id);
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  dashboard,
};
