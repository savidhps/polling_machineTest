// src/common/interfaces/user-request.interface.ts
import { Request } from 'express';

export interface JwtUserPayload {
  userId: string;
  role: 'Admin' | 'User'; // adjust as per your roles
  email: string;
}

export interface UserRequest extends Request {
  user: JwtUserPayload;
}
