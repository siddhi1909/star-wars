// IMPORT EXTERNAL LIBRARIES/MODULES
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// IMPORT COMPONENTS, API & ROUTE ACTIONS
import Dashboard from '../Dashboard';
import store from "../../redux/store";

configure({ adapter: new Adapter() });

describe('>>>D A S H B O A R D --- Render REACT COMPONENTS',()=>{
    let wrapper

    beforeEach(()=>{
        wrapper = mount(<Provider store={store}><Router><Dashboard/></Router></Provider>)
    })

    it('+++ render the App component', () => {
        expect(wrapper.find('Dashboard').length).toEqual(1)
    });

    it('+++ render < Dashboard /> renders correctly', () => {
        const renderedValue =  renderer.create(<Provider store={store}><Router><Dashboard/></Router></Provider>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

});