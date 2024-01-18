import { apiClient } from './ApiClient';

const getMember = async () => {
  const config = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
  }

  try {
    const response = await apiClient.get('/members/getUser', config);
    console.log(response.data);
    return response.data; // 여기에서 데이터 반환
  } catch (error) {
    console.log(error);
    return null; // 오류 발생 시 null 반환
  }
};

export default getMember;
