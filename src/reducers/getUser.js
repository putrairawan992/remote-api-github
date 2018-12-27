import * as Actions from '../actions/actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    user: [],
    repo: [],
    picture:'',
    name:'',
    type_page:'all'
});

export function getUser(state = initialState, action = null) {
    switch (action.type) {
        case Actions.GET_ALL_USER:
            return state.merge({
                user: action.user
            });
        case Actions.GET_USER_REPO:
            return state.merge({
                repo: action.repo
            });
        case Actions.GET_USER_DETAIL:
            return state.merge({
                picture: action.picture,
                name: action.name
            });
        case Actions.GET_TYPE:
            return state.merge({
                type_page: action.type_page
            });
        default:
            return state;
    }
}
