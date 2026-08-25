import "./UserTable.css";

function UserTable({ users, onUserSelect }) {
  const handleRowClick = (user) => {
    onUserSelect(user);
  };

  const handleKeyDown = (event, user) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      onUserSelect(user);
    }
  };

  return (
    <div className="table-container">

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (
            <tr
              key={user.id}
              tabIndex="0"
              role="button"
              aria-label={`View details for ${user.name}`}
              onKeyDown={(event) =>
                handleKeyDown(event, user)
              }
            >

              <td
                onClick={() =>
                  handleRowClick(user)
                }
              >
                {user.name}
              </td>

              <td
                onClick={() =>
                  handleRowClick(user)
                }
              >
                {user.username}
              </td>

              <td
                onClick={() =>
                  handleRowClick(user)
                }
              >
                <a
                  href={`mailto:${user.email}`}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {user.email}
                </a>
              </td>

              <td
                onClick={() =>
                  handleRowClick(user)
                }
              >
                {user.phone}
              </td>

              <td
                onClick={() =>
                  handleRowClick(user)
                }
              >
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {user.website}
                </a>
              </td>

              <td
                onClick={() =>
                  handleRowClick(user)
                }
              >
                {user.company.name}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default UserTable;