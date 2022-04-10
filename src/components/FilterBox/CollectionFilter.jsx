import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Col, Form, Input, Radio, Row, Space, Typography } from 'antd';
import FuturisticAbstract from 'assets/images/Collection/Futuristic-Abstract.png';
import MonkeyInBlack from 'assets/images/Collection/Monkey-in-Black.png';
import MonkeyKing from 'assets/images/Collection/Monkey-King.png';
import StreetArt from 'assets/images/Collection/Street-Art.png';
import React, { useState,useContext } from 'react';
import { DarkThemeContext } from "components/DarkMode";
import styless from './Filter.module.css';
const options = [
  {
    label: 'Futuristic Abstract',
    value: 'Futuristic Abstract',
    image: FuturisticAbstract,
  },
  {
    label: 'Monkey in Black',
    value: 'Monkey in Black',
    image: MonkeyInBlack,
  },
  { label: 'Monkey King', value: 'Monkey King', image: MonkeyKing },
  { label: 'Street Art', value: 'Street Art', image: StreetArt },
];

const CollectionFilter = () => {
  const [value, setValue] = useState(null);
  const { mainColor } = useContext(DarkThemeContext)
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onResetValue = () => {
    setValue(null);
  };

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: '10px' }}
      >
        <div style={{color: `${mainColor.txt}`,fontFamily :"GILROY "}}>Collections</div>
        {value && <CloseOutlined onClick={onResetValue} />}
      </Row>
      <Input placeholder="Search" className={styless.inputSearch}  style={{ color:`${mainColor.txt}`}}/>
      <Form.Item noStyle>
        <Radio.Group
          onChange={onChange}
          value={value}
          buttonStyle="solid"
          optionType="button"
        >
          <Row gutter={0}>
            {options.map((option, index) => {
              return (
                <Col xs={{ span: 12 }} md={{ span: 24 }} key={index}>
                  <Radio.Button
                    key={option.value}
                    value={option.value}
                    className={styless.collectionLabel}
                    style={{ backgroundColor:mainColor.bgFilter}}
                  >
                    <Space size={10}>
                      <Avatar src={option.image} size={20} />
                      <Typography.Text className={styless.labelText} style={{ fontFamily :"GILROY ",color:`${mainColor.txt}`}}>
                        {option.label}
                      </Typography.Text>
                    </Space>
                  </Radio.Button>
                </Col>
              );
            })}
          </Row>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default CollectionFilter;
