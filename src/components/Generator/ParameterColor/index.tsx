import React from 'react';
// import classes from './ParameterColor.module.css';
import { Form, Col, Row } from 'react-bootstrap';

const ParameterColor = (props: any) => {
  const { title, value, onParameterChange } = props;

  return (
    <Row className="mx-0 mt-3 gap-2">
      <Col>
        <Form.Label htmlFor="exampleColorInput">{title}</Form.Label>
      </Col>
      <Col>
        <Form.Control
          type="text"
          value={value}
          onChange={(e) => onParameterChange(e.target.value)}
        />
      </Col>
      <Col>
        <Form.Control
          type="color"
          id={title}
          value={value}
          onChange={(e) => onParameterChange(e.target.value)}
          title="Color"
        />
      </Col>
    </Row>
  );
};

export default ParameterColor;
