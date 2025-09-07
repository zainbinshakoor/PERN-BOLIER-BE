import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { AppError } from '../utils/AppError';
import config from '../config';
import { ApiResponse, AuthTokens } from '../types';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError('User with this email already exists', 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  const response: ApiResponse<{ user: typeof user; tokens: AuthTokens }> = {
    success: true,
    data: {
      user,
      tokens: {
        accessToken: token,
      },
    },
    message: 'User registered successfully',
  };

  res.status(201).json(response);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Invalid email or password', 401);
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  const response: ApiResponse<{ user: typeof userData; tokens: AuthTokens }> = {
    success: true,
    data: {
      user: userData,
      tokens: {
        accessToken: token,
      },
    },
    message: 'Login successful',
  };

  res.json(response);
};