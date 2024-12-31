import { Button, TextField } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function ProfilePage() {
  const { userApi, usersApi } = useAuth();
  const [profile, setProfile] = useState({});
  const { data, loading, error, refetch } = useFetch(userApi.getAll);

  useEffect(() => {
    if (data) {
      setProfile(data[0]);
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handlePermissions = (event) => {
    const { value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, userType: value }));
  };

  const saveProfile = () => {
    const updatedProfile = { ...profile };
    userApi.update(profile.id, updatedProfile);
    usersApi.update(profile.id, updatedProfile);
    refetch();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>User Profile</h1>
      <div id="profileForm">
        <ul>
          <li>
            <TextField
              id="name-input"
              label="Name"
              type="name"
              name="name"
              value={profile.name || ""}
              onChange={handleChange}
            />
          </li>
          <li>&nbsp;</li>
          <li>
            <TextField
              id="age-input"
              label="Age"
              type="age"
              name="age"
              value={profile.age || ""}
              onChange={handleChange}
            />
          </li>
          <li>&nbsp;</li>
          <li>
            <TextField
              id="major-input"
              label="Major"
              type="major"
              name="major"
              value={profile.major || ""}
              onChange={handleChange}
            />
          </li>
          <li>&nbsp;</li>
          <li>
            <select value={profile.userType || ""} onChange={handlePermissions}>
              <option value="" disabled>
                Choose an option:
              </option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </li>
          <li>&nbsp;</li>
          <li>
            <Button onClick={saveProfile} variant="contained">
              Save Profile
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}
