export const USER_ACTION = "USER_ACTION";

export const userIsActive = () => {

  return (dispatch).then(() => {
        dispatch({ type: USER_ACTION, payload: {isActive : false} });
      })
      .catch((err) => console.log(err));
  };


