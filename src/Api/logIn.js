import { apiClient } from './ApiClient'; // apiClient 임포트

// const logIn: (email: any, password: any) => Promise<any>

const logIn = (email, password) => {
  const requestBody = { username: email, password };

  return apiClient.post("/members/sign-in", requestBody)
    .then(response => response.data
    )
    .catch(error => {
      console.error(error);
      alert("로그인 실패");
    });
};

export default logIn;

