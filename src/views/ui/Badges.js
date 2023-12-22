

const Badges = () => {
  return (
    <div>
      <h2>내 정보</h2>
      <form>
        <div>
          <label for="name">이름:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label for="gender">성별:</label>
          <select id="gender" name="gender">
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </select>
        </div>
        <div>
          <label for="age">나이:</label>
          <input type="number" id="age" name="age" />
        </div>
        <div>
          <label for="email">이메일:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label for="username">아이디:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label for="password">비밀번호:</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <input type="submit" value="정보 업데이트" />
        </div>
      </form>

    </div>
  );
};

export default Badges;
