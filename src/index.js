import React, { useState } from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
    },
  },
};
// edit this
function PhoneBookForm(props) {
  const placeHolder = {
    id: null,
    userFirstname: "Coder",
    userLastname: "Byte",
    userPhone: "8885559999",
  };

  const [userInfo, setUserInfo] = useState(placeHolder);

  const handleInfoChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (
      !userInfo.userFirstname ||
      !userInfo.userLastname ||
      !userInfo.userPhone
    )
      return;
    props.addNewUser(userInfo);
    setUserInfo(placeHolder);
  };

  return (
    <form onSubmit={handleUserSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        value={userInfo.userFirstname}
        onChange={handleInfoChange}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        value={userInfo.userLastname}
        onChange={handleInfoChange}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="text"
        value={userInfo.userPhone}
        onChange={handleInfoChange}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}

//edit this
function InformationTable(props) {
  const sortContacts = props.users.sort((a, b) =>
    a.userLastname.localeCompare(b.userLastname)
  );

  const displayContacts =
    sortContacts.length > 0 ? (
      sortContacts.map((user, index) => (
        <tr key={index}>
          <td style={style.tableCell}>{user.userFirstname}</td>
          <td style={style.tableCell}>{user.userLastname}</td>
          <td style={style.tableCell}>{user.userPhone}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={3}>&nbsp;</td>
      </tr>
    );

  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>{displayContacts}</tbody>
    </table>
  );
}
function Application(props) {
  const usersArr = [];
  const [users, setUsers] = useState(usersArr);

  const addNewUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };
  return (
    <section>
      <PhoneBookForm addNewUser={addNewUser} />
      <InformationTable users={users} />
    </section>
  );
}
ReactDOM.render(<Application />, document.getElementById("root"));