import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import getExerciseRecords from '../../Api/getExerciseRecords';

const ExerciseLogTable = () => {
  const [exerciseRecords, setExerciseRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getExerciseRecords('2024-01-19');
      console.log(data);
      if (data) {
        setExerciseRecords(data);
      }
    };

    fetchData().catch(console.error);
  }, []);

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
        {exerciseRecords.map((record, index) => (
          <tr key={index}>
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