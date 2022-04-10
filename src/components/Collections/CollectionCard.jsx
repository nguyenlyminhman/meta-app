import { Button, Col, Divider, Row, Modal, Spin, Badge, Alert, notification } from "antd";
import { HeartOutlined, HeartFilled, HeartTwoTone } from "@ant-design/icons";
import React, { useState, useEffect, useContext } from "react";
import styless from "./Collections.module.css";

import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getNativeByChain, getExplorer } from "helpers/networks";
import {
  useMoralis,
  useMoralisQuery,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { DarkThemeContext } from "components/DarkMode";

const CollectionCard = ({ item }) => {
  const { mainColor } = useContext(DarkThemeContext);
  const [nftToBuy, setNftToBuy] = useState(null);
  const { Moralis, chainId, account, authenticate, isAuthenticated } = useMoralis();
  const [visible, setVisibility] = useState(false);
  const nativeName = getNativeByChain(chainId);
  const [loading, setLoading] = useState(false);
  const queryMarketItems = useMoralisQuery("MarketItem");
  const purchaseItemFunction = "createMarketSale";
  const contractProcessor = useWeb3ExecuteFunction();
  const { marketAddress, contractABI, walletAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      "objectId",
      "createdAt",
      "price",
      "nftContract",
      "itemId",
      "sold",
      "tokenId",
      "seller",
      "owner",
      "confirmed",
    ])
  );
  const favorite = Moralis.Object.extend("favorite");
  const [checkLike, setCheckLike] = useState(false);
  const [isWatching, setWatching] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [mediaSrc, setMediaSrc] = useState('');
  const [mediaType, setMediaType] = useState('');

  const getMarketItem = (item) => {
    const result = fetchMarketItems?.find(
      (e) =>
        e.nftContract === item?.token_address &&
        e.tokenId === item?.token_id &&
        e.sold === false &&
        e.confirmed === true
    );
    return result;
  };

  async function purchase() {
    // Moralis.enableWeb3();
    authenticate().then(async () => {
      setLoading(true);
      const tokenDetails = getMarketItem(nftToBuy);
      const itemID = tokenDetails.itemId;
      const tokenPrice = tokenDetails.price;
      const ops = {
        contractAddress: marketAddress,
        functionName: purchaseItemFunction,
        abi: contractABIJson,
        params: {
          nftContract: nftToBuy.token_address,
          itemId: itemID,
        },
        msgValue: tokenPrice,
      };

      await contractProcessor.fetch({
        params: ops,
        onSuccess: () => {
          setLoading(false);
          setVisibility(false);
          updateSoldMarketItem();
          succPurchase();
        },
        onError: (error) => {
          setLoading(false);
          failPurchase();
        },
      });
    });
  }

  function failPurchase() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem when purchasing this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function succPurchase() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `You have purchased this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  async function updateSoldMarketItem() {
    const id = getMarketItem(nftToBuy).objectId;
    const marketList = Moralis.Object.extend("MarketItem");
    const query = new Moralis.Query(marketList);
    await query.get(id).then((obj) => {
      obj.set("sold", true);
      obj.set("owner", walletAddress);
      obj.save();
    });
  }

  const handleBuyClick = (item) => {
    setNftToBuy(item);
    setVisibility(true);
  };

  async function handleWatchList(item) {
    const WatchList = Moralis.Object.extend("watchlist");
    const query = new Moralis.Query(WatchList);
    query.equalTo("userAddress", walletAddress);
    query.equalTo("tokenId", item.token_id);
    query.equalTo("nftContract", item.token_address);
    const rs = await query.find();
    if (rs?.length === 0) {
      const result = await getWatching();
      const check = result.find(
        (e) =>
          e.attributes.tokenId === item.token_id &&
          e.attributes.tokenAddress === item.token_address
      );

      if (check) {
        setWatching(false);
      } else {
        setWatching(true);
        addNew(item);
      }
    }
  }

  function addNew(_item) {
    const WatchList = Moralis.Object.extend("watchlist");
    const itemWatch = new WatchList();
    itemWatch.set("userAddress", walletAddress);
    itemWatch.set("image", item.image);
    itemWatch.set("nftContract", item.token_address);
    itemWatch.set("tokenId", item.token_id);
    itemWatch.set("name", item.name);
    itemWatch.set("price", item?.price + "");
    itemWatch.set("type", item.type);
    itemWatch.save();
  }

  const like = async (item) => {
    const result = await getLike();
    const check = result.find(
      (e) =>
        e.attributes.tokenId === item.token_id &&
        e.attributes.tokenAddress === item.token_address
    );

    const saveData = new favorite();
    if (check) {
      setCheckLike(false);
      check.destroy().then(() => {
        console.log("Deleted");
        // showLike(true);
      });
    } else {
      setCheckLike(true);
      saveData.set("userAddress", account);
      saveData.set("tokenAddress", item.token_address);
      saveData.set("tokenId", item.token_id);

      saveData.save().then();
    }
  };

  const pressLike = () => {
    if(isAuthenticated) {
      like(item)
    } else {
      authenticate({
        onSuccess: () => {
          like(item)
        },
        onError: () => {
          openNotification();
        }
      })
    }
  }

  const openNotification = (placement) => {
    const args = {
      message: "You haven't sign in yet",
      placement: "bottomRight",
    };
    notification.error(args);
  };

  const showLike = (item) => {
    getLike().then((res) => {
      const check = res.find(
        (e) =>
          e.attributes.tokenId === item.token_id &&
          e.attributes.tokenAddress === item.token_address
      );
      if (check) {
        setCheckLike(true);
      } else {
        setCheckLike(false);
      }
    });
  };

  const showWatching = (item) => {
    getWatching().then((res) => {
      const check = res.find(
        (e) =>
          e.attributes.tokenId === item.token_id &&
          e.attributes.userAddress === walletAddress
      );
      if (check) {
        setWatching(true);
      } else {
        setWatching(false);
      }
    });
  };

  const getLike = async () => {
    const query = new Moralis.Query(favorite);
    const result = await query.find();
    const data = result.filter(
      (item) => item.attributes.userAddress === account
    );
    return data;
  };

  const getWatching = async () => {
    const query = new Moralis.Query("watchlist");
    const result = await query.find();
    const data = result.filter(
      (item) => item.attributes.userAddress === account
    );
    return data;
  };

  useEffect(() => {
    showLike(item);
    showWatching(item);
    countLike(item);
  });

  useEffect(() => {
    if (item) {
      fetch(item?.image)
        .then((rs) => {
          item.type = rs.headers.get("content-type");
          setMediaSrc(item.image);
          setMediaType(item.type);
        })
        .catch((err) => console.log("fetch type media error:", err));
    }
  }, [item]);
  // console.log(item);

  const getAllFavorite = async () => {
    const query = new Moralis.Query(favorite);
    return await query.find();
  }

  const countLike = (item) => {
    getAllFavorite().then((res) => {
      const data = res.filter(ele => ele.attributes.tokenAddress === item.token_address && ele.attributes.tokenId === item.token_id);
      setLikeNum(data.length);
    })
  }

  return (
    <div
      className={styless.cardbox}
      style={{
        backgroundColor: mainColor.bgCard,
        color: mainColor.txt,
      }}
    >
      <div
        className={styless.image}
        // style={{ backgroundImage: `url(${item.image})` }}
      >
        {
          mediaType.includes('video') ?
          <video className={styless.image} width="350" controls> <source src={mediaSrc} type={mediaType}></source></video>
          :
          mediaType.includes('audio') ?
            <audio className={styless.image} width="350" controls> <source src={mediaSrc} type={mediaType}></source></audio>
            :
            <img alt="" src={mediaSrc} type={mediaType} className={styless.image} width="350" />
        }
      </div>
      <div className={styless.content}>
        <Row justify="space-between">
          <div className={styless.title} style={{ fontFamily: "GILROY " }}>
            {item.name?.length > 20
              ? `${item.name.slice(0, 20)} ...`
              : item.name}
          </div>
          <div className={styless.icon} onClick={() => pressLike()}>
            {mainColor.isMode === "light" ? (
              <>
                {" "}
                {checkLike ? (
                  <HeartFilled style={{ color: "red", fontSize: '20px' }} />
                ) : (
                  <HeartOutlined style={{fontSize: '20px' }}/>
                )}
              </>
            ) : (
              <>
                {" "}
                {checkLike ? (
                  <HeartFilled style={{ color: "red", fontSize: '20px' }} />
                ) : (
                  <HeartTwoTone twoToneColor="#fff" style={{fontSize: '20px' }}/>
                )}
              </>
            )}
            <span style={{fontFamily: "GILROY", color: mainColor.txt, fontSize: '20px' }}>&ensp; {likeNum || 0}</span>
          </div>
        </Row>
        <Row justify="space-between">
          <span className={styless.id} style={{ fontFamily: "GILROY " }}>
            {item.token_id}
          </span>
          {/* <span className={styless.price}>{item.token_id}</span> */}
          {/* <div className={styless.icon} onClick={() => like(item)}>
            {mainColor.isMode === "light" ? (
              <> {checkLike ? <HeartFilled /> : <HeartOutlined />}</>
            ) : (
              <> {checkLike ? <HeartTwoTone twoToneColor="#eb2f96" /> :  <HeartTwoTone twoToneColor="#fff" />}</>
            )}
          </div> */}
          <div onClick={() => handleWatchList(item)}>
            {isWatching ? (
              ""
            ) : (
              <Button
                className={`${styless.button} ${styless.btnInfo}`}
                style={{ fontFamily: "GILROY " }}
              >
                {"Add To Watchlist"}{" "}
              </Button>
            )}
          </div>
        </Row>
        <Divider style={{ margin: "10px 0" }} />
        <Row justify="space-between" gutter={16}>
          <Col span={12}>
            <Button
              className={`${styless.button} ${styless.btnInfo}`}
              style={{ fontFamily: "GILROY " }}
              onClick={() =>
                window.open(
                  `${getExplorer(chainId)}address/${item.token_address}`,
                  "_blank"
                )
              }
            >
              Trx Info
            </Button>
          </Col>
          <Col span={12}>
            <Button
              className={`${styless.button} ${styless.btnBuy}`}
              style={{ fontFamily: "GILROY " }}
              onClick={() => handleBuyClick(item)}
            >
              Buy
            </Button>
          </Col>
        </Row>
      </div>
      {getMarketItem(nftToBuy) ? (
        <Modal
          title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
          visible={visible}
          onCancel={() => setVisibility(false)}
          onOk={() => purchase()}
          okText="Buy"
        >
          <Spin spinning={loading}>
            <div
              style={{
                width: "250px",
                margin: "auto",
              }}
            >
              <Badge.Ribbon
                color="green"
                text={`${
                  getMarketItem(nftToBuy).price / ("1e" + 18)
                } ${nativeName}`}
              >
                {/* <img
                  src={nftToBuy?.image}
                  alt="Buy"
                  style={{
                    width: "250px",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                /> */}
                <div
                  style={{
                    width: "250px",
                    margin: "auto",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                >
                  {
                    mediaType.includes('video') ?
                    <video className={styless.image} width="350" controls> <source src={mediaSrc} type={mediaType}></source></video>
                    :
                    mediaType.includes('audio') ?
                      <audio className={styless.image} width="350" controls> <source src={mediaSrc} type={mediaType}></source></audio>
                      :
                      <img alt="" src={mediaSrc} type={mediaType} className={styless.image} width="350" />
                  }
                </div>
              </Badge.Ribbon>
            </div>
          </Spin>
        </Modal>
      ) : (
        <Modal
          title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
          visible={visible}
          onCancel={() => setVisibility(false)}
          onOk={() => setVisibility(false)}
        >
          {/* <img
            src={nftToBuy?.image}
            alt="Buy"
            style={{
              width: "250px",
              margin: "auto",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          /> */}
          <div
            style={{
              width: "250px",
              margin: "auto",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            {
              mediaType.includes('video') ?
              <video className={styless.image} width="350" controls> <source src={mediaSrc} type={'video/mp4'}></source></video>
              :
              mediaType.includes('audio') ?
                <audio className={styless.image} width="350" controls> <source src={mediaSrc} type={'audio/mp3'}></source></audio>
                :
                <img alt="" src={mediaSrc} type={'image'} className={styless.image} width="350" />
            }
          </div>
          <Alert message="This NFT is currently not for sale" type="warning" />
        </Modal>
      )}
    </div>
  );
};

export default CollectionCard;
