import { apiClient } from './ApiClient'; // apiClient 임포트
import Cookies from 'js-cookie';

const logIn = (email, password, setAccessToken, setRefreshToken, setIsOpen) => {
  const requestBody = { username: email, password };

  return apiClient.post("/members/sign-in", requestBody)
    .then(response => {
      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;
      localStorage.setItem("accessToken", newAccessToken);
      console.log(newAccessToken);
      console.log(newRefreshToken);
      setAccessToken(newAccessToken); // 상태 변수에 새로운 토큰 값을 설정
      setRefreshToken(newRefreshToken);
      Cookies.set('refreshToken', newRefreshToken, { expires: 14, path: '/' }); // 14일 후 만료
      setIsOpen(false); // 모달 닫기
      alert("로그인 성공");
    })
    .catch(error => {
      console.error(error);
      alert("로그인 실패");
    });
};

export default logIn;