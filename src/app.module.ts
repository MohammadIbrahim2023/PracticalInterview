import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MulterModule.register({
      //Default restore path.
      dest: './uploads/user_photos',
    }),
  ],
  providers: [],
})
export class AppModule {}
