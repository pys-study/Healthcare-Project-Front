import { apiClient } from './ApiClient';

const getDietRecords = async (date) => {
  try {
    const response = await apiClient.get(`/dietRecords/${date}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    });
    return response.data;
  } catch (error) {
    console.error("식단 기록 가져오기 실패", error);
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};


export default getDietRecords;
