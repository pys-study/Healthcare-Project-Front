// ExerciseModal.js
import React, { useState } from 'react';
import './ExerciseModal.css'; // 모달 스타일을 적용할 CSS 파일

const ExerciseModal = ({ onClose, addExercise }) => {

  // 선택한 운동들을 저장하는 변수 selectedExercises / 초기값은 빈 배열이다
  const [selectedExercises, setSelectedExercises] = useState([]);

  // 임시 운동 데이터
  const exerciseData = [
    { id: 1, name: '바벨 백스쿼트' },
    { id: 2, name: '프론트 스쿼트' },
    { id: 3, name: '벤치프레스' },
    { id: 4, name: '데드리프트' },
    { id: 5, name: '오버 헤드 프레스' },
    { id: 6, name: '사이드 레터럴 레이즈' },
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

  // 선택된 운동을 목록에서 제거하는 함수
  const removeExercise = (exerciseId) => {
    setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
  };

  // 선택된 운동의 개수를 반환
  const selectedCount = selectedExercises.length;

  const handleAddExercises = () => {
    // 선택된 운동 ID들을 기반으로 운동 데이터 찾기
    const selectedExercisesData = selectedExercises.map(id =>
      exerciseData.find(exercise => exercise.id === id)
    );

    // 상위 컴포넌트(Exercise.js)에 선택된 운동들을 전달
    addExercise(selectedExercisesData);
    onClose(); // 모달 닫기
  };

  return (
    <div className="exercise-modal">
      {/* 모달 창 닫기 버튼 */}
      <button onClick={onClose} className="close-modal-btn">✖</button>

      {/* 운동 목록 */}
      <div className="exercise-list">
        {/* 운동 아이템 반복 */}
        {exerciseData.map((exercise) => (
          <div key={exercise.id} className="exercise-item">
            <input
              type="checkbox"
              id={`exercise-${exercise.id}`}
              checked={selectedExercises.includes(exercise.id)}
              onChange={() => toggleExercise(exercise.id)}
            />
            <label htmlFor={`exercise-${exercise.id}`}>
              {exercise.name}
            </label>
          </div>
        ))}
      </div>
      {/* 선택된 운동 목록 */}
      <div className="selected-exercises">
        {selectedExercises.map((id) => {
          // 운동 아이디를 기반으로 운동 객체 찾기
          const exercise = exerciseData.find(e => e.id === id);
          return (
            <span key={id} className="selected-exercise">
              {exercise.name} {/* 올바르게 운동 이름 표시 */}
              <button onClick={() => removeExercise(id)} className="remove-exercise-btn">✖</button>
            </span>
          );
        })}
      </div>
      <button className="add-exercises" onClick={handleAddExercises}>
        {selectedCount}개의 운동 추가하기
      </button>
    </div>
  );
};

export default ExerciseModal;