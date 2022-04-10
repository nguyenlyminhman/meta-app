import React from 'react';
import FilterBox from './FilterBox';
import MyCollections from './MyCollections';
import { useEffect } from 'react';
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom";

const MyCollection = () => {
  const history = useHistory();
  const {Moralis, account } = useMoralis();

  const checkAuthen = async () => {
    const users = Moralis.Object.extend("profile");
    const query = new Moralis.Query(users);
    query.equalTo("address", account);
    const data = await query.first();
    return data;
  }

  useEffect(() => {   
    checkAuthen().then((res) => {
     if(!res) {
      history.push('/profile')
     }
    });
   })

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <FilterBox />
      <MyCollections />
    </div>
  );
};

export default MyCollection;
