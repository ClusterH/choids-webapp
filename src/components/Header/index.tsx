import classes from './Header.module.css';
import { Image, Col, Row } from 'react-bootstrap';
import Section from '../../layouts/Section';
import Button from 'react-bootstrap/Button';
import twitter from '../../assets/twitter-white.svg';
import opensea from '../../assets/opensea-white.svg';
import etherscan from '../../assets/etherscan-white.svg';
import AccountCard from '../AccountCard';

const Header = () => {
  return (
    <Section fullWidth={false} className={classes.header}>
      <Row>
        <Col
          style={{
            textAlign: 'left',
            fontFamily: 'Courier New',
            justifyContent: 'center',
            fontSize: '2em',
            paddingTop: '4px',
          }}
          xs={{ span: 6, order: 1 }}
          md={{ span: 6, order: 1 }}
        >
          <b>Blockchain Choids</b>
        </Col>
        <Col
          className="footer-text-align-center"
          xs={{ span: 2, order: 2 }}
          md={{ span: 2, order: 2 }}
        >
          <Button
            variant=""
            className="me-2 mt-2"
            // href={this.props.links.twitter}
            target="_blank"
          >
            <Image src={twitter} rounded></Image>
          </Button>
          <Button
            variant=""
            className="me-2 mt-2"
            // href={this.props.links.opensea}
            target="_blank"
          >
            <Image src={opensea} rounded />
          </Button>
          <Button
            variant=""
            className="me-2 mt-2"
            // href={this.props.links.etherscan}
            target="_blank"
          >
            <Image src={etherscan} rounded />
          </Button>
          {/* <div
            style={{
              textAlign: 'right',
              fontFamily: 'Courier New',
              justifyContent: 'right',
              fontSize: '0.75em',
              paddingTop: '4px',
            }}
          >
            <AccountCard />
          </div> */}
        </Col>
        <Col
          xs={{ span: 2, order: 3 }}
          md={{ span: 2, order: 3 }}
          style={{
            textAlign: 'right',
            fontFamily: 'Courier New',
            justifyContent: 'right',
            fontSize: '0.75em',
            paddingTop: '4px',
          }}
        >
          <AccountCard />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col
          style={{
            textAlign: 'left',
            fontFamily: 'Courier New',
            justifyContent: 'center',
            fontSize: '1.1em',
            paddingTop: '4px',
          }}
        >
          Blockchain Choids are 3.141x10³ fully decentralized generative art
          pieces. An assemblage of minter created art on the Ethereum
          blockchain. This project aims to provide a interactive approach to NFT
          creation. Also, math is beautiful!
        </Col>
      </Row>
    </Section>
  );
};

export default Header;
