import { Add, Delete, Send } from "@mui/icons-material";
import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from './../firebase';
import "./dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]); // Stores tasks from Firestore
  const [newTitle, setNewTitle] = useState({});
  const [newPrompt, setNewPrompt] = useState({});
  const [updatedContent, setUpdatedContent] = useState({});
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
        console.log("Firestore Data:", taskList); // 🔍 Debugging step
        setTasks(taskList);

        // Initialize updated content
        const initialContent = {};
        taskList.forEach((task) => {
          initialContent[task.Title] = task.Prompt || "";
        });
        setUpdatedContent(initialContent);
        console.log("Tässä: " + updatedContent["Minttukaakao"]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    }
    getTasklist();
  }, []);

  const handleChange = (Title, newValue) => {
    setUpdatedContent({ ...updatedContent, [Title]: newValue });
  };

  const handleUpdate = async (Title) => {
    console.log(`Updating content Title: ${Title} with content:`, updatedContent[Title]);
    try {
      await setDoc(db, "tasks", { Title: Title, Prompt: updatedContent[Title]});
      window.location.reload(false);
      alert("Content updated successfully!");
    } catch (err) {
      console.error("Error updating content:", err);
      alert("Failed to update content.");
    }
  };
  const onDelete = async (id) => {
    const taskDoc = doc(db,"tasks",id)
    try {
      await deleteDoc(taskDoc);
      window.location.reload(false);
      alert("Content deleted successfully!");
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content.");
    }
  }
  const onSubmitTask = async () => {
    try {
      await addDoc(taskCollectionRef, {
        Title:newTitle,
        Prompt:newPrompt,
      })
      window.location.reload(false);
      alert("Added succesfully");
    } catch (err) {
      console.error("Error adding content:", err);
      alert("Failed to add content.");
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>
          Dashboard
        </h1>
      </div>
      {loading && <p>Loading tasks...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && tasks.length > 0 && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={(e, newValue) => setTabIndex(newValue)}
              aria-label="Dynamic Table Tabs"
            >
                <Tab label="Tehtävät" />
            </Tabs>
          </Box>

          <div className="page-content">
            {tasks.map((task) => (
              <div className="item-container">
                <h3>{task.Title}</h3>
                <TextField
                  multiline
                  minRows={3}
                  maxRows={4}
                  value={updatedContent[task.Title]}
                  onChange={(e) => handleChange(task.Title, e.target.value)}
                />
                <Button
                  onClick={() => handleUpdate(task.Title)}
                  variant="contained"
                  endIcon={<Send />}
                  disabled={updatedContent[task.Title] === task.Prompt}
                >
                  Update
                </Button>
                <Button
                  onClick={() => onDelete(task.id)}
                  color="error"
                  variant="contained"
                  endIcon={<Delete />}
                >
                  Delete
                </Button>
              </div>
            ))}
            <div className="item-container">
                <h3>Add Task...</h3>
                <TextField
                  placeholder="Lisää tehtävä"
                  onChange={(e) => (setNewTitle(e.target.value))}
                />
                <TextField
                  multiline
                  minRows={3}
                  maxRows={4}
                  placeholder="Lisää kuvaus"
                  onChange={(e) => (setNewPrompt(e.target.value))}
                />
                <Button
                  onClick={() => onSubmitTask()}
                  variant="contained"
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </div>
          </div>
        </>
      )}

      {!loading && tasks.length === 0 && <p>No tasks available.</p>}
    </div>
  );
}
