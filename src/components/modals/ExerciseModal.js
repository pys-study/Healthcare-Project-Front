// ExerciseModal.js
import React, { useState } from 'react';
import './ExerciseModal.css'; // 모달 스타일을 적용할 CSS 파일

const ExerciseModal = ({ onClose }) => {
  const [selectedExercises, setSelectedExercises] = useState([]);

  // 임시 운동 데이터
  const exercises = [
    { id: 1, name: '바벨 백스쿼트', imageUrl: '/path/to/image1.png' },
    { id: 2, name: '프론트 스쿼트', imageUrl: '/path/to/image2.png' },
    // ... 추가 운동 데이터
  ];

  // 체크박스 상태를 토글하는 함수
  const toggleExercise = (exerciseId) => {
    setSelectedExercises((prevSelected) => {
      if (prevSelected.includes(exerciseId)) {
        return prevSelected.filter((id) => id !== exerciseId);
      } else {
        return [...prevSelected, exerciseId];
      }
    });
  };

  return (
    <div className="exercise-modal">
      <div className="exercise-list">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-item">
            <input
              type="checkbox"
              id={`exercise-${exercise.id}`}
              checked={selectedExercises.includes(exercise.id)}
              onChange={() => toggleExercise(exercise.id)}
            />
            <label htmlFor={`exercise-${exercise.id}`}>
              <img src={exercise.imageUrl} alt={exercise.name} />
              {exercise.name}
            </label>
          </div>
        ))}
      </div>
      <div className="selected-exercises">
        {selectedExercises.map((id) => (
          <span key={id}>{exercises.find((e) => e.id === id)?.name}</span>
        ))}
        <button onClick={onClose}>✖</button>
      </div>
      <button className="add-exercises">1개의 운동 추가하기</button>
    </div>
  );
};

export default ExerciseModal;
