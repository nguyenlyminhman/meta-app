import { Col, Divider, Row } from "antd";
import {React,useContext} from "react";
import styless from "./TopCollections.module.css";

import FuturisticAbstract from "assets/images/Collection/Futuristic-Abstract.png";
import MonkeyKing from "assets/images/Collection/Monkey-King.png";
import { DarkThemeContext } from "components/DarkMode";

const TopCreatorsCard = ({ item }) => {
  const { mainColor } = useContext(DarkThemeContext);
  const topCreators = [
    {
      name: "X-Metaverse",
      price: "366,457.34 USD",
      image: FuturisticAbstract,
      sales: 3670,
    },
    {
      name: "BigTimeStudios",
      price: "192,415.73 USD",
      image: MonkeyKing,
      sales: 143,
    },
    {
      name: "NFT_PRIDE",
      price: "168,860.64 USD",
      image: MonkeyKing,
      sales: 2123,
    },
  ];

  return (
    <>
      <div className={`${styless.cardbox} `}  style={{backgroundColor : mainColor.bgCard,border :`${mainColor.borderCard} solid 1px`}}>
        {" "}
        <div className={styless.title}  style={{fontFamily :"GILROY "}}>Top Creators</div>
        <br />
        {topCreators.map((data, index) => (
          <div key={index}>
            <Row gutter={0}>
              <Col xs={{ span: 4 }} md={{ span: 4 }}>
                <span style={{ fontFamily :"GILROY ", fontSize: "20px", fontStyle: "bold" }}>
                  {index + 1}
                </span>
              </Col>
              <Col xs={{ span: 6 }} md={{ span: 6 }}>
                <div
                  className={styless.image}
                  style={{ backgroundImage: `url(${data.image})` }}
                ></div>
              </Col>
              <Col xs={{ span: 14 }} md={{ span: 14 }}>
                <div className={`${mainColor.txt} ${styless.title}` }  style={{fontFamily :"GILROY "}}>{data.name}</div>
                <div className={styless.price}  style={{fontFamily :"GILROY "}}>
                  <Row justify="space-between">
                    <Col xs={{ span: 18 }} md={{ span: 18 }}>
                      {" Volume :"}
                      <br />
                      {data.price}
                    </Col>
                    <Col xs={{ span: 6 }} md={{ span: 6 }}>
                      {" Sales:"}
                      <br />
                      {data.sales}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>{" "}
            <Divider style={{ margin: "10px 0" }} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TopCreatorsCard;
