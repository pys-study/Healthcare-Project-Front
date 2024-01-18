import { apiClient } from './ApiClient'; // apiClient 임포트

const DeleteExercise = (recordId) => {

  const config = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
  }

  return apiClient.delete('/exerciseRecords/' + recordId + '/delete', config)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })

};

export default DeleteExercise;
