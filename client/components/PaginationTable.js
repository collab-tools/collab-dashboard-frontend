import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";

const styles = {
  tableContainer: {
    padding: "10px"
  },
  tableRow: {
    cursor: "pointer"
  },
  paginationButtonsContainer: {
    display: "flex"
  }
};

class TablePaginationActions extends Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { count, page, rowsPerPage } = this.props;

    return (
      <div style={styles.paginationButtonsContainer}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    );
  }
}

export default class PaginationTable extends Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    searchText: ""
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangeSearchText = event => {
    this.setState({ page: 0, searchText: event.target.value });
  };

  render() {
    const { rows, headers, rowItems, searchableItems, onRowClicked = () => {} } = this.props;
    const { rowsPerPage, page, searchText } = this.state;
    const emptyRows =
      rowsPerPage - (rows ? Math.min(rowsPerPage, rows.length - page * rowsPerPage) : 0);
    const filteredRows = rows
      ? rows.filter(row => {
          for (const item of searchableItems) {
            if (row[item].toLowerCase().includes(searchText.toLowerCase())) return true;
          }
          return false;
        })
      : [];
    return (
      <Paper elevation={0} style={styles.tableContainer}>
        <Table>
          <TableHead>
            {headers && (
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
                  style={styles.tableRow}
                  hover={onRowClicked !== undefined}
                  onClick={() => onRowClicked(row)}
                >
                  {rowItems.map((item, index) => (
                    <TableCell key={index}>{row[item]}</TableCell>
                  ))}
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <FormControl>
                  <Input
                    id="searchbox"
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={this.handleChangeSearchText}
                    startAdornment={
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </TableCell>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={headers ? headers.length - 1 : 1}
                count={rows ? rows.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}
