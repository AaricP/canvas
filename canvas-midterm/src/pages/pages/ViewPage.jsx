import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../../apiV3";

export default function ViewPage() {
  const { id } = useParams();
  const [page, setPage] = useState("")
  const [pTitle, setPTitle] = useState("")
  const pagesApi = useApi("pages")

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await pagesApi.getById(id);
        setPage(data.page || "");
        setPTitle(data.pTitle || "");
      } catch (error) {
        console.error("Error fetching page data.");
      }
    };
    fetchPage();
  }, [id, pagesApi, setPage, setPTitle]);

  return (
    <>
      <h2>{pTitle}</h2>
      <p>{page}</p>
    </>
  );
}
