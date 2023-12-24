import React, { useState } from 'react';
import './diet.css';
import DietModal from '../../components/modals/DietModal';

const Diet = () => {
  // 모달 창의 가시성을 관리하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // isModalOpen = true => 모달 열어야함
  // isModalOpen = false => 모달 닫아야함

  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  // 오늘 날짜를 yyyy-mm-dd 형식으로 가져오기
  const today = new Date().toISOString().split('T')[0];

  // 오늘 날짜를 상태로 관리
  const [currentDate, setCurrentDate] = useState(today);

  // 날짜와 요일을 문자열로 결합하는 함수
  const formatDateWithDay = (date) => {
    const dayOfWeek = weekdays[new Date(date).getDay()];
    return `${date} (${dayOfWeek})`;
  };

  // 현재 선택된 식사 시간을 저장하는 상태 ('breakfast', 'lunch', 'dinner')
  const [selectedMeal, setSelectedMeal] = useState('');

  // 아침, 점심, 저녁 식사에 대한 음식 목록을 관리하는 상태
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: []
  });

  // 모달을 여는 함수, 선택된 식사 시간을 설정
  const openModal = (mealType) => {
    setSelectedMeal(mealType);
    setIsModalOpen(true);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 선택된 식사 시간에 음식을 추가하는 함수
  const addFoodToMeal = (foodItem) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [selectedMeal]: [...prevMeals[selectedMeal], foodItem]
    }));
    closeModal();
  };

  // 식사 목록을 렌더링하는 함수
  const renderMealList = (mealType) => {
    return meals[mealType].map((foodItem, index) => (
      <li className='food-item' key={index}>{foodItem.name}
        <button className='remove-btn' onClick={() => removeFoodFromMeal(mealType, index)}>x</button>
      </li>
    ));
  };

  // 선택된 식사 시간에서 특정 음식을 제거하는 함수
  const removeFoodFromMeal = (mealType, index) => {
    // 해당 식사 시간의 배열에서 index에 해당하는 아이템을 제거
    setMeals((prevMeals) => {
      const filteredMeals = prevMeals[mealType].filter((_, i) => i !== index);
      return {
        ...prevMeals,
        [mealType]: filteredMeals
      };
    });
  };

  return (
    <div>
      {/* 날짜 선택 입력 필드 */}
      <div id="datePicker">
        {/* 날짜 선택 입력 필드 */}
        <input
          type="date"
          id="currentDate"
          value={currentDate} // 입력 필드의 값으로 상태 사용
          onChange={(e) => setCurrentDate(e.target.value)} // 날짜 변경 핸들러
        />
        <span className='date-display'>{formatDateWithDay(currentDate)}</span>
      </div>

      <div id="meals">
        {/* 아침 식사 섹션 */}
        <section id="breakfast">
          <h2>아침 식사</h2>
          <ul id="breakfastList">
            {renderMealList('breakfast')}
          </ul>
          <button className="addFoodBtn" onClick={() => openModal('breakfast')}>+</button>
        </section>

        {/* 점심 식사 섹션 */}
        <section id="lunch">
          <h2>점심 식사</h2>

          <ul id="lunchList">
            {renderMealList('lunch')}
          </ul>
          <button className="addFoodBtn" onClick={() => openModal('lunch')}>+</button>
        </section>

        {/* 저녁 식사 섹션 */}
        <section id="dinner">
          <h2 >저녁식사</h2>
          <ul id="dinnerList">
            {renderMealList('dinner')}
          </ul>
          <button className="addFoodBtn" onClick={() => openModal('dinner')}>+</button>
        </section>
      </div>
      <DietModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        addFoodToMeal={addFoodToMeal}
      />
    </div>
  );
};

export default Diet;
