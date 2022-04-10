import React, { useState,useContext } from 'react';
import { DarkThemeContext } from "components/DarkMode";
import { Col, Form, Radio, Row, Grid } from 'antd';
import styless from './Filter.module.css';
const options = [
  { label: '< 1 ETH', value: '1' },
  { label: '< 0 ETH', value: '10' },
  { label: '< 100 ETH', value: '100' },
  { label: '< 1000 ETH', value: '1000' },
];

const { useBreakpoint } = Grid;

const PriceFilter = () => {
  const { mainColor } = useContext(DarkThemeContext)
  const [value, setValue] = useState(null);
  const { md } = useBreakpoint();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onResetValue = () => {
    setValue(null);
  };

  const handleClickOption = (e) => {
    const thisValue = e.target.value;
    thisValue === value && onResetValue();
  };
  return (
    <Form.Item noStyle>
      <div className={styless.title} style={{ color:mainColor.txt}}>Price</div>
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
                >
                  {option.label}
                </Radio.Button>
              </Col>
            );
          })}
        </Row>
      </Radio.Group>
    </Form.Item>
  );
};

export default PriceFilter;
