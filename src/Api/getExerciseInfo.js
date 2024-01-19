import { apiClient } from './ApiClient'; // apiClient 임포트

const getExerciseInfo = (setExerciseData) => {

  const config = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
  }

  return apiClient.get('/exerciseInfo/', config)
    .then(response => {
      setExerciseData(response.data);
    })
    .catch(error => {
      console.log(error);
    })

};

export default getExerciseInfo;
