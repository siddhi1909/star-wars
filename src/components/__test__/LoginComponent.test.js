// IMPORT EXTERNAL LIBRARIES/MODULES
import React from 'react';
import {Provider} from "react-redux";
import renderer from 'react-test-renderer';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
// IMPORT API & ROUTE ACTIONS
import store from "../../redux/store";
import ConnectedLoginComponent, {LoginComponent} from '../LoginComponent';
import {loginUserSucess} from '../../redux/actions/authActions';

configure({adapter: new Adapter()});

describe('>>>LOGIN --- REACT-REDUX (Mount + wrapping in < Provider >', () => {
    const initialState = {currentUser:'Luke Stywalker'}
    const mockStore = configureStore()
    let component, stores;

    beforeEach(()=>{
        stores = mockStore(initialState)
        component = mount(<Provider store={store}><ConnectedLoginComponent/></Provider>);
    })

    it('+++ render < LoginComponent /> component correctly', () => {
        const renderedValue =  renderer.create(<Provider store={store}><ConnectedLoginComponent/></Provider>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

    it('+++ render the connected(SMART) component', () => {
        expect(component.find(ConnectedLoginComponent).length).toEqual(1)
    });

    it('+++ check action on dispatching ', () => {
        let action;        
        stores.dispatch(loginUserSucess('Luke Stywalker'))
        action = stores.getActions()
        expect(action[0].type).toBe('LOGIN_USER_SUCCESS')
    });

    it('should have a btn component', () => {
        //There should be only one button
        expect(component.find('form')).toHaveLength(1);

        //Button should have matching text
        expect(component.find('button').text()).toEqual('Sign in');
    });

    it('should have input for email and password', () => {
        //Email and password input field should be present
        expect(component.find('input#username')).toHaveLength(1);
        expect(component.find('input#password')).toHaveLength(1);
    });
    
    it('should have an empty email and password state var', () => {
        //Optionally test to check if password and email are empty strings on setup
        expect(component.find(LoginComponent).state('username')).toEqual('');
        expect(component.find(LoginComponent).state('password')).toEqual('');
    });

});