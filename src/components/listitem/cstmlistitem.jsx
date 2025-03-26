import { CloudDownload } from "@mui/icons-material";
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, styled, Typography } from "@mui/material";
import React from "react";

function Cstmlistitem({ title, prompttext, length, id }) {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
  return (
    <>
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "pink" }} alt={title} src="..." />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.secondary", display: "inline" }}
              >
                {prompttext}
              </Typography>
            </React.Fragment>
          }
        />
        <IconButton
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        >
        <CloudDownload />
        <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
            multiple
        />
        </IconButton>
      </ListItem>
      {id !== length && <Divider variant="inset" component="li" />}
    </>
  );
}

export default Cstmlistitem;
