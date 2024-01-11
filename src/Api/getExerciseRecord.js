import { apiClient } from './ApiClient'; // apiClient 임포트

const getExerciseRecord = () => {

  console.log(localStorage.getItem("accessToken"));
  const config = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
  }

  return apiClient.get('/exerciseRecords/', config)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })

};

export default getExerciseRecord;








// {
//   "recordId": 2,
//     "member": { "username": "aaaa", "password": "{bcrypt}$2a$10$LR03jFvj36U444U3X/4DneZo5nP7C91irv5jfocvAriQ/X8T7oNkS", "email": "aab@aa.com",… },
//   "exerciseInfo": { "caloriesPerMinutes": 100, "exerciseInfoID": 1, "exerciseType": "헬스", "exerciseName": "상체"… },
//   "recordDate": "2024-01-11",
//     "durationMinutes": 60,
//       "weight": 40,
//         "countPerSets": 30,
//           "sets": 6,
//             "totalCalories": 600
// }

// "exerciseInfo": { id: 2, name: '프론트 스쿼트' }
//   "recordDate": "2024-01-11",
//       "weight": 40,
//         "countPerSets": 30,
//           "sets": 6,
//             "totalCalories": 600
// }