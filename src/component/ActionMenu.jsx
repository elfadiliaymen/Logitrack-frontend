import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ActionMenu({ options }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleItemClick(option) {
    handleClose();
    option.onClick();
  }

  return (
    <div>
      <IconButton
        aria-label="actions"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map(function (option) {
          return (
            <MenuItem
              key={option.label}
              onClick={function () {
                handleItemClick(option);
              }}
            >
              {option.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
