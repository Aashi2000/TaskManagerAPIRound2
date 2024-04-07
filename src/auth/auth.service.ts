// auth/auth.service.ts

import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.userRepository.singUp(authCredentialsDto);
    this.logger.debug(
      `User successfully registered: ${authCredentialsDto.username}`,
    );
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    // Rename validateUserPassword to validateCredentials in UserRepository
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (
      username === null ||
      username === undefined ||
      typeof username !== 'string'
    ) {
      // Check if username is null, undefined, or not a string
      throw new UnauthorizedException('Invalid credentials!');
    }

    const payload: JwtPayload = { username };

    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
