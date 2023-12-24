import React, { useState } from 'react'
import './Exercise.css'
import ExerciseModal from '../../components/modals/ExerciseModal';


const Exercise = () => {

  // 모달 창의 가시성을 관리하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // isModalOpen = true => 모달 열어야함
  // isModalOpen = false => 모달 닫아야함

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  // 오늘 날짜를 yyyy-mm-dd 형식으로 가져오기
  const today = new Date().toISOString().split('T')[0];

  // 오늘 날짜를 상태로 관리
  const [currentDate, setCurrentDate] = useState(today);

  // 날짜와 요일을 문자열로 결합하는 함수
  const formatDateWithDay = (date) => {
    const dayOfWeek = weekdays[new Date(date).getDay()];
    return `${date} (${dayOfWeek})`;
  };

  // 운동 목록을 상태로 관리하고, addExercise 함수를 통해 이를 업데이트 함
  const [exerciseList, setExerciseList] = useState([]);

  const addExercise = (selectedExercises) => {
    // 새로운 운동 목록을 현재 목록에 추가
    setExerciseList([...exerciseList, ...selectedExercises]);
  };

  const removeExercise = (id) => {
    setExerciseList(exerciseList.filter(exercise => exercise.id !== id));
  };

  return (
    <div>
      <div id="datePicker">
        {/* 날짜 선택 입력 필드 */}
        <input
          type="date"
          id="currentDate"
          value={currentDate} // 입력 필드의 값으로 상태 사용
          onChange={(e) => setCurrentDate(e.target.value)} // 날짜 변경 핸들러
        />
        <span className='date-display'>{formatDateWithDay(currentDate)}</span>

        <button className="select-exercise-btn" onClick={openModal}>운동 선택하기</button>

        <div id='exercis'>
          <h2>오늘의 운동</h2>
          <ul id='exerciseList'>
            {exerciseList.map(exercise => (
              <li key={exercise.id}>
                {exercise.name}
                <button onClick={() => removeExercise(exercise.id)} className="removeExerciseBtn">X</button>
              </li>
            ))}
          </ul>
        </div>
        {isModalOpen && <ExerciseModal onClose={closeModal} addExercise={addExercise} />}
        {/* addExercise 함수를 prop으로 전달 */}
      </div>
    </div>
  )
}

export default Exercise
