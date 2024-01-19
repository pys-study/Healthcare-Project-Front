import React, { useState, useEffect } from 'react';
import './DietModal.css';
import getDietInfo from '../../Api/getDietInfo';

const DietModal = ({ isModalOpen, closeModal, addFoodToMeal }) => {

  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      getDietInfo(setFoodItems)
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
                  <td>{item.dietName}</td>
                  <td>{item.calories}</td>
                  <td>{item.carbs}g</td>
                  <td>{item.protein}g</td>
                  <td>{item.fats}g</td>
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
