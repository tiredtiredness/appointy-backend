import { NextFunction, Request, Response } from "express";

import { User } from "@/generated/prisma/client";

import { RegisterDto } from "./auth.dto";
import { authService } from "./auth.service";
import { passportLib } from "./auth.strategy";

class AuthController {
  private setTokenCookies = (res: Response, accessToken: string, refreshToken: string) => {
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  };

  private clearTokenCookies(res: Response): void {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body as RegisterDto;
      const user = await authService.register(username, password);

      const accessToken = authService.generateAccessToken(user.id, user.tokenVersion);
      const refreshToken = authService.generateRefreshToken(user.id, user.tokenVersion);

      this.setTokenCookies(res, accessToken, refreshToken);

      res.status(201).json({
        message: "Registered",
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    passportLib.authenticate("local", { session: false }, (error: Error, user: Express.User) => {
      if (error) {
        next(error);
        return;
      }

      const accessToken = authService.generateAccessToken(user.id, user.tokenVersion);
      const refreshToken = authService.generateRefreshToken(user.id, user.tokenVersion);

      this.setTokenCookies(res, accessToken, refreshToken);

      res.json({
        message: "Authorized",
        user,
      });
    })(req, res, next);
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      const payload = authService.verifyRefreshToken(refreshToken);

      const user = await authService.getUserById(payload.userId);

      const newAccessToken = authService.generateAccessToken(user.id, user.tokenVersion);
      const newRefreshToken = authService.generateRefreshToken(user.id, user.tokenVersion);

      this.setTokenCookies(res, newAccessToken, newRefreshToken);

      res.json({ message: "Tokens refreshed" });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.clearTokenCookies(res);
      res.json({ message: "Logged out" });
    } catch (error) {
      next(error);
    }
  };

  logoutAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.invalidateAllTokens(req.user?.id as string);
      this.clearTokenCookies(res);
      res.json({ message: "Logged out everywhere" });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const updatedUser = await authService.changePassword(
        req.user?.id as string,
        currentPassword,
        newPassword,
      );

      const accessToken = authService.generateAccessToken(updatedUser.id, updatedUser.tokenVersion);
      const refreshToken = authService.generateRefreshToken(
        updatedUser.id,
        updatedUser.tokenVersion,
      );

      this.setTokenCookies(res, accessToken, refreshToken);

      res.json({
        message: "Password changed",
      });
    } catch (error) {
      next(error);
    }
  };

  getProfile = (req: Request, res: Response) => {
    const user = req.user as User;
    res.json({
      user,
    });
  };
}

export const authController = new AuthController();
