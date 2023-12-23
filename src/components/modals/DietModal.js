import React, { useState, useEffect } from 'react';
import '../../views/ui/css/diet.css';

const FoodModal = ({ isOpen, closeModal, addFoodToMeal }) => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // 공공 데이터 API로부터 식품 정보를 가져오는 함수를 여기에 구현합니다.
    // 예시로 더미 데이터를 사용했습니다.
    const fetchFoodItems = async () => {
      // 가정으로 API 호출 대신 더미 데이터를 사용합니다.
      const dummyFoodItems = [
        { id: 1, name: '사과' },
        { id: 2, name: '닭가슴살' },
        // ...더 많은 식품 데이터
      ];
      setFoodItems(dummyFoodItems);
      // 실제로는 아래와 같이 API를 호출하게 됩니다.
      // const response = await fetch('API_ENDPOINT');
      // const data = await response.json();
      // setFoodItems(data);
    };

    if (isOpen) {
      fetchFoodItems();
    }
  }, [isOpen]);

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ul className="food-list">
            {foodItems.map((item) => (
              <li key={item.id} onDoubleClick={() => addFoodToMeal(item)}>
                {item.name}
              </li>
            ))}
          </ul>
          <div className="modal-actions">
            <button onClick={closeModal}>취소</button>
          </div>
        </div>
      </div>
    )
  );
};

export default FoodModal;
