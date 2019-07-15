import "jsdom-global/register";
import React from "react";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import enzyme from "../enzyme";
import sinon from "sinon";
import PaginationTable from "../../client/components/PaginationTable";

chai.use(chaiEnzyme());
const { shallow, mount } = enzyme;

describe("PaginationTable.js", function() {
  const rows = [
    { name: "Abc Def", email: "abc@def.com", github_login: "abc_def", date_created: "1 Jan 2019" },
    { name: "Ghi Jkl", email: "ghi@jkl.com", github_login: "ghi_jki", date_created: "1 Jan 2019" },
    { name: "Mno Pqr", email: "mno@pqr.com", github_login: "mno_pqr", date_created: "1 Jan 2019" },
    { name: "Abc Pqr", email: "abc@pqr.com", github_login: "abc_pqr", date_created: "1 Jan 2019" },
    { name: "Ghi Def", email: "ghi@def.com", github_login: "ghi_def", date_created: "1 Jan 2019" },
    { name: "Ghi Pqr", email: "ghi@pqr.com", github_login: "ghi_pqr", date_created: "1 Jan 2019" },
    { name: "Abc Jkl", email: "abc@jkl.com", github_login: "abc_jkl", date_created: "1 Jan 2019" },
    { name: "Xyz Def", email: "xyz@def.com", github_login: "xyz_def", date_created: "1 Jan 2019" },
    { name: "Mno Def", email: "mno@def.com", github_login: "mno_def", date_created: "1 Jan 2019" },
    { name: "Xyz Pqr", email: "xyz@pqr.com", github_login: "xyz_pqr", date_created: "1 Jan 2019" },
    { name: "Xyz Jkl", email: "xyz@jkl.com", github_login: "xyz_jkl", date_created: "1 Jan 2019" }
  ];
  const headers = ["Name", "Email", "Github", "Created On"];
  const rowItems = ["name", "email", "github_login", "date_created"];
  const searchableItems = ["name", "email", "github_login"];
  const onRowClicked = sinon.spy();
  const customProps = { rows, headers, rowItems, searchableItems, onRowClicked };

  describe("when rendering with no props", () => {
    const wrapper = mount(<PaginationTable />);
    it("renders successfully", () => {
      expect(wrapper).to.be.present();
    });
    it("renders no row for headers", () => {
      expect(wrapper.find("TableHead").find("TableRow")).to.not.exist;
    });
    it("renders an empty cell in body", () => {
      expect(wrapper.find("TableBody").find("TableCell")).to.have.length(1);
      expect(
        wrapper
          .find("TableBody")
          .find("TableCell")
          .first()
      ).to.have.text("");
    });
  });
  describe("when rendering with no rows and all other props", () => {
    const wrapper = mount(<PaginationTable {...{ ...customProps, rows: [] }} />);
    it("renders successfully", () => {
      expect(wrapper).to.be.present();
    });
    it("renders a table headers row", () => {
      expect(wrapper.find("TableHead").find("TableRow")).to.be.present();
    });
    it("renders the correct number of headers", () => {
      expect(wrapper.find("TableHead").find("TableCell")).to.have.length(headers.length);
    });
    it("renders an empty cell in body", () => {
      expect(wrapper.find("TableBody").find("TableCell")).to.have.length(1);
      expect(
        wrapper
          .find("TableBody")
          .find("TableCell")
          .first()
      ).to.have.text("");
    });
  });
  describe("when rendering with multiple rows and all props", () => {
    const wrapper = mount(<PaginationTable {...customProps} />);
    it("has the correct initial state", () => {
      const expectedState = {
        page: 0,
        rowsPerPage: 5,
        searchText: ""
      };
      expect(wrapper.state()).to.deep.equal(expectedState);
    });
    it("renders a table headers row", () => {
      expect(wrapper.find("TableHead").find("TableRow")).to.be.present();
    });
    it("renders the correct number of headers", () => {
      expect(wrapper.find("TableHead").find("TableCell")).to.have.length(headers.length);
    });
    it("renders the first header correctly", () => {
      expect(
        wrapper
          .find("TableHead")
          .find("TableCell")
          .first()
      ).to.have.text(headers[0]);
    });
    it("renders a non-empty table body", () => {
      expect(wrapper.find("TableBody").exists("TableRow")).to.be.true;
    });
    it("renders the correct number of rows in body", () => {
      const rowsPerPage = wrapper.state("rowsPerPage");
      expect(wrapper.find("TableBody").find("TableRow")).to.have.length(rowsPerPage);
    });
    it("renders the first row correctly", () => {
      const firstRow = wrapper
        .find("TableBody")
        .find("TableRow")
        .first()
        .find("TableCell")
        .map(cell => cell.text());
      expect(firstRow[0]).to.equal(rows[0].name);
      expect(firstRow[1]).to.equal(rows[0].email);
      expect(firstRow[2]).to.equal(rows[0].github_login);
      expect(firstRow[3]).to.equal(rows[0].date_created);
    });
    it("triggers a callback when a table row is clicked", () => {
      wrapper
        .find("TableBody")
        .find("TableRow")
        .first()
        .simulate("click");
      expect(onRowClicked.calledOnce).to.be.true;
    });
    it("renders a search input in the footer", () => {
      expect(wrapper.find("TableFooter").find("Input")).to.have.length(1);
    });
    it("renders pagination options in the footer", () => {
      expect(wrapper.find("TableFooter").find("TablePagination")).to.be.present();
    });
  });
  describe("when changing pagination options", () => {
    const wrapper = mount(<PaginationTable {...customProps} />);
    let row;
    let firstRowIndex;
    const { rowsPerPage } = wrapper.state();
    const firstRow = () =>
      wrapper
        .find("TableBody")
        .find("TableRow")
        .first()
        .find("TableCell")
        .map(cell => cell.text());
    it("changes number of rows per page correctly", () => {
      const newRowsPerPage = 10;
      wrapper
        .find("TableFooter")
        .find("TablePagination")
        .find("select")
        .simulate("change", { target: { value: newRowsPerPage } });
      expect(wrapper.state("rowsPerPage")).to.equal(newRowsPerPage);
      expect(wrapper.state("page")).to.equal(0);
      expect(wrapper.find("TableBody").find("TableRow")).to.have.length(newRowsPerPage);
      wrapper
        .find("TableFooter")
        .find("TablePagination")
        .find("select")
        .simulate("change", { target: { value: 5 } });
    });
    it("changes page correctly when pressing Next Page button", () => {
      const nextPageBtn = wrapper
        .find("TableFooter")
        .find("TablePagination")
        .find("button[aria-label='Next Page']");

      nextPageBtn.simulate("click");
      row = firstRow();
      firstRowIndex = rowsPerPage;
      expect(row[0]).to.equal(rows[firstRowIndex].name);
      expect(row[1]).to.equal(rows[firstRowIndex].email);
      expect(row[2]).to.equal(rows[firstRowIndex].github_login);
      expect(row[3]).to.equal(rows[firstRowIndex].date_created);
    });
    it("changes page correctly when pressing Previous Page button", () => {
      const prevPageBtn = wrapper
        .find("TableFooter")
        .find("TablePagination")
        .find("button[aria-label='Previous Page']");
      prevPageBtn.simulate("click");
      row = firstRow();
      firstRowIndex = 0;
      expect(row[0]).to.equal(rows[firstRowIndex].name);
      expect(row[1]).to.equal(rows[firstRowIndex].email);
      expect(row[2]).to.equal(rows[firstRowIndex].github_login);
      expect(row[3]).to.equal(rows[firstRowIndex].date_created);
    });
    it("changes page correctly when pressing Last Page button", () => {
      const lastPageBtn = wrapper
        .find("TableFooter")
        .find("TablePagination")
        .find("button[aria-label='Last Page']");
      lastPageBtn.simulate("click");
      row = firstRow();
      firstRowIndex = Math.floor(rows.length / rowsPerPage) * rowsPerPage;
      expect(row[0]).to.equal(rows[firstRowIndex].name);
      expect(row[1]).to.equal(rows[firstRowIndex].email);
      expect(row[2]).to.equal(rows[firstRowIndex].github_login);
      expect(row[3]).to.equal(rows[firstRowIndex].date_created);
    });
    it("changes page correctly when pressing First Page button", () => {
      const firstPageBtn = wrapper
        .find("TableFooter")
        .find("TablePagination")
        .find("button[aria-label='First Page']");
      firstPageBtn.simulate("click");
      row = firstRow();
      firstRowIndex = 0;
      expect(row[0]).to.equal(rows[firstRowIndex].name);
      expect(row[1]).to.equal(rows[firstRowIndex].email);
      expect(row[2]).to.equal(rows[firstRowIndex].github_login);
      expect(row[3]).to.equal(rows[firstRowIndex].date_created);
    });
  });
  describe("when typing in the search box", () => {
    const wrapper = mount(<PaginationTable {...customProps} />);
    const searchTextWithMatch = "abc";
    const searchTextWithNoMatch = "abcde";
    it("displays the correct number of matched results", () => {
      wrapper
        .find("TableFooter")
        .find("Input")
        .find("input")
        .simulate("change", { target: { value: searchTextWithMatch } });
      const filteredRows = rows.filter(row => {
        for (const item of searchableItems) {
          if (row[item].toLowerCase().includes(searchTextWithMatch.toLowerCase())) return true;
        }
        return false;
      });
      expect(wrapper.state("page")).to.equal(0);
      expect(wrapper.find("TableBody").find("TableRow")).to.have.length(filteredRows.length);
    });
    it("displays no result if a search does not match", () => {
      wrapper
        .find("TableFooter")
        .find("Input")
        .find("input")
        .simulate("change", { target: { value: searchTextWithNoMatch } });
      const filteredRows = rows.filter(row => {
        for (const item of searchableItems) {
          if (row[item].toLowerCase().includes(searchTextWithNoMatch.toLowerCase())) return true;
        }
        return false;
      });
      expect(wrapper.state("page")).to.equal(0);
      expect(wrapper.find("TableBody").find("TableRow")).to.have.length(filteredRows.length);
    });
  });
});
