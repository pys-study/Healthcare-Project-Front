import axios from "axios"

export const apiClient = axios.create(
  {
    baseURL: 'http://ec2-52-78-43-76.ap-northeast-2.compute.amazonaws.com:8080'
  }
)