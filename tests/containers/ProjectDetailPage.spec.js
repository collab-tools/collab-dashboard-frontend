import "jsdom-global/register";
import React from "react";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import enzyme from "../enzyme";
import sinon from "sinon";

import { ProjectDetailPage } from "../../client/containers/ProjectDetailPage";

chai.use(chaiEnzyme());

const { shallow } = enzyme;

describe("ProjectDetailPage", () => {
  const fetchDataStub = sinon.stub(ProjectDetailPage.prototype, "_fetchData");
  const props = {
    projectDetail: {}
  };
  const wrapper = shallow(<ProjectDetailPage {...props} />);
  it("renders successfully", () => {
    expect(wrapper).to.be.present();
  });
  it("renders the Overview tab initially", () => {
    expect(wrapper.find("OverviewTab")).to.be.present();
  });
  it("renders the Tasks tab when switching to next tab", () => {
    wrapper.setState({ currTab: 1 });
    expect(wrapper.find("MilestonesAndTasksTab")).to.be.present();
  });
  it("renders the Github tab when switching to next tab", () => {
    wrapper.setState({ currTab: 2 });
    expect(wrapper.find("GithubTab")).to.be.present();
  });
  it("renders the Files tab when switching to next tab", () => {
    wrapper.setState({ currTab: 3 });
    expect(wrapper.find("FilesTab")).to.be.present();
  });
  it("calls the _fetchData method once after mounting", () => {
    expect(fetchDataStub.calledOnce).to.be.true;
  });
});
