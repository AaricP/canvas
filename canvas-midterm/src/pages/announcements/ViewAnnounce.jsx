import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../../apiV3";

export default function ViewAnnounce() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState("");
  const [aTitle, setATitle] = useState("");
  const announcementsApi = useApi("announcements");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const data = await announcementsApi.getById(id);
        setAnnouncement(data.announcement || "");
        setATitle(data.aTitle || "");
      } catch (error) {
        console.error("Error fetching announcement data.");
      }
    };
    fetchAnnouncement();
  }, [id, announcementsApi, setAnnouncement, setATitle]);

  return (
    <>
      <h2>{aTitle}</h2>
      <p>{announcement}</p>
    </>
  );
}