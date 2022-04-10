import { Grid, Button, Menu, Dropdown, Row, Col } from "antd";
import { matchPath } from "react-router-dom";
import { connect } from "react-redux";
import { AvaxLogo, BSCLogo, ETHLogo, PolygonLogo, FantomLogo } from "../Chains/Logos";
import { Link, useHistory, useLocation } from "react-router-dom";
import { IconArrowDown, LogoHome } from "./IconHeader";
import styles from "./styles.module.css";
import Account from "../Account/Account";
import { getSearchValues } from "../../store/search/action";
import { getAuthenticate } from "store/disableMenu/action";
import { setAddress } from "store/chain/action";
import { useState, useEffect, useContext } from "react";
import { useChain, useMoralis } from "react-moralis";
import { UserIcon } from "../MainHeader/IconHeader";
import { getCollectionsByChain } from "helpers/chain";
import DarkModeToggle from "react-dark-mode-toggle";
import { DarkThemeContext } from "../DarkMode";

const { useBreakpoint } = Grid;
const gamePaths = [
  "/game/buy-properties",
  "/game/dasboard",
  "/game/rewards",
  "/game/leaderboard",
];

const menuItems = [
  {
    key: "0x1",
    value: "Ethereum",
    icon: <ETHLogo />,
  },
  {
    key: "0x539",
    value: "Local Chain",
    icon: <ETHLogo />,
  },
  {
    key: "0x3",
    value: "Ropsten Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x4",
    value: "Rinkeby Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x2a",
    value: "Kovan Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x5",
    value: "Goerli Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x38",
    value: "Binance",
    icon: <BSCLogo />,
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet",
    icon: <BSCLogo />,
  },
  {
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />,
  },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />,
  },
  {
    key: "0xa86a",
    value: "Avalanche",
    icon: <AvaxLogo />,
  },
  {
    key: "0xa869",
    value: "Avalanche Testnet",
    icon: <AvaxLogo />,
  },
  {
    key: "0xfa",
    value: "Fantom",
    icon: <FantomLogo />,
  },
];

