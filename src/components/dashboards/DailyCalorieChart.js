import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Chart from 'react-apexcharts';

const DailyCalorieChart = () => {
  const calorieData = [2200, 1500, 1800]; // 섭취한 칼로리 데이터
  const totalCalories = calorieData.reduce((a, b) => a + b, 0); // 총 칼로리 계산

  const chartOptions = {
    series: calorieData,
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['아침', '점심', '저녁'],
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          const calorie = calorieData[opts.seriesIndex];
          return `${val.toFixed(2)}% \n ${calorie} kcal`; // 줄바꿈을 위해 '\n' 사용
        },
        style: {
          colors: ['#000000'],
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          whiteSpace: 'pre', // 줄바꿈을 가능하게 하는 CSS 속성
        },
        dropShadow: {
          enabled: false,
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  return (
    <Card>
      <CardBody style={{ textAlign: 'center' }}>
        <CardTitle tag="h5">총 섭취 칼로리: {totalCalories} kcal</CardTitle>
        <div style={{ display: 'inline-block' }}>
          <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            type="pie"
            width="450"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default DailyCalorieChart;
