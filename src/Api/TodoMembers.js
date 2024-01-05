import { apiClient } from "./ApiClient"


export const testMemberApi
  = () => apiClient.get('/members')

