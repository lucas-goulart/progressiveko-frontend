import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function AdicionarJogador({ data, setData }) {
  const [novoJogador, setNovoJogador] = useState("");
  const [bounty, setBounty] = useState(0);

  const handleChangeBounty = (e) => {
    // Usa uma expressão regular para permitir apenas números e um ponto decimal
    const value = event.target.value;
    const isValid = /^(\d+)?(\.\d{0,2})?$/; // Ajuste conforme necessário para sua necessidade

    // Se o novo valor é vazio (permitindo um backspace) ou passa na validação de número/float
    if (value === "" || isValid.test(value)) {
      // Atualiza o estado bounty com o novo valor
      setBounty(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Verifica se novoJogador é uma string vazia
    if (!novoJogador.trim()) {
      alert("O nome do jogador não pode ser vazio.");
      return;
    }

    // Verifica se novoJogador já existe em data e se o bounty desse jogador é 0
    const indexJogadorExistente = data.findIndex(
      (jogador) => jogador.nome.toLowerCase() === novoJogador.toLowerCase()
    );

    if (indexJogadorExistente !== -1) {
      // Jogador existe
      if (data[indexJogadorExistente].bounty === "0") {
        // Atualiza apenas o bounty do jogador existente
        const updatedData = [...data];
        updatedData[indexJogadorExistente].bounty = bounty; // Atualiza o bounty
        setData(updatedData);
        // Atualiza o estado data com o novo array
      } else {
        // O jogador existe e tem um bounty maior que 0
        alert(`Esse jogador já existe e tem um bounty!`);
        return;
      }
    } else {
      // Jogador não existe, então adiciona um novo
      const updatedData = [
        ...data,
        {
          nome: novoJogador,
          bounty: bounty,
          saldo: 0,
        },
      ];

      // Ordena updatedData em ordem alfabética pela chave nome
      updatedData.sort((a, b) => a.nome.localeCompare(b.nome));

      // Atualiza o estado data com o novo array
      setData(updatedData);
    }

    // Limpa o campo de texto para o novo jogador e o campo bounty
    setNovoJogador("");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" component="h1" gutterBottom>
        Adicionar Jogador
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Novo Jogador"
          variant="outlined"
          fullWidth
          margin="normal"
          value={novoJogador}
          onChange={(e) => setNovoJogador(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ m: "0.5em 0" }}>
          <InputLabel htmlFor="outlined-adornment-amount">
            Bounty Inicial
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={bounty} // Define o valor do input como o estado bounty
            onChange={handleChangeBounty} // Define o método para atualizar o estado
            startAdornment={
              <InputAdornment position="start">R$</InputAdornment>
            }
            label="Bounty Inicial"
          />
        </FormControl>

        <Box>
          <Button type="submit" variant="contained" color="primary">
            Confirma
          </Button>
        </Box>
      </form>
    </Container>
  );
}
