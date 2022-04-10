import { Col, Divider, Row } from "antd";
import {React,useContext} from "react";
import styless from "./TopCollections.module.css";

import FuturisticAbstract from "assets/images/Collection/Futuristic-Abstract.png";
import MonkeyKing from "assets/images/Collection/Monkey-King.png";
import StreetArt from "assets/images/Collection/Street-Art.png";
import { DarkThemeContext } from "components/DarkMode";
const TopSalesCard = ({ topSales }) => {
  const { mainColor } = useContext(DarkThemeContext);
  const topsales = [
    {
      name: "COMMON #7653",
      price: "7,655.00 ETH",
      image: FuturisticAbstract,
    },
    {
      name: "RARE #474",
      price: "2.07 ETH",
      image: MonkeyKing,
    },
    {
      name: "the Solarium",
      price: "900.00 ETH",
      image: StreetArt,
    },
  ];

  return (
    <>
      <div className={styless.cardbox}  style={{backgroundColor : mainColor.bgCard,border :`${mainColor.borderCard} solid 1px`}}>
        <div className={styless.title}  style={{fontFamily :"GILROY "}}>Top Sales</div>
        <br />
        {topsales.map((data, index) => (
          <div key={index}>
            <Row gutter={0}>
              <Col xs={{ span: 4 }} md={{ span: 4 }}>
                <span style={{ fontFamily :"GILROY ",fontSize: "20px", fontStyle: "bold" }}>
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
                <div className={styless.title }  style={{fontFamily :"GILROY "}}>{data.name}</div>
                <div className={styless.price}  style={{fontFamily :"GILROY "}}>
                  <Row justify="space-between">
                    {" Price :"}
                    <br />
                    {data.price}
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

export default TopSalesCard;
