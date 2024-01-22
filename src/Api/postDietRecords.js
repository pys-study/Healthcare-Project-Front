import { apiClient } from './ApiClient'; // apiClient 임포트

const postDietRecords = (currentDate, selectedMeal, foodItem) => {
  const requestBody = {
    dietInfo: foodItem,
    record: currentDate,
    timeOfMeal: selectedMeal
  };

  const config = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
  }


  return apiClient.post('/dietRecords/add', requestBody, config)
    .then(response => {
      console.log(response);
      return response; // Promise 체인에서 다음 처리를 위해 response 반환
    })
    .catch(error => {
      console.log(error);
      alert("post 실패");
      throw error; // 에러를 다시 throw하여 catch 블록에서 처리할 수 있도록 함
    });
};




export default postDietRecords;



// {
//   "dietInfo": {
//     "dietInfoId": 1,
//       "dietName": "달걀",
//         "calories": 50,
//           "carbohydrate": 50,
//             "protein": 50,
//               "fats": 50
//   },
//   "record": "2024-01-22",
//     "timeOfMeal": "dinner",
//       "totalCalories": 100
// }