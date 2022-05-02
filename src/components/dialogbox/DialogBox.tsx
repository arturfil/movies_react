import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  handleClickOpen: Function | any;
  handleClose: Function | any;
  open: boolean;
  setOpen: Function;
}

export default function DialogBox({
  handleClose,
  handleClickOpen,
  open,
  setOpen,
}: Props) {
  return (
    <>
      <Button sx={{marginLeft: 2}} color="error" variant="contained" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the movie?"}
        </DialogTitle>
        <DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Yes</Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
