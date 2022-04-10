import {
  FilterOutlined,
  LeftOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Divider, Form, Layout, Grid } from 'antd';
import React, { useState ,useContext} from 'react';
import { DarkThemeContext } from "components/DarkMode";
import CategoryFilter from './CategoryFilter';
import CollectionFilter from './CollectionFilter';
import PriceFilter from './PriceFilter';
import StatusFilter from './StatusFilter';
import styless from './Filter.module.css';


const { Sider } = Layout;
const { useBreakpoint } = Grid;

const TransactionFilterBox = () => {
  const { mainColor } = useContext(DarkThemeContext);
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(true);
  const [visibleContent, setVisibleContent] = useState(true);

  const screens = useBreakpoint();

  const toggle = () => {
    setCollapsed((collapsed) => !collapsed);

    setTimeout(
      () => {
        setVisibleContent(!collapsed);
      },
      !collapsed ? 0 : 70
    );
  };
  return (
    <div className={`${collapsed && styless.wrapperCollapsed}`}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={mainColor.isMode}
        collapsedWidth={60}
        width={300}
        className={styless.filterSider}
      >
        {!visibleContent ? (
          <div className={styless.filterTitle} style={{backgroundColor:mainColor.bgFilter}}>
            <FilterOutlined style={{color: `${mainColor.txt}`,backgroundColor:mainColor.bgFilter}}/>
            <div className={`${mainColor.txt}`} style={{fontFamily :"GILROY ",backgroundColor:mainColor.bgFilter}} >Filter</div>
            {!screens.md ? (
              <DownOutlined onClick={toggle} style={{color: `${mainColor.txt}`}}/>
            ) : (
              <LeftOutlined onClick={toggle} style={{color: `${mainColor.txt}`}}/>
            )}
          </div>
        ) : (
          <div
            className={!screens.md ? styless.filterTitle : styless.filterIcon}
            onClick={toggle}
            style={{backgroundColor:mainColor.bgFilter}} 
          >
            <FilterOutlined  style={{color: `${mainColor.txt}`}}/>
            {!screens.md && <div style={{fontFamily :"GILROY ",color:mainColor.txt}} >Filter</div>}
            {!screens.md && <UpOutlined style={{color: `${mainColor.txt}`}}/>}
          </div>
        )}
        {!visibleContent && (
          <Form form={form}>
            <Divider className={styless.divider} />
            <StatusFilter />
            <Divider className={styless.divider} />
            <PriceFilter />
            <Divider className={styless.divider} />
            <CollectionFilter form={form} />
            <Divider className={styless.divider} />
            <CategoryFilter />
          </Form>
        )}
      </Sider>
    </div>
  );
};

export default TransactionFilterBox;
