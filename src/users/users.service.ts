import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;
    //The passowrd should be hashed.
    const hasPassword = password;

    //Store data to database;
    const data = { name, hasPassword };
    //Result can be false base on opertion and result
    return { result: true, data };
  }

  findAll() {
    // All data from database pagination base.
    const data = [
      {
        id: 1,
        name: 'ali',
        password: 'hashedPassword',
        roles: [
          {
            id: 1,
            name: 'super_admin',
          },
        ],
      },
      {
        id: 2,
        name: 'jamshid',
        password: 'hashedPassword',
        roles: [
          {
            id: 1,
            name: 'admin',
          },
        ],
      },
      {
        id: 3,
        name: 'kabir',
        password: 'hashedPassword',
        roles: [
          {
            id: 1,
            name: 'manager',
          },
          {
            id: 2,
            name: 'team_lead',
          },
        ],
      },
    ];

    //Result can be false base on opertion and result
    return { resutl: true, data };
  }

  findOne(id: number) {
    const data = [
      {
        id: 1,
        name: 'ali',
        password: 'hashedPassword',
        roles: [
          {
            id: 1,
            name: 'super_admin',
          },
        ],
      },
      {
        id: 2,
        name: 'jamshid',
        password: 'hashedPassword',
        roles: [
          {
            id: 1,
            name: 'admin',
          },
        ],
      },
      {
        id: 3,
        name: 'kabir',
        password: 'hashedPassword',
        roles: [
          {
            id: 1,
            name: 'manager',
          },
          {
            id: 2,
            name: 'team_lead',
          },
        ],
      },
    ];

    const foundUser = data.filter((item) => item?.id == id);
    return { result: foundUser?.length > 0 ? true : false, data: foundUser };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
