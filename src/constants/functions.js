import { EMAIL_REGEX } from "./regexes";

export const validateEmail = email => {
  var re = EMAIL_REGEX;
  return re.test(email);
};