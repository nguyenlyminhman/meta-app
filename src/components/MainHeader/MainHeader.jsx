import { Grid, Layout, Space } from 'antd';
import marketPlaceLogo from 'assets/images/logo.png';
import { useEffect, useState } from 'react';
import RoutingMenu from './RoutingMenu';
import styles from './styles.module.css';

const { Header } = Layout;
const { useBreakpoint } = Grid;



function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [visileSubMenu, setVisileSubMenu] = useState(false);


  const { md } = useBreakpoint();

  useEffect(() => {
    if (md && !isOpen) {
      setIsOpen(true);
    }
  }, [md, isOpen]);

  const handleClickSubMenu = () => {
    setVisileSubMenu(false);
  };

  return (
    <>
      <Header theme="dark" className={styles.header}>
        {/* <Row className={styles.topBg} wrap>
          <div
            className={`${styles.topHeader} ${!md ? styles.topHeaderMd : ''}`}
          >
            <Col xs={12} sm={11} md={18} lg={16}>
              <div className={!md || xs || sm ? styles.hambugerWrapper : ''}>
                {!md && (
                  <HambugerBar onClick={() => setIsOpen((val) => !val)} />
                )}
                <div
                  className={`${styles.topMenuWrapper} ${
                    !md ? styles.topMenuMdWrapper : ''
                  }`}
                >
                  <div className={styles.topMenuIcon}>
                    <Link to="/">
                      <div className={styles.topMenuIcon}>
                        <NFTMenu />
                      </div>
                    </Link>

                    {md && <Dot className={styles.topMenuIconDot} />}
                  </div> */}
                  {/* {md && (
                    <>
                      <div className={styles.topMenuIcon}>
                        <DexMenu />
                      </div>
                      <Link to="/game">
                        <div className={styles.topMenuIcon}>
                          <GameMenu />
                        </div>
                      </Link>
                    </>
                  )} */}
                {/* </div>
              </div>
            </Col>
          </div>
        </Row> */}

        <RoutingMenu
          isOpen={isOpen}
          setVisileSubMenu={setVisileSubMenu}
          visileSubMenu={visileSubMenu}
        />

        {!md && visileSubMenu && (
          <div className={styles.subMenuMobile}>
            <Space onClick={handleClickSubMenu}>
              <img src={marketPlaceLogo} alt="marketplace logo" />
              <span>NFT Marketplace</span>
            </Space>
            {/* <Space onClick={handleClickSubMenu}>
              <img src={dexLogo} alt="dex logo" />
              <span>DEX</span>
            </Space>
            <Link to="/game">
              <Space onClick={handleClickSubMenu}>
                <img src={gameLogo} alt="dex logo" />
                <span>Game</span>
              </Space>
            </Link> */}
          </div>
        )}
      </Header>
    </>
  );
}

export default MainHeader;
