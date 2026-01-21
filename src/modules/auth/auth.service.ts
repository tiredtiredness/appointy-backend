import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { prisma } from "@/configs/db";
import { CustomError } from "@/lib/error/error.model";

class AuthService {
  generateAccessToken(userId: string, tokenVersion: number) {
    return jwt.sign({ userId, tokenVersion }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "15m",
    } as jwt.SignOptions);
  }

  generateRefreshToken(userId: string, tokenVersion: number) {
    return jwt.sign({ userId, tokenVersion }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "7d",
    } as jwt.SignOptions);
  }

  verifyRefreshToken(token: string) {
    if (!token) {
      throw new CustomError({
        message: "Token not found",
        status: StatusCodes.BAD_REQUEST,
        path: "auth.verify",
      });
    }

    const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      userId: string;
      tokenVersion: number;
    };

    if (!data) {
      throw new CustomError({
        message: "Invalid token",
        status: StatusCodes.CONFLICT,
        path: "auth.verify",
      });
    }
    return data;
  }

  async register(username: string, password: string) {
    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing) {
      throw new CustomError({
        message: "User already exists",
        status: StatusCodes.CONFLICT,
        path: "auth.register",
      });
    }

    const hashedPassword = await bcrypt.hash(password, Number.parseInt(process.env.SALT_ROUNDS!));

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return { id: user.id, username: user.username, tokenVersion: user.tokenVersion };
  }

  async validateUser(login: string, password: string) {
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: login }, { phone: login }, { username: login }] },
    });

    if (!user) {
      throw new CustomError({
        message: "User not found",
        status: StatusCodes.NOT_FOUND,
        path: "auth.login",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new CustomError({
        message: "Invalid auth data",
        status: StatusCodes.UNAUTHORIZED,
        path: "auth.login",
      });
    }

    const { password: _password, ...userData } = user;

    return userData;
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new CustomError({
        message: "User not found",
        status: StatusCodes.NOT_FOUND,
        path: "auth.profile",
      });
    }

    return user;
  }

  async invalidateAllTokens(userId: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        tokenVersion: {
          increment: 1,
        },
      },
    });
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new CustomError({
        message: "User not found",
        status: StatusCodes.NOT_FOUND,
        path: "auth.changePassword",
      });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isValidPassword) {
      throw new CustomError({
        message: "Incorrect password",
        status: StatusCodes.BAD_REQUEST,
        path: "auth.changePassword",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number.parseInt(process.env.SALT_ROUNDS!),
    );

    return await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        tokenVersion: {
          increment: 1,
        },
      },
    });
  }
}

export const authService = new AuthService();
