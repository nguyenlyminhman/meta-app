import { Avatar } from 'antd';
import React from 'react';
import styless from './Explores.module.css';
import imgFake from 'assets/images/img-explore.png';

const Cardbox = ({ item }) => {
  return (
    <div className={styless.cardbox}>
      <div
        className={styless.image}
        style={{ backgroundImage: `url(${imgFake})` }}
      >
        <Avatar src={item.image} className={styless.avatar} size={80} />
      </div>
      <div className={styless.content}>
        <div className={styless.title}>{item.name}</div>
        <div className={styless.byAuthor}>
          by <span>METAMINT</span>
        </div>
        <div className={styless.description}>{item.description}</div>
      </div>
    </div>
  );
};

export default Cardbox;
