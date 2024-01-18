import { apiClient } from './ApiClient'; // apiClient 임포트

const postExerciseRecords = (currentDate, exerciseList) => {
  const requestBody = exerciseList.map(exercise => ({
    exerciseInfo: exercise.exerciseInfo,
    recordDate: currentDate,
    durationMinutes: 0,
    weight: exercise.weight,
    countPerSets: exercise.reps,
    sets: exercise.sets,
    totalCalories: exercise.totalCaloriesBurned
  }));

  // 각 운동 기록에 대해 별도의 POST 요청을 보내고자 한다면
  requestBody.forEach(exerciseRecord => {
    apiClient.post('/exerciseRecords/add', exerciseRecord, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    })
      .then(response => {
        alert("운동 기록 전송 성공");
      })
      .catch(error => {
        console.log(error);
        alert("운동 기록 전송 실패");
        console.log(exerciseRecord);
      });
  });
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