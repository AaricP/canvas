import TextareaRows from "../../components/common/TextArea";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../apiV3";

export default function CreateAnnounce() {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState("");
  const [aTitle, setATitle] = useState("");
  const announcementsApi = useApi("announcements");

  const handleCreateAnnouncement = async () => {
    try {
      await announcementsApi.create({ aTitle, announcement });
      setAnnouncement("");
      setATitle("");
      navigate("/announcements");
    } catch (error) {
      console.error("Error creating announcement.", error);
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
      <h2>Create Announcement</h2>
      <TextareaRows value={aTitle} onChange={writeATitle} />
      <TextareaRows value={announcement} onChange={writeAnnouncement} />
      <Button
        onClick={handleCreateAnnouncement}
        variant="contained"
        style={{ float: "right" }}
      >
        Add Announcement
      </Button>
    </>
  );
}
