import { Grid, Table, Space, Button } from 'antd';
import 'antd/dist/antd.css';
import TransactionFilterBox from 'components/TransactionFilterBox';
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';
import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import styles from './styles.module.css';
import srcMedia from '../../assets/images/play.png'

function WatchList() {
  const { walletAddress } = useMoralisDapp();
  const { Moralis } = useMoralis();
  const [dataWatch, setDataWatch] = useState([]);

  const { useBreakpoint } = Grid;
  const { sm } = useBreakpoint();

  const columns = [
    {
      title: 'Token ID',
      dataIndex: 'token_id',
      key: 'token_id',
      width: !sm ? '60px' : 'auto',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: !sm ? '60px' : 'auto',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: !sm ? '60px' : 'auto',
    },
    {
      title: 'Image',
      key: 'image',
      render: (imgSrc) =>
      (
        <Space size="middle">
          {/* <img
            src={imgSrc.image}
            style={{ width: '40px', borderRadius: '4px' }}
            alt='info'
          /> */}
          {showMedia(imgSrc)}
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'index',
      render: (record) =>
      (
        <Space size="middle">
          <Button onClick={() => handleUnwatch(record)}>Unwatch</Button>
        </Space>
      ),
    },

  ];

  const { data } = useMoralisQuery('watchlist');
  useEffect(() => {
    if (data.length > 0) {
      let arr = []
      data.forEach(el => {
        if (el.attributes.userAddress === walletAddress) {
          arr.push(el.attributes)
        }
      }
      )
      let newarr = arr.map((item, index) => ({
        key: index,
        collection: item.nftContract,
        token_id: item.tokenId,
        name: item.name,
        image: item.image,
        price: item.price === 0 ? '' : item.price,
        index: index,
        type: item.type
      }))
      setDataWatch([...newarr]);
    }
  }, [data, walletAddress]);

  async function handleUnwatch(item) {
    const WatchList = Moralis.Object.extend("watchlist");
    const query = new Moralis.Query(WatchList);
    query.equalTo('userAddress', walletAddress);
    query.equalTo('tokenId', item.token_id);
    query.equalTo('nftContract', item.collection)

    const object = await query.first();
    if (object) {
      object.destroy().then(() => {
        let arr = [...dataWatch];
        let newArr = arr.filter((ele => ele.index !== item.index))
        setDataWatch([...newArr])
      },
        (error) => {
          console.log(error);
        });
    }
  }

  function showMedia(item) {
    if (item.type.includes("image")) {
      return <img alt="" src={item.image} type={'image'} style={{ width: '40px', borderRadius: '4px' }} />
    }
    return <img alt="" src={srcMedia} type={'image'} style={{ width: '40px', borderRadius: '4px' }} />
  }

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <TransactionFilterBox />
      <div className={styles.transactionWrapper}>
        <Table
          pagination={false}
          className={styles.table}
          columns={columns}
          dataSource={dataWatch}
        />
      </div>
    </div>
  );
}

export default WatchList;
