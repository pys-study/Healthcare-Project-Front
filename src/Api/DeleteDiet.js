import { apiClient } from './ApiClient'; // apiClient 임포트

const DeleteDiet = (recordId) => {

  const config = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
  }

  return apiClient.delete('/dietRecords/' + recordId + '/delete', config)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })

};

export default DeleteDiet;
