import { assetsUrl } from "../Config";
import { getCall, postCall } from "./apiCall";
export const connectToAgentCall = (
  apiUrl: string,
  data?: any,
  token?: string,
) => postCall(`/user/connect-agent`)(apiUrl, data, token);
export const getRequiredFields = (token: string, apiUrl: string) =>
  getCall("/user/required-fields", token, apiUrl);
export const getMessageHistory = (id: string, pageNumber: number) =>
  `/messages/${id}?page=${pageNumber}`;
export const getAssetUrl = (url: string) => `${assetsUrl}/${url}`;
