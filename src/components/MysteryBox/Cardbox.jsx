import { Button } from 'antd';
import React from 'react';
import styless from './Explores.module.css';
// import imgFake from 'assets/images/img-explore.png';
import MysteryBoxGif from 'assets/images/mystery-box.gif';
import btnstyles from './MysteryBox.module.css'
// import { useState } from "react";

const Cardbox = () => {
  // const [tokenId, setTokenId] = useState('');
  // const [uri, setUri] = useState('');

  // const getRandomReward = () => {
  //    let num = Math.floor(Math.random() * 300) + 1;
  //    console.log(num);
  //    if(num < 10){
  //     setTokenId(`00${num}`)
  //     setUri(`https://ipfs.moralis.io:2053/ipfs/QmXK5nPx7fYr6W31RbiG8pezhxc1vmJ9QfiNN7bHvymgeD/metadata/000000000000000000000000000000000000000000000000000000000000000000${num}.json`);
  //    } else if(num >= 10 && num < 100){
  //     setTokenId(`0${num}`);
  //     setUri(`https://ipfs.moralis.io:2053/ipfs/QmXK5nPx7fYr6W31RbiG8pezhxc1vmJ9QfiNN7bHvymgeD/metadata/00000000000000000000000000000000000000000000000000000000000000000${num}.json`);
  //    } else {
  //     setTokenId(num);
  //     setUri(`https://ipfs.moralis.io:2053/ipfs/QmXK5nPx7fYr6W31RbiG8pezhxc1vmJ9QfiNN7bHvymgeD/metadata/0000000000000000000000000000000000000000000000000000000000000000${num}.json`);
  //    }
  //     console.log(tokenId, uri);
     
  // }
  return (
    <div className={styless.cardbox}>
      <div
        className={styless.image}
        style={{ backgroundImage: `url(${MysteryBoxGif})` }}
      >
        {/* <Avatar src={item.image} className={styless.avatar} size={80} /> */}
      </div>
      <div className={styless.content}>
        <div className={styless.title} style={{fontFamily :"GILROY "}}>Mystery Box</div>
        <div className={styless.byAuthor} style={{fontFamily :"GILROY "}}>
          by <span style={{fontFamily :"GILROY "}}>METAMINT</span>
        </div>
        <div className={styless.description} style={{fontFamily :"GILROY "}}> </div>
          <Button  
          className={btnstyles.exploreBtn} 
          // onClick={() => getRandomReward()} 
          style={{fontFamily :"GILROY "}}>Comming Soon</Button>
      </div>
    </div>
  );
};

export default Cardbox;
