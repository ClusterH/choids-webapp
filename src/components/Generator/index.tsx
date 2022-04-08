import classes from './Generator.module.css';
import { Col, Row } from 'react-bootstrap';
import Section from '../../layouts/Section';
import Parameter from './Parameter';
import ParameterColor from './ParameterColor';
import Canvas from './Canvas';
import { useState } from 'react';

const Generator = () => {
  const [statorRadius, setStatorRadius] = useState(0);
  const [rotorRadius, setRotorRadius] = useState(0);
  const [pencilDistance, setPencilDistance] = useState(0);
  const [canvasColor, setCanvasColor] = useState('#fafafa');
  const [pencilColor, setPencilColor] = useState('#000000');
  const [pencilSharpness, setPencilSharpness] = useState(0);
  const [speed, setSpeed] = useState(10000);
  const [originX, setOriginX] = useState(0);
  const [originY, setOriginY] = useState(0);

  return (
    <Section fullWidth={false} className={classes.generator}>
      <Row>
        <Col>
          <ParameterColor
            onParameterChange={setCanvasColor}
            title="Canvas Color"
            value={canvasColor}
          />
          <Parameter
            onParameterChange={setStatorRadius}
            title="Stator Radius (a)"
            value={statorRadius}
            r={{ min: 0, max: 512 }}
          />
          <Parameter
            onParameterChange={setRotorRadius}
            title="Rotor Radius (b)"
            value={rotorRadius}
            r={{ min: 0, max: 512 }}
          />
          <Parameter
            onParameterChange={setPencilDistance}
            title="Pencil distance (h)"
            value={pencilDistance}
            r={{ min: 0, max: 512 }}
          />
          <ParameterColor
            onParameterChange={setPencilColor}
            title="Pencil Color"
            value={pencilColor}
          />
          <Parameter
            onParameterChange={setPencilSharpness}
            title="Pencil Sharpness"
            value={pencilSharpness}
            r={{ min: 0, max: 5 }}
          />
          <Parameter
            onParameterChange={setSpeed}
            title="Speed"
            value={speed}
            r={{ min: 10000, max: 0 }}
          />
          <Parameter
            onParameterChange={setOriginX}
            title="Origin (x)"
            value={originX}
            r={{ min: 0, max: 512 }}
          />
          <Parameter
            onParameterChange={setOriginY}
            title="Origin (y)"
            value={originY}
            r={{ min: 0, max: 512 }}
          />
        </Col>
        <Col>
          <Canvas
            statorRadius={statorRadius}
            rotorRadius={rotorRadius}
            pencilDistance={pencilDistance}
            canvasColor={canvasColor}
            pencilColor={pencilColor}
            pencilSharpness={pencilSharpness}
            speed={speed}
          />
        </Col>
      </Row>
    </Section>
  );
};

export default Generator;
