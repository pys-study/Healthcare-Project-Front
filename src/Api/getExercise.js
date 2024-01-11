import { apiClient } from './ApiClient'; // apiClient 임포트

const getExercise = (setExerciseData) => {

  console.log(localStorage.getItem("accessToken"));
  const config = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
  }

  return apiClient.get('/exerciseInfo/', config)
    .then(response => {
      console.log(response.data);
      setExerciseData(response.data);
    })
    .catch(error => {
      console.log(error);
    })

};

export default getExercise;
