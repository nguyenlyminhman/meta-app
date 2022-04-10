import { Col, Row, Grid } from "antd";
import React, { useContext } from "react";
import styless from "./TopCollections.module.css";
import TopSalesCard from "./TopSalesCard";
import TopCollectionsCard from "./TopCollectionsCard";
import TopCreatorsCard from "./TopCreatorsCard";
import { DarkThemeContext } from "components/DarkMode";

const { useBreakpoint } = Grid;
const TopCollections = () => {
  const { mainColor } = useContext(DarkThemeContext);
  const { md } = useBreakpoint();
  return (
    <>
      <div className={styless.wrapper}>
        <Row >
          <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
            <br />
            <TopSalesCard />
          </Col>
          <>
            {!md ? (
              <>
                <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                  <div style={{ marginTop: "20px" }}>
                    <TopCollectionsCard />
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                  <div style={{ marginTop: "5px" }}>
                    <TopCollectionsCard />
                  </div>
                </Col>
              </>
            )}
          </>
          <Col xs={{ span: 24 }} md={{ span: 24 }} xl={{ span: 8 }}>
            <br />
            <TopCreatorsCard style={{ backgroundColor: mainColor.bgCard }} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TopCollections;
