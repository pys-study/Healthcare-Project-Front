import React, { useState, useEffect } from 'react';
import './MyPage.css';
import getMember from '../../Api/getMember';

const MyPage = () => {

  const [member, setMember] = useState({
    email: '',
    name: '',
    gender: '',
    age: '',
  });

  useEffect(() => {
    const fetchMember = async () => {
      const memberData = await getMember();
      if (memberData) {
        const birthdate = calculateBirthdate(memberData.age);
        setMember({
          email: memberData.email,
          name: memberData.name,
          gender: memberData.gender,
          age: memberData.age,
          birthdate
        });
      }
    };

    fetchMember();
  }, []);

  const calculateBirthdate = (age) => {
    const currentDate = new Date();
    const birthYear = currentDate.getFullYear() - age;
    const birthMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const birthDay = String(currentDate.getDate()).padStart(2, '0');
    return age ? `${birthYear}-${birthMonth}-${birthDay}` : '';
  }


  return (
    <div className="profile-container">
      <h3>내정보</h3>
      <form>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" name="email" placeholder="이메일" value={member.email} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" name="username" placeholder="아이디" value={member.email} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input type="text" id="name" name="name" placeholder="이름" value={member.name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="gender">성별</label>
          <input type="text" id="gender" name="gender" placeholder="성별" value={member.gender} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="birthdate">나이</label>
          <input type="text" id="age" name="age" placeholder="나이" value={member.age} disabled />
        </div>
        {/* <div className="form-group">
          <button className="btn" onClick={test}>확인</button>
          <button type="button" className="btn edit">수정</button>
        </div> */}
      </form>
    </div>
  );
};

export default MyPage;
