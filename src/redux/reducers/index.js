const defaultState = {
  email: null,
  recipients: null,
  token: null,
};

const loggedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        recipients: action.payload.recipients,
        token: action.payload.token,
      };
    case "LOG_OUT":
      return defaultState;
    case "CHANGE_RECIPIENTS":
      return {
        ...state,
        recipients: action.payload.recipients,
      };
    default:
      return state;
  }
};

export default loggedReducer;
