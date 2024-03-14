import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Container,
  Typography,
  InputAdornment,
} from "@mui/material";
import { SentimentVeryDissatisfied, TagFaces } from "@mui/icons-material";

export default function FormularioJogo({ data, setData }) {
  const [jogadorEliminado, setJogadorEliminado] = useState("");
  const [jogadorVencedor, setJogadorVencedor] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verifica se o nome do jogador eliminado está vazio
    if (jogadorEliminado === "") {
      alert("Por favor, insira o nome do jogador eliminado.");
      return; // Interrompe a execução adicional se o campo estiver vazio
    }

    // Verifica se o nome do jogador vencedor está vazio
    if (jogadorVencedor === "") {
      alert("Por favor, insira o nome do jogador vencedor.");
      return; // Interrompe a execução adicional se o campo estiver vazio
    }

    // Verifica se os nomes dos jogadores são iguais
    if (jogadorEliminado === jogadorVencedor) {
      alert(
        "O jogador eliminado e o jogador vencedor não podem ser os mesmos."
      );
      return; // Interrompe a execução se os nomes forem iguais
    }

    // Se todas as verificações anteriores passarem, executa a função de eliminação
    realizarEliminacao();

    // Redefinir os estados após o envio do formulário
    setJogadorEliminado("");
    setJogadorVencedor("");
  };

  const realizarEliminacao = () => {
    // Cria uma cópia dos dados atuais para evitar mutação direta do estado
    let novosDados = [...data];

    // Encontra os índices dos elementos relevantes
    const indiceVencedor = novosDados.findIndex(
      (pessoa) => pessoa.nome === jogadorVencedor
    );
    const indiceEliminado = novosDados.findIndex(
      (pessoa) => pessoa.nome === jogadorEliminado
    );

    // Verifica se encontrou os elementos necessários
    if (indiceVencedor !== -1 && indiceEliminado !== -1) {
      // Converte o bounty do eliminado para número e o divide por dois
      const metadeBountyEliminado =
        parseFloat(novosDados[indiceEliminado].bounty) / 2;

      // Adiciona uma metade do bounty do eliminado ao bounty do vencedor
      novosDados[indiceVencedor].bounty =
        parseFloat(novosDados[indiceVencedor].bounty) + metadeBountyEliminado;

      // Adiciona a outra metade do bounty do eliminado ao saldo do vencedor
      novosDados[indiceVencedor].saldo =
        parseFloat(novosDados[indiceVencedor].saldo) + metadeBountyEliminado;

      // Zera o bounty do eliminado
      novosDados[indiceEliminado].bounty = "0";
    }

    // Atualiza o estado com os novos dados
    setData(novosDados);
  };

  const jogadoresComBounty = data.filter(
    (jogador) => parseFloat(jogador.bounty) > 0
  );

  const isDisabled = data.length <= 1;

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" component="h1" gutterBottom>
        Eliminação
      </Typography>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          disabled={isDisabled}
          options={[...jogadoresComBounty.map((item) => item.nome), ""]}
          value={jogadorVencedor}
          onChange={(event, newValue) => {
            setJogadorVencedor(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Jogador Vencedor"
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <TagFaces />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Autocomplete
          disabled={isDisabled}
          options={[...jogadoresComBounty.map((item) => item.nome), ""]}
          value={jogadorEliminado}
          onChange={(event, newValue) => {
            setJogadorEliminado(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Jogador Eliminado"
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SentimentVeryDissatisfied />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          Confirma
        </Button>
      </form>
    </Container>
  );
}
