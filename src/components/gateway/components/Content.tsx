import React, { Fragment } from 'react'
import { List, ListItem, ListItemText, Divider } from '@material-ui/core'
import { ContentProps } from '../types'

const Content: React.FC<ContentProps> = ({ campaigns, searchText }) => {
  return (
    <List>
      <ListItem>
        <ListItemText primary={<strong>Campaign</strong>} />
      </ListItem>
      <Divider />
      {campaigns.map(campaign => (
        <Fragment key={campaign.uuid}>
          {searchText ? (
            <>
              {campaign.name.match(new RegExp(searchText, 'i')) && (
                <>
                  <ListItem button>
                    <ListItemText primary={campaign.name} />
                  </ListItem>
                  <Divider />
                </>
              )}
            </>
          ) : (
            <>
              <ListItem button>
                <ListItemText primary={campaign.name} />
              </ListItem>
              <Divider />
            </>
          )}
        </Fragment>
      ))}
    </List>
  )
}

export default Content
