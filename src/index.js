import React, { useState } from "react";
import { render } from "react-dom";
import { Dropdown } from "./lib";
import arrow from "./lib/assets/arrow_icon.svg";

const App = () => {
  const items = [
    { name: "item 1", value: 1 },
    { name: "item 2", value: 2 },
    { name: "item 3", value: 3 },
    { name: "item 4", value: 4 },
    { name: "item 5", value: 5 },
    { name: "item 6", value: 6 },
    { name: "item 7", value: 7 },
    { name: "item 8", value: 8 },
    { name: "item 9", value: 9 },
    { name: "item 10", value: 10 },
  ];

  const [value, setValue] = useState(items[0].value);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Dropdown</h1>
      <Dropdown
        items={items}
        value={value}
        onChange={setValue}
        width="100px"
        iconSrc={arrow}
      />
    </div>
  );
};

render(<App />, document.getElementById("root"));
