export interface CreateScheduleDto {
  startTime: Date;
  endTime: Date;
}

export type UpdateScheduleDto = Partial<CreateScheduleDto>;
