import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export default class {
  @IsOptional({ groups: ['many'] })
  uuid?: string;

  @IsDefined({ groups: ['create', 'update', 'many'] })
  @IsString({ groups: ['create', 'update', 'many'] })
  name: string;

  @IsDefined({ groups: ['create', 'update', 'many'] })
  @IsEmail()
  email: string;

  @IsDefined({ groups: ['create', 'update', 'many'] })
  @IsNotEmpty()
  address: string;

  @IsDefined({ groups: ['create', 'update', 'many'] })
  @IsDefined()
  status: number;

  @IsDefined({ groups: ['create', 'update', 'many'] })
  @IsNotEmpty()
  lat: string;

  @IsDefined({ groups: ['create', 'update', 'many'] })
  @IsNotEmpty()
  long: string;

  @IsDefined({ groups: ['create', 'update', 'many'] })
  sortOrder: number;
}
