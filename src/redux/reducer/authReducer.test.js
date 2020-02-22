import authReducer from './authReducer'

describe('>>>R E D U C E R --- Test authReducer', () => {
    it('+++ reducer for LOGIN_USER_SUCCESS', () => {
        let state = {user: 'Darth Vader'}
        state = authReducer(state, {type: "LOGIN_USER_SUCCESS", payload: 'Darth Vader'})
        expect(state).toEqual({user: 'Darth Vader'})
    });
    it('+++ reducer for LOGIN_USER_FAILURE', () => {
        let state = {user: ''}
        state = authReducer(state, {type: "LOGIN_USER_FAILURE", payload: ''})
        expect(state).toEqual({user: ''})
    });
});