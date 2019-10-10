export const user = user => {
  return {
    type: "USER",
    user
  };
};

export const uid = uid => {
  return {
    type: "UID",
    uid
  };
};