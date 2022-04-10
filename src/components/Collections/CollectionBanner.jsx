import { Avatar, Col, Row, Space, Menu, notification } from "antd";
import React from "react";
import styless from "./Collections.module.css";
import FloorPriceIcon from "./FloorPriceIcon";
import { MoreOutlined, ReloadOutlined, CopyOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  BsShareFill,
  BsArrowUpRightSquare,
  BsFacebook,
  BsTwitter,
} from "react-icons/bs";
import ShareLink from "react-facebook-share-link";
import ShareLinkTwitter from "react-twitter-share-link";

const avatarFake =
  "https://cdn.sanity.io/images/kt6t0x48/production/41e51630c43b9ade112281066bb22327dbc16fcd-2000x2000.jpg";
const imgFake =
  "https://cdn.sanity.io/images/kt6t0x48/production/edd4104b305b8275532dda27e6ccb8657108f3e2-1920x768.jpg";

const CollectionBanner = () => {
  // const { chainId } = useMoralis();
  // const NFTCollections = getCollectionsByChain(chainId);
  // const info = NFTCollections.find(ele => ele.addrs === address.address);
  const { SubMenu } = Menu;

  const openNotification = (placement) => {
    const args = {
      message: "Link Copied !",
      placement: "bottomRight",
    };
    notification.success(args);
  };
  return (
    <div>
      <div
        className={styless.bg}
        style={{ backgroundImage: `url(${imgFake})` }}
      >
        <Avatar src={avatarFake} className={styless.avatar} size={160} />
      </div>
      <div className={styless.endRow}>
        <div className={styless.socialIconsContainer}>
          <div className={styless.socialIconsWrapper}>
            <div className={styless.socialIconsContent}>
              <Row>
                <div className={styless.socialIcon}>
                   {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#">
                    <ReloadOutlined
                      style={{
                        marginTop: "7px",
                        marginLeft: "7px",
                        fontSize: "25px",
                      }}
                    />
                  </a>
                </div>

                <div className={styless.divider} />
                <div className={styless.socialIcon}>
                   {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href={"#"}>
                    <BsArrowUpRightSquare
                      style={{
                        marginTop: "7px",
                        marginLeft: "7px",
                        fontSize: "25px",
                      }}
                    />
                  </a>
                </div>

                <div className={styless.divider} />
                <div className={styless.socialIcon}>
                  <Menu
                    mode="horizontal"
                    inlineCollapsed="true"
                    style={{
                      background: "none",
                      width: "40px",
                      height: "40px",
                      color: "black",
                    }}
                  >
                    <SubMenu
                      key="sub2"
                      icon={
                        <BsShareFill
                          style={{
                            marginTop: "7px",
                            marginLeft: "-15px",
                            fontSize: "25px",
                          }}
                        />
                      }
                      style={{ width: "30px" }}
                    >
                      <Menu.Item
                        key="1"
                        // style={{ fontSize: "15px", textAlign: "center" }}
                      >
                        <CopyToClipboard
                          onCopy={openNotification}
                          text={"https://marketplace.metamints.app"}
                        >
                          <span>
                            {" "}
                            <CopyOutlined />
                            &ensp;Copy Link
                          </span>
                        </CopyToClipboard>
                      </Menu.Item>
                      <Menu.Item
                        key="2"
                        // style={{ fontSize: "15px", textAlign: "center" }}
                      >
                        <ShareLink link="https://marketplace.metamints.app">
                          {(link) => (
                            <a href={link}>
                              {" "}
                              <BsFacebook />
                              &ensp;Share on Facebook
                            </a>
                          )}
                        </ShareLink>
                      </Menu.Item>
                      <Menu.Item
                        key="3"
                        //style={{ fontSize: "15px", textAlign: "center" }}
                      >
                        <ShareLinkTwitter link="https://marketplace.metamints.app">
                          {(link) => (
                            <a href={link}>
                              {" "}
                              <BsTwitter />
                              &ensp;Share on Twitter
                            </a>
                          )}
                        </ShareLinkTwitter>
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                </div>
                <div className={styless.divider} />
                <div className={styless.socialIcon}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href={"#"}>
                    <MoreOutlined
                      style={{
                        marginTop: "7px",
                        marginLeft: "7px",
                        fontSize: "25px",
                      }}
                    />
                  </a>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <div className={styless.bannerContent} style={{ fontFamily: "GILROY " }}>
        <div className={styless.bannerTitle}>Metamints</div>

        <div className={styless.createdBy}>
          Created by <span>MetaMints</span>
        </div>
        <div className={styless.statics}>
          <Row gutter={{ xs: 12, sm: 32, xl: 64 }}>
            <Col>
              <Space direction="vertical" size={0}>
                <span
                  className={styless.number}
                  style={{ fontFamily: "GILROY " }}
                >
                  300
                </span>
                <span
                  className={styless.attr}
                  style={{ fontFamily: "GILROY " }}
                >
                  Items
                </span>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical" size={0}>
                <span
                  className={styless.number}
                  style={{ fontFamily: "GILROY " }}
                >
                  1
                </span>
                <span
                  className={styless.attr}
                  style={{ fontFamily: "GILROY " }}
                >
                  Owners
                </span>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical" size={0}>
                <span
                  className={styless.number}
                  style={{ fontFamily: "GILROY " }}
                >
                  <Space>
                    <FloorPriceIcon className={styless.icon} />
                    1.35
                  </Space>
                </span>
                <span
                  className={styless.attr}
                  style={{ fontFamily: "GILROY " }}
                >
                  Floor Price
                </span>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical" size={0}>
                <span
                  className={styless.number}
                  style={{ fontFamily: "GILROY " }}
                >
                  0K
                </span>
                <span
                  className={styless.attr}
                  style={{ fontFamily: "GILROY " }}
                >
                  Volume Traded
                </span>
              </Space>
            </Col>
          </Row>
        </div>
        <div className={styless.desc} style={{ fontFamily: "GILROY " }}>
          AI Robotic brings the next level of AI-infused companions to life
          seamlessly
        </div>
      </div>
    </div>
  );
};

export default CollectionBanner;
