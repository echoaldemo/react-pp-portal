import React from "react";
import { Save, SaveText, DisSave, DisText } from "../styles";
/**
 * ==============================================================================
 * <SaveButton />
 * ------------------------------------------------------------------------------
 * @param {boolean}   disabled       Button disabled ? (true,false)
 * @param {Function}  handleClick    Triggers OnClick Event
 * @return {ReactElement}
 * ==============================================================================
 */

interface Props {
	disabled?: boolean;
	children: React.ReactNode;
	style?: any;
	onClick?: any;
	handleClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
	type?: any
}

const defaultProps = {
	disabled: false,
	children: "",
	handleClick: () => console.log("saving...")
};

const SaveButton: React.FC<Props> = ({
	disabled,
	children,
	handleClick,
	...rest
}) => {
	const renderDisabled: Function = () => {
		return (
			<>
				<DisSave disabled={disabled} onClick={handleClick} {...rest}>
					<DisText>{children}</DisText>
				</DisSave>
			</>
		);
	};

	const renderSave: Function = () => {
		return (
			<>
				<Save disabled={disabled} onClick={handleClick} {...rest}>
					<SaveText>{children}</SaveText>
				</Save>
			</>
		);
	};

	return disabled ? renderDisabled() : renderSave();
};

SaveButton.defaultProps = defaultProps as Partial<Props>;

export default SaveButton;
