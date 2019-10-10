const INITIAL_STATE = { loading: false, };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true };
    case "STOP_LOADING":
      return { ...state, loading: false };
    case "UID":
      return { ...state, uid: action.uid }
    case "USER":
      return { ...state, user: action.user }
    default:
      return state;
  }
}