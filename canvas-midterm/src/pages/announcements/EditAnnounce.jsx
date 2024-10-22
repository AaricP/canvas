import { useEffect, useState } from "react";
import TextareaRows from "../../components/common/TextArea";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../../apiV3";

export default function EditAnnounce() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState("");
  const [aTitle, setATitle] = useState("");
  const announcementsApi = useApi("announcements");
  const navigate = useNavigate();

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
  }, [id, setAnnouncement, setATitle]);

  const handleUpdateAnnouncement = async () => {
    try {
      await announcementsApi.update(id, { announcement, aTitle });
      navigate("/announcements");
    } catch (error) {
      console.error("Error updating announcement.", error);
    }
  };

  const writeAnnouncement = (event) => {
    const { value } = event.target;
    setAnnouncement(value);
  };

  const writeATitle = (event) => {
    const { value } = event.target;
    setATitle(value);
  };

  return (
    <>
      <h2>Update Announcement</h2>
      <TextareaRows id={id} value={aTitle} onChange={writeATitle} />
      <TextareaRows id={id} value={announcement} onChange={writeAnnouncement} />
      <Button onClick={handleUpdateAnnouncement} variant="contained">
        Update Announcement
      </Button>
    </>
  );
}
