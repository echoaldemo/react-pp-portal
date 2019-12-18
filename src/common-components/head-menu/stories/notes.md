## Sample Code

```
import React, { createElement } from 'react'
import { HeadMenu } from 'common-components'
import notes from './notes.md''


const Menu = () => {

  return (
    <>
      <HeadMenu
        location={{ pathname: "/manage/user" }}
        getData={
          () => {
            return { first_name: "StoryBook", last_name: "User" }
          }
        }
        logout={
          () => {
          alert("Logout")
          }
        }
      />
    </>
  )
}

export default Menu

```

### Props

| Name     | Type     |          | Description                       |
| -------- | -------- | -------- | --------------------------------- |
| location | object   | -------- | path                              |
| getData  | function | -------- | fetch data of current logged user |
| logout   | function | -------- | logout function                   |
