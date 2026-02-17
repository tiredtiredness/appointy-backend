import { date, object, ref } from "yup";

import { notEmptyObject } from "@/utils/yup-helpers";

export const createScheduleSchema = object({
  startTime: date().required().min(new Date(), "Start time cannot be in the past"),
  endTime: date().required().min(ref("startTime"), "End time must be after start time"),
});

export const updateScheduleSchema = notEmptyObject(
  object({
    startTime: date().optional().min(new Date(), "Start time cannot be in the past"),
    endTime: date().optional().min(new Date(), "End time cannot be in the past"),
  }),
);

export const scheduleQuerySchema = object({
  startTime: date().optional(),
  endTime: date().optional(),
});
