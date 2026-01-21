export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  avatarUrl?: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;
