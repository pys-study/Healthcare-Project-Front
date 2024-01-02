import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const WeightChart = () => {
  const chartoptions = {
    series: [
      {
        name: "소모 칼로리",
        type: "column", // 막대 그래프로 표시
        data: [700, 300, 500, 600, 700, 240, 900] // 소모 칼로리 데이터
      },
      {
        name: "운동한 무게",
        type: "line", // 선 그래프로 표시
        data: [130, 500, 200, 1300, 660, 1500, 600] // 운동한 무게 데이터
      }
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        width: [0, 4]
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: ["월", "화", "수", "목", "금", "토", "일"],
      xaxis: {
        type: "category"
      },
      yaxis: [
        {
          title: {
            text: "소모 칼로리",
          },
        },
        {
          opposite: true,
          title: {
            text: "운동한 무게"
          }
        }
      ]
    },
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" style={{ textAlign: 'center' }}>이번 주 운동 현황</CardTitle>
        <Chart
          options={chartoptions.options}
          series={chartoptions.series}
          type="line"
          height="350"
        />
      </CardBody>
    </Card>
  );
};

export default WeightChart;