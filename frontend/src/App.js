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
        currentEmail = this.state.currentEmail
          ? this.state.currentEmail
          : rowData.email;
        currentPhone = this.state.currentPhone
          ? this.state.currentPhone
          : rowData.phone;

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

  updateRow = async (e, rowData) => {
    let phone = this.state.newPhone || this.state.currentPhone;
    let email = this.state.newEmail || this.state.currentEmail;
    phone = typeof phone === "string" ? phone : "";
    email = typeof email === "string" ? email : "";

    if (
      (phone && !this.validatePhone(phone)) ||
      (email && !this.validateEmail(email))
    ) {
      return alert("Please enter valid phone and email");
    }

    const updatedRow = {
      userId: rowData.id,
      phone,
      email
    };

    const { data } = await axios.post("http://localhost:5000", updatedRow);
    const newRows = this.state.users.map(row => {
      if (row.id === rowData.id) {
        return {
          id: data[0].id,
          name: data[0].name,
          phone: data[0].phone,
          email: data[0].email,
          tableData: row.tableData
        };
      } else {
        return row;
      }
    });

    this.setState({
      users: newRows,
      newPhone: "",
      newEmail: "",
      currentPhone: "",
      currentEmail: ""
    });
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  validatePhone = phone => {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(phone);
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
