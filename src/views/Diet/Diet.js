import React, { useState } from 'react';
import './Diet.css';
import DietModal from '../../components/modals/DietModal';

const Diet = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: []
  });


  const openModal = (mealType) => {
    setSelectedMeal(mealType);
    setModalOpen(true);
    <dietModal />
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addFoodToMeal = (foodItem) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [selectedMeal]: [...prevMeals[selectedMeal], foodItem]
    }));
    closeModal();
  };


  return (
    <div>
      <div id="datePicker">
        <input type="date" id="currentDate" />
      </div>

      <div id="meals">
        <section id="breakfast">
          <h2>아침 식사</h2>
          <ul id="breakfastList">
          </ul>
          <button className="addFoodBtn" onClick={() => openModal('breakfast')}>+</button>
        </section>

        <section id="lunch">
          <h2>점심 식사</h2>
          <ul id="lunchList">

          </ul>
          <button className="addFoodBtn" onClick={() => openModal('lunch')}>+</button>
        </section>

        <section id="dinner">
          <h2>저녁식사</h2>
          <ul id="dinnerList">
          </ul>
          <button className="addFoodBtn" onClick={() => openModal('dinner')}>+</button>
        </section>
      </div>
      <DietModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        addFoodToMeal={addFoodToMeal}
      />

    </div>
  );
};

export default Diet;
