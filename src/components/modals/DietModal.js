import React, { useState, useEffect } from 'react';
import './DietModal.css';

const DietModal = ({ isModalOpen, closeModal, addFoodToMeal }) => {

  const [foodItems, setFoodItems] = useState([]);


  useEffect(() => {
    // 공공 데이터 API로부터 식품 정보를 가져오는 함수를 여기에 구현합니다.
    // 예시로 더미 데이터를 사용했습니다.
    const fetchFoodItems = async () => {
      // 가정으로 API 호출 대신 더미 데이터를 사용합니다.
      const dummyFoodItems = [
        { id: 1, name: '사과', calories: 52, carbs: 14, protein: 0.3, fat: 0.2 },
        { id: 2, name: '닭가슴살', calories: 165, carbs: 20, protein: 31, fat: 3.6 },
        { id: 3, name: '우둔살', calories: 250, carbs: 30, protein: 20, fat: 20 },
        // ...more food data
      ];
      setFoodItems(dummyFoodItems);
      // 실제로는 아래와 같이 API를 호출하게 됩니다.
      // const response = await fetch('API_ENDPOINT');
      // const data = await response.json();
      // setFoodItems(data);
    };
    if (isModalOpen) {
      fetchFoodItems();
    }
  }, [isModalOpen]);

  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <table className="food-table">
            <thead>
              <tr>
                <th>이름</th>
                <th>칼로리</th>
                <th>탄수화물</th>
                <th>단백질</th>
                <th>지방</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map((item) => (
                <tr key={item.id} onDoubleClick={() => addFoodToMeal(item)}>
                  <td>{item.name}</td>
                  <td>{item.calories}</td>
                  <td>{item.carbs}g</td>
                  <td>{item.protein}g</td>
                  <td>{item.fat}g</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="modal-actions">
            <button onClick={closeModal}>취소</button>
          </div>
        </div>
      </div>
    )
  );
};

export default DietModal;
