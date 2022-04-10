import { Button, Col, Divider, Row, Modal, Input, Spin } from "antd";
import React, { useState, useContext, useEffect } from "react";
import styless from "./MyCollections.module.css";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
// import { useVerifyMetadata } from "hooks/useVerifyMetadata";
import { useWeb3ExecuteFunction } from "react-moralis";
import { getExplorer } from "helpers/networks";
import { DarkThemeContext } from "components/DarkMode";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getEllipsisTxt } from "helpers/formatters";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router";

const CollectionCard = ({ item }) => {
  const { mainColor } = useContext(DarkThemeContext);
  const [visible, setVisibility] = useState(false);
  const [price, setPrice] = useState();
  // const { verifyMetadata } = useVerifyMetadata();
  const { Moralis, authenticate } = useMoralis()
  const [nftToSell, setNftToSell] = useState({});
  const { chainId, marketAddress, contractABI } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const listItemFunction = "createMarketItem";
  const history = useHistory();

  const [exchangeFee, setExchangeFee] = useState();
  const [loading, setLoading] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const ItemImage = Moralis.Object.extend("ItemImages");
  const [mediaSrc, setMediaSrc] = useState('');
  const [mediaType, setMediaType] = useState('');

  // async function transfer(item, amount, receiver) {
  //   const options = {
  //     type: item.contract_type,
  //     tokenId: item.token_id,
  //     receiver: receiver,
  //     contractAddress: item.token_address,
  //   };

  //   if (options.type === "erc1155") {
  //     options.amount = amount;
  //   }

  //   setIsPending(true);
  //   await Moralis.transfer(options)
  //     .then((tx) => {
  //       console.log(tx);
  //       setIsPending(false);
  //     })
  //     .catch((e) => {
  //       alert(e.message);
  //       setIsPending(false);
  //     });
  // }
  const handleSellClick = (item) => {
    console.log(item);
    setNftToSell(item);
    setVisibility(true);
  };

  useEffect(() => {
    getExchangeFee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const handleTransferClick = (item) => {
  //   setNftToSend(item);
  //   setVisibility(true);
  // };

  // const handleChange = (e) => {
  //   setAmount(e.target.value);
  // };

  async function approveAll(item) {
    setLoading(true);
    authenticate().then(async () => {
      const ops = {
        contractAddress: item.token_address,
        functionName: "setApprovalForAll",
        abi: contractABIJson,
        params: {
          operator: marketAddress,
          approved: true,
        },
      };
      console.log("approve all >>>>>>>>>", ops);
      await contractProcessor.fetch({
        params: ops,
        onSuccess: () => {
          console.log("Approval Received");
          // setLoading(false);
          list(item, price);
          // setVisibility(false);
          // succApprove(item);
        },
        onError: (error) => {
          console.log(error);
          setLoading(false);
          failApprove();
        },
      });
    })
  }

  async function getExchangeFee() {
    const ops = {
      contractAddress: marketAddress,
      functionName: 'getListingPrice',
      abi: contractABIJson
    }

    await contractProcessor.fetch({
      params: ops,
      onSuccess: (value) => {
        console.log(value);
        setExchangeFee(value);
      }
    })
  }

  // function succApprove() {
  //   let secondsToGo = 5;
  //   list(item, price);
  //   const modal = Modal.success({
  //     title: "Success!",
  //     content: `Approval is now set, you may list your NFT`,
  //   });
  //   setTimeout(() => {
  //     modal.destroy();
  //   }, secondsToGo * 1000);
  // }

  function failApprove() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem with setting approval`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  const list = async (item, currentPrice) => {
    // setLoading(true);
    const p = currentPrice * ("1e" + 18);
    const ops = {
      contractAddress: marketAddress,
      functionName: listItemFunction,
      abi: contractABIJson,
      params: {
        nftContract: item.token_address,
        tokenId: item.token_id,
        price: String(p),
      },
      msgValue: exchangeFee
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("success");
        setTimeout(() => {
          setLoading(false);
          setVisibility(false);
          addItemImage();
          succList();
        }, 33000)
      },
      onError: (error) => {
        setLoading(false);
        failList();
      },
    });
  };

  function succList() {
    let secondsToGo = 2;
    const modal = Modal.success({
      title: "Success!",
      content: `Your NFT was listed on the marketplace`,
    });
    history.push('/explore')
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failList() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem listing your NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function addItemImage() {
    const itemImage = new ItemImage();

    itemImage.set("image", nftToSell.image);
    itemImage.set("nftContract", nftToSell.token_address);
    itemImage.set("tokenId", nftToSell.token_id);
    itemImage.set("name", nftToSell.name);
    itemImage.set("type", nftToSell.type);
    itemImage.save();
  }

  useEffect(() => {
    if (item) {
      fetch(item?.image)
        .then(rs => {
          item.type = rs.headers.get('content-type')
          setMediaSrc(item.image);
          setMediaType(item.type);
        })
        .catch(err => console.log('fetch type media error:', err))
    }
  }, [item])

  return (
    <div
      className={styless.cardbox}
      style={{
        backgroundColor: mainColor.bgCard,
        border: `${mainColor.txt} solid 1px`,
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
        <div className={styless.title} style={{ fontFamily: "GILROY " }}>
          {item.name}
        </div>
        <Row justify="space-between">
          <Col xs={{ span: 12 }} md={{ span: 12 }} xl={{ span: 12 }}>
            <span className={styless.id} style={{ fontFamily: "GILROY " }}>
              ID No. {item.token_id}
            </span>
          </Col>
          {/* <span className={styless.price}>0.125 ETH</span> */}
          <Col xs={{ span: 12 }} md={{ span: 12 }} xl={{ span: 12 }}>
            <CopyToClipboard text={`${item.token_address}`}>
              <Button
                className={`${styless.button} ${styless.btnInfo} btn-hover`}
                style={{ fontFamily: "GILROY " }}
              >
                {getEllipsisTxt(item.token_address, 4)}
              </Button>
            </CopyToClipboard>
          </Col>
        </Row>
        <Divider style={{ margin: "10px 0" }} />
        <Row justify="space-between" gutter={16}>
          <Col span={12}>
            <Button
              className={`${styless.button} ${styless.btnInfo} btn-hover`}
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
              onClick={() => handleSellClick(item)}
            >
              List
            </Button>
          </Col>
        </Row>
      </div>
      <Modal
        title={`Sell ${nftToSell?.name || "NFT"}`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        // onOk={() => list(nftToSell, price)}
        // okText="Sell"
        footer={[
          <Button
            key="1"
            onClick={() => setVisibility(false)}
            style={{ fontFamily: "GILROY " }}
            loading={loading ? true : false}
          // disabled={loading ? true : false}
          >
            Cancel
          </Button>,
          // <Button key="2" type="primary" onClick={() => approveAll(nftToSell)} style={{fontFamily :"GILROY "}}>
          //   Approve
          // </Button>,
          <Button
            key="3"
            type="primary"
            onClick={() => approveAll(nftToSell, price)}
            style={{ fontFamily: "GILROY " }}
            loading={loading ? true : false}
          // disabled={loading ? true : false}
          >
            Sell
          </Button>,
        ]}
      >
        <Spin spinning={loading}>
          {/* <img
          alt="Sell NFT"
          src={nftToSell.image}
          style={{
            width: "250px",
            margin: "auto",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
          
        /> */}
          <div style={{
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
          <Input
            autoFocus
            placeholder="Set Price in BNB"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Spin>
      </Modal>
    </div>
  );
};

export default CollectionCard;
