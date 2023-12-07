import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const FeedData = [
  {
    title: "추천 의약품 및 보충제 1",
    icon: "bi bi-bell",
    color: "primary",
    explain: "면역력 강화",
  },
  {
    title: "추천 의약품 및 보충제 2",
    icon: "bi bi-person",
    color: "info",
    explain: "식이섬유 보충",
  },
  {
    title: "추천 의약품 및 보충제 3",
    icon: "bi bi-hdd",
    color: "danger",
    explain: "단백질 보충",
  },
  {
    title: "추천 의약품 및 보충제 4",
    icon: "bi bi-bag-check",
    color: "success",
    explain: "면역력 강화",
  },
  {
    title: "추천 의약품 및 보충제 5",
    icon: "bi bi-bell",
    color: "dark",
    explain: "면역력 강화",
  },
  {
    title: "추천 의약품 및 보충제 6",
    icon: "bi bi-hdd",
    color: "warning",
    explain: "면역력 강화",
  },
  {
    title: "추천 의약품 및 보충제 7",
    icon: "bi bi-hdd",
    color: "danger",
    explain: "면역력 강화",
  },
];

const Feeds = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">의약품 및 보충제 정보</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          현재 복용중인 의약품, 보충제를 포함한 Healthcare의 추천 영양제
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {FeedData.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={feed.color}
              >
                <i className={feed.icon}></i>
              </Button>
              {feed.title}
              <small className="ms-auto text-muted text-small">
                {feed.explain}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
