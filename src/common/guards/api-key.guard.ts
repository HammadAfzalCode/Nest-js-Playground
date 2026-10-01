import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable() // 1. Managed by NestJS IoC container
export class ApiKeyGuard implements CanActivate {
  // 2. NestJS automatically calls canActivate() on every incoming request
  canActivate(context: ExecutionContext): boolean {
    // Switch execution context to HTTP and extract the Express Request object
    const request = context.switchToHttp().getRequest<Request>();

    // Read the custom header 'x-api-key'
    const apiKey = request.headers['x-api-key'];

    // Validate the API key against our expected secret
    if (apiKey !== 'super-secret-key') {
      throw new UnauthorizedException('Invalid or missing API key header');
    }

    return true; // Request is allowed to proceed
  }
}
