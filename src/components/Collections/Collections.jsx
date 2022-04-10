import { Input, Form, Grid } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useContext, memo } from "react";
import CollectionCard from "./CollectionCard";
import styless from "./Collections.module.css";
import { useNFTBalances, useMoralisQuery, useMoralis } from "react-moralis";
import FilterBoxes from "components/FilterBoxes";
import TopCollections from "components/TopColections/TopCollections";
import { connect } from "react-redux";
import { DarkThemeContext } from "components/DarkMode";

const { useBreakpoint } = Grid;
const Collections = memo((props) => {
  const {chainId} = useMoralis()
  const { mainColor } = useContext(DarkThemeContext);
  const { data: NFTTokenIds } = useNFTBalances({
    address: props.Address.address,
  });
  const { xs } = useBreakpoint();
  const queryMarketItems = useMoralisQuery("MarketItem");

  const [size, setSize] = useState(500);

  const [form] = Form.useForm();
  const [listNFT, setListNFT] = useState([]);
  const [originListNFT, setOriginListNFT] = useState([]);
  const [marketItems, setMarketItems] = useState([]);


  // const getData = (chain) => {

  //   const { data: NFTTokenIds } = useNFTBalances({
  //     address: props.Address.address,
  //   });
  // }

  useEffect(() => {
    console.log(chainId);
  }, [chainId])

  // function itemRender(current, type, originalElement) {
  //   if (type === "prev") {
  //     return null;
  //   }
  //   if (type === "next") {
  //     return null;
  //   }
  //   return originalElement;
  // }

  function handleSearchInput(event) {
    if (event.keyCode === 13) {
      let _searchValue = event.target.value;
      let newListNFTs = [];
      let price = props.Filter.filterPrice;
      let sortBy = props.Filter.filterSort;
      let listNFTs = [...originListNFT];
      // filter by searching NFT name, not price & SortBy
      if (price === "" && sortBy === "") {
        newListNFTs = listNFTs.filter((item) =>
          item.metadata?.name.toLowerCase().includes(_searchValue.toLowerCase())
        );
      }

      // filter by selecting Price & enter search value
      if (price !== "") {
        newListNFTs = listNFTs.filter(
          (item) =>
            item.metadata?.name
              .toLowerCase()
              .includes(_searchValue.toLowerCase()) &&
            parseInt(item.price) < parseInt(props.Filter.filterPrice)
        );
      }
      // filter by selecting SortBy & enter search value

      setListNFT([...newListNFTs]);
    }
  }

  const { data } = queryMarketItems;
  useEffect(() => {
    setMarketItems([...data]);
    if (xs) {
      setSize(280);
    }
    else{
      setSize(400)
    }
  }, [data, xs]);

  useEffect(() => {
    if (NFTTokenIds) {
      let nftToken = [...NFTTokenIds.result];
      nftToken.forEach((item, idx) => {
        item.price = "0";
        marketItems?.forEach((ele) => {
          if (
            ele.attributes.nftContract === item.token_address &&
            ele.attributes.tokenId === item.token_id
          ) {
            item.price = ele.attributes.price / ("1e" + 18);
          }
        });
      });
      setListNFT([...nftToken]);
      setOriginListNFT([...nftToken]);
    }
  }, [NFTTokenIds, marketItems]);

  // filter by price
  useEffect(() => {
    if (props.Filter.filterPrice !== "") {
      form.resetFields();
      let listNFTs = [...originListNFT];
      let newListNFTs = listNFTs.filter(
        (item) => parseInt(item.price) < parseInt(props.Filter.filterPrice)
      );
      setListNFT([...newListNFTs]);
    }
  }, [props.Filter.filterPrice, form, originListNFT]);

  return (
    <>
      <TopCollections />
      <div className={styless.inputField} style={{}}>
        <Form form={form} layout="vertical">
          <Form.Item name="search">
            <Input
              className={styless.input}
              style={{ border: `${mainColor.txt} solid 1px`, width:size }}
              size="large"
              placeholder=" Enter your search here  "
              prefix={
                <SearchOutlined style={{ color: `${mainColor.iconSearch}` }} />
              }
              onKeyUp={(e) => handleSearchInput(e)}
            />
          </Form.Item>
        </Form>
      </div>
      <div style={{ display: "flex", position: "relative" }}>
        <FilterBoxes />
        <div className={styless.wrapper}>
          <div className={styless.wrapperInner}>
            {listNFT?.length > 0 ? (
              listNFT.map((nft, index) => (
                <CollectionCard
                  item={{
                    ...nft,
                    name: nft.metadata?.name,
                  }}
                  key={index}
                />
              ))
            ) : (
              <h2>No NFTs found</h2>
            )}
          </div>
        </div>
      </div>
      {/* <Row justify="center" style={{ margin: "24px 0 40px" }}>
        <Pagination
          itemRender={itemRender}
          className={styless.pagination}
          defaultCurrent={1}
          total={50}
        />
      </Row> */}
    </>
  );
});

const mapStateToProps = (state) => ({
  Filter: state.Filter,
  Address: state.Address
});

export default connect(mapStateToProps)(Collections);
