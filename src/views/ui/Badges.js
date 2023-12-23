import './style.css';


const Badges = () => {
  return (
    <div className="profile-container">
      <h2>내 정보</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input type="email" id="email" name="email" placeholder="이메일" />
        </div>
        <div className="form-group">
          <label htmlFor="username">아이디:</label>
          <input type="text" id="username" name="username" placeholder="아이디" />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" name="password" placeholder="비밀번호" />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름:</label>
          <input type="text" id="name" name="name" placeholder="이름" />
        </div>
        <div className="form-group">
          <label htmlFor="gender">성별:</label>
          <select id="gender" name="gender">
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="birthdate">생년월일:</label>
          <input type="date" id="birthdate" name="birthdate" />
        </div>
        <div className="form-group">
          <button className="btn">확인</button>
          <button type="button" className="btn edit">수정</button>
        </div>
      </form>
    </div>
  );
};

export default Badges;
