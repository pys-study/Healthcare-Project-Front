// ExerciseModal.js
import React, { useEffect, useState } from 'react';
import './ExerciseModal.css'; // 모달 스타일을 적용할 CSS 파일
import getExerciseInfo from '../../Api/getExerciseInfo';

const ExerciseModal = ({ onClose, addExercise }) => {

  // 선택한 운동들을 저장하는 변수 selectedExercises / 초기값은 빈 배열이다
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가


  useEffect(() => {
    getExerciseInfo(setExerciseData); // 컴포넌트가 마운트될 때 운동 데이터를 가져옵니다
  }, []);

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

  // 선택된 운동을 목록에서 제거하는 함수
  const removeExercise = (exerciseId) => {
    setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
  };

  // 선택된 운동의 개수를 반환
  const selectedCount = selectedExercises.length;

  const handleAddExercises = () => {
    // 선택된 운동 ID들을 기반으로 운동 데이터 찾기
    const selectedExercisesData = selectedExercises.map(id =>
      exerciseData.find(exercise => exercise.exerciseInfoID === id)
    );

    // 상위 컴포넌트(Exercise.js)에 선택된 운동들을 전달
    addExercise(selectedExercisesData);
    onClose(); // 모달 닫기
  };

  const filteredExerciseData = exerciseData.filter(exercise =>
    exercise.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className='exerciseModal'>
      <div className="exercise-modal">
        <button onClick={onClose} className="close-modal-btn">✖</button>
        <input
          type="text"
          placeholder="운동 이름으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="exercise-list-container">
          <table className="exercise-list">
            <thead>
              <tr>
                <th>선택</th>
                <th>운동명</th>
                <th>운동 부위</th>
                <th>분당 칼로리</th>
              </tr>
            </thead>
            <tbody>
              {filteredExerciseData.map((exercise) => (
                <tr
                  key={exercise.exerciseInfoID}
                  className="exercise-item"
                  onClick={() => toggleExercise(exercise.exerciseInfoID)}
                >
                  <td>
                    <input
                      type="checkbox"
                      id={`exercise-${exercise.exerciseInfoID}`}
                      checked={selectedExercises.includes(exercise.exerciseInfoID)}
                      onChange={() => toggleExercise(exercise.exerciseInfoID)}
                      onClick={(e) => e.stopPropagation()} // 이벤트 버블링 중단
                    />

                  </td>
                  <td>{exercise.exerciseName}</td>
                  <td>{exercise.exerciseType}</td>
                  <td>{exercise.caloriesPerMinutes} 칼로리/분</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="selected-exercises">
          {selectedExercises.map((id) => {
            const exercise = exerciseData.find(e => e.exerciseInfoID === id);
            return (
              <span key={id} className="selected-exercise">
                {exercise.exerciseName}
                <button className="remove-exercise-btn" onClick={() => removeExercise(id)}>✖</button>
              </span>
            );
          })}
        </div>
        <button className="add-exercises" onClick={handleAddExercises}>
          {selectedCount}개의 운동 추가하기
        </button>
      </div>
    </div>
  );
};

export default ExerciseModal;