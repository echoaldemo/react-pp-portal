# ** CampaignMenuSelect **

## Sample Code

```
import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { CampaignMenuSelect } from "common-components";

const options = [
    {
      name: "Agent Performance",
      id: "ap",
      sublinks: [
        {
          name: "Rankings",
          url: "#"
        },
        {
          name: "Trend",
          url: "#"
        },
        {
          name: "Live Agent Report",
          url: "#"
        }
      ]
    },
    {
      name: "Campaigns Options",
      id: "co",
      sublinks: [
        {
          name: "Goals",
          url: "#"
        }
      ]
    },
    {
      name: "Dialer",
      id: "dialer",
      sublinks: null,
      url: "#"
    },
    {},
    {
      name: "Edit Campaign",
      id: "edit_campaign",
      sublinks: null,
      url: "#"
    }
  ];

const MenuSample = () => {
  return (
    <>
      <BrowserRouter>
        <CampaignMenuSelect title="Campaign menu" options={options} />
      </BrowserRouter>
    </>
  )
}

export default MenuSample
```

### CampaignMenuSelect Props

| Name         | Type     |          | Description                                    |
| ------------ | -------- | -------- | ---------------------------------------------- |
| title        | string   | required | Label of the menu                              |
| oprtions     | array    | required | {                                              |
|              |          |          | name: string,                                  |
|              |          |          | id: string,                                    |
|              |          |          | sublinks: [{name: string, url: string}],       |
|              |          |          | url: string                                    |
|              |          |          | }                                              |
|              |          |          | empty object to render horizontal line         |