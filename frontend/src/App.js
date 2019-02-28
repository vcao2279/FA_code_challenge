import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    newPhone: "",
    newEmail: "",
    currentPhone: "",
    currentEmail: ""
  };

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:5000");
    const rowsData = data.map(row => {
      return {
        id: row.id,
        name: row.name,
        phone: row.phone,
        email: row.email,
        tableData: row.tableData
      };
    });

    this.setState({ users: rowsData });
  }

  changeHandler = async e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editRow = (e, rowData) => {
    const users = [...this.state.users];
    let currentPhone;
    let currentEmail;
    users.forEach(user => {
      if (user.id === rowData.id) {
        currentEmail = rowData.email;
        currentPhone = rowData.phone;

        user.phone = (
          <input
            name="newPhone"
            placeholder="enter phone number"
            onChange={e => this.changeHandler(e, rowData.id)}
          />
        );
        user.email = (
          <input
            name="newEmail"
            placeholder="enter email"
            onChange={e => this.changeHandler(e, rowData.id)}
          />
        );
      }
    });
    this.setState({ users, currentEmail, currentPhone });
  };

  render() {
    return (
      <div className="App">
        <MaterialTable
          columns={[
            {
              title: "Name",
              field: "name"
            },
            {
              title: "Phone Number",
              field: "phone",
              sorting: false,
              render: rowData => rowData.phone
            },
            { title: "Email", field: "email", render: rowData => rowData.email }
          ]}
          data={this.state.users}
          title="Users Table"
          actions={[
            {
              icon: "edit_icon",
              tooltip: "Edit User Info",
              onClick: this.editRow
            },
            {
              icon: "save_icon",
              tooltip: "Save User Info",
              onClick: this.updateRow
            }
          ]}
          options={{
            paging: true,
            pageSize: 20,
            pageSizeOptions: [5, 10, 20, 50, 100],
            sorting: true,
            actionsColumnIndex: -1,
            exportButton: true
          }}
        />
      </div>
    );
  }
}

export default App;
