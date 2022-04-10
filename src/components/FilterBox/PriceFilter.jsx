import React, { useState,useContext } from 'react';
import { Col, Form, Radio, Row, Grid } from 'antd';
import styless from './Filter.module.css';
import { connect } from 'react-redux';
import { getFilterPriceValue } from "../../store/filter/action";
import { useMoralis } from 'react-moralis';

import { DarkThemeContext } from "components/DarkMode";

const options = [
  { label: '< 1 ', value: '1' },
  { label: '< 10 ', value: '10' },
  { label: '< 100 ', value: '100' },
  { label: '< 1000 ', value: '1000' },
];
const typePrice = [
  {chain: ['0x1', '0x539', '0x3', '0x4', '0x2a', '0x5'], symbol: 'ETH'},
  {chain: ['0x38', '0x61'], symbol: 'BNB'},
  {chain: ['0x89', '0x13881'], symbol: 'MATIC'},
]
const { useBreakpoint } = Grid;

const PriceFilter = (props) => {
  const [value, setValue] = useState(null);
  const { mainColor } = useContext(DarkThemeContext);
  const { md } = useBreakpoint();
  const { chainId } = useMoralis();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onResetValue = () => {
    setValue(null);
  };
  // useEffect(() => {
    
  //   
  // }, [chainId])

  const getTypePrice = (label) => {
    const data = typePrice.find(ele => ele.chain.includes(chainId)) || {chain: ['0x1', '0x539', '0x3', '0x4', '0x2a', '0x5'], symbol: 'ETH'};
    return label + data.symbol;
  }

  const handleClickOption = (e) => {
    const thisValue = e.target.value;
    thisValue === value && onResetValue();
    props.getFilterPriceValue({priceValue: thisValue})
  };
  return (
    <Form.Item noStyle>
      <div style={{color: `${mainColor.txt}`,fontFamily :"GILROY "}}>Price</div>
      <Radio.Group
        onChange={onChange}
        value={value}
        buttonStyle="solid"
        optionType="button"
        style={{ width: '100%' }}
      >
        <Row gutter={[10, 10]}>
          {options.map((option) => {
            return (
              <Col xs={{ span: 6 }} md={{ span: 12 }} key={option.value}>
                <Radio.Button
                  value={option.value}
                  className={`${!md && 'mobile'} ${styless.label}`}
                  onClick={handleClickOption}
                  style={{fontFamily :"GILROY "}}
                >
                  <div className={styless.textButton}>
                  {getTypePrice(option.label)}</div>
                </Radio.Button>
              </Col>
            );
          })}
        </Row>
      </Radio.Group>
    </Form.Item>
  );
};

const mapStateToProps = () => ({
  getFilterPriceValue
});

const mapDispatchToProps = {
  getFilterPriceValue: getFilterPriceValue,
};

export default connect( mapStateToProps, mapDispatchToProps)(PriceFilter);
