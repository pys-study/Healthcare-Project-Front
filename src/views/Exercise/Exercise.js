import React, { useState, useEffect, useContext } from 'react'
import './Exercise.css'
import ExerciseModal from '../../components/modals/ExerciseModal';
import getExerciseRecords from '../../Api/getExerciseRecords';
// import { AuthContext } from '../../contexts/AuthContext';
// import getMember from '../../Api/getMember';
import postExerciseRecords from '../../Api/postExerciseRecords';
import DeleteExercise from '../../Api/DeleteExercise';
const Exercise = () => {
  const today = new Date().toISOString().split('T')[0];

  // const { accessToken } = useContext(AuthContext);
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

  useEffect(() => {
    const fetchExerciseRecords = async () => {
      const records = await getExerciseRecords(currentDate);
      console.log(records);
      if (records) {
        const mappedRecords = records.map(record => {
          const weight = Number(record.weight) || 0;
          const sets = Number(record.sets) || 0;
          const reps = Number(record.countPerSets) || 0;
          const caloriesPerMinute = record.exerciseInfo?.caloriesPerMinutes || 0;

          return {
            ...record,
            reps: reps,
            totalCaloriesBurned: sets * reps * caloriesPerMinute,
            totalWeight: weight * sets * reps
          };
        });
        setExerciseList(mappedRecords);
      } else {
        setExerciseList([]);
      }
    };

    fetchExerciseRecords();
  }, [currentDate]);

  const addExercise = (selectedExerciseList) => {
    const newExerciseList = selectedExerciseList.map(e => {
      return {
        exerciseInfo: {
          caloriesPerMinutes: e.caloriesPerMinutes,
          exerciseInfoID: e.exerciseInfoID,
          exerciseName: e.exerciseName,
          exerciseType: e.exerciseType
        },
        reps: 0,
        sets: 0,
        weight: 0,
        totalCaloriesBurned: 0,
        totalWeight: 0,
        isNew: true, // Add this line
      };
    });
    setExerciseList([...exerciseList, ...newExerciseList])
  };

  const handleDetailChange = (index, field, value) => {
    const newExerciseList = [...exerciseList] // 불변성 
    const exerciseRow = { ...newExerciseList[index] }
    exerciseRow[field] = Number(value)
    exerciseRow.totalCaloriesBurned = Number(exerciseRow.sets) * Number(exerciseRow.reps) * Number(exerciseRow.exerciseInfo.caloriesPerMinutes)
    exerciseRow.totalWeight = Number(exerciseRow.weight) * Number(exerciseRow.sets) * Number(exerciseRow.reps);

    newExerciseList[index] = exerciseRow
    setExerciseList(newExerciseList)
  };

  const removeExercise = async (index) => {
    setExerciseList(exerciseList.filter((_, i) => i !== index));

    const exerciseToRemove = exerciseList[index];
    const recordId = exerciseToRemove.recordId;

    try {
      // 서버에 삭제 요청을 보내는 함수 호출
      await DeleteExercise(recordId);

      // 요청이 성공하면 로컬 상태 업데이트
      setExerciseList(exerciseList.filter((_, i) => i !== index));
    } catch (error) {
      // 에러 처리
      console.error('Exercise 삭제 중 오류 발생:', error);
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setCurrentDate(newDate);
  };

  const save = () => {
    const newExercises = exerciseList.filter(exercise => exercise.isNew);

    // Send newExercises to your API
    postExerciseRecords(currentDate, newExercises);

    // Optionally, update the exerciseList to mark all as not new
    const updatedExercises = exerciseList.map(exercise => ({ ...exercise, isNew: false }));
    setExerciseList(updatedExercises);
    console.log(exerciseList);
  }

  return (
    <div>
      <div id="datePicker">
        {/* 날짜 선택 입력 필드 */}
        <input
          type="date"
          id="currentDate"
          value={currentDate}
          onChange={handleDateChange} // 날짜 변경 핸들러 업데이트
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
                      {exercise.exerciseInfo.exerciseName}
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
            <button onClick={save} className="save-button">저장하기</button>
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
