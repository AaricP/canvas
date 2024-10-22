import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ActionAreaCard from "./ActionAreaCard";
import BasicStack from "./BasicStack";

export default function AccordionExpandDefault({modTitle,
  children
}) {
  return (
    <div id="accord">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{fontWeight: "bold", fontSize: "23px"}}>{modTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {children}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
