import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../../apiV3";

export default function EditModule() {
  const { id } = useParams();
  const [module, setModule] = useState("");
  const modulesApi = useApi("modules");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const data = await modulesApi.getById(id);
        setModule(data.module || "");
      } catch (error) {
        console.error("Error fetching module data.");
      }
    };
    fetchModule();
  }, [id, setModule]);

  const handleUpdateModule = async () => {
    try {
      await modulesApi.update(id, { module });
      navigate("/modules");
    } catch (error) {
      console.error("Error updating module.", error);
    }
  };

  const writeModule = (event) => {
    const { value } = event.target;
    setModule(value);
  };

  return (
    <>
      <h2>Update Module</h2>
      <ul style={{ listStyle: "none" }}>
        <li>
          <TextField value={module} onChange={writeModule} />
        </li>
        <li>
          <Button
            onClick={handleUpdateModule}
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            Update Module
          </Button>
        </li>
      </ul>
    </>
  );
}
