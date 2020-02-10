const handleInput: any = (e: any, state: any, setState: any) => {
  setState({ ...state });
  if (e.target.id === "new_password") {
    setState({
      ...state,
      [e.target.id]: e.target.value,
      error: {
        ...state.error,
        new:
          e.target.value.length === 0
            ? "New password required"
            : !e.target.value.match(/[a-z]/)
            ? "Password must be alphanumeric"
            : e.target.value.length < 10
            ? "Password must be at least 10 characters long"
            : !/\d/.test(e.target.value)
            ? "Password must contain at lease 1 digit"
            : ""
      }
    });
  } else if (e.target.id === "re_new_password") {
    setState({
      ...state,
      [e.target.id]: e.target.value,
      error: {
        ...state.error,
        re:
          e.target.value.length === 0
            ? "Please re-enter your new password"
            : e.target.value !== state.new_password
            ? "Passwords must match"
            : ""
      }
    });
  } else if (e.target.id === "current_password") {
    setState({
      ...state,
      [e.target.id]: e.target.value,
      error: {
        ...state.error,
        current:
          e.target.value.length === 0
            ? "Current password required"
            : e.target.value.length < 10
            ? "Password must be at least 10 characters long"
            : !/\d/.test(e.target.value)
            ? "Password must contain at lease 1 digit"
            : ""
      }
    });
  }
};

export default handleInput;
