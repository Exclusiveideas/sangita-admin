"use client";

import { logOutUser } from "@/apiClient/authAPI";
import useAuthStore from "@/store/auth-store";
import useLogOutDialogStore from "@/store/useLogOutDialogStore";
import { useRouter } from "next/navigation";

// ✅ MUI imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const LogOutDialog = () => {
  const { isOpen, closeDialog } = useLogOutDialogStore();
  const updateUser = useAuthStore((state) => state.updateUser);
  const router = useRouter();

  const logOut = () => {
    updateUser(null);
    logOutUser();
    router.push("/auth/sign-in");
    closeDialog();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
      fullWidth
      maxWidth="sm" // options: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
    >
      <DialogTitle id="logout-dialog-title">Done already?</DialogTitle>
      <DialogContent>
        <DialogContentText id="logout-dialog-description">
          Ready to log out for real?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="outlined">
          Not yet
        </Button>
        <Button onClick={logOut} variant="contained" color="error" autoFocus>
          Yep, log me out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogOutDialog;
