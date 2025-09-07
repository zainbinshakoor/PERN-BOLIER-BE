import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { ApiResponse } from '../types';

export const getProfile = async (req: Request, res: Response) => {
  const user = req.user!;

  const response: ApiResponse<typeof user> = {
    success: true,
    data: user,
    message: 'Profile retrieved successfully',
  };

  res.json(response);
};

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const response: ApiResponse<typeof users> = {
    success: true,
    data: users,
    message: 'Users retrieved successfully',
  };

  res.json(response);
};