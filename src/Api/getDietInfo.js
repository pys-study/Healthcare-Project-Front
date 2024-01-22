import { apiClient } from './ApiClient'; // apiClient 임포트

const getDietInfo = (setFoodItems) => {

  const config = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
  }

  return apiClient.get('/dietInfo/', config)
    .then(response => {
      setFoodItems(response.data);
    })
    .catch(error => {
      console.log(error);
    })

};

export default getDietInfo;
