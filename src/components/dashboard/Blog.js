import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (props) => {
  return (
    <Card>
      <CardImg alt="Card image cap" src={props.image} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        {/*<CardText className="mt-3">{props.text}</CardText>*/}
        {/*줄바꿈, 최대 높이, overflow 및 text-overflow 속성 추가 */}
        <CardText
          className="mt-3"
          style={{
            whiteSpace: 'pre-line',
            maxHeight: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {props.text}
        </CardText>
        <Button color={props.color}>더 보기</Button>
      </CardBody>
    </Card>
  );
};

export default Blog;
