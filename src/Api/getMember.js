import { apiClient } from './ApiClient'; // apiClient 임포트

const getMember = () => {
  // const requestBody = {"members/getUser", exerciseInfo }

  const config = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
  }

  return apiClient.get('/members/getUser', config)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })

};

export default getMember;

