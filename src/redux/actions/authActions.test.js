import {loginUserSucess, loginUserFailure} from './authActions'

describe('>>>A C T I O N --- Test loginUserSucess', () => {
    it('+++ actionCreator loginUserSucess', () => {
        const loginSucess = loginUserSucess('Luke Stywalker')
        expect(loginSucess).toEqual({type: "LOGIN_USER_SUCCESS", payload: 'Luke Stywalker'})
    });
    it('+++ actionCreator loginUserFailure', () => {
        const loginFailure = loginUserFailure('')
        expect(loginFailure).toEqual({type: "LOGIN_USER_FAILURE", payload: ''})
    });
});