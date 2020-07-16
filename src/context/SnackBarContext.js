import React, { Component } from "react";
import SharedSnackbar, { SNACKBAR_TYPES } from "../components/common/snackbar";

export const SharedSnackbarContext = React.createContext();

export class SharedSnackbarProvider extends Component {
	state = {
		message: "",
		isOpen: false,
		type: SNACKBAR_TYPES.SUCCESS
	};

	openSnackbar = (message, type = SNACKBAR_TYPES.SUCCESS) => {
		this.setState({
			type,
			message,
			isOpen: true
		});
	};

	closeSnackbar = () => {
		this.setState({
			message: "",
			isOpen: false
		});
	};

	render() {
		const { children } = this.props;
		const { isOpen, message, type } = this.state;

		return (
			<SharedSnackbarContext.Provider
				value={{
					openSnackbar: this.openSnackbar,
					closeSnackbar: this.closeSnackbar,
					snackbarIsOpen: isOpen,
					message,
					type
				}}
			>
				<SharedSnackbar />
				{children}
			</SharedSnackbarContext.Provider>
		);
	}
}

export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer;

export function withSnackbarContext(Component) {
	return function WrapperComponent(props) {
		return (
			<SharedSnackbarConsumer>
				{state => <Component {...props} context={state} />}
			</SharedSnackbarConsumer>
		);
	};
}
