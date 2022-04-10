import {
  FilterOutlined,
  LeftOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Divider, Form, Layout, Grid } from "antd";
import React, { useContext, useState, useEffect } from "react";
import CategoryFilter from "./CategoryFilter";
import CollectionFilter from "./CollectionFilter";
import PriceFilter from "./PriceFilter";
import SortByFilter from "./SortByFilter";
import styless from "./Filter.module.css";
import { DarkThemeContext } from "components/DarkMode";

const { Sider } = Layout;
const { useBreakpoint } = Grid;

const FilterBox = () => {
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);
  const [position, setPosition] = useState("");
  const [visibleContent, setVisibleContent] = useState(false);
  const { mainColor } = useContext(DarkThemeContext);
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

  useEffect(() => {
    if (screens) {
      setCollapsed(!screens.md);
      setVisibleContent(!screens.md);
      if (!screens.lg) {
        setPosition("");
      } else {
        setPosition("sticky");
      }
    }
  }, [screens, position]);

  return (
    <div
      className={`${collapsed && styless.wrapperCollapsed}`}
      style={{ position: position }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={mainColor.isMode}
        collapsedWidth={60}
        width={300}
        className={styless.filterSider}

        // style={{backgroundColor:"red",marginTop:"200px"}}
      >
        {!visibleContent ? (
          <div className={styless.filterTitle}>
            <FilterOutlined style={{ color: `${mainColor.txt}` }} />
            <div
              className={`${mainColor.txt}`}
              style={{ fontFamily: "GILROY " }}
            >
              Filter
            </div>
            {/* <Typography.Text strong style={`${mainColor.txt}`}>Filter</Typography.Text> */}
            {!screens.md ? (
              <DownOutlined
                onClick={toggle}
                style={{ color: `${mainColor.txt}` }}
              />
            ) : (
              <LeftOutlined
                onClick={toggle}
                style={{ color: `${mainColor.txt}` }}
              />
            )}
          </div>
        ) : (
          <div
            className={!screens.md ? styless.filterTitle : styless.filterIcon}
            onClick={toggle}
          >
            <FilterOutlined style={{ color: `${mainColor.txt}` }} />
            {!screens.md && (
              <div
                className={`${mainColor.txt}`}
                style={{ fontFamily: "GILROY " }}
              >
                Filter
              </div>
            )}
            {!screens.md && (
              <UpOutlined style={{ color: `${mainColor.txt}` }} />
            )}
          </div>
        )}
        {!visibleContent && (
          <Form form={form}>
            <Divider className={styless.divider} />
            <SortByFilter />
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

export default FilterBox;
