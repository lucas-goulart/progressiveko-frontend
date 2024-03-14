import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { formatCurrency } from "../functions/format_cuirrency";
import TelaAux from "./tela_aux";

const TabelaJogadores = ({ data, setData }) => {
  const handleClick = (playerName) => {
    // Pedindo confirmação do usuário
    const isConfirmed = window.confirm(
      `Você realmente quer deletar ${playerName}?`
    );
    if (isConfirmed) {
      // Atualiza o estado removendo o jogador
      const newData = data.filter((player) => player.nome !== playerName);
      setData(newData);
      console.log(`${playerName} deletado.`);
    }
  };

  return data.length > 0 ? (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Bounty</TableCell>
            <TableCell align="right">Saldo</TableCell>
            <TableCell align="right">-</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nome}
              </TableCell>
              <TableCell align="right">{formatCurrency(row.bounty)}</TableCell>
              <TableCell align="right">{formatCurrency(row.saldo)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleClick(row.nome)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <TelaAux />
  );
};

export default TabelaJogadores;
