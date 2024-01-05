import { IActivity } from "../models/activity.model";
import axiosInstance from "./axiosInterceptor";

export const getActivities = () =>
  axiosInstance.get<IActivity[]>("/activities");

export const getActivityById = (id: string) =>
  axiosInstance.get<IActivity>(`/activities/${id}`);

export const setActivityArchiveStatus = (id: string, is_archived: boolean) =>
  axiosInstance.patch(`/activities/${id}`, {
    is_archived,
  });

export const resetActivity = () => axiosInstance.patch("/reset");
