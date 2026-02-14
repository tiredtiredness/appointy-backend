export interface CreateTagDto {
  name: string;
  type: "SERVICE_CATEGORY" | "MASTER_SKILL" | "CLIENT_INTEREST";
}

export type UpdateTagDto = Partial<CreateTagDto>;
