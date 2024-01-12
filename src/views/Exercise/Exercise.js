import React, { useState, useContext } from 'react'
import './Exercise.css'
import ExerciseModal from '../../components/modals/ExerciseModal';
import { AuthContext } from '../../contexts/AuthContext';

const Exercise = () => {
  const today = new Date().toISOString().split('T')[0];

  const { accessToken } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(today)
  const [exerciseList, setExerciseList] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  const formatDateWithDay = (date) => {
    const dayOfWeek = weekdays[new Date(date).getDay()];
    return `${date} (${dayOfWeek})`;
  };

  const addExercise = (selectedExerciseList) => {
    const newExerciseList = selectedExerciseList.map(e => {
      e.weight = 0
      e.sets = 0
      e.reps = 0
      e.totalCaloriesBurned = 0
      e.totalWeight = 0
      return e
    })
    setExerciseList([...exerciseList, ...newExerciseList])
  };

  const handleDetailChange = (index, field, value) => {
    const newExerciseList = [...exerciseList] // 불변성 
    const exerciseRow = { ...newExerciseList[index] }
    exerciseRow[field] = Number(value)
    exerciseRow.totalCaloriesBurned = Number(exerciseRow.sets) * Number(exerciseRow.reps) * Number(exerciseRow.caloriesPerMinutes)
    exerciseRow.totalWeight = Number(exerciseRow.weight) * Number(exerciseRow.sets) * Number(exerciseRow.reps);

    newExerciseList[index] = exerciseRow
    setExerciseList(newExerciseList)
  };

  const removeExercise = (id) => {
    setExerciseList(exerciseList.filter(exercise => exercise.id !== id));
  };

  // 중량, 세트 수, 횟수를 입력받아 총 무게를 계산하는 함수
  // const calculateTotalWeight = (exercise) => {
  //   const weight = parseFloat(exercise.weight);
  //   const sets = parseInt(exercise.sets);
  //   const reps = parseInt(exercise.reps);
  //   const totalWeight = weight * sets * reps;
  //   return totalWeight;
  // };
  // // 소모 칼로리 계산
  // const calculateCaloriesBurned = (exercise) => {
  //   const sets = parseInt(exercise.sets);
  //   const reps = parseInt(exercise.reps);
  //   const caloriesPerMinute = exercise.caloriesPerMinutes;
  //   const totalCaloriesBurned = sets * reps * caloriesPerMinute;
  //   return totalCaloriesBurned;
  // };

  const test = () => {
    console.log(exerciseList);
    console.log(accessToken);
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
            <span>비고</span>
          </div>
          <div id='exerciseList-container'>
            <ul id='exerciseList'>
              {exerciseList.map((exercise, index) => (
                <li key={index}>
                  <div className="exercise-inputs">
                    <div className='exerciseName'>
                      {exercise.exerciseName}
                    </div>
                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="중량"
                        aria-label="중량"
                        value={exerciseList[index].weight}
                        onChange={(e) => handleDetailChange(index, 'weight', e.target.value)}
                      />
                      <span className="input-unit">kg</span>
                    </div>

                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="세트 수"
                        aria-label="세트 수"
                        value={exerciseList[index].sets}
                        onChange={(e) => handleDetailChange(index, 'sets', e.target.value)} />
                      <span className="input-unit">세트</span>
                    </div>

                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="횟수"
                        aria-label="횟수"
                        value={exerciseList[index].reps}
                        onChange={(e) => handleDetailChange(index, 'reps', e.target.value)} />
                      <span className="input-unit">회</span>
                    </div>
                    <div>
                      <span>총 무게: {exercise.totalWeight} kg</span>
                      <span>소모 칼로리: {exercise.totalCaloriesBurned} 칼로리</span>
                    </div>
                  </div>
                  <button onClick={() => removeExercise(index)} className="removeExerciseBtn">X</button>
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
    </div >
  )
}

export default Exercise
