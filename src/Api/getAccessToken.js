import { apiClient } from "./ApiClient"


export const getAccessToken = (requestBody) => {
  return apiClient.post('/members/sign-in', requestBody);
}