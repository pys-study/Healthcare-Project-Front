import React, { useEffect, useState } from 'react';
import './Diet.css';
import DietModal from '../../components/modals/DietModal';
import { useCurrentDate } from '../../contexts/CurrentDateContext';
import postDietRecords from '../../Api/postDietRecords';
import getDietRecords from '../../Api/getDietRecords';
import DeleteDiet from '../../Api/DeleteDiet';

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
        console.log(records);
        if (records && records.length > 0) {
          // records가 존재하고 비어 있지 않을 경우
          setMeals({
            breakfast: records.filter(record => record.timeOfMeal === 'breakfast').map(record => ({ ...record.dietInfo, dietRecordId: record.dietRecordId })),
            lunch: records.filter(record => record.timeOfMeal === 'lunch').map(record => ({ ...record.dietInfo, dietRecordId: record.dietRecordId })),
            dinner: records.filter(record => record.timeOfMeal === 'dinner').map(record => ({ ...record.dietInfo, dietRecordId: record.dietRecordId })),
          });
        } else {
          // records가 없거나 비어 있는 경우, meals 상태를 초기화
          setMeals({ breakfast: [], lunch: [], dinner: [] });
        }
      } catch (error) {
        console.error('식단 기록 불러오기 오류:', error);
        setMeals({ breakfast: [], lunch: [], dinner: [] }); // 오류 발생시에도 meals 상태 초기화
      }
    };
    fetchDietRecords();
  }, [currentDate]);



  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setCurrentDate(newDate);
  };



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

  const removeFoodFromMeal = async (mealType, dietRecordId) => {
    try {
      // 서버에서 해당 식단 기록 삭제 요청 보내기
      console.log(dietRecordId);
      await DeleteDiet(dietRecordId);
      // 요청 성공 시, 화면에서 해당 음식을 제거
      setMeals(prevMeals => ({
        ...prevMeals,
        [mealType]: prevMeals[mealType].filter(foodItem => foodItem.dietRecordId !== dietRecordId),
      }));
    } catch (error) {
      // 요청 실패 시, 에러 처리
      console.error("식단 기록 삭제 실패:", error);
    }
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
          {meals[mealType].map((foodItem) => (
            <tr key={foodItem.dietRecordId}>
              <td>{foodItem.dietName}</td>
              <td>{foodItem.calories} kcal</td>
              <td>{foodItem.carbohydrate} g</td>
              <td>{foodItem.protein} g</td>
              <td>{foodItem.fats} g</td>
              <td>
                <button className='remove-btn' onClick={() => removeFoodFromMeal(mealType, foodItem.dietRecordId)}>x</button>
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
          onChange={handleDateChange} />
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

