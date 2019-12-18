# ** Edit Button **

## Sample Code

```
import React from 'react'
import { EditButton } from 'common-components'
//common-components

const EditButtonTest = () => {

  return (
        <>

        //default
          <EditButton
            onClickFunc={() => { alert("Edit button") }}
            text={"Customize"}
            style={{ backgroundColor: "#b6d36b", width: "120px", height: "50px" }} //button style
            iconStyle={{ color: "white" }}
            textStyle={{ fontStyle: "italic", color: "white" }}
          />

        //with style
          <EditButton
            onClickFunc={() => { alert("Edit button") }}
            text={"Customize"}
            style={{ backgroundColor: "#b6d36b", width: "120px", height: "50px" }} //button style
            iconStyle={{ color: "white" }}
            textStyle={{ fontStyle: "italic", color: "white" }}
          />

        </>
  )
}

export default EditButtonTest
```

### Props

| Name        | Type     | Default  | Description             |
| ----------- | -------- | -------- | ----------------------- |
| onClickFunc | function | required | on click action         |
| text        | string   | required | Button Label            |
| style       | object   | -------- | Custom style for button |
| iconStyle   | object   | -------- | Custom style for icon   |
| textStyle   | object   | -------- | Custom style for text   |
