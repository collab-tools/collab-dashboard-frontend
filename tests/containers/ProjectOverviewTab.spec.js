import "jsdom-global/register";
import React from "react";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import enzyme from "../enzyme";

import ProjectOverviewTab from "../../client/containers/ProjectDetailPage/ProjectOverviewTab";

import mockStore from "../mockStore";

chai.use(chaiEnzyme());

const { mount } = enzyme;

describe("UserOverviewTab", () => {
  const props = {
    data: {
      ...{ ...mockStore.dashboardData.projectDetail.overview }
    }
  };
  const wrapper = mount(<ProjectOverviewTab {...props} />);
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
  it("renders the correct number of the project's members", () => {
    expect(wrapper.find(".members").find("Card")).to.have.length(props.data.members.length);
  });
  it("renders the first member correctly", () => {
    const firstMember = props.data.members[0];
    const firstMemberWrapper = wrapper
      .find(".members")
      .find("Card")
      .first();
    expect(
      firstMemberWrapper
        .find("CardHeader")
        .find("CardMedia")
        .prop("image")
    ).to.equal(firstMember.image);
    expect(
      firstMemberWrapper
        .find("CardHeader")
        .find("Typography")
        .first()
        .text()
    ).to.equal(firstMember.name);
    expect(
      firstMemberWrapper
        .find("CardHeader")
        .find("Typography")
        .last()
        .text()
    ).to.equal(firstMember.email);
    expect(
      firstMemberWrapper
        .find("CardContent")
        .find(".user-metrics-data")
        .map(data => data.text())
    ).to.deep.equal(firstMember.metrics.map(metric => metric.data.toString()));
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
    ).to.equal(firstActivity.name);
    expect(
      firstActivityWrapper
        .find("Typography")
        .last()
        .find("div")
        .first()
        .text()
    ).to.equal(firstActivity.description);
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
    ).to.equal(props.data.links.drive || "N/A");
  });
});
