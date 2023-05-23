import Dropdown from 'react-bootstrap/Dropdown';

function DropdownEditDelete({handleDelete}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Options
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={handleDelete}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownEditDelete;