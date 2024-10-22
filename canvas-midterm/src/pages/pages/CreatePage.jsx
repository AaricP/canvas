import TextareaRows from "../../components/common/TextArea";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../apiV3";

export default function CreatePage() {
  const navigate = useNavigate();

  const pagesApi = useApi("pages");
  const [page, setPage] = useState("");
  const [pTitle, setPTitle] = useState("");
  const [pageType, setPageType] = useState("Generic Page");
  const [pageModule, setPageModule] = useState("");

  const modulesApi = useApi("modules");
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await modulesApi.getAll();
        setModules(data || []);
      } catch (error) {
        console.error("Error fetching module names data.");
      }
    };
    fetchModules();
  }, []);

  const handleCreatePage = async () => {
    try {
      await pagesApi.create({ pTitle, page, pageType, module: pageModule });
      setPage("");
      setPTitle("");
      setPageType("Generic Page");
      setPageModule("");
      navigate("/pages");
    } catch (error) {
      console.error("Error creating page.", error);
    }
  };

  const writePage = (event) => {
    const { value } = event.target;
    setPage(value);
  };

  const writePTitle = (event) => {
    const { value } = event.target;
    setPTitle(value);
  };

  const writePageType = (event) => {
    const { value } = event.target;
    setPageType(value);
  };

  const writePageModule = (event) => {
    const { value } = event.target;
    setPageModule(value);
  };

  return (
    <Stack direction="column" gap={2}>
      <h2>Create Page</h2>
      <TextareaRows value={pTitle} onChange={writePTitle} />
      <TextareaRows value={page} onChange={writePage} />
      <select value={pageType} onChange={writePageType}>
        <option value="" disabled>
          Choose an option:
        </option>
        <option value="Generic Page">Generic Page</option>
        <option value="Home Page">Home Page</option>
        <option value="Assignment">Assignment</option>
        <option value="IN-Class Exercise">IN-Class Exercise</option>
        {/* Move to a useState, and save to it's own API DB, so you can add to it using the Add Page Type button */}
      </select>
      <Button>Add Page Type</Button>
      <select value={pageModule} onChange={writePageModule}>
        <option value="" disabled>Choose an option:</option>
        {modules.map((mod) => (
        <option key={mod.id} value={mod.id}>{mod.module}</option>
        ))}
      </select>
      <Button
        onClick={handleCreatePage}
        variant="contained"
        style={{ float: "right" }}
      >
        Create Page
      </Button>
    </Stack>
  );
}
