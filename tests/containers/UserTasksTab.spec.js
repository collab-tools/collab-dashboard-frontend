import "jsdom-global/register";
import React from "react";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import enzyme from "../enzyme";

import UserTasksTab from "../../client/containers/UserDetailPage/UserTasksTab";

import mockStore from "../mockStore";

chai.use(chaiEnzyme());

const { mount } = enzyme;

describe("UserTasksTab", () => {
  const props = {
    data: {
      ...{ ...mockStore.dashboardData.userDetail.tasks }
    }
  };
  const wrapper = mount(<UserTasksTab {...props} />);
  it("renders successfully", () => {
    expect(wrapper).to.be.present();
  });
  it("renders the correct number of the user's projects", () => {
    expect(wrapper.find("ExpansionPanel")).to.have.length(props.data.projects.length);
  });
  it("renders a panel collapsed initially; expands the panel upon selecting", () => {
    const beforeWrapper = wrapper
      .find("ExpansionPanel")
      .first()
      .find("ExpansionPanelSummary");
    expect(beforeWrapper.prop("expanded")).to.be.false;
    beforeWrapper.simulate("click");
    const afterWrapper = wrapper
      .find("ExpansionPanel")
      .first()
      .find("ExpansionPanelSummary");
    expect(afterWrapper.prop("expanded")).to.be.true;
  });
  it("renders the first project correctly", () => {
    const firstProject = props.data.projects[0];
    const firstProjectWrapper = wrapper.find("ExpansionPanel").first();
    expect(firstProjectWrapper.find("ExpansionPanelSummary").text()).to.equal(firstProject.project);
    firstProject.tasks.forEach((task, index) => {
      expect(
        firstProjectWrapper
          .find("ExpansionPanelDetails")
          .find(".taskRow")
          .at(index)
          .children("div")
          .map(taskNode => taskNode.text())
      ).to.deep.equal([task.name, task.deadline || "N/A", task.completeDay || "N/A"]);
    });
  });
  it("renders the contribution chart", () => {
    expect(wrapper.find("HighchartsChart")).to.be.present();
  });
});
