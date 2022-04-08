import classes from './Manifesto.module.css';
import { Col, Row } from 'react-bootstrap';
import Section from '../../layouts/Section';

const Manifesto = () => {
  return (
    <Section fullWidth={false} className={classes.manifesto}>
      <Row>
        <Col
          style={{ textAlign: 'right' }}
          xs={{ span: 6, order: 1 }}
          md={{ span: 6, order: 1 }}
        >
          <h1>
            <b>Project Manifesto.</b>
          </h1>
        </Col>
        <Col></Col>
      </Row>
      <Row className="mt-4">
        <Col>
          This project is <span className="emphasis">not</span> a start up
          business with a vague business plan. This is mostly an art project,
          mostly.
        </Col>
        <Col
          style={{
            textAlign: 'center',
            fontFamily: 'Heebo',
            justifyContent: 'center',
            fontSize: '1.1em',
            paddingTop: '4px',
          }}
        >
          This project is <span className="emphasis">not</span> hype engine
          driven with the intent to evoke an emotional response.
        </Col>
        <Col>
          This project will <span className="emphasis">not</span> do giveaways
          to build artificial interest.
        </Col>
      </Row>
      <Row className="mt-4">
        <Col
          style={{
            textAlign: 'center',
            fontFamily: 'Anton',
            fontSize: '1.1em',
          }}
        >
          This project will <span className="emphasis">not</span> boast about
          our finances or other experiences to foster credibility.
        </Col>

        <Col>
          This project will <span className="emphasis">not</span> do a
          whitelist.
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          This project <b>is</b> about a decentralized Community. Thus, no
          discord.
        </Col>

        <Col
          style={{
            textAlign: 'center',
            fontFamily: 'Lovers Quarrel',
            fontSize: '3em',
          }}
        >
          This project <b>is</b> about having fun and falling in love with NFTs.
        </Col>

        <Col>
          This project <b>is</b> forward thinking and intends to provide
          significant value to the Community. We're just not going to tell you
          the value comes from meeting us for a meal or working out together in
          a public park.
        </Col>
      </Row>
    </Section>
  );
};

export default Manifesto;
