import { FIRESTORE } from '../../constants/constant';

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

export const getAllForms = uid => {
  return dispatch => {
    dispatch({ type: "START_LOADING" });
    FIRESTORE
      .collection('allforms')
      .doc(uid)
      .collection('form')
      .onSnapshot(snap => {
        let arr = []
        if (snap.empty) {
          dispatch(allforms(arr))
          dispatch({ type: "STOP_LOADING" });
          return;
        }
        snap.forEach(snapshot => {
          arr.push({
            ...snapshot.data(),
            id: snapshot.id,
          })
        })
        dispatch(allforms(arr));
        dispatch({ type: "STOP_LOADING" });
      })
  }
}

export const allforms = allForms => {
  return {
    type: "ALL_FORMS",
    allForms
  };
};