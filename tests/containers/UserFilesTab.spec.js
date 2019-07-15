import "jsdom-global/register";
import React from "react";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import enzyme from "../enzyme";

import UserFilesTab from "../../client/containers/UserDetailPage/UserFilesTab";

import mockStore from "../mockStore";

chai.use(chaiEnzyme());

const { mount } = enzyme;

describe("UserFilesTab", () => {
  const props = {
    data: {
      ...{ ...mockStore.dashboardData.userDetail.files }
    }
  };
  const wrapper = mount(<UserFilesTab {...props} />);
  it("renders successfully", () => {
    expect(wrapper).to.be.present();
  });
  it("renders 2 metric summary items", () => {
    expect(wrapper.find("MetricsRow").find("Paper")).to.have.length(2);
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
  it("renders the correct number of file changes", () => {
    expect(
      wrapper
        .find("PaginationTable")
        .find("TablePagination")
        .prop("count")
    ).to.equal(props.data.changes.length);
  });
  it("renders the first file change correctly", () => {
    if (props.data.changes.length) {
      const firstChange = props.data.changes[0];
      const firstChangeWrapper = wrapper
        .find("PaginationTable")
        .find("TableBody")
        .find("TableRow")
        .first();
      expect(firstChangeWrapper.find("TableCell").map(cell => cell.text())).to.deep.equal([
        firstChange.project,
        firstChange.fileName,
        firstChange.timestamp
      ]);
    }
  });
  it("renders the contribution chart", () => {
    expect(wrapper.find("HighchartsChart")).to.be.present();
  });
});
