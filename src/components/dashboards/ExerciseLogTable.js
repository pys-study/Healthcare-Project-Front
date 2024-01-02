import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const ExerciseLogTable = () => {
  return (
    <MDBTable hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>운동</th>
          <th scope='col'>세트수</th>
          <th scope='col'>횟수</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <th scope='row'>1</th>
          <td>벤치프레스</td>
          <td>5</td>
          <td>8</td>
        </tr>
        <tr>
          <th scope='row'>2</th>
          <td>랫풀다운</td>
          <td>5</td>
          <td>12</td>
        </tr>
        <tr>
          <th scope='row'>3</th>
          <td>OHP</td>
          <td>5</td>
          <td>5</td>
        </tr>
        <tr>
          <th colSpan={2}>Total</th>
          <td>15</td>
          <td>25</td>
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
}

export default ExerciseLogTable;