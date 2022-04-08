import React, { useState, useEffect } from 'react';
// import classes from './Parameter.module.css';
import { Form, Col, Row } from 'react-bootstrap';

const Parameter = (props: any) => {
  const { title, value, onParameterChange, r } = props;

  const [range, setRange] = useState(0);

  useEffect(() => {
    setRange(convertRange(value, r.min, r.max, 0, 100));
  }, [value]);

  useEffect(() => {
    onParameterChange(convertRange(range, 0, 100, r.min, r.max));
  }, [range, onParameterChange]);

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
        <Form.Range
          value={range}
          onChange={(e) => setRange(e.target.value as unknown as number)}
        />
      </Col>
    </Row>
  );

  // TODO: move to utils
  function convertRange(
    subjectValue: number,
    subjectMin: number,
    subjectMax: number,
    resultMin: number,
    resultMax: number
  ) {
    return (
      ((resultMax - resultMin) / (subjectMax - subjectMin)) *
        (subjectValue - subjectMin) +
      resultMin
    );
  }
};

export default Parameter;
