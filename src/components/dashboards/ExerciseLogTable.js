import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import getExerciseRecords from '../../Api/getExerciseRecords';
import { useCurrentDate } from '../../contexts/CurrentDateContext';

const ExerciseLogTable = () => {
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const { currentDate } = useCurrentDate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExerciseRecords(currentDate);
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          setExerciseRecords(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching exercise records:', error);
      }
    };

    fetchData();
  }, [currentDate]); // Include currentDate in the dependency array

  return (
    <MDBTable hover>
      <MDBTableHead className='table-info'>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>운동 로그</th>
          <th scope='col'>세트수</th>
          <th scope='col'>횟수</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {Array.isArray(exerciseRecords) && exerciseRecords.map((record, index) => (<tr key={index}>
          <th scope='row'>{index + 1}</th>
          <td>{record.exerciseInfo.exerciseName}</td>
          <td>{record.sets}</td>
          <td>{record.countPerSets}</td>
        </tr>
        ))}
        {/* Your logic to calculate and display total */}
      </MDBTableBody>
    </MDBTable>
  );
}

export default ExerciseLogTable;