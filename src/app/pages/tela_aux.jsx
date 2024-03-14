import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function TelaAux() {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Feito por Lucas Marques
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sobre mim</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Atualmente, estou finalizando minha graduação em Engenharia Mecânica
            pela Universidade Federal Fluminense (UFF) e cursando Análise e
            Desenvolvimento de Sistemas na UniVassouras. Ofereço serviços
            freelance no desenvolvimento de aplicações web e sistemas em geral.
          </Typography>
          <Typography> Seguem as minhas redes:</Typography>
          <Box
            sx={{
              m: "1em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Link href="https://github.com/lucas-goulart" target="_blank">
              <GitHubIcon fontSize="large" />
            </Link>
            <Link href="https://wa.me/+5524998476432" target="_blank">
              <WhatsAppIcon fontSize="large" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/lucas-goulart-54ba11215/"
              target="_blank"
            >
              <LinkedInIcon fontSize="large" />
            </Link>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Como usar a página</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Esta página foi desenvolvida para gerenciar os 'bounties' em
            torneios de poker ao vivo. Na parte inferior, você pode adicionar
            jogadores, especificando o valor inicial de cada 'bounty'. Uma vez
            que dois ou mais jogadores sejam registrados, a funcionalidade de
            eliminação será habilitada, permitindo a remoção de jogadores
            conforme eles são eliminados do torneio. No caso de um jogador
            realizar um 'rebuy', simplesmente reinsira o nome desse jogador na
            aba de inscrição.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
