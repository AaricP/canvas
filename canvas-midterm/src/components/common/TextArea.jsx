import * as React from "react";
import Box from "@mui/joy/Box";
import Textarea from "@mui/joy/Textarea";

export default function TextareaRows({ value, onChange, id }) {
  return (
      <Textarea
        id={id}
        name={id}
        placeholder="Type in here…"
        value={value}
        minRows={1}
        maxRows={50}
        onChange={onChange}
      />
  );
}
