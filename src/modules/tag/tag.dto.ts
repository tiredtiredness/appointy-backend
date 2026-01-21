export interface CreateTagDto {
  name: string;
}

export type UpdateTagDto = Partial<CreateTagDto>;
