import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = () => {
  const chartoptions = {
    series: [
      {
        name: "수영",
        data: [0, 31, 40, 28, 51, 42, 150, 200],
      },
      {
        name: "달리기",
        data: [0, 11, 32, 45, 95, 90, 200, 300],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
        ],
      },
    },
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">일일 소모 칼로리 현황</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          연간 일일 소모 칼로리 보고
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


export default SalesChart;
