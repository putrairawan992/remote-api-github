import * as Actions from '../actions/actions';
import * as Api from '../middleware/api';

export function getUserAction(params) {
  return (dispatch) => {
    return Api.getUser(params)
    .then((response) => {
      dispatch({
        type: Actions.GET_ALL_USER,
        user: response.body
      });
    }, (err) => {
      throw err;
    });
  };
}

export function getCountRepo(params) {
  return (dispatch) => {
    return Api.getCountRepo(params)
    .then((response) => {
      dispatch({
        type: Actions.GET_USER_REPO,
        repo: response.body
      });
    }, (err) => {
      throw err;
    });
  };
}

export function getUserDetail(picture,name) {
  return (dispatch) => {
      dispatch({
        type: Actions.GET_USER_DETAIL,
        picture: picture,
        name: name,
      })
    , (err) => {
      throw err;
    };
  };
}

export function getType(type_page) {
  return (dispatch) => {
      dispatch({
        type: Actions.GET_TYPE,
        type_page: type_page
      })
    , (err) => {
      throw err;
    };
  };
}
