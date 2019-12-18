# ** Head Menu **

## Sample Code

```
import React from 'react'
import { HeaderLink } from 'common-components'
import notes from './notes.md''


const Header = () => {

  return (
    <>
      <HeaderLink
            menu={[
              {
                title: 'Users',
                path: '/manage/users'
              },
              {
                title: 'Companies',
                path: '/manage/companies'
              },
              {
                title: 'Locations',
                path: '/manage/locations'
              },
              {
                title: 'Realms',
                path: '/manage/realms'
              },
              {
                title: 'DID Pools',
                path: '/manage/did-pool'
              },
              {
                title: 'Dids',
                path: '/manage/dids'
              }
            ]}
            title="Campaigns"
          />
    </>
  )
}

export default Header

```

### Props

| Name  | Type   |          | Description                 |
| ----- | ------ | -------- | --------------------------- |
| menu  | Array  | Required | Selections of link          |
| title | String | Required | Title of currently selected |
