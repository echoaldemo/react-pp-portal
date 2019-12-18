# ** Stepper **

## Sample Code

```
import React, { useState } from 'react'
import { Dialog } from '@material-ui/core'
import { Stepper, Step } from 'common-components/stepper'

const Steps = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const handleCancel = () => {
    console.log('cancel')
  }

  const handleFinish = () => {
    console.log('finish')
  }

  return (
    <div style={{ width: 400 }}>
      <Stepper
        steps={6}
        cancelFn={handleCancel}
        finishFn={handleFinish}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
      >
        <Step index={1} disabled={false}>
          1
        </Step>
        <Step index={3} disabled={false}>
          3
        </Step>
        <Step index={2} disabled={false}>
          2
        </Step>
      </Stepper>
    </div>
  )
}

export default Steps
```

### Stepper Props

| Name           | Type     |          | Description             |
| -------------- | -------- | -------- | ----------------------- |
| steps          | int      | required | number of steps         |
| cancelFn       | function | required | cancel function         |
| finishFn       | function | required | finish button function  |
| setCurrentStep | function | required | change the current step |
| currentStep    | int      | required | current step            |

### Step Props

| Name     | Type |          | Description             |
| -------- | ---- | -------- | ----------------------- |
| index    | int  | required | position of the step    |
| disabled | bool | -------- | disable the next button |