const RoutingMenu = (props) => {
  const { SubMenu } = Menu;
  const { turnOn, setTurnOn } = useContext(DarkThemeContext);
  const { isOpen, visileSubMenu } = props;
  const { pathname } = useLocation();
  const history = useHistory();
  const matchedPath = matchPath(pathname, { path: "/game/:type" });
  const isGamePath = gamePaths.includes(pathname);
  const [selected, setSelected] = useState({});
  const { sm, md } = useBreakpoint();
  const { chainId } = useChain();

  const { isAuthenticated, account, authenticate } = useMoralis();
  const selectedKey = pathname.split("/")[1];

  const customStyles = {
    item: {
      display: "flex",
      alignItems: "center",
      height: "60px",
      fontWeight: "500",
      fontFamily: "Roboto, sans-serif",
      fontSize: "14px",
      padding: "0 20px",
    },
    button: {
      border: "2px solid rgb(231, 234, 243)",
      borderRadius: "12px",
      // marginLeft: "10px"
    },
  };
  const goToCreate = (page) => {
    // if(history.pathname === '/profile') {
    //   props.getAuthenticate({authenticated: true});
    //   return;
    // }
    // if(matchedPath)
    if (!isAuthenticated) {
      authenticate({
        onSuccess: () => {
          props.getAuthenticate({authenticated: false});
          history.push(page || "/");
        }, 
        onError: () => {
          props.getAuthenticate({authenticated: false});
          history.push("/explore");
        }
      })
    }else {
      history.push(page || "/explore");
      props.getAuthenticate({authenticated: false});
    }
  };
  const menu = (
    <Menu>
      {/* <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item> */}
    </Menu>
  );
  // const menu2 = (
  //   <Menu mode="inline" style={{ width: "200px", fontFamily: "GILROY " }}>
  //     <Menu.Item key="1" style={{ fontSize: "15px", textAlign: "center" }}>
  //       <Link to="/profile"></Link>Profile
  //     </Menu.Item>
  //     <Menu.Item key="2" style={{ fontSize: "15px", textAlign: "center" }}>
  //       <Link to="/my-watchlist"></Link>Watch List
  //     </Menu.Item>
  //     <Menu.Item key="3" style={{ fontSize: "15px", textAlign: "center" }}>
  //       Favorite
  //     </Menu.Item>
  //     <Menu.Item key="4">
  //       <div
  //         // style={{
  //         //   textAlign: "center",
  //         //   alignItems: "center",
  //         //   marginBottom: "-10%",
  //         //   marginTop: "20px",
  //         //   // borderTop: " rgb(230, 230, 230) solid 0.4px",
  //         // }}
  //         className={styles.submenuMode}
  //       >
  //         <DarkModeToggle onChange={setTurnOn} checked={turnOn} size={50} />
  //       </div>
  //     </Menu.Item>
  //   </Menu>
  // );

  useEffect(() => {
    const defaultChain = menuItems.find((item) => item.key === "0x38");
    if (!chainId || !isAuthenticated || !account) {
      setSelected(defaultChain);
      const address = getCollectionsByChain('0x38');
      console.log(address, 'addr 1')
      // setAddress(getCollectionsByChain(selected)[0].address);
      props.setAddress({address: address[0].address});
    } else {
      const newSelected = menuItems.find((item) => item.key === chainId);
      setSelected(newSelected);
      const address = getCollectionsByChain(chainId);
      console.log(address, 'addr 2')
      // setAddress(getCollectionsByChain(chainId)[0].address);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, isAuthenticated, account, selected]);

  // demo for redux
  // console.log(props.address.address)
  const renderGameMenu = () => {
    return (
      !visileSubMenu && (
        <div className={styles.bottomBg}>
          <div
            className={isOpen ? styles.bottomHeader : styles.bottomHeaderClose}
          >
            {!md ? (
              <div className={styles.logoHomeWrapper}>
                <LogoHome
                  // onClick={() => setVisileSubMenu(true)}
                  className={styles.iconLogo}
                />{" "}
                <IconArrowDown />
              </div>
            ) : (
              <div className={styles.logoHomeWrapper}>
                <LogoHome
                  onClick={() => history.push("/explore")}
                  className={styles.iconLogo}
                />
              </div>
            )}

            <div className={styles.menuRight}>
              <div className={styles.menuItems}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  // defaultSelectedKeys={['explore']}
                  className={`${styles.bottomMenu} ${
                    !sm ? styles.bottomMenuSm : ""
                  }`}
                  selectedKeys={[matchedPath?.params?.type]}
                >
                  <Menu.Item key="buy-properties">
                    <Link to="/game/buy-properties" className={styles.menuLink}>
                      Buy Properties
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="dasboard">
                    <Link to="/game/dasboard" className={styles.menuLink}>
                      Dashboard
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="rewards">
                    <Link to="/game/rewards" className={styles.menuLink}>
                      Rewards
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="leaderboard">
                    <Link to="/game/leaderboard" className={styles.menuLink}>
                      Leaderboard
                    </Link>
                  </Menu.Item>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };

  if (isGamePath) {
    return renderGameMenu();
  }

  return (
    !visileSubMenu && (
      <>
        {!md ? (
          <div style={{ background: "white", width: "100%" }}>
            {/* menu line 1 */}
            <Row justify="start">
              <Col xs={{ span: 14 }} md={{ span: 14 }} xl={{ span: 14 }}>
                <div>
                  <LogoHome className={styles.iconLogo} />
                </div>
              </Col>

              <Col xs={{ span: 8 }} md={{ span: 8 }} xl={{ span: 8 }}>
                <div className={styles.menuRight}>
                  <div className={styles.menuItems}>
                    <Menu
                      theme="light"
                      mode="horizontal"
                      defaultSelectedKeys={["/explore"]}
                      className={`${styles.bottomMenu} ${
                        !md ? styles.bottomMenuSm : ""
                      }`}
                      style={{ marginTop: "15px" }}
                      selectedKeys={selectedKey}
                    >
                      <Menu.Item key="nftCreate" className={styles.menuCreate}>
                        <Link
                          to="/nftCreate"
                          style={{ fontFamily: "GILROY " }}
                          onClick={() => goToCreate("/nftCreate")}
                        >
                          Create
                        </Link>
                      </Menu.Item>
                    </Menu>
                  </div>
                </div>
              </Col>
            </Row>
            {/* menu line 2 */}
            <Row justify="start">
              <div
                className={styles.menuLine2}
                style={{
                  textAlign: "center",
                  marginLeft: "-10px",
                  alignItems: "center",
                  marginTop: "-40px",
                }}
              >
                {" "}
                <div className={styles.menuRight}>
                  <div className={styles.menuItems}>
                    <Menu
                      theme="light"
                      mode="horizontal"
                      defaultSelectedKeys={["/explore"]}
                      className={`${styles.bottomMenu} ${
                        !sm ? styles.bottomMenuSm : ""
                      }`}
                      selectedKeys={selectedKey}
                      disabled={props.auth.authenticated}
                    >
                      <Menu.Item key="explore">
                        <Link
                          to="/explore"
                          className={styles.menuLink}
                          style={{
                            fontFamily: "GILROY ",
                            padding: "0px",
                          }}
                          disabled={props.auth.authenticated}
                        >
                          Explore
                        </Link>
                      </Menu.Item>

                      <Menu.Item key="my-collection">
                        <Link
                          to="/my-collection"
                          className={styles.menuLink}
                          style={{
                            fontFamily: "GILROY ",
                            padding: "0px",
                          }}
                          onClick={() => goToCreate("/my-collection")}
                          disabled={props.auth.authenticated}
                        >
                          My Collections
                        </Link>
                      </Menu.Item>

                      <Menu.Item key="transaction">
                        <Link
                          to="/transaction"
                          className={styles.menuLink}
                          style={{
                            fontFamily: "GILROY ",
                            padding: "5px",
                          }}
                          onClick={() => goToCreate("/transaction")}
                          disabled={props.auth.authenticated}
                        >
                          Transactions
                        </Link>
                      </Menu.Item>
                    </Menu>
                  </div>
                </div>
              </div>
            </Row>
            {/* menu line 3 */}
            <Row justify="center">
              <div
                className={styles.menuLine3}
                style={{
                  textAlign: "right",
                }}
              >
                {" "}
                <div className={styles.menuRight}>
                  <div className={styles.menuItems}>
                    <Col span={12} offset={9}>
                      <div className={styles.profile}>
                        <Menu mode="horizontal" inlineCollapsed="true" style={{marginLeft:"-50px"}}>
                          <SubMenu
                            key="sub2"
                            icon={<UserIcon />}
                            style={{ width: "50%" }}
                          >
                            <Menu.Item
                              key="1"
                              style={{ fontSize: "15px", textAlign: "center" }}
                            >
                              <Link to="/profile"></Link>Profile
                            </Menu.Item>
                            <Menu.Item
                              key="2"
                              style={{ fontSize: "15px", textAlign: "center" }}
                            >
                              <Link to="/my-watchlist"></Link>Watch List
                            </Menu.Item>
                            <Menu.Item
                              key="3"
                              style={{ fontSize: "15px", textAlign: "center" }}
                            >
                              Favorite
                            </Menu.Item>
                            <Menu.Item key="4">
                              <div
                                // style={{
                                //   textAlign: "center",
                                //   alignItems: "center",
                                //   marginBottom: "-10%",
                                //   marginTop: "20px",
                                //   // borderTop: " rgb(230, 230, 230) solid 0.4px",
                                // }}
                                className={styles.submenuMode}
                              >
                                <DarkModeToggle
                                  onChange={setTurnOn}
                                  checked={turnOn}
                                  size={50}
                                />
                              </div>
                            </Menu.Item>
                          </SubMenu>
                        </Menu>
                        {"   "}
                        <div className={styles.walletInfo_mobile}>
                          <Account />
                        </div>
                      </div>
                    </Col>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        ) : (
          <>
            <div className={styles.bottomBg}>
              <div className={styles.bottomHeader}>
                <div className={styles.logoHomeWrapper}>
                  <LogoHome className={styles.iconLogo} />
                </div>
                <div className={styles.menuRight}>
                  <div className={styles.menuItems}>
                    <Menu
                      theme="light"
                      mode="horizontal"
                      defaultSelectedKeys={["/"]}
                      className={`${styles.bottomMenu} ${
                        !sm ? styles.bottomMenuSm : ""
                      }`}
                      style={{ marginLeft: "10px" }}
                      selectedKeys={selectedKey}
                    >
                      <Menu.Item
                        key="nftCreate"
                        className={styles.menuCreate}
                        disabled={props.auth.authenticated}
                      >
                        <Link
                          to="/nftCreate"
                          onClick={() => goToCreate("/nftCreate")}
                          style={{ fontFamily: "GILROY ", fontSize: "20px" }}
                        >
                          Create
                        </Link>
                      </Menu.Item>
                      <Menu.Item
                        key="explore"
                        disabled={props.auth.authenticated}
                      >
                        <Link
                          to="/explore"
                          className={styles.menuLink}
                          style={{ fontFamily: "GILROY " }}
                        >
                          Explore
                        </Link>
                      </Menu.Item>
                      <Menu.Item
                        key="my-collection"
                        disabled={props.auth.authenticated}
                      >
                        <Link
                          to="/my-collection"
                          onClick={() => goToCreate("/my-collection")}
                          className={styles.menuLink}
                          style={{ fontFamily: "GILROY " }}
                        >
                          My Collections
                        </Link>
                      </Menu.Item>
                      <Menu.Item
                        key="transaction"
                        disabled={props.auth.authenticated}
                      >
                        <Link
                          to="/transaction"
                          onClick={() => goToCreate("/transaction")}
                          className={styles.menuLink}
                          style={{ fontFamily: "GILROY " }}
                        >
                          Transactions
                        </Link>
                      </Menu.Item>
                    </Menu>
                    <Col xs={10} sm={10} md={4} lg={5}>
                      <div className={styles.dropmenu}>
                        <Dropdown
                          overlay={menu}
                          className={styles.dropdown}
                          placement="bottom"
                        >
                          <Button
                            key={selected?.key}
                            icon={selected?.icon}
                            style={{
                              ...customStyles.button,
                              ...customStyles.item,
                            }}
                          >
                            <span
                              className={styles.chain}
                              style={{
                                marginLeft: "5px",
                                fontFamily: "GILROY ",
                              }}
                            >
                              {selected?.value}
                            </span>
                          </Button>
                        </Dropdown>
                      </div>
                    </Col>
                    <div className={styles.profile}>
                      <Menu mode="vertical" inlineCollapsed="true">
                        <SubMenu key="sub2" icon={<UserIcon />}>
                          <Menu.Item
                            key="1"
                            style={{ fontSize: "15px", textAlign: "center" }}
                          >
                            <Link to="/profile" onClick={() => goToCreate("/profile")}></Link>Profile
                          </Menu.Item>
                          <Menu.Item
                            key="2"
                            style={{ fontSize: "15px", textAlign: "center" }}
                          >
                            <Link to="/my-watchlist"></Link>Watch List
                          </Menu.Item>
                          <Menu.Item
                            key="3"
                            style={{ fontSize: "15px", textAlign: "center" }}
                          >
                            Favorite
                          </Menu.Item>
                          <Menu.Item key="4">
                            <div className={styles.submenuMode}>
                              <DarkModeToggle
                                onChange={setTurnOn}
                                checked={turnOn}
                                size={55}
                              />
                            </div>
                          </Menu.Item>
                        </SubMenu>
                      </Menu>
                      <div className={styles.walletInfo}>
                        <Account />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
  );
};
const mapStateToProps = (state) => ({
  info: state.getSearchValue,
  auth: state.Auth,
  address: state.Address
});
const mapDispatchToProps = {
  getSearchValue: getSearchValues,
  getAuthenticate: getAuthenticate,
  setAddress: setAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutingMenu);
// export default RoutingMenu;
