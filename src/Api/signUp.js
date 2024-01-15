import { apiClient } from './ApiClient'; // apiClient 임포트

const signUp = (name, email, password, age, gender) => {
  const requestBody = {
    name,
    username: email,
    password,
    age,
    gender,
    email
  };

  apiClient.post('/members/sign-up', requestBody)
    .then(response => {
      console.log(response);
      alert("회원가입 성공");
    })
    .catch(error => {
      console.log(error);
      alert("회원가입 실패");
    })
};

export default signUp;




// {
//   "name": "고길순2",
//     "username": "aaaa",
//       "password": "1234",
//         "age": 33,
//           "gender": "여",
//             "email": "aab@aa.com"
// }