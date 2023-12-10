import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import StarterOfTop from "../views/StarterOfTop";



const BlogData = [
  {
    image: bg1,
    title: "제목(파일 경로 : views/ui/Starter.js)",
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

const Starter = () => {
  return (
    <div>
      <Row>
        <Col xxl="12">
          <StarterOfTop />
        </Col>
      </Row>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="달리기 소비 칼로리"
            subtitle="달리기"
            earning="300kcal"
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="필라테스 소비 칼로리"
            subtitle="필라테스"
            earning="200kcal"
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="근력 운동 소비 칼로리"
            subtitle="근력 운동"
            earning="200kcal"
            icon="bi bi-basket3"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="수영 소비 칼로리"
            subtitle="수영"
            earning="200kcal"
            icon="bi bi-bag"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col xxl="12">
          <SalesChart />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="7" xxl="8" md="12">
          <ProjectTables />
        </Col>
        <Col md="12" lg="5" xxl="4">
          <Feeds />
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
    </div>
  );
};

export default Starter;
