import React, { useState, useEffect } from 'react';
import './DietModal.css';
import getDietInfo from '../../Api/getDietInfo';

const DietModal = ({ isModalOpen, closeModal, addFoodToMeal }) => {

  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchFoodItems = async () => {
      getDietInfo(setFoodItems)
    };
    if (isModalOpen) {
      fetchFoodItems();
    }
  }, [isModalOpen]);

  const filteredItems = foodItems.filter(item =>
    item.dietName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <input
            type="text"
            placeholder="음식 이름으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className='food-list-container'>
            <table className="food-table">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>칼로리(kcal)</th>
                  <th>탄수화물(g)</th>
                  <th>단백질(g)</th>
                  <th>지방(g)</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} onDoubleClick={() => addFoodToMeal(item)}>
                    <td>{item.dietName}</td>
                    <td>{item.calories}</td>
                    <td>{item.carbohydrate}</td>
                    <td>{item.protein}</td>
                    <td>{item.fats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-actions">
            <button onClick={closeModal}>취소</button>
          </div>
        </div>
      </div>
    )
  );
};

export default DietModal;
