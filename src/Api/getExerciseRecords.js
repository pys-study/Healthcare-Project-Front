import { apiClient } from './ApiClient';

const getExerciseRecords = async (date) => {
  try {
    const response = await apiClient.get(`/exerciseRecords/${date}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    });
    return response.data; // 운동 기록 데이터를 반환
  } catch (error) {
    console.error("운동 기록 가져오기 실패", error);
    // 여기서 에러 처리 로직을 추가할 수 있습니다.
  }
};

export default getExerciseRecords;
