import { userModal } from "@db/User.model";
import { UserError } from "@Types/Error";
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export async function middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies["access_token"];
    const refreshToken = req.cookies["refresh_token"];

    if (!accessToken) {
      throw new UserError({
        name: "SESSION_ERROR",
        message: "Unauthenticated",
        cause: "Access token missing",
      });
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(
        accessToken,
        process.env.SECRET!
      ) as JwtPayload;
    } catch (err: any) {
      if (err.name !== "TokenExpiredError" || !refreshToken) {
        throw err;
      }

      const refreshPayload = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET!
      ) as JwtPayload;

      const user = await userModal.findById(refreshPayload._id);
      if (!user) throw new Error("User not found");

      const newAccessToken = user.generateAccessToken();

      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
      });

      decoded = jwt.verify(
        newAccessToken,
        process.env.SECRET!
      ) as JwtPayload;
    }

    const user = await userModal.findById(decoded._id).select({
      
    });
    if (!user) {
      throw new UserError({
        name: "SESSION_ERROR",
        message: "Unauthenticated",
        cause: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
      error,
    });
  }
}
