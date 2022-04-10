import React from "react";
import styles from "../styles.module.css";
import LayoutItem from "./LayoutItem";

const GameLayout = () => {
  return (
    <div className={styles.gameLayout}>
      <LayoutItem
        item={{
          title: "Lorem ipsum",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ipsum lorem, sodales ut molestie non, pharetra ut velit. Etiam tincidunt quam purus, vitae venenatis sapien cursus vel. Nam mollis, turpis at luctus commodo, dui urna imperdiet ante, et finibus velit nunc fermentum diam. Suspendisse tincidunt tempor neque, vel cursus lectus maximus eu",
          code: "#00010",
          price: "2000",
          owner: {
            name: "Lorem ipsum",
          },
        }}
        type="ssr"
        image={"https://picsum.photos/700/300"}
      />
      <LayoutItem
        item={{
          title: "Lorem ipsum",
          description: "Lorem ipsum ipsum ipsum",
          code: "#00020",
          price: "2000",
          owner: {
            name: "Lorem ipsum",
          },
        }}
        type="sr"
        image={"https://picsum.photos/700/300"}
      />
      <LayoutItem
        item={{
          title: "Lorem ipsum",
          description: "Lorem ipsum ipsum ipsum",
          code: "#00030",
          price: "2000",
          owner: {
            name: "Lorem ipsum",
          },
        }}
        type="r"
        image={"https://picsum.photos/700/300"}
      />
    </div>
  );
};

export default GameLayout;
