import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/users/user.model";


const secret = process.env.JWT_SECRET as string;

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No token provided",
        });
      }

      const token = authHeader.split(" ")[1];
        if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Token missing",
        });
      }
      // const decoded = jwt.verify(token, secret) as JwtPayload;
      const decoded = jwt.verify(token, secret) as JwtPayload & {
        email: string;
        role: string;
        };

      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: User not found",
        });
      }

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Access denied",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired token",
      });
    }
  };
};

export default auth;
