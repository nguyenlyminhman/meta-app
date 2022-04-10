import {
  Layout,
} from 'antd';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import React, { useMemo } from 'react';

const { Footer } = Layout;


const MainFooter = () => {
  const location = useLocation();
  const isHomePage = useMemo(
    () => location.pathname === '/',
    [location.pathname]
  );

  return (
    <Footer className={styles.footer}>
      {isHomePage && (
        <></>
        // <div className={styles.contacUs}>
        //   <Row justify="space-between" className={styles.topFooter}>
        //     <Col span={24} md={24} lg={10} className={styles.leftFooter}>
        //       <div
        //         className={styles.leftFooterBg}
        //         style={{ backgroundImage: `url(${FooterBg})` }}
        //       >
        //         <List
        //           className={styles.listItem}
        //           dataSource={data}
        //           renderItem={(item) => (
        //             <List.Item>
        //               <Typography.Text className={styles.contactIcon}>
        //                 <item.icon />
        //               </Typography.Text>{' '}
        //               {item.text}
        //             </List.Item>
        //           )}
        //         />
        //         <div className={styles.circle}></div>
        //         <div className={styles.socialList}>
        //           <FaTwitter />
        //           <AiOutlineMedium />
        //           <FaYoutube />
        //           <FaTelegram />
        //           <FaFacebook />
        //         </div>
        //       </div>
        //     </Col>
        //     <Col
        //       md={24}
        //       lg={10}
        //       className={styles.rightFooter}
        //       style={{ marginTop: md || sm || xs ? 48 : 0 }}
        //     >
        //       <Title level={2} style={{ color: 'white' }}>
        //         CONTACT US
        //       </Title>
        //       <Typography.Text style={{ color: '#fff' }}>
        //         We are always open and we welcome any questions you have for our
        //         teams. If you wish to get in touch, please fill out the form
        //         below. Someone from our team will get back to you slowly.
        //       </Typography.Text>
        //       <Form form={form} layout="vertical" className={styles.form}>
        //         <Row gutter={32}>
        //           <Col span={12}>
        //             <Form.Item label="YOUR NAME">
        //               <Input placeholder="Introduce yourself" />
        //             </Form.Item>
        //           </Col>
        //           <Col span={12}>
        //             <Form.Item label="YOUR EMAIL">
        //               <Input placeholder="Who do we reply tor" />
        //             </Form.Item>
        //           </Col>
        //           <Col span={24}>
        //             <Form.Item label="YOUR MESSAGE">
        //               <Input.TextArea
        //                 placeholder="Leave your question or comment here"
        //                 rows={5}
        //               />
        //             </Form.Item>
        //           </Col>
        //           <Col
        //             span={24}
        //             style={{ display: 'flex', justifyContent: 'flex-end' }}
        //           >
        //             <Button
        //               // onClick={() => history.push("/explore")}
        //               size="large"
        //               className={styles.exploreBtn}
        //             >
        //               Send
        //             </Button>
        //           </Col>
        //         </Row>
        //       </Form>
        //     </Col>
        //   </Row>
        // </div>
      )}

      <div className={styles.container}>
        {/* <Row className={styles.bottomFooter} justify="space-between">
          <Col>
            <a href="https://metapolis.gg" rel="noopener noreferrer">
              <img
                src={polisLogo}
                alt="logo footer"
                className={styles.footerLogo}
              />
            </a>
          </Col>
          <Col flex="auto">
            <div className={styles.menuWrapper}>
              <div className={styles.menuItems}>
                <NavLink to="/">NFT Marketplace</NavLink>
                <NavLink to="/">DEX</NavLink>
                <NavLink to="/">Game</NavLink>
              </div>
              <div className={styles.menuItems}>
                <a
                  href="https://metapolis.gg/collection"
                  rel="noopener noreferrer"
                >
                  NFT Collection
                </a>
                <a
                  href="https://metapolis.gg/economy"
                  rel="noopener noreferrer"
                >
                  NFT Economy
                </a>
                <a href="https://docs.metapolis.gg" rel="noopener noreferrer">
                  Whitepaper
                </a>
              </div>
            </div>
          </Col>
        </Row> */}
      </div>
    </Footer>
  );
};

export default MainFooter;
