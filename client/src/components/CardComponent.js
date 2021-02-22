import React from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

export default function Card1(props) {
  const { history } = props;
  debugger
  return (
    <div>
      {
        history &&
        <Card style={{ width: props.width }}>
          <CardBody>
            <CardTitle style={{ color: 'black' }} >{history.cityName}</CardTitle>
            <CardSubtitle className="mb-2 text-muted">{history.country}</CardSubtitle>
            <CardText className="mb-2 text-muted">{history.description}</CardText>
            <CardText className="mb-2 text-muted">{history.temp}</CardText>
          </CardBody>
        </Card> 
      }</div>
  );
}