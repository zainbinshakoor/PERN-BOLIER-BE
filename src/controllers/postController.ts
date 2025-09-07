import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { AppError } from '../utils/AppError';
import { ApiResponse, PaginatedResponse } from '../types';

export const getAllPosts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      skip,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.post.count({
      where: { published: true },
    }),
  ]);

  const response: PaginatedResponse<typeof posts[0]> = {
    success: true,
    data: posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    message: 'Posts retrieved successfully',
  };

  res.json(response);
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  // Only show published posts to non-owners
  if (!post.published && (!req.user || req.user.id !== post.authorId)) {
    throw new AppError('Post not found', 404);
  }

  const response: ApiResponse<typeof post> = {
    success: true,
    data: post,
    message: 'Post retrieved successfully',
  };

  res.json(response);
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, published } = req.body;
  const authorId = req.user!.id;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: published || false,
      authorId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const response: ApiResponse<typeof post> = {
    success: true,
    data: post,
    message: 'Post created successfully',
  };

  res.status(201).json(response);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, published } = req.body;
  const userId = req.user!.id;

  const existingPost = await prisma.post.findUnique({
    where: { id },
  });

  if (!existingPost) {
    throw new AppError('Post not found', 404);
  }

  // Check if user is the author or admin
  if (existingPost.authorId !== userId && req.user!.role !== 'ADMIN') {
    throw new AppError('Not authorized to update this post', 403);
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(content !== undefined && { content }),
      ...(published !== undefined && { published }),
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const response: ApiResponse<typeof post> = {
    success: true,
    data: post,
    message: 'Post updated successfully',
  };

  res.json(response);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const existingPost = await prisma.post.findUnique({
    where: { id },
  });

  if (!existingPost) {
    throw new AppError('Post not found', 404);
  }

  // Check if user is the author or admin
  if (existingPost.authorId !== userId && req.user!.role !== 'ADMIN') {
    throw new AppError('Not authorized to delete this post', 403);
  }

  await prisma.post.delete({
    where: { id },
  });

  const response: ApiResponse = {
    success: true,
    message: 'Post deleted successfully',
  };

  res.json(response);
};