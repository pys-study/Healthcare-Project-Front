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
    const exercisesToAdd = selectedExercises.map(exercise => ({
      id: exercise.exerciseInfoID,
      name: exercise.exerciseName,
      type: exercise.exerciseType,
      // 기타 필요한 필드 추가
    }));
    setExerciseList([...exerciseList, ...exercisesToAdd]);
  };

  const [exerciseDetails, setExerciseDetails] = useState({});

  const handleDetailChange = (id, field, value) => {
    setExerciseDetails({
      ...exerciseDetails,
      [id]: {
        ...exerciseDetails[id],
        [field]: value,
      },
    });
  };

  const removeExercise = (id) => {
    setExerciseList(exerciseList.filter(exercise => exercise.id !== id));
  };

  // 중량, 세트 수, 횟수를 입력받아 총 무게를 계산하는 함수
  const calculateTotalWeight = (exercise) => {
    const weight = parseFloat(exerciseDetails[exercise.id]?.weight || 0);
    const sets = parseInt(exerciseDetails[exercise.id]?.sets || 0);
    const reps = parseInt(exerciseDetails[exercise.id]?.reps || 0);
    const totalWeight = weight * sets * reps;
    return isNaN(totalWeight) ? 0 : totalWeight;
  };

  const test = () => {
    console.log(addExercise);
  }



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
        <h2>오늘의 운동</h2>
        <br></br>
        <div id='exercis'>
          <div className="exercise-schema">
            <span>운동</span>
            <span>중량</span>
            <span>세트 수</span>
            <span>횟수</span>
            <span>총 무게</span>
          </div>
          <div id='exerciseList-container'>
            <ul id='exerciseList'>
              {exerciseList.map(exercise => (
                <li key={exercise.id}>
                  <div className="exercise-inputs">
                    <div className='exerciseName'>
                      {exercise.name}
                    </div>
                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="중량"
                        aria-label="중량"
                        value={exerciseDetails[exercise.id]?.weight || ''}
                        onChange={(e) => handleDetailChange(exercise.id, 'weight', e.target.value)}
                      />
                      <span className="input-unit">kg</span>
                    </div>

                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="세트 수"
                        aria-label="세트 수"
                        value={exerciseDetails[exercise.id]?.sets || ''}
                        onChange={(e) => handleDetailChange(exercise.id, 'sets', e.target.value)} />
                      <span className="input-unit">세트</span>
                    </div>

                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="횟수"
                        aria-label="횟수"
                        value={exerciseDetails[exercise.id]?.reps || ''}
                        onChange={(e) => handleDetailChange(exercise.id, 'reps', e.target.value)} />
                      <span className="input-unit">회</span>
                    </div>
                    <div>
                      총 무게: {calculateTotalWeight(exercise)} kg
                    </div>
                  </div>
                  <button onClick={() => removeExercise(exercise.id)} className="removeExerciseBtn">X</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="button-container">
            <button className="select-button" onClick={openModal}>운동 선택하기</button>
            <button onClick={test} className="save-button">저장하기</button>
            <button className="edit-button">수정하기</button>
          </div>
          {isModalOpen && <ExerciseModal
            onClose={closeModal} addExercise={addExercise} />}
          {/* addExercise 함수를 prop으로 전달 */}
        </div>
      </div>
    </div>
  )
}

export default Exercise
