//https://proofwiki.org/wiki/File:Hypocycloid.png
import React, { useState, useRef, useEffect } from 'react';
// import classes from './Canvas.module.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Point } from '../models/Point';
import { useInterval } from './useInterval';
//redux
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { showAlert, hideAlert } from '../../../features/alertSlice';
// config
import { NFT_STORAGE_KEY } from '../../../config';
// storage
import { NFTStorage } from 'nft.storage';
// web3
import { useEthers } from '@usedapp/core';

import axios from 'axios';

import {
  drawArc,
  drawLine,
  drawCircle,
  drawPoint,
  drawCanvas,
  hideCanvas,
  showCanvas,
  clearCanvas,
} from './shapes';
import { calcRotorCenter, calcPencilPoint, calcAlpha } from './coordinates';
import { Metadata } from '../../../models/Metadata';

const Canvas = (props: any) => {
  const {
    statorRadius,
    rotorRadius,
    pencilDistance,
    canvasColor,
    pencilColor,
    pencilSharpness,
    speed,
    originX,
    originY,
  } = props;

  const { account } = useEthers();

  const width = 512;
  const height = 512;
  const backgroundCanvasRef: any = useRef<HTMLCanvasElement | null>(null);
  const backgroundCanvasContextRef =
    React.useRef<CanvasRenderingContext2D | null>(null);
  const circlesCanvasRef: any = useRef<HTMLCanvasElement | null>(null);
  const circlesCanvasContextRef = React.useRef<CanvasRenderingContext2D | null>(
    null
  );
  const artCanvasRef: any = useRef<HTMLCanvasElement | null>(null);
  const artCanvasContextRef = React.useRef<CanvasRenderingContext2D | null>(
    null
  );

  const [alpha, setAlpha] = useState(0);
  const [iterator, setIterator] = useState(0);
  const [currentPencil, setCurrentPencil] = useState({ x: 0, y: 0 });
  const [startingPencil, setStartingPencil] = useState({ x: 0, y: 0 });

  // const [speed, setSpeed] = useState(1 / 1000);

  const [segments] = useState(200);
  const [circleWeight] = useState(0.5);
  const [circleColor] = useState('#323232');
  const [pencilDiameter] = useState(4);
  const [drawing, setDrawing] = useState(false);

  const [showBackground, setShowBackground] = useState(true);
  const handleBackgroundShow = () => {
    setShowBackground(!showBackground);
  };

  const [showCircles, setShowCircles] = useState(true);
  const handleCircleShow = () => {
    setShowCircles(!showCircles);
  };

  const [showArt, setShowArt] = useState(true);
  const handleArtShow = () => {
    setShowArt(!showArt);
  };

  const [draw, setDraw] = useState(false);
  const handleDraw = () => {
    setDraw(true);
  };

  const dispatch = useAppDispatch();

  function save() {
    console.log('save clicked');
    dispatch(
      showAlert({
        type: 'info',
        message: 'Processing Image',
      })
    );

    if (backgroundCanvasRef.current && artCanvasRef.current) {
      // let context2 = artCanvasRef.current.getContext('2d');
      // artCanvasRef.current.toBlob(blobHandler, 'image/png', 1.0);
      backgroundCanvasContextRef.current =
        backgroundCanvasRef.current.getContext('2d');
      let contextBackground = backgroundCanvasContextRef.current;
      artCanvasContextRef.current = artCanvasRef.current.getContext('2d');
      let contextArt = artCanvasContextRef.current;
      contextBackground?.drawImage(artCanvasRef.current, 0, 0);
      backgroundCanvasRef.current.toBlob(blobHandler, 'image/png', 1.0);
    } else {
      console.log('no ref');
    }

    // flatten image
    // flattenCanvas(
    //   finalCanvasRef,
    //   backgroundCanvasRef,
    //   artCanvasRef,
    //   blobHandler
    // );
  }

  async function blobHandler(blob: any) {
    console.log('blob handler called');
    console.log(blob);
    // nft storage stuff
    const storage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const cid = await storage.storeBlob(new Blob([blob]));
    console.log('art cid', cid);
    // const metadata = await client.store({
    //   account: account,
    //   image: blob,
    // });
    var metadata: Metadata = {
      name: 'Choid',
      creator: account,
      image: 'ipfs://' + cid,
      version: 1,
    };
    const metaCid = await storage.storeBlob(
      new Blob([JSON.stringify(metadata)])
    );
    console.log('meta cid', metaCid);
    getSignature(metaCid);
  }

  async function getSignature(metaCid: any) {
    const response = await axios.get(
      `https://us-central1-wenbali-signature-relay.cloudfunctions.net/app/api/${account}/1/${metaCid}`
    );
    console.log(response);
  }

  function stop() {
    console.log('stop clicked');
    setDraw(false);
    dispatch(
      showAlert({ type: 'warning', message: 'Gears have grinded to a halt!' })
    );
    setTimeout(() => {
      console.log('stop hide alert timer');
      hideAlert();
    }, 2000);
  }

  function reset() {
    console.log('reset clicked');
    setDraw(false);
    setIterator(0);
    setAlpha(0);
    setCurrentPencil(drawCircleLayer(alpha));
  }

  // this is our main drawing function
  // the driver for all things is the value
  // of alpha, which is the angle that locates
  // the rotor
  useInterval(() => {
    if (draw) {
      let tempAlpha = alpha;

      if (circlesCanvasRef.current) {
        setDrawing(true);
        const statorCircumference = 2 * Math.PI * statorRadius;
        const segmentLength = statorCircumference / (segments + 1);
        const currentPosition = iterator * segmentLength;
        tempAlpha = calcAlpha(currentPosition, statorRadius);
        const pp: Point = drawCircleLayer(tempAlpha);
        setCurrentPencil(pp);

        // see if we are back at the beginning
        if (startingPencil.x === currentPencil.x) {
          console.log('back at the beginning');
          console.log('x', startingPencil.x, currentPencil.x);
          console.log('y', startingPencil.y, currentPencil.y);
        }
        // record the starting point
        // do this after the check so first pass
        // doesn't shut us down
        if (iterator === 0) {
          console.log('starting pencil', pp);
          setStartingPencil(pp);
        }
        // draw the art
        drawArc(artCanvasRef, currentPencil, pp, pencilSharpness, pencilColor);
      }
      setAlpha(tempAlpha);
      setIterator(iterator + 1);
    }
  }, speed / 1000);

  useEffect(() => {
    drawCanvas(backgroundCanvasRef, width, height, canvasColor);
  }, [canvasColor]);

  useEffect(() => {
    if (showCircles) {
      showCanvas(circlesCanvasRef);
    } else {
      hideCanvas(circlesCanvasRef);
    }
  }, [showCircles]);

  useEffect(() => {
    if (showBackground) {
      showCanvas(backgroundCanvasRef);
    } else {
      hideCanvas(backgroundCanvasRef);
    }
  }, [showBackground]);

  useEffect(() => {
    if (showArt) {
      showCanvas(artCanvasRef);
    } else {
      hideCanvas(artCanvasRef);
    }
  }, [showArt]);

  useEffect(() => {
    console.log('this should only fire on param change');
    setCurrentPencil(drawCircleLayer(alpha));
  }, [statorRadius, rotorRadius, pencilDistance, pencilColor]);

  function drawCircleLayer(alpha: number) {
    // self cleaning
    clearCanvas(circlesCanvasRef, width, height);
    const origin: Point = { x: width / 2, y: height / 2 };
    // const origin: Point = { x: originX, y: originY };
    // draw the stator
    drawCircle(
      circlesCanvasRef,
      origin,
      statorRadius,
      circleWeight,
      circleColor
    );
    // draw the stator center
    drawPoint(circlesCanvasRef, origin, pencilDiameter, circleColor);
    // draw the rotor
    // todo: implment system wide alpha
    console.log('alpha', alpha);
    const rotorCenter: Point = calcRotorCenter(
      statorRadius,
      rotorRadius,
      alpha,
      origin
    );
    drawCircle(
      circlesCanvasRef,
      rotorCenter,
      rotorRadius,
      circleWeight,
      circleColor
    );
    // draw the rotor center
    drawPoint(circlesCanvasRef, rotorCenter, pencilDiameter, circleColor);
    // draw the pencil point
    // todo: implment system wide alpha
    const pencilPoint: Point = calcPencilPoint(
      rotorCenter,
      statorRadius,
      rotorRadius,
      pencilDistance,
      alpha
    );
    drawPoint(
      circlesCanvasRef,
      { x: pencilPoint.x, y: pencilPoint.y },
      pencilDiameter,
      pencilColor
    );
    // draw the line between rotor center and stator center
    drawLine(circlesCanvasRef, origin, rotorCenter, circleWeight, circleColor);
    // draw the line between rotor and pencil
    drawLine(
      circlesCanvasRef,
      pencilPoint,
      rotorCenter,
      circleWeight,
      circleColor
    );
    return pencilPoint;
  }

  return (
    <React.Fragment>
      <Row>
        <Col
          style={{
            position: 'relative',
            width: width,
            height: height,
          }}
        >
          <canvas
            style={{ position: 'absolute' }}
            ref={backgroundCanvasRef}
            width={width}
            height={height}
          />
          <canvas
            style={{ position: 'absolute' }}
            ref={circlesCanvasRef}
            width={width}
            height={height}
          />
          <canvas
            style={{ position: 'absolute' }}
            ref={artCanvasRef}
            width={width}
            height={height}
          />
          {/* <canvas
            style={{ position: 'absolute' }}
            ref={finalCanvasRef}
            width={width}
            height={height}
          /> */}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Check
            checked={showCircles}
            onChange={handleCircleShow}
            type="checkbox"
            label="Show Circles"
          />
        </Col>
        <Col>
          <Form.Check
            checked={showBackground}
            onChange={handleBackgroundShow}
            type="checkbox"
            label="Show Background"
          />
        </Col>
        <Col>
          <Form.Check
            checked={showArt}
            onChange={handleArtShow}
            type="checkbox"
            label="Show Art"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => handleDraw()}>Draw</Button>
        </Col>
        <Col>
          <Button onClick={() => reset()}>Reset</Button>
        </Col>
        <Col>
          <Button onClick={() => stop()}>Stop</Button>
        </Col>
        <Col>
          <Button onClick={() => save()}>Save</Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Canvas;
