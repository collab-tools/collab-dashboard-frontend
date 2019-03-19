import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { getAllStaffs } from "../../actions/actions";

import Content from "../../components/Content";
import Section from "../../components/Section";
import Subheading from "../../components/Subheading";
import Card from "../../components/Card";

import moment from "moment";

import Fab from "@material-ui/core/Fab";
import ContentAdd from "@material-ui/icons/Add";

export class StaffsPage extends Component {
  componentWillMount() {
    // load all staffs
    this.props.getAllStaffs();
    console.log(this.props);
  }

  staffsTableCellClicked = (row, column, event) => {
    const staff = this.props.staffs[row];
    this.props.history.push({
      pathname: "/dashboard/staffs/createoredit",
      state: { staff }
    }); // pass in the staff
  };

  buttonClicked = () => {
    this.props.history.push("/dashboard/staffs/createoredit");
  };

  render() {
    const staffs = this.props.staffs || [];
    // TODO: Click to Edit Page
    return (
      <Content id="staffsPage">
        {staffs.length < 1 ? (
          <Section>
            <Subheading>No Staffs Found!</Subheading>
          </Section>
        ) : (
          <div>
            <Section>
              <Subheading>Staffs List</Subheading>
              <Card>
                <Table onCellClick={this.staffsTableCellClicked}>
                  <TableHead displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>Creation Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody displayRowCheckbox={false}>
                    {staffs.map((staff, index) => (
                      <TableRow key={index}>
                        <TableCell>{staff.username}</TableCell>
                        <TableCell>{staff.name}</TableCell>
                        <TableCell>{staff.isAdmin ? "Yes" : "No"}</TableCell>
                        <TableCell>{moment(staff.createdAt).format("DD MMM YYYY")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </Section>
          </div>
        )}

        <Fab style={style} onClick={this.buttonClicked}>
          <ContentAdd />
        </Fab>
      </Content>
    );
  }
}

const style = {
  position: "absolute",
  right: "50px",
  bottom: "50px"
};

const mapStateToProps = (state, ownProps) => ({
  staffs: state.staffs.staffs
});

const mapDispatchToProps = {
  getAllStaffs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffsPage);
