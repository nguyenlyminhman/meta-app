import { Avatar, Row, Space } from "antd";
// import avatarFake from 'assets/images/avatar-explore.png';
// import imgFake from 'assets/images/img-explore.png';
import React, {useEffect, useState, memo} from "react";
import CollectionCard from "./CollectionCard";
import styless from "./MyCollections.module.css";
import { useNFTBalances } from "react-moralis";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router";
import { getAuthenticate } from "store/disableMenu/action";
import { connect } from "react-redux";

// const fakeDataItem = {
//   name: 'Name',
//   description:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam orci congue diam tempor dui sed vitae. Urna, in metus, eu diam sit aliquet.',
//   avatar: avatarFake,
//   image: imgFake,
// };

const MyCollections = memo((props) => {
  const { data: NFTBalances } = useNFTBalances();
  const [user, setUser] = useState("METAMINTS");
  const { Moralis, account } = useMoralis();
  const history = useHistory();

  // const checkAuthen = async () => {
  //   const users = Moralis.Object.extend("profile");
  //   const query = new Moralis.Query(users);
  //   query.equalTo("address", account);
  //   const data = await query.first();
  //   return data;
  // };

  // useEffect(() => {
  //   checkAuthen().then((res) => {
  //     if (res) {
  //       // setAuthenticate(true);
  //       setUser(res.attributes);
  //     } else {
  //       props.getAuthenticate({ authenticated: true });
  //       history.push("/profile");
  //     }
  //   });
  // }, []);

  // const checkAuthen = async () => {
  //   const users = Moralis.Object.extend("profile");
  //   const query = new Moralis.Query(users);
  //   query.equalTo("address", account);
  //   const data = await query.first();
  //   return data;
  // };

  const users = Moralis.Object.extend("profile");
  useEffect(() => {
      const query = new Moralis.Query(users);
      if (query) {
        query.equalTo("address", account);
        query.first(res=> {
          if(res){
            setUser(res.attributes);
          } else {
            props.getAuthenticate({ authenticated: true });
            history.push("/profile");
          }
        })
      }
    // });
  }, [history, props, account, Moralis.Query, users]);

  // function itemRender(current, type, originalElement) {
  //   if (type === "prev") {
  //     return null;
  //   }
  //   if (type === "next") {
  //     return null;
  //   }
  //   return originalElement;
  // }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: '100%',
        backgroundImage: `url(${user.background})`,
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        // height: 'screen',
      }}
    >
      <div className={styless.wrapper}>
        <div>
          <Row justify="center">
            <Space direction="vertical" align="center">
              <Avatar size={140} src={user.avatar} />
              <div className={styless.headerTitle}>{user?.name}</div>
            </Space>
          </Row>
          <div className={styless.wrapper}>
            <div className={styless.wrapperInner}>
              {NFTBalances?.result &&
                NFTBalances.result.map((data, index) => (
                  <CollectionCard
                    key={index}
                    item={{
                      ...data,
                      name: data.metadata?.name
                    }}
                  />
                ))}
            </div>
          </div>
          {/* <Row justify="center" style={{ marginTop: "24px" }}>
            <Pagination
              itemRender={itemRender}
              className={styless.pagination}
              defaultCurrent={1}
              total={50}
            />
          </Row> */}
        </div>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => ({
  auth: state.Auth
});
const mapDispatchToProps = {
  getAuthenticate: getAuthenticate
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCollections);
