import React from 'react'
import { TableNoResult, HeaderButton } from 'common-components'
import { IoIosGlobe } from 'react-icons/io'
export default props => {
  return (
    <>
      {props.open && (
        <TableNoResult
          headerText="Global rapid response"
          mainMessage="No rapid response tests have been created"
          subMessage='Would you like to create one? Just hit the
           "New rapid response" button.
         '
          icon={<IoIosGlobe size={50} />}
          renderButton={
            <HeaderButton
              style={{
                width: '160px',
                marginTop: '4px'
              }}
              buttonText="New test"
              openFunction={() => props.newTestOpen()}
            />
          }
        />
      )}
    </>
  )
}
