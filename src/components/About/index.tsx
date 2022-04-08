import classes from './About.module.css';
import { Col, Row } from 'react-bootstrap';
import Section from '../../layouts/Section';

const About = () => {
  return (
    <Section fullWidth={false} className={classes.about}>
      <Row>
        <Col xs={{ span: 6, order: 2 }} md={{ span: 6, order: 2 }}>
          {''}
        </Col>
        <Col
          style={{ textAlign: 'left' }}
          xs={{ span: 6, order: 1 }}
          md={{ span: 6, order: 1 }}
        >
          <h1>
            <b>.About</b>
          </h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          The art engine for this project is driven by math equations. It does
          not claim to be driven by AI. The art is generated by old fashioned
          Human Intelligence. You are the Creator.
        </Col>
        <Col>
          There is no guide or instructional videos for creating the pieces.
          Enjoy.
        </Col>
        <Col>
          Full commercial rights are granted to the holder of a{' '}
          <b>Blockchain Hypotrochoids</b> for any personal and/or commercial
          use.
        </Col>
        <Col>
          The value of the <b>Blockchain Hypotrochoids</b> is obviously driven
          by interest.
        </Col>
      </Row>
      <Row className="mt-4">
        <Col style={{ textAlign: 'left' }}>
          <b>ERC721 Tokens</b> - The Blockchain Hypotrochoids assemblage is
          stored on the Ethereum blockchain following the ERC721 standard for
          representing unique ownership of non-fungible tokens.
        </Col>
        <Col>{''}</Col>
      </Row>
      <Row className="mt-4">
        <Col style={{ textAlign: 'left' }}>
          <b>Created in the browser</b> - The Blockchain Hypotrochoids are
          created in the browser using standard equations for hypotrochoids.
          Through the interactive interface, DNA which represents the input
          parameters of the algoritm is generated alongside the art.
        </Col>
        <Col>{''}</Col>
      </Row>
      <Row className="mt-4">
        <Col style={{ textAlign: 'left' }}>
          <b>Decentralized Methods</b> - .
        </Col>
        <Col>{''}</Col>
      </Row>
    </Section>
  );
};

export default About;
