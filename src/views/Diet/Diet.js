import React, { useState } from 'react';
import './Diet.css';
import DietModal from '../../components/modals/DietModal';
import { useCurrentDate } from '../../contexts/CurrentDateContext';

const Diet = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  // isModalOpen = true => 모달 열어야함
  // isModalOpen = false => 모달 닫아야함

  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  // 오늘 날짜를 상태로 관리
  const { currentDate, setCurrentDate } = useCurrentDate();

  const formatDateWithDay = (date) => {
    const dayOfWeek = weekdays[new Date(date).getDay()];
    return `${date} (${dayOfWeek})`;
  };

  const openModal = (mealType) => {
    setSelectedMeal(mealType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 현재 선택된 식사 시간을 저장하는 상태 ('breakfast', 'lunch', 'dinner')
  const [selectedMeal, setSelectedMeal] = useState('');

  // 아침, 점심, 저녁 식사에 대한 음식 목록을 관리하는 상태
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: []
  });

  // Immutable.js 불변성 주의
  // 선택된 식사 시간에 음식을 추가하는 함수
  const addFoodToMeal = (foodItem) => {
    setMeals((prevMeals) => ({ // 이전 meals의 상태 prevMeals를 인자로 받아옴
      ...prevMeals,
      [selectedMeal]: [...prevMeals[selectedMeal], foodItem], // 기존 상태를 복사하고 새로운 항목을 추가
    }));

    closeModal();
  };

  // 선택된 식사 시간에서 특정 음식을 제거하는 함수
  const removeFoodFromMeal = (mealType, dietInfoId) => {
    // 해당 식사 시간의 배열에서 index에 해당하는 아이템을 제거
    setMeals((prevMeals) => {
      const filteredMeals = prevMeals[mealType].filter((_, i) => i !== dietInfoId);
      return {
        ...prevMeals,
        [mealType]: filteredMeals
      };
    });

  };

  const renderMealList = (mealType) => {
    return (
      <table className="meal-table">
        <thead>
          <tr>
            <th>음식 이름</th>
            <th>칼로리(kal)</th>
            <th>탄수화물(g)</th>
            <th>단백질(g)</th>
            <th>지방(g)</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {meals[mealType].map((foodItem, dietInfoId) => (
            <tr key={foodItem.dietInfoId}>
              <td>{foodItem.dietName}</td>
              <td>{foodItem.calories} kcal</td>
              <td>{foodItem.carbohydrate} g</td>
              <td>{foodItem.protein} g</td>
              <td>{foodItem.fats} g</td>
              <td>
                <button className='remove-btn' onClick={() => removeFoodFromMeal(mealType, dietInfoId)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
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
          {renderMealList('breakfast')}
          <button className="addFoodBtn" onClick={() => openModal('breakfast')}>+</button>
        </section>

        {/* 점심 식사 섹션 */}
        <section id="lunch">
          <h2>점심 식사</h2>
          {renderMealList('lunch')}
          <button className="addFoodBtn" onClick={() => openModal('lunch')}>+</button>
        </section>

        {/* 저녁 식사 섹션 */}
        <section id="dinner">
          <h2>저녁 식사</h2>
          {renderMealList('dinner')}
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

