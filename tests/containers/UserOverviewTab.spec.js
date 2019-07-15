import "jsdom-global/register";
import React from "react";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import enzyme from "../enzyme";

import UserOverviewTab from "../../client/containers/UserDetailPage/UserOverviewTab";

import mockStore from "../mockStore";

chai.use(chaiEnzyme());

const { mount } = enzyme;

describe("UserOverviewTab", () => {
  const props = {
    data: {
      ...{ ...mockStore.dashboardData.userDetail.overview },
      name: mockStore.dashboardData.userDetail.name
    }
  };
  const wrapper = mount(<UserOverviewTab {...props} />);
  it("renders successfully", () => {
    expect(wrapper).to.be.present();
  });
  it("renders 6 metric summary items", () => {
    expect(wrapper.find("MetricsRow").find("Paper")).to.have.length(6);
  });
  it("renders the summary metrics correctly", () => {
    const metrics = wrapper
      .find("MetricsRow")
      .find("Paper")
      .find("h1")
      .map(node => parseInt(node.text(), 10));
    const expectedMetrics = [];
    for (const metric in props.data.summary) {
      expectedMetrics.push(props.data.summary[metric]);
    }
    expect(metrics).to.deep.equal(expectedMetrics);
  });
  it("renders the correct number of the user's projects", () => {
    expect(wrapper.find(".projects").find("Card")).to.have.length(props.data.projects.length);
  });
  it("renders the first project correctly", () => {
    const firstProject = props.data.projects[0];
    const firstProjectWrapper = wrapper
      .find(".projects")
      .find("Card")
      .first();
    expect(
      firstProjectWrapper
        .find("CardHeader")
        .find("Typography[variant='headline']")
        .text()
    ).to.equal(firstProject.name);
    expect(
      firstProjectWrapper
        .find("CardHeader")
        .find("Typography[variant='body1']")
        .text()
    ).to.equal("created on " + firstProject.dateCreated);
    expect(
      firstProjectWrapper
        .find("CardContent")
        .find(".project-metrics-data")
        .map(data => data.text())
    ).to.deep.equal(firstProject.metrics.map(metric => metric.data.toString()));
  });
  it("renders the correct number of activities", () => {
    expect(wrapper.find("List").find("ListItem")).to.have.length(props.data.activities.length);
  });
  it("renders the first activity correctly", () => {
    const firstActivity = props.data.activities[0];
    const firstActivityWrapper = wrapper
      .find("List")
      .find("ListItem")
      .first();
    expect(
      firstActivityWrapper
        .find("Typography")
        .first()
        .text()
    ).to.equal(firstActivity.project);
    expect(
      firstActivityWrapper
        .find("Typography")
        .last()
        .find("div")
        .first()
        .text()
    ).to.equal(props.data.name + " " + firstActivity.description);
    expect(
      firstActivityWrapper
        .find("Typography")
        .last()
        .find("div")
        .last()
        .text()
    ).to.equal(firstActivity.timestamp);
  });
  it("renders the links correctly", () => {
    expect(
      wrapper
        .find(".links")
        .find("Paper")
        .first()
        .find("div")
        .last()
        .text()
    ).to.equal(props.data.links.github || "N/A");
    expect(
      wrapper
        .find(".links")
        .find("Paper")
        .last()
        .find("div")
        .last()
        .text()
    ).to.equal(props.data.links.email || "N/A");
  });
});
