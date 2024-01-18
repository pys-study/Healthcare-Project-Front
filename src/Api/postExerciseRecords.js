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

  // 모든 요청을 병렬로 실행하기 위한 프로미스 배열 생성
  const postRequests = requestBody.map(exerciseRecord => {
    return apiClient.post('/exerciseRecords/add', exerciseRecord, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    });
  });

  // Promise.all을 사용하여 모든 요청이 완료될 때까지 기다림
  Promise.all(postRequests)
    .then(responses => {
      // 모든 요청이 성공적으로 완료되면 실행됨
      alert("모든 운동 기록이 성공적으로 전송되었습니다.");
    })
    .catch(error => {
      console.log(error);
      alert("운동 기록 전송에 실패했습니다.");
    });
};


export default postExerciseRecords;
