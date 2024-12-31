import { useEffect, useState } from "react";
import AccordionExpandDefault from "../../components/common/Accordion";
import { useApi } from "../../../apiV3";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import BasicStack from "../../components/common/BasicStack";

export default function ListModules() {
  // TODO: Get modules to display Module Name (just need name)
  const modulesApi = useApi("modules");
  const [modules, setModules] = useState("");
  const pagesApi = useApi("pages");
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const getPages = await pagesApi.getAllGroupedBy("module");
      setPages(getPages);
    };

    fetchPages();
  }, []);

  useEffect(() => {
    const fetchModules = async () => {
      const getModules = await modulesApi.getAll();
      setModules(getModules);
    };
    fetchModules();
  }, []);

  const deletePage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;
    await pagesApi.delete(id);
    const updatedPages = await pagesApi.getAll();
    setPages(updatedPages);
  };

  const goEdit = (id) => `/pages/edit/${id}`;
  const goView = (id) => `/pages/view/${id}`;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Modules List</h2>

        <Link
          to="/modules/create"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Button style={{ height: "40px" }} variant="contained">
            Add Module
          </Button>
        </Link>
      </div>

      {Object.entries(pages)
        .filter(([moduleId]) => moduleId !== "")
        .map(([moduleId, modulePages]) => {
          const moduleName = modules.find((mod) => mod.id === moduleId);
          const useModuleName = moduleName ? moduleName.module : "Unknown Module";

          return (
            <div key={moduleId}>
              {/* <h2>{modules[moduleId]}</h2> */}
              {/* TODO: Display Module Name using the ID */}
                <AccordionExpandDefault modTitle={useModuleName}>
                  
              {modulePages.map((page) => (
                <BasicStack
                  key={page.id}
                  height={80}
                  title={page.pTitle}
                  text={page.page}
                  goDelete={() => deletePage(page.id)}
                  goEdit={goEdit(page.id)}
                  goView={goView(page.id)}
                  border="solid"
                  spacing={0}
                />
              ))}
                </AccordionExpandDefault>
            </div>
          );
        })}
    </>
  );
}
