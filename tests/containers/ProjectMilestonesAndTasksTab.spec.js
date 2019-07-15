import "jsdom-global/register";
import React from "react";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import enzyme from "../enzyme";

import ProjectMilestonesAndTasksTab from "../../client/containers/ProjectDetailPage/ProjectMilestonesAndTasksTab";

import mockStore from "../mockStore";

chai.use(chaiEnzyme());

const { mount } = enzyme;

describe("ProjectMilestonesAndTasksTab", () => {
  const props = {
    data: {
      ...{ ...mockStore.dashboardData.projectDetail.milestonesAndTasks }
    }
  };
  const wrapper = mount(<ProjectMilestonesAndTasksTab {...props} />);
  it("renders successfully", () => {
    expect(wrapper).to.be.present();
  });
  it("renders the correct number of the project's milestones", () => {
    expect(wrapper.find("ExpansionPanel")).to.have.length(props.data.milestones.length);
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
  it("renders the first milestone correctly", () => {
    const firstMilestone = props.data.milestones[0];
    const firstMilestoneWrapper = wrapper.find("ExpansionPanel").first();
    expect(
      firstMilestoneWrapper
        .find("ExpansionPanelSummary")
        .find(".milestone-data")
        .map(node => node.text())
    ).to.deep.equal([
      firstMilestone.name,
      firstMilestone.deadline || "N/A",
      firstMilestone.tasksCompleted
    ]);
    firstMilestone.tasks.forEach((task, index) => {
      expect(
        firstMilestoneWrapper
          .find("ExpansionPanelDetails")
          .find(".taskRow")
          .at(index)
          .children("div")
          .map(taskNode => taskNode.text())
      ).to.deep.equal([task.name, task.assignee || "N/A", task.completeDay || "N/A"]);
    });
  });
  it("renders the contribution chart", () => {
    expect(wrapper.find("HighchartsChart")).to.be.present();
  });
});
