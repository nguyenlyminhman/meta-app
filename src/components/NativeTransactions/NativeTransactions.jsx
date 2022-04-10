import { Grid, Table, Tag, Space, Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import TransactionFilterBox from 'components/TransactionFilterBox';
// import TransactionRow from 'components/TransactionRow';
import useNativeTransactions from 'hooks/useNativeTransactions';
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';
import React, { useEffect, useState } from 'react';
import { useMoralisQuery, useWeb3ExecuteFunction } from 'react-moralis';
import moment from 'moment';
import srcBlankImg from 'assets/images/play.png';
// import styles from "./styles";
import styles from './styles.module.css';
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom";
import { getAuthenticate } from "store/disableMenu/action";

import { connect } from "react-redux";

function NativeTransactions(props) {
  const contractProcessor = useWeb3ExecuteFunction();
  const { walletAddress, marketAddress, contractABI } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const queryItemImages = useMoralisQuery('ItemImages');
  const { nativeTransactions } = useNativeTransactions();
  // const { Moralis } = useMoralis();
  const history = useHistory();
  const {Moralis, account } = useMoralis();
  const [visible, setVisibility] = useState(false);
  const [recordDelist, setRecordDelist] = useState();

  const checkAuthen = async () => {
    const users = Moralis.Object.extend("profile");
    const query = new Moralis.Query(users);
    query.equalTo("address", account);
    const data = await query.first();
    return data;
  }

 

  useEffect(() => {   
   checkAuthen().then((res) => {
    if(res) {
      // setAuthenticate(true);
      // history.push('/transaction')
      return
    } else {
      // setAuthenticate(false);
      props.getAuthenticate({authenticated: true});
      history.push('/profile')
    }
   });
  })

  useEffect(() => {}, [nativeTransactions]);
  const { useBreakpoint } = Grid;
  const { sm } = useBreakpoint();

  const fetchItemImages = JSON.parse(
    JSON.stringify(queryItemImages.data, [
      'nftContract',
      'tokenId',
      'name',
      'image',
      'type'
    ])
  );

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: !sm ? '60px' : 'auto',
    },
    {
      title: 'Item',
      key: 'item',
      render: (text, record) => (
        <Space size="middle">
          <img
            src={
              getType(record.collection, record.item)?.includes("image")
              ?
                getImage(record.collection, record.item)
              :
              srcBlankImg
            }
            style={{ width: '40px', borderRadius: '4px' }}
            alt='info'
          />
          <span>#{record.item}</span>
        </Space>
      ),
    },
    {
      title: 'Name',
      key: 'collection',
      render: (text, record) => (
        <Space size="middle">
          <span>{getName(record.collection, record.item)}</span>
        </Space>
      ),
    },
    {
      title: 'Transaction Status',
      key: 'tags',
      dataIndex: 'tags',
      render: (record) => (
        <div className={styles.statusCol}>
          <div>
            {record.map((tag) => {
              let color = 'geekblue';
              let status = 'Buy';
              if (tag === false) {
                color = 'volcano';
                status = 'Waiting';
              } else if (tag === true) {
                color = 'green';
                status = 'Confirmed';
              }
              if (tag === walletAddress) {
                status = 'Sell';
              }
              return (
                <Tag
                  color={color}
                  className={`custom-tag tag-${status}`}
                  key={status}
                >
                  {status.toUpperCase()}
                </Tag>
              );
            })}
          </div>
          <span className={styles.resPrice}>{record.price}</span>
        </div>
      ),
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      render: (e) => (
        <Space size="middle">
          {/* <PolygonCurrency/> */}
          <span>{e}</span>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      dataIndex: 'action',
      render: (record) =>
      ( 
        <div className={styles.statusCol}>
          
            {
              record.seller === walletAddress ?
                (<Button
                  onClick={() => handleDelistClick(record)}
                  size="large"
                  type='primary'
                >
                  Delist
                </Button>
                )
                : ('')
            }
        </div>
      ),
    },
  ];
  
  async function handleDelistClick(record) {
    setVisibility(true);
    setRecordDelist(record);
  }

  async function delist() {
    // let itemDelist = data.filter(item => item.key === recordDelist.index);
    const ops = {
      contractAddress: marketAddress,
      functionName: 'handleDelist',
      abi: contractABIJson,
      params: {
        nftContract: recordDelist?.nftContract,
        itemId: recordDelist?.itemId,
        tokenId: recordDelist?.tokenId
      },
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        setVisibility(false);
        removeFromDB();
        successDelist();
      },
      onError: (error) => {
        failDelist();
      },
    });
  }

  async function removeFromDB() {
    // let itemDelist = data.filter(item => item.key === recordDelist.index);

    const query = new Moralis.Query('MarketItem')
    query.equalTo('nftContract', recordDelist.nftContract)
    query.equalTo('tokenId', recordDelist.tokenId)
    const object = await query.first();
    if (object) {
      object.destroy().then(() => {
        console.log('');
      }, (error) => {
        console.log(error);
      });
    }
  }

  function successDelist() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `Your NFT is delisted`,
    });
    this.forceUpdate();
    history.push('/my-collection')
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failDelist() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem with delist`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function getImage(addrs, id) {
    const img = fetchItemImages.find(
      (element) => element.nftContract === addrs && element.tokenId === id
    );
    return img?.image;
  }

  function getType(addrs, id) {
    const img = fetchItemImages.find(
      (element) => element.nftContract === addrs && element.tokenId === id
    );
    return img?.type;
  }

  function getName(addrs, id) {
    const nme = fetchItemImages.find(
      (element) => element.nftContract === addrs && element.tokenId === id
    );
    return nme?.name;
  }

  // const hotUpdate = () => {
  //   this.forceUpdate()
  // }

  const queryMarketItems = useMoralisQuery('MarketItem');
  const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      'updatedAt',
      'price',
      'nftContract',
      'itemId',
      'sold',
      'tokenId',
      'seller',
      'owner',
    ])
  )
    .filter(
      (item) => item.seller === walletAddress || item.owner === walletAddress
    )
    .sort((a, b) =>
      a.updatedAt < b.updatedAt ? 1 : b.updatedAt < a.updatedAt ? -1 : 0
    );

  const data = fetchMarketItems?.map((item, index) => ({
    key: index,
    date: moment(item.updatedAt).format('DD-MM-YYYY HH:mm'),
    collection: item.nftContract,
    item: item.tokenId,
    tags: [item.seller, item.sold],
    price: item.price / ('1e' + 18),
    itemId: item.itemId,
    action: item 
  }));

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <TransactionFilterBox />
      <div className={styles.transactionWrapper}>
      {/* <Button key="3" type="primary" onClick={() => delist()}>Delist</Button> */}
        <Table
          pagination={false}
          className={styles.table}
          columns={columns}
          dataSource={data}
        />
      </div>
      <Modal
        title={`Delist`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        footer={[
          <Button key="1" onClick={() => setVisibility(false)}>Cancel</Button>,
          // <Button key="2" type="primary" onClick={() => approve()}>Approve</Button>,
          <Button key="3" type="primary" onClick={() => delist()}>Delist</Button>
        ]}
      >
        <img
          alt="Delist NFT"
          src={ 
            visible ? 
              (
                getType(recordDelist.nftContract, recordDelist.tokenId)?.include("image")
                ?
                getImage(recordDelist.nftContract, recordDelist.tokenId)
                :
                srcBlankImg
              )
              :
              getImage('','')
            }
          style={{
            width: "250px",
            margin: "auto",
            borderRadius: "10px",
            marginBottom: "15px"
          }}
        />
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.Auth
});
const mapDispatchToProps = {
  getAuthenticate: getAuthenticate
};

export default connect(mapStateToProps, mapDispatchToProps) (NativeTransactions);
