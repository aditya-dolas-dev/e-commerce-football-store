const zod = require("zod");
const { User } = require("../model/db");
const { Address } = require("../model/db");
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

/**************Address -controller--**************/

const addressZodSchema = zod.object({
  fullName: zod.string(),
  street: zod.string(),
  city: zod.string(),
  state: zod.string(),
  zipCode: zod.string(),
  country: zod.string(),
  phone: zod.string(),
});

const addressCreate = async (req, res) => {
  const result = addressZodSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json({ msg: "Validation Failed", errors: result.error.format() });
  }

  try {
    const { user, fullName, street, city, state, zipCode, country, phone } =
      result.data;

    const addressCount = await Address.countDocuments({ user });

    if (addressCount >= 5) {
      return res.status(400).json({
        msg: "You can only add up to 5 addresses.",
      });
    }

    const newAddess = await Address.create({
      user: req.user.userId,
      fullName,
      street,
      city,
      zipCode,
      state,
      country,
      phone,
    });
    res.status(201).json({ msg: "Address added successfully", newAddess });
  } catch (error) {
    res.status(400).json({ msg: "Error creating address", error: err });
  }
};

// find all address of user using jwt token

const addressFetch = async (req, res) => {
  const user = req.user.userId;

  try {
    if (!user) {
      return res.status(404).json({ msg: "user does not exist " });
    }
    const fetchaddress = await Address.find({ user });
    if (!fetchaddress) {
      return res.status(404).json({ msg: "No addresses found" });
    }
    res.status(200).json({
      msg: "Fetching addresses successful",
      addresses: fetchaddress,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error, msg: "error while fetching addresses" });
  }
};

// update address

const addressUpdateSchema = zod.object({
  fullName: zod.string().optional(),
  street: zod.string().optional(),
  city: zod.string().optional(),
  state: zod.string().optional(),
  zipCode: zod.string().optional(),
  country: zod.string().optional(),
  phone: zod.string().optional(),
});

const addressUpdate = async (req, res) => {
  const addressId = req.params.id;
  const result = addressUpdateSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(401)
      .json({ msg: "Validation Failed", errors: result.error.format() });
  }

  const { fullName, street, city, state, country, zipCode, phone } =
    result.data;

  const updateAddress = await Address.findByIdAndUpdate(addressId, {
    fullName,
    street,
    city,
    state,
    country,
    zipCode,
    phone,
  });

  if (!updateAddress) {
    return res.status(404).json({ msg: "Address not found" });
  }

  return res
    .status(200)
    .json({ msg: "address updated succesfully ", updateAddress });
};

module.exports = {
  signup,
  login,
  profile,
  updateProfile,
  addressCreate,
  addressFetch,
  addressUpdate,
};
