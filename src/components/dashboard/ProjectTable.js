import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

const tableData = [
  {
    avatar: user1,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "필라테스",
    status: "pending",
    weeks: "35",
    budget: "200kcal",
  },
  {
    avatar: user2,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "달리기",
    status: "done",
    weeks: "35",
    budget: "400kcal",
  },
  {
    avatar: user3,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "근력 운동",
    status: "holt",
    weeks: "35",
    budget: "250kcal",
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "요가",
    status: "pending",
    weeks: "35",
    budget: "300kcal",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "홈 트레이닝",
    status: "done",
    weeks: "35",
    budget: "300kcal",
  },
];

const ProjectTables = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">친구 목록</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            친구들의 운동 현황을 확인해보세요!
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>이름</th>
                <th>운동 종류</th>

                <th>주간 빈도</th>

                <th>소모 칼로리</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.project}</td>
                  <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>

                  <td>{tdata.budget}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
