import { date, object, ref, string } from "yup";

import { notEmptyObject } from "@/utils/yup-helpers";

export const createBreakSchema = object({
  scheduleId: string().required(),
  startTime: date().required().min(new Date(), "Start time cannot be in the past"),
  endTime: date().required().min(ref("startTime"), "End time must be after start time"),
});

export const updateBreakSchema = notEmptyObject(
  object({
    startTime: date().optional().min(new Date(), "Start time cannot be in the past"),
    endTime: date().optional().min(new Date(), "End time cannot be in the past"),
  }),
);

export const breakQuerySchema = object({
  scheduleId: string().optional(),
});
