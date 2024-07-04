const User = require("../models/user");
const jwt = require("jsonwebtoken");
const exception =require('./exceptionController')

async function dashboard(req,res){
  return res.status(200).json({message: 'welcome to specific dashboard'})
}
//it takes email and password of the user and login on these credentials
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      if (password == user.password) {
        var token = generateToken(user);
        // console.log('token of user',token);
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
    res.status(500).json({ error: error.message });
    exception.handleException(res,error,'loginFunction')
  }
}
function generateToken(User) {
  const payload = {
    role: User.role,
    id: User._id,
  };
  const token = jwt.sign(payload, "Hamid");
  return token;
}
//it check if the user already exst if does not exist then create a new user
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
    exception.handleException(res,error,'createUser');
    res.status(500).json({ error: error.message });
  }
}
// get the list of all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    exception.handleException(res,err,'getAllUsers');
    res.status(500).json({ error: err.message });
  }
}
//get a specific user using id
async function getUser(req, res) {
  try {
    const id = req.params.id
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    exception.handleException(res,err,'getUser');
    res.status(500).json({ error: err.message });
  }
}
//update the information of the user using id
async function updateUser(req, res) {
  try {
    const { id } = reqparams;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    exception.handleException(res,err,'updateUser');
    res.status(500).json({ error: err.message });
  }
}
//delete the specific user by using id of the user
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndRemove(id);
    res.status(200).json(deleteUser);
  } catch (err) {
    exception.handleException(res,err,'deleteUser');
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
  getUser,
};
