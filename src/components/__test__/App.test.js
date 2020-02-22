import React from 'react';
import renderer from 'react-test-renderer';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';

configure({ adapter: new Adapter() });

describe('>>>A P P --- Render REACT COMPONENTS',()=>{
    let wrapper

    beforeEach(()=>{
        wrapper = mount(<App/>)

    })

    it('+++ render the App component', () => {
        expect(wrapper.length).toEqual(1)
    });

    it('+++ < App /> renders correctly', () => {
        const renderedValue =  renderer.create(<App/>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

});