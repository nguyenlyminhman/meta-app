import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "../styles.module.css";
import { Button } from "antd";

const LayoutItem = ({ item, type, image }) => {
  console.log(styles);
  return (
    <div className={clsx([styles.layoutItem, styles[type]])}>
      <img alt="" src={image} />

      <div className={styles.layoutItemRight}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.description}>{item.description}</p>

        <Button block style={{ marginBottom: 5 }}>
          {item.price}
        </Button>
        <Button block>b</Button>

        <div className={styles.itemOwner}>
          <p>Owner</p>
          <p>{item?.owner?.name}</p>
        </div>
      </div>
    </div>
  );
};

LayoutItem.propTypes = {
  type: PropTypes.oneOf(["ssr", "sr", "r"]),
};

export default LayoutItem;
