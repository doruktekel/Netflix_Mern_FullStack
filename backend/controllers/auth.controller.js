import { UserModel } from "../models/auth.model.js";
import { generateToken } from "../utils/generateTokenSetCookie.js";
import { comparePassword, hashPassword } from "../utils/pass.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields should be required !" });
    }

    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username should be min 3 characters !",
      });
    }
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = re.test(String(email).toLowerCase());

    if (!isValidEmail) {
      return res.status(400).json({
        success: false,
        message: "Email should be real email formats",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be min 6 characters !",
      });
    }

    const alreadyUsedEmail = await UserModel.findOne({ email });

    if (alreadyUsedEmail) {
      return res.status(400).json({
        success: false,
        message: "This email has been already registered !",
      });
    }

    const alreadyUsedUsername = await UserModel.findOne({ username });

    if (alreadyUsedUsername) {
      return res.status(400).json({
        success: false,
        message: "This username has been already registered !",
      });
    }

    const hashedPassword = await hashPassword(password);

    const avatars = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const randomAvatarNumber =
      avatars[Math.floor(Math.random() * avatars.length)];

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      image: avatars[randomAvatarNumber],
    });

    generateToken(newUser._id, res);

    const { password: _, ...rest } = newUser._doc;

    res.status(201).json({ success: true, user: rest });
  } catch (error) {
    console.log("Error in register controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required !",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateToken(user._id, res);

    const { password: _, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      user: rest,
    });
  } catch (error) {
    console.log("Login func error", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt-netflix").status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout func", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const check = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log("Error in check func", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
