const INITIAL_STATE = { loading: false, };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true };
    case "STOP_LOADING":
      return { ...state, loading: false };
    case "USER_UID":
      return { ...state, id: action.id }
    case "USER_DATA":
      return { ...state, userData: action.userData }
    default:
      return state;
  }
}