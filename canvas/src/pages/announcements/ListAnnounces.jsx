import { Button } from "@mui/material";
import BasicStack from "../../components/common/BasicStack";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../../apiV3";

export default function ListAnnounces() {
  const announcementsApi = useApi("announcements");
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const getAnnouncements = await announcementsApi.getAll();
      setAnnouncements(getAnnouncements);
    };
    fetchAnnouncements();
  }, []);

  const deleteAnnouncement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;
    await announcementsApi.delete(id);
    const updatedAnnouncements = await announcementsApi.getAll();
    setAnnouncements(updatedAnnouncements);
  };

  const goEdit = (id) => `/announcements/edit/${id}`;
  const goView = (id) => `/announcements/view/${id}`;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Announcements List</h2>
        <Link
          to="/announcements/create"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Button style={{ height: "40px" }} variant="contained">
            Add Announcement
          </Button>
        </Link>
      </div>
      {[...announcements].reverse().map((announcement) => (
        <BasicStack
          key={announcement.id}
          height={120}
          title={announcement.aTitle}
          text={announcement.announcement}
          goDelete={() => deleteAnnouncement(announcement.id)}
          goEdit={goEdit(announcement.id)}
          goView={goView(announcement.id)}
          border=''
          spacing={1}
        />
      ))}
    </>
  );
}
