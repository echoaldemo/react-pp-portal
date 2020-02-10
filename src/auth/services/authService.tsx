// Make your function for auths here

function loginChecker() {
  if (localStorage.getItem("ngStorage-ppToken") !== null) {
    return true;
  } else {
    return false;
  }
}

// Function for authentication

// Note: This function will be used in `ManageRoute.tsx` and `GatewayRoute.tsx`
function isAuth() {
  return true;
}

export { loginChecker, isAuth };
