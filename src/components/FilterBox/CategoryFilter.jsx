import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Col, Form, Radio, Row, Space, Typography } from 'antd';
import StreetArt from 'assets/images/Collection/Street-Art.png';
import styless from './Filter.module.css';
import React, { useState,useContext } from 'react';
import { DarkThemeContext } from "components/DarkMode";
const options = [
  { label: 'Art', value: 'Art', image: StreetArt },
  { label: 'Collectibles', value: 'Collectibles', image: StreetArt },
  { label: 'Domain Names', value: 'Domain Names', image: StreetArt },
  { label: 'Music', value: 'Music', image: StreetArt },
  { label: 'Photography', value: 'Photography', image: StreetArt },
  { label: 'Sport', value: 'Sport', image: StreetArt },
  { label: 'Trading Cards', value: 'Trading Cards', image: StreetArt },
  { label: 'Utility', value: 'Utility', image: StreetArt },
  { label: 'Virtual Worlds', value: 'Virtual Worlds', image: StreetArt },
];

const CategoryFilter = () => {
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
          <div style={{color: `${mainColor.txt}`,fontFamily :"GILROY "}}>Categories</div>

        {value && <CloseOutlined onClick={onResetValue} />}
      </Row>
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
                      <Avatar
                        src={option.image}
                        shape="square"
                        size={20}
                        className={styless.avatarCategory}
                      />
                      <Typography.Text className={styless.labelText} style={{fontFamily :"GILROY ",color:`${mainColor.txt}`}}>
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

export default CategoryFilter;
