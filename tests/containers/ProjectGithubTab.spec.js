import "jsdom-global/register";
import React from "react";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import enzyme from "../enzyme";

import ProjectGithubTab from "../../client/containers/ProjectDetailPage/ProjectGithubTab";

import mockStore from "../mockStore";

chai.use(chaiEnzyme());

const { mount } = enzyme;

describe("ProjectGithubTab", () => {
  const props = {
    data: {
      ...{ ...mockStore.dashboardData.projectDetail.github }
    }
  };
  const wrapper = mount(<ProjectGithubTab {...props} />);
  it("renders successfully", () => {
    expect(wrapper).to.be.present();
  });
  it("renders the github link correctly and link is working", () => {
    expect(wrapper.find("a").prop("href")).to.equal(props.data.link);
    expect(
      wrapper
        .find("a")
        .find("div")
        .last()
        .text()
    ).to.equal(props.data.link || "N/A");
  });
  it("renders 3 metric summary items", () => {
    expect(wrapper.find("MetricsRow").find("Paper")).to.have.length(3);
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
  it("renders the correct number of commits", () => {
    expect(
      wrapper
        .find("PaginationTable")
        .find("TablePagination")
        .prop("count")
    ).to.equal(props.data.commits.length);
  });
  it("renders the first commit correctly", () => {
    if (props.data.commits.length) {
      const firstCommit = props.data.commits[0];
      const firstCommitWrapper = wrapper
        .find("PaginationTable")
        .find("TableBody")
        .find("TableRow")
        .first();
      expect(firstCommitWrapper.find("TableCell").map(cell => cell.text())).to.deep.equal([
        firstCommit.author,
        firstCommit.message,
        firstCommit.timestamp
      ]);
    }
  });
  it("renders the contribution charts", () => {
    expect(wrapper.find("HighchartsChart")).to.have.length(2);
  });
});
