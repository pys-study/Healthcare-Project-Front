import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Chart from 'react-apexcharts';

const CalorieChart = () => {
  const chartoptions = {
    series: [
      {
        name: "아침",
        data: [1200, 1250, 1300, 1350, 1220, 1200, 1230], // 주별 아침 섭취 칼로리
      },
      {
        name: "점심",
        data: [2300, 1550, 1600, 1650, 1700, 2750, 1800], // 주별 점심 섭취 칼로리
      },
      {
        name: "저녁",
        data: [1700, 1750, 800, 1850, 1900, 3950, 1000], // 주별 저녁 섭취 칼로리
      },
      {
        name: "총 섭취 칼로리",
        data: [2500, 3550, 2700, 1850, 3820, 3200, 4330], // 주별 총 섭취 칼로리
        type: 'line', // 총 섭취 칼로리는 라인 그래프로 표시
      },
    ],
    options: {
      chart: {
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ["월", "화", "수", "목", "금", "토", "일"], // 요일 카테고리
      },
      yaxis: {
        max: 5000, // Y축 최대값을 400으로 설정
        min: 0, // Y축 최소값을 0으로 설정
        tickAmount: 4, // 100 단위로 표시하기 위해 4개의 틱을 생성
        title: {
          text: '칼로리 (kcal)',
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">주간 섭취 칼로리 현황 (SalesChart)</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          주간 일일 섭취 칼로리 보고
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default CalorieChart;
