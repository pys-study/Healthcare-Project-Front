import { apiClient } from "./ApiClient"


export const getUserId = () => {
  const accessToken = localStorage.getItem("accessToken");
  return apiClient.post("/members/test", {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};