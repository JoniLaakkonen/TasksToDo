import { List } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../admin/firebase";
import Cstmlistitem from "../listitem/cstmlistitem";

function Cstmlist() {
  const [tasks, setTasks] = useState([]); // Stores multiple tables
  const [tabIndex, setTabIndex] = useState(0); // Track selected tab
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const taskCollectionRef = collection(db, "tasks");
  
    useEffect (() => {
      const getTasklist = async () => {
        try {
          setLoading(true);
          const data = await getDocs(taskCollectionRef);
          const taskList = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTasks(taskList);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          setError("Failed to load tasks.");
        } finally {
          setLoading(false);
        }
      }
      getTasklist();
    }, []);

  return (
    <>
      <h2>Tehtävälista</h2>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <div className="page-content">
            {tasks.map((item) => (
                <>
                    <Cstmlistitem title={item.Title} prompttext={item.Prompt} id={item.id} />
                </>
              ))}
          </div>
      </List>
    </>
  );
}

export default Cstmlist;
