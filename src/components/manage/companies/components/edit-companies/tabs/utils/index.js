function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateWebsite(url) {
  var pattern = /^(https[s]?:\/\/){1,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/; //eslint-disable-line
  return pattern.test(url);
}

export { validateEmail, validateWebsite };
