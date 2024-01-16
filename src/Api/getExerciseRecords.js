import { apiClient } from './ApiClient';

const getExerciseRecords = async (date) => {
  try {
    const response = await apiClient.get(`/exerciseRecords/${date}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    });
    return response.data;
  } catch (error) {
    console.error("운동 기록 가져오기 실패", error);
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};


export default getExerciseRecords;
