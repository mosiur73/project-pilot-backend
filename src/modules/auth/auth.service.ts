import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model";

const secret = process.env.JWT_SECRET as string;

const createUser = async (payload: any) => {
  const { name, email, password, role } = payload;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password as string, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const userObj = user.toObject();
  // delete userObj.password;

  return userObj;
};

const loginUser = async (email: string, password: string) => {
//   const user = await User.findOne({ email });
const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const jwtPayload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, secret, { expiresIn: "7d" });

  const userObj = user.toObject();
//  delete userObj.password;

  return { token, user:userObj };
};

export const authService = {
  createUser,
  loginUser,
};




// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User } from "../users/user.model";

// const secret = process.env.JWT_SECRET as string;
// console.log("JWT Secret:", secret);

// const createUser = async (payload: any) => {
//   const { name, email, password, role } = payload;

//   const existingUser = await User.findOne({ email });
//   if (existingUser) throw new Error("Email already exists");

//   const hashedPassword = await bcrypt.hash(password, 12);

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     role,
//   });

//   // Mongoose select:false hides password automatically
//   const userObj = user.toObject(); 
//   return userObj;
// };

// const loginUser = async (email: string, password: string) => {
//   // include password explicitly for comparison
//   const user = await User.findOne({ email }).select("+password"); 
//   if (!user) throw new Error("User not found");

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new Error("Invalid credentials");

//   const jwtPayload = {
//     id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   };

//   const token = jwt.sign(jwtPayload, secret, { expiresIn: "7d" });

//   // convert to plain object for response
//   const { password: _, ...safeUser } = user.toObject(); // destructuring safely removes password

//   return { token, user: safeUser };
// };

// export const authService = {
//   createUser,
//   loginUser,
// };
