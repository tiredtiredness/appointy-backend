export interface CreateBreakDto {
  scheduleId: string;
  startTime: Date;
  endTime: Date;
}

export type UpdateBreakDto = Omit<Partial<CreateBreakDto>, "scheduleId">;
