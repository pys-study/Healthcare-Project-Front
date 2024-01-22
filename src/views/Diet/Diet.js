import React, { useEffect, useState } from 'react';
import './Diet.css';
import DietModal from '../../components/modals/DietModal';
import { useCurrentDate } from '../../contexts/CurrentDateContext';
import postDietRecords from '../../Api/postDietRecords';
import getDietRecords from '../../Api/getDietRecords';

const Diet = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  // isModalOpen = true => 모달 열어야함
  // isModalOpen = false => 모달 닫아야함

  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  const { currentDate, setCurrentDate } = useCurrentDate();
  // 현재 선택된 식사 시간을 저장하는 상태 ('breakfast', 'lunch', 'dinner')
  const [selectedMeal, setSelectedMeal] = useState('');

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

  useEffect(() => {
    const fetchDietRecords = async () => {
      try {
        const records = await getDietRecords(currentDate);
        if (records) {
          // 각 식사 시간에 따라 meals 상태 업데이트
          setMeals({
            breakfast: records.filter(record => record.timeOfMeal === 'breakfast').map(record => record.dietInfo),
            lunch: records.filter(record => record.timeOfMeal === 'lunch').map(record => record.dietInfo),
            dinner: records.filter(record => record.timeOfMeal === 'dinner').map(record => record.dietInfo),
          });
        }
      } catch (error) {
        console.error('식단 기록 불러오기 오류:', error);
      }
    };
    fetchDietRecords();
  }, [currentDate]);



  // 아침, 점심, 저녁 식사에 대한 음식 목록을 관리하는 상태
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: []
  });

  // Immutable.js 불변성 주의
  // 선택된 식사 시간에 음식을 추가하는 함수
  const addFoodToMeal = (foodItem) => {
    // 서버에 POST 요청 보내기
    postDietRecords(currentDate, selectedMeal, foodItem)
      .then(response => {
        // 요청 성공 시, 화면에 아이템 렌더링
        setMeals(prevMeals => ({
          ...prevMeals,
          [selectedMeal]: [...prevMeals[selectedMeal], foodItem],
        }));
      })
      .catch(error => {
        // 요청 실패 시, 에러 처리
        console.error("POST 요청 실패:", error);
      });

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
      <div id="datePicker">
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

