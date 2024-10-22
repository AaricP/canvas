import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../apiV3";
import { Button, TextField } from "@mui/material";

export default function CreateModule() {
  const navigate = useNavigate();
  const [module, setModule] = useState("");
  const modulesApi = useApi("modules");

  const handleCreateModule = async () => {
    try {
      await modulesApi.create({ module });
      setModule("");
      navigate("/modules");
    } catch (error) {
      console.error("Error creating page.", error);
    }
  };

  const writeModule = (event) => {
    const { value } = event.target;
    setModule(value);
  };

  return (
    <>
      <h2>CreateModule</h2>
      <ul style={{ listStyle: "none" }}>
        <li>
          <TextField value={module} onChange={writeModule} />
        </li>
        <li>
          <Button
            onClick={handleCreateModule}
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            Add Module
          </Button>
        </li>
      </ul>
    </>
  );
}
