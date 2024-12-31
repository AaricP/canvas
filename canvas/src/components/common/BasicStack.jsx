import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function BasicStack({
  text,
  height,
  goDelete,
  goEdit,
  goView,
  spacing,
  border,
  title,
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={spacing}>
        <Item
          style={{
            height: `${height}px`,
            paddingTop: "5px",
            paddingLeft: "30px",
            fontSize: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `${border}`,
          }}
        >
          <Link id="aText" to={goView}>
            <ul style={{ listStyle: "none" }}>
              <li style={{ fontWeight: "bold" }}>{title}</li>
              <li>{text}</li>
            </ul>
          </Link>
          <ul style={{ listStyle: "none" }}>
            <li>
              <DeleteIcon id="aDelete" onClick={goDelete}></DeleteIcon>
            </li>
            <li>
              <Link to={goEdit}>
                <EditIcon></EditIcon>
              </Link>
            </li>
          </ul>
        </Item>
        <div></div>
      </Stack>
    </Box>
  );
}
