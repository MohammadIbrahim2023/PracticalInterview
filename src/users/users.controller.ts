import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('uploadUserPhoto')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/user_photos',
        filename: (req, file, callback) => {
          const fileExt = extname(file.originalname);
          callback(null, `user_${Date.now()}${fileExt}`);
        },
      }),
      limits: { fileSize: 1024 * 1024 * 5 }, //---File Size 5MB,
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|png|jpeg|pdf)$/)) {
          return callback(
            new BadRequestException(
              'Only (JPG, PNG, JPEG, PDF) Files Are Allowed!',
            ),
            false,
          );
        } else {
          callback(null, true);
        }
      },
    }),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  uploadUserProfile(@UploadedFile('file') file: Express.Multer.File) {
    if (file == undefined) {
      throw new BadRequestException('Please Provide A File.');
    }
    // WE can use file details to store in database.
    return { result: true, data: file };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
