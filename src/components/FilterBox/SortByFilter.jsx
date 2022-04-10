import { Col, Form, Radio, Row } from "antd";
import React, { useContext } from "react";
import styless from "./Filter.module.css";
import { connect } from "react-redux";
import { getFilterSortValue } from "../../store/filter/action";
import { DarkThemeContext } from "components/DarkMode";

const options = [
  { label: "Most Recent", value: "most-recent" },
  { label: "Most Viewed", value: "most-viewd" },
  { label: "Most Liked", value: "most-liked" },
  { label: "On Auction", value: "on-auction" },
];

const SortByFilter = (props) => {
  const handleClickOption = (e) => {
    const thisValue = e.target.value;
    // thisValue === value && onResetValue();
    props.getFilterSortValue({ sortValue: thisValue });
  };
  const { mainColor } = useContext(DarkThemeContext);

  return (
    <Form.Item noStyle>
      <div style={{ color: `${mainColor.txt}`, fontFamily: "GILROY " }}>
        Sort by
      </div>
      <Radio.Group
        buttonStyle="solid"
        optionType="button"
        style={{ width: "100%" }}
      >
        <Row gutter={[10, 10]}>
          {options.map((option) => {
            return (
              <Col xs={{ span: 6 }} md={{ span: 12 }} key={option.value}>
                <Radio.Button
                  value={option.value}
                  className={styless.label}
                  onClick={handleClickOption}
                  style={{ fontFamily: "GILROY " }}
                >
                  {" "}
                  <div className={styless.textButton}>{option.label}</div>
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
  getFilterSortValue,
});

const mapDispatchToProps = {
  getFilterSortValue: getFilterSortValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortByFilter);
