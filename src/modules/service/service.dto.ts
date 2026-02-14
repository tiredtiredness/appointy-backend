export interface CreateServiceDto {
  categoryId?: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  isActive: boolean;
  imageUrl: string;
}

export type UpdateServiceDto = Partial<CreateServiceDto>;
