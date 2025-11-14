import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import LogoViveo from "@/assets/viveo-logo.svg";
import { Logout as LogoutIcon } from "@mui/icons-material";
import Image from "next/image";

export const DashboardHeader = ({ onLogout }: { onLogout: () => void }) => (
  <AppBar
    position="static"
    color="default"
    elevation={1}
    sx={{ bgcolor: "white" }}
  >
    <Toolbar className="flex items-center justify-between">
      <Image src={LogoViveo} alt="" className="w-16" />

      <Button
        color="inherit"
        onClick={onLogout}
        startIcon={<LogoutIcon />}
        sx={{ color: "#d32f2f" }}
      >
        Logout
      </Button>
    </Toolbar>
  </AppBar>
);
