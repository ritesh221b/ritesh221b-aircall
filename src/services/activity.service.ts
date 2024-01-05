import { IActivity } from "../models/activity.model";
import axiosInstance from "./axiosInterceptor";

export const getActivities = () =>
  axiosInstance.get<IActivity[]>("/activities");
