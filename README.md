# adem-dropdown

## Getting started

### Compatibility

Your project needs to use React

### Installation

Add adem-dropdown to your project by executing `npm install adem-dropdown`

### Usage

```js
import React, { useState } from "react";
import { Dropdown } from "adem-dropdown";

function MyApp() {
  const [value, setValue] = useState(1);
  const items = [
    { name: "item 1", value: 1 },
    { name: "item 2", value: 2 },
    { name: "item 3", value: 3 },
    { name: "item 4", value: 4 },
  ];
  return (
    <div>
      <Dropdown onChange={setValue} value={value} items={items} width="100px" iconSrc={/* icon src */}  />
    </div>
  );
}
```
