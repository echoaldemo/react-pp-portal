// Reusable component for New User Modal

import React, { useEffect, useState } from 'react'
import { Done as Check, NavigateBefore, NavigateNext } from '@material-ui/icons'
import {
  Container,
  Done,
  Current,
  Rest,
  Line,
  BtnCont,
  NormalBtn,
  CancelText,
  Next,
  NextText,
  BackText,
  Finish,
  FinishText,
  DisText
} from './styles'

interface Props {
  steps: number
  cancelFn: () => void
  finishFn: () => void
  setCurrentStep: any
  currentStep: number
  children?: any
}

interface IStep {
  children: React.ReactNode
}

interface IChild {
  props: {
    index: number
    disabled: boolean
  }
}

let step: any = []

const Stepper = ({
  steps,
  cancelFn,
  finishFn,
  children,
  setCurrentStep,
  currentStep
}: Props) => {
  const [ren, setRen] = useState<number>(0)
  const [pos, setPos] = useState<number>(currentStep)
  const [dis, setDis] = useState<boolean>(false)

  const x = (nexpos = currentStep) => {
    setCurrentStep(nexpos)
    children.forEach((child: IChild) => {
      if (child.props.index === nexpos) {
        setDis(child.props.disabled)
      }
    })
  }

  useEffect(() => {
    step = []
    for (let i = 0; i < steps; i++) {
      step.push(i + 1)
    }
    setRen(ren + 1)
    x()
  }, [])

  useEffect(() => {
    setPos(currentStep)
    x()
  }, [])

  const renderSteps: Function = () => {
    return (
      <Container>
        {step.map((s: number) => {
          return s === pos ? (
            <React.Fragment key={s}>
              <Current>{s}</Current>
              {s !== steps ? <Line /> : null}
            </React.Fragment>
          ) : s > pos ? (
            <React.Fragment key={s}>
              <Rest key={s}>{s}</Rest>
              {s !== steps ? <Line /> : null}
            </React.Fragment>
          ) : (
            <React.Fragment key={s}>
              <Done key={s}>
                <Check />
              </Done>
              {s !== steps ? <Line /> : null}
            </React.Fragment>
          )
        })}
      </Container>
    )
  }

  const renderPageNumber: Function = () => {
    return typeof children !== 'undefined' && children instanceof Array
      ? children.find(child => child.props.index === pos)
      : children.props.index === pos && children
  }

  const renderButton: Function = () => {
    return (
      <>
        <BtnCont>
          {pos === 1 ? (
            <NormalBtn onClick={cancelFn}>
              <CancelText>cancel</CancelText>
            </NormalBtn>
          ) : (
            <NormalBtn
              onClick={() => {
                setPos(pos - 1)
                x(pos - 1)
              }}
            >
              <BackText>
                <NavigateBefore />
                back
              </BackText>
            </NormalBtn>
          )}
          {dis ? (
            <>
              {pos !== steps ? (
                <NormalBtn data-cy="next-btn" disabled>
                  <DisText>
                    next
                    <NavigateNext />
                  </DisText>
                </NormalBtn>
              ) : (
                <NormalBtn data-cy="finish-btn" disabled>
                  <DisText>finish & save</DisText>
                </NormalBtn>
              )}
            </>
          ) : (
            <>
              {pos !== steps ? (
                <Next
                  data-cy="next-btn"
                  onClick={() => {
                    setPos(pos + 1)
                    x(pos + 1)
                  }}
                >
                  <NextText>
                    next
                    <NavigateNext />
                  </NextText>
                </Next>
              ) : (
                <Finish data-cy="finish-btn" onClick={finishFn}>
                  <FinishText>finish & save</FinishText>
                </Finish>
              )}
            </>
          )}
        </BtnCont>
      </>
    )
  }

  return (
    ren === 1 && (
      <div key={ren}>
        {renderSteps()}
        {renderPageNumber()}
        {renderButton()}
      </div>
    )
  )
}

const Step: React.FC<IStep> = ({ children }) => {
  return <div>{children}</div>
}

Stepper.defaultProps = {
  steps: 0,
  cancelFn: () => {},
  finishFn: () => {},
  setCurrentStep: null,
  currentStep: 0,
  children: null
} as Partial<Props>

Step.defaultProps = {
  children: null
} as Partial<IStep>

export { Stepper, Step }
