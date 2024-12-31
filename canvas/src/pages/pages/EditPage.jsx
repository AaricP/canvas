import { useEffect, useState } from "react";
import TextareaRows from "../../components/common/TextArea";
import { Button, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../../apiV3";

export default function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const modulesApi = useApi("modules");
  const [modules, setModules] = useState([]);
  
  const pagesApi = useApi("pages");
  const [page, setPage] = useState("");
  const [pTitle, setPTitle] = useState("");
  const [pageType, setPageType] = useState("Generic Page");
  const [pageModule, setPageModule] = useState(undefined);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await pagesApi.getById(id);
        setPage(data.page || "");
        setPTitle(data.pTitle || "");
        setPageType(data.pageType || "Generic Page");
        setPageModule(data.pageModule || "");
      } catch (error) {
        console.error("Error fetching page data.");
      }
    };
    fetchPage();
  }, [id, setPage, setPTitle, setPageType, setPageModule]);

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

  const handleUpdatePage = async () => {
    try {
      await pagesApi.update(id, { page, pTitle, pageType, module: pageModule });
      navigate("/pages");
    } catch (error) {
      console.error("Error updating page.", error);
    }
  };

  const writePage = (event) => {
    const { value } = event.target;
    console.log(value);
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
      <h2>Update Page</h2>
      <TextareaRows id={id + "-pTitle"} value={pTitle} onChange={writePTitle} />
      <TextareaRows id={id + "-page"} value={page} onChange={writePage} />
      <select id={id + "-pageType"} value={pageType} onChange={writePageType}>
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
      <select id={id + "module"} value={pageModule} onChange={writePageModule}>
        <option value="" disabled>Choose an option:</option>
        {modules.map((mod) => (
          <option key={mod.id} value={mod.id}>{mod.module}</option>
        ))}
      </select>
      <Button
        onClick={handleUpdatePage}
        variant="contained"
        style={{ float: "right" }}
      >
        Update Page
      </Button>
    </Stack>
  );
}
