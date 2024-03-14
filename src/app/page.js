"use client";
import React, { useEffect, useState } from "react";
import { Box, Paper, Grid } from "@mui/material";
import FormularioJogo from "./pages/formulario";
import AdicionarJogador from "./pages/add_player";
import TabelaJogadores from "./pages/tabela_jogadores";

const jogadoresIniciais = [];

const PaperContainer = ({ children }) => (
  <Paper sx={{ minWidth: "30%", m: "2em 1em 2em", p: "1em" }} elevation={12}>
    {children}
  </Paper>
);

export default function Home() {
  const [data, setData] = useState(() => {
    // Tenta recuperar os jogadores salvos do localStorage quando o componente monta.
    const oldData = localStorage.getItem("oldData");
    return oldData ? JSON.parse(oldData) : jogadoresIniciais;
  });

  useEffect(() => {
    // Salva os jogadores no localStorage sempre que 'data' mudar.
    localStorage.setItem("oldData", JSON.stringify(data));
  }, [data]);

  return (
    <Box display={{ xs: "block", md: "flex" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <PaperContainer>
            <TabelaJogadores data={data} setData={setData} />
          </PaperContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <PaperContainer>
            <FormularioJogo data={data} setData={setData} />
          </PaperContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <PaperContainer>
            <AdicionarJogador data={data} setData={setData} />
          </PaperContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
