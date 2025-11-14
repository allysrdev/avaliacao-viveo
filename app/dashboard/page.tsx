"use client";

import { fetchRandomUsers } from "@/services/api";
import { IUser } from "@/types/users";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importando useRouter para o redirecionamento
import { DashboardHeader } from "./_components/DashboardHeader";

export default function DashboardPage() {
  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  const carregarUsuarios = async () => {
    setCarregando(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const data = await fetchRandomUsers(12);
    setUsuarios(data);
    setCarregando(false);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarUsuarios();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <DashboardHeader onLogout={handleLogout} />

      <Box component="main" sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: "#333",
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.25rem",
              },
            }}
          >
            Visão Geral de Usuários
          </Typography>

          <Button
            variant="contained"
            onClick={carregarUsuarios}
            disabled={carregando}
            startIcon={<RefreshIcon />}
            sx={{
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            {carregando ? "Atualizando..." : "Atualizar Usuários"}
          </Button>
        </Box>

        {carregando && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )}

        {!carregando && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {usuarios.map((user, index) => (
              <Card
                key={index}
                elevation={3}
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 3,
                  }}
                >
                  <Avatar
                    src={user.picture.thumbnail}
                    sx={{
                      width: 90,
                      height: 90,
                      mb: 2,
                      border: "3px solid #1976d2",
                    }}
                  />

                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 600, color: "#333", mb: 0.5 }}
                  >
                    {user.name.first} {user.name.last}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    {user.email}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {user.location.country}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
