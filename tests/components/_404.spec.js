import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import _404 from '../../client/components/_404'

chai.use(chaiEnzyme());
/* eslint-disable func-names, prefer-arrow-callback */
describe('_404.js', function () {
  const wrapper = shallow(<_404 />);
  it('renders without explosion', function () {
    expect(wrapper).to.be.present();
  });
});
