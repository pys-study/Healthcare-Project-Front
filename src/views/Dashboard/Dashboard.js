import { Col, Row } from "reactstrap";
import CaloriesChart from "../../components/dashboards/CalorieChart";
import CalorieCards from "../../components/dashboards/CalorieCards";
import Blog from "../../components/dashboards/Blog";
import ExerciseLogTable from "../../components/dashboards/ExerciseLogTable";
import ExerciseWeightChart from "../../components/dashboards/ExerciseWeightChart";
import DailyCalorieChart from "../../components/dashboards/DailyCalorieChart";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import React, { useState } from 'react';
import axios from "axios";


const BlogData = [
  {
    image: bg1,
    title: "제목",
    subtitle: "2 댓글, 1 좋아요",
    description:
      "본문\n 긴 글도 쓸 수 있어요",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "오운완",
    subtitle: "2 댓글, 1 좋아요",
    description:
      "본문",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "같이 운동하실분",
    subtitle: "2 댓글, 1 좋아요",
    description:
      "본문",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "게시물 제목",
    subtitle: "2 댓글, 1 좋아요",
    description:
      "본문",
    btnbg: "primary",
  },
];

const Dashboard = () => {


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

  const inlineStyle = {
    fontFamily: "'Arial', sans-serif", // 글꼴 설정: Arial과 기본 sans-serif 글꼴 사용
    color: '#2c3e50', // 텍스트 색상: 진한 회색/파란색 계열
    textAlign: 'center', // 텍스트 정렬: 중앙 정렬
    fontSize: '2.5rem', // 글자 크기: 2.5rem (상대적 크기 단위)
    margin: '20px 0', // 마진: 위아래로 20px, 좌우로 0
    padding: '10px 0', // 패딩: 위아래로 10px, 좌우로 0
    borderBottom: '2px solid #3498db', // 하단 테두리: 2px 두께, 실선, 파란색 계열
    backgroundColor: '#d4edda', // 배경 색상: 옅은 회색/파란색 계열
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 그림자: x축 0, y축 4px, 흐림 6px, 색상 검은색의 10% 투명도
    borderRadius: '5px', // 테두리 둥글기: 모든 모서리를 5px의 반경으로 둥글게 설정    
  };

  return (
    <div>
      <h1 style={inlineStyle}>{formatDateWithDay(currentDate)}</h1>
      <h4>오늘 섭취한 칼로리</h4>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <CalorieCards
            bg="bg-light-success text-success"
            title="아침 섭취 칼로리"
            subtitle="아침 식사"
            earning="319 kcal"
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <CalorieCards
            bg="bg-light-danger text-danger"
            title="점심 섭취 칼로리"
            subtitle="점심 식사"
            earning="980 kcal"
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <CalorieCards
            bg="bg-light-warning text-warning"
            title="저녁 섭취 칼로리"
            subtitle="저녁 식사"
            earning="752 kcal"
            icon="bi bi-basket3"
          />
        </Col>
        <Col sm="6" lg="3">
          <CalorieCards
            bg="bg-light-info text-into"
            title="하루 섭취 칼로리"
            subtitle="총 합계"
            earning="2051 kcal"
            icon="bi bi-bag"
          />
        </Col>
      </Row>

      {/***금일 섭취 칼로리***/}
      <Row>
        <Col xxl="12">
          <DailyCalorieChart />
        </Col>
      </Row>
      {/***주간 섭취 칼로리***/}
      <Row>
        <Col xxl="12">
          <CaloriesChart />
        </Col>
      </Row>
      {/***ExerciseLogTalbe ***/}
      <Row>
        <Col lg="7" xxl="12" md="12">
          <h3 style={{ textAlign: 'center' }}>오늘의 운동</h3>
          <ExerciseLogTable />
        </Col>
        <Col md="12" lg="5" xxl="12">
          <ExerciseWeightChart />
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
    </div >
  );
};

export default Dashboard;
