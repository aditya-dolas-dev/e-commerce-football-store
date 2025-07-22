const zod = require("zod");
const { User } = require("../model/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

///***********************ZOD SCHEMA******************8 */

const signupSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string().email("Invalid Email format"),
  password: zod
    .string()
    .min(6, "minimum password length atleast 6 characters")
    .max(30, "maximum password length should not exceed 30 character"),
});

///***********************SIGNUP POST METHOD******************8 */

const signup = async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(403)
      .json({ msg: "Validation Failed", errors: result.error.format() });
  }

  const { firstname, lastname, email, password } = result.data;

  // check 1 --> email exist

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return res.status(403).json({ message: "Email already exist" });
  }

  const newUser = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
  });

  // TOKEN CREATION USING JWT ON SIGNUP

  const token = jwt.sign(
    {
      userId: newUser._id,
      role: "user",
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res
    .status(200)
    .json({ newUser, token, message: "user created succesfully" });
};

///***********************ZOD SCHEMA******************8 */

const loginSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
});

///***********************Login POST METHOD******************8 */

const login = async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(403)
      .json({ msg: "Validation Failed", errors: result.error.format() });
  }

  const { email, password } = result.data;

  const user = await User.findOne({ email });

  // if user exist or not  -- > check

  if (!user) {
    return res
      .status(403)
      .json({ message: "email does not exist, please signup" });
  }

  // check if password is correct

  if (user.password !== password) {
    return res.status(403).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: "user",
    },
    JWT_SECRET,
    { expiresIn: "2d" }
  );

  return res.status(200).json({ token, message: "user logged in succesfully" });
};

///***********************PROFILE GET METHOD******************8 */

const profile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// update user profile

const updateProfileSchema = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod
    .string()
    .min(6, "minimum password length atleast 6 characters")
    .max(30, "maximum password length should not exceed 30 character")
    .optional(),
});

// update profile method

const updateProfile = async (req, res) => {
  const userId = req.user.userId;

  const result = updateProfileSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json({ msg: "Validation Failed", errors: result.error.format() });
  }

  const { firstname, lastname, password } = result.data;

  const updateProfile = await User.findByIdAndUpdate(
    userId,
    { firstname, lastname, password },
    { new: true }
  ).select("-email");

  if (!updateProfile) {
    return res.status(404).json({ msg: "User not found" });
  }

  return res.status(200).json({ updateProfile, message: "Profile updated" });
};

module.exports = {
  signup,
  login,
  profile,
  updateProfile,
};
