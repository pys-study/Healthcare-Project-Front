import React, { useState } from 'react';
import './Diet.css';
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

  // 모달을 여는 함수, 선택된 식사 시간을 설정
  const openModal = (mealType) => {
    setSelectedMeal(mealType);
    setIsModalOpen(true);
  };

  // 모달을 닫는 함수
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

  // Immutable.js
  // 선택된 식사 시간에 음식을 추가하는 함수
  const addFoodToMeal = (foodItem) => {
    setMeals((prevMeals) => ({ // 이전 meals의 상태 prevMeals를 인자로 받아옴
      ...prevMeals,
      [selectedMeal]: [...prevMeals[selectedMeal], foodItem], // 기존 상태를 복사하고 새로운 항목을 추가
    }));

    // try {
    //   // POST 요청을 통해 서버에 아이템 추가
    //   const response = await fetch('/api/addFoodItem', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ mealType: selectedMeal, foodItem }),
    //   });

    //   if (response.ok) {
    //     // 성공적으로 추가된 경우, UI 업데이트
    //     setMeals((prevMeals) => ({
    //       ...prevMeals,
    //       [selectedMeal]: [...prevMeals[selectedMeal], foodItem],
    //     }));
    //   } else {
    //     // 요청 실패 처리
    //     throw new Error('Failed to add food item');
    //   }
    // } catch (error) {
    //   // 에러 처리 (에러 메시지 표시 등)
    // }


    closeModal();
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

    // const itemToRemove = meals[mealType][index];

    // try {
    //   // DELETE 요청을 통해 서버에서 아이템 제거
    //   const response = await fetch(`/api/removeFoodItem/${itemToRemove.id}`, {
    //     method: 'DELETE',
    //   });

    //   if (response.ok) {
    //     // 성공적으로 제거된 경우, UI 업데이트
    //     setMeals((prevMeals) => ({
    //       ...prevMeals,
    //       [mealType]: prevMeals[mealType].filter((_, i) => i !== index),
    //     }));
    //   } else {
    //     // 요청 실패 처리
    //     throw new Error('Failed to remove food item');
    //   }
    // } catch (error) {
    //   // 에러 처리 (에러 메시지 표시 등)
    // }
  };

  // 식사 목록을 렌더링하는 함수
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
          {meals[mealType].map((foodItem, index) => (
            <tr key={index}>
              <td>{foodItem.name}</td>
              <td>{foodItem.calories} kcal</td>
              <td>{foodItem.carbs} g</td>
              <td>{foodItem.protein} g</td>
              <td>{foodItem.fat} g</td>
              <td>
                <button className='remove-btn' onClick={() => removeFoodFromMeal(mealType, index)}>x</button>
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



// [
//     {
//       member: {
//         name:'고길동',
//         id : "aaa",
//         password : '123',
//         gender : '남',
//         email : 'aaa@aa.com',
//         age : 32
//       },
//       dietInfo : {
//         dietInfoId: 1,
//         caloreis : 50,
//         dietName : "달걀",
//         carbohydrate : 50,
//         protein : 50,
//         fats : 50
//       },
//       dietRecordId : 1,
//       record : "2024-01-02",
//       totalCalories:50,
//       timeOfMeal:"점심"
//     }
// ]
//