import React, { useState } from 'react';
import './Diet.css';
import DietModal from '../../components/modals/DietModal';

const Diet = () => {
  // 모달 창의 가시성을 관리하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // isModalOpen = true => 모달 열어야함
  // isModalOpen = false => 모달 닫아야함

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
      <li key={index}>{foodItem}</li>
    ));
  };

  return (
    <div>
      <div id="datePicker">
        {/* 날짜 선택 입력 필드 */}
        <input type="date" id="currentDate" />
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
          <h2>저녁식사</h2>
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
