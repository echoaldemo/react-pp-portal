import React from 'react'
import { Dialog } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import * as Styled from './style'

interface Props {
	open: boolean
	qty?: number
	subtitle?: string
	text?: string
	btnText?: string
	closeFn: () => void
	btnFn: () => void
	user?: boolean
	warning?: boolean
}

const SuccessModal: React.FC<Props> = ({
	open,
	qty,
	subtitle,
	text,
	btnText,
	closeFn,
	btnFn,
	user,
	warning
}) => {
	return (
		<Dialog open={open}>
			{user ? (
				<Styled.Center data-cy="success-modal">
					<Styled.Card>
						<Styled.CloseIconCont>
							<Styled.CloseIcon onClick={closeFn} />
						</Styled.CloseIconCont>
						<Styled.CheckIcon />
						<Styled.Great>¡GREAT JOB!</Styled.Great>
						<Styled.Text>{text}</Styled.Text>
						<Styled.P>
							Don't forget to give the new user their password!
            </Styled.P>
						<Styled.BtnCont>
							<Styled.NewUserBtn onClick={btnFn}>
								<Styled.NewUserText>
									<Add style={{ width: 18, marginRight: 4 }} /> New User
                </Styled.NewUserText>
							</Styled.NewUserBtn>
							<Styled.BtnFn onClick={closeFn}>
								<Styled.BtnText>GOT IT!</Styled.BtnText>
							</Styled.BtnFn>
						</Styled.BtnCont>
					</Styled.Card>
				</Styled.Center>
			) : (
					<Styled.Center data-cy="success-modal">
						<Styled.Card>
							<Styled.CloseIconCont>
								<Styled.CloseIcon onClick={closeFn} />
							</Styled.CloseIconCont>
							{warning ? <Styled.WarningIcon /> : <Styled.CheckIcon />}
							<Styled.Text>{text}</Styled.Text>
							{qty ? (
								<Styled.P>
									You have purchased <b>{qty} DIDS</b>. {subtitle}
								</Styled.P>
							) : warning ? (
								<Styled.P />
							) : (
										<Styled.P>What do you want to do next?</Styled.P>
									)}
							<Styled.BtnCont>
								<Styled.CloseBtn onClick={closeFn}>
									<Styled.CloseText>
										{warning ? 'Cancel' : 'Close'}
									</Styled.CloseText>
								</Styled.CloseBtn>
								{btnFn || btnText ? (
									<Styled.BtnFn onClick={btnFn}>
										<Styled.BtnText>{btnText}</Styled.BtnText>
									</Styled.BtnFn>
								) : null}
							</Styled.BtnCont>
						</Styled.Card>
					</Styled.Center>
				)}
		</Dialog>
	)
}

SuccessModal.defaultProps = {
	open: false,
	subtitle: '',
	text: '',
	btnText: '',
	user: false,
	warning: false
} as Partial<Props>

export { SuccessModal }
