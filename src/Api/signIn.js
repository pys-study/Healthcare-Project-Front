import { apiClient } from './ApiClient'; // apiClient 임포트

const signIn = (email, password, setAccessToken, setIsOpen) => {
  const requestBody = { username: email, password };

  return apiClient.post("/members/sign-in", requestBody)
    .then(response => {
      const newAccessToken = response.data.accessToken;
      console.log(newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
      setAccessToken(newAccessToken); // 상태 변수에 새로운 토큰 값을 설정
      setIsOpen(false); // 모달 닫기
      alert("로그인 성공");
    })
    .catch(error => {
      console.error(error);
      alert("로그인 실패");
    });
};

export default signIn;