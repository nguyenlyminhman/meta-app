import { Card, Avatar, Button, Row, Col, Grid } from "antd";
import { React, useContext } from "react";
import styless from "./MysteryBox.module.css";
import { useHistory } from "react-router";
import { DarkThemeContext } from "components/DarkMode";

const { useBreakpoint } = Grid;
const { Meta } = Card;
const avatarFake =
  "https://cdn.sanity.io/images/kt6t0x48/production/41e51630c43b9ade112281066bb22327dbc16fcd-2000x2000.jpg";

// const { useBreakpoint } = Grid;
const TopCollectionsCard = () => {
  const { mainColor } = useContext(DarkThemeContext);
  const { md } = useBreakpoint();
  const history = useHistory();

  return (
    <>
      <div
        className={styless.notableItem}
        style={{
          border: `${mainColor.borderCard} solid 2px`,
        }}
      >
        <div className={styless.notableInfo}>
          <Row>
            <Col xs={{ span: 22 }} md={{ span: 22 }} xl={{ span: 22 }}>
              <Row>
                <Col xs={{ span: 12 }} md={{ span: 12 }} xl={{ span: 12 }}>
                  <>
                    {!md ? (
                      <>
                        <Col
                          xs={{ span: 24 }}
                          md={{ span: 12 }}
                          xl={{ span: 8 }}
                        >
                          <div className="avatar" style={{ marginTop: "20px" }}>
                            <Avatar src={avatarFake} size={64} />
                          </div>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col
                          xs={{ span: 24 }}
                          md={{ span: 12 }}
                          xl={{ span: 8 }}
                        >
                          <div
                            className={styless.avatar}
                            style={{ marginTop: "30px" }}
                          >
                            <Avatar src={avatarFake} />
                          </div>
                        </Col>
                      </>
                    )}
                  </>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 12 }} xl={{ span: 12 }}>
                  <Meta
                    //avatar={<Avatar src={avatarFake} size ="100px" />}

                    style={{ marginTop: " 0px", fontFamily: "GILROY " }}
                    description={
                      <p>
                        Created by{" "}
                        <span
                          style={{
                            color: "#27aae1",
                            fontWeight: 700,
                            fontFamily: "GILROY ",
                          }}
                        >
                          Metamints
                        </span>
                      </p>
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 2 }} md={{ span: 2 }} xl={{ span: 2 }}>
              <div
                className={styless.btnSee}
                style={{
                  marginLeft: "35px",
                  marginTop: "40px",
                  fontFamily: "GILROY ",
                }}
              >
                <Button
                  onClick={() => history.push("/mystery-box")}
                  size="large"
                  className={styless.exploreBtn}
                >
                  <div
                    className={styless.textButton}
                    style={{
                      fontFamily: "GILROY ",
                      color: "blue",
                    }}
                  >
                    See more
                  </div>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default TopCollectionsCard;
