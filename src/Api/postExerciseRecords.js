import { apiClient } from './ApiClient'; // apiClient 임포트

const postExerciseRecords = (member, currentDate, exerciseList) => {
  const requestBody = {
    member,
    exerciseInfo: exerciseList.exerciseInfo,
    recordDate: currentDate,
    durationMinutes: 0,
    weight: exerciseList.weight,
    countPersets: exerciseList.reps,
    sets: exerciseList.sets,
    totalCalories: exerciseList.totalCaloiresBurned
  };

  apiClient.post('/exerciseRecords/add', requestBody, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
  })
    .then(response => {
      console.log(response);
      alert("운동 Post 성공");
    })
    .catch(error => {
      console.log(error);
      alert("운동 Post 실패");
    })
};

export default postExerciseRecords;

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