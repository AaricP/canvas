import { Button } from "@mui/material";
import BasicStack from "../../components/common/BasicStack";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../../apiV3";

export default function ListPages() {
  const pagesApi = useApi("pages");
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const getPages = await pagesApi.getAllGroupedBy("pageType");
      setPages(getPages);
    };
    fetchPages();
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
        <h2>Pages List</h2>
        <Link
          to="/pages/create"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Button style={{ height: "40px" }} variant="contained">
            Add Page
          </Button>
        </Link>
      </div>
      {Object.entries(pages).map(([pageType, pageTypesPages]) => (
        <div key={pageType}>
          <h2>{pageType}</h2>

          {pageTypesPages.map((page) => (
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
        </div>
      ))}
    </>
  );
}
