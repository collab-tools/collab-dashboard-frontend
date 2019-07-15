import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import enzyme from '../enzyme';
import _404 from '../../client/components/_404'

chai.use(chaiEnzyme());
const {shallow} = enzyme;
/* eslint-disable func-names, prefer-arrow-callback */
describe('_404.js', function () {
  const wrapper = shallow(<_404 />);
  it('renders the correct error code', function () {
    expect(wrapper.find('#_404-page-not-found-text')).to.have.text('404');
  });
  it('renders a link to home page', function () {
    expect(wrapper.find('#_404-home-button')).to.be.present();
  });
});
