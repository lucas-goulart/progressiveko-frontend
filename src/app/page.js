"use client";
// import React, { useEffect, useState } from "react";
// import { Box, Paper, Grid } from "@mui/material";
// import InfoIcon from "@mui/icons-material/Info";

// import FormularioJogo from "./pages/formulario";
// import AdicionarJogador from "./pages/add_player";
// import TabelaJogadores from "./pages/tabela_jogadores";
// import TelaAux from "./pages/tela_aux";

// const jogadoresIniciais = [];

// const PaperContainer = ({ children }) => (
//   <Paper sx={{ minWidth: "30%", m: "2em 1em 2em", p: "1em" }} elevation={12}>
//     {children}
//   </Paper>
// );

// export default function Home() {
//   const [data, setDataReal] = useState(jogadoresIniciais);

//   function setData(data) {
//     setDataReal(data);
//     localStorage.setItem("oldData", JSON.stringify(data));
//   }

//   useEffect(() => {
//     // Certifica-se de que este código só executa no lado do cliente
//     if (typeof window !== "undefined") {
//       const oldData = localStorage.getItem("oldData");
//       if (oldData) {
//         setData(JSON.parse(oldData));
//       }
//     }
//   }, []);

//   const [showInfo, setShowInfo] = useState(false);

//   return (
//     <>
//       <Box display={{ xs: "block", md: "flex" }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <PaperContainer>
//               <TabelaJogadores data={data} setData={setData} />
//             </PaperContainer>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <PaperContainer>
//               <FormularioJogo data={data} setData={setData} />
//             </PaperContainer>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <PaperContainer>
//               <AdicionarJogador data={data} setData={setData} />
//             </PaperContainer>
//           </Grid>
//           {data.length > 0 && (
//             <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
//               <PaperContainer>
//                 <InfoIcon
//                   onClick={() => setShowInfo(!showInfo)}
//                   style={{ cursor: "pointer" }}
//                 />
//                 {showInfo && <TelaAux />}
//               </PaperContainer>
//             </Grid>
//           )}
//         </Grid>
//       </Box>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
} from "@mui/material";

function App() {
  const [initialBounty, setInitialBounty] = useState(() => {
    const savedBounty = localStorage.getItem("initialBounty");
    return savedBounty ? parseFloat(savedBounty) : "";
  });

  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers ? JSON.parse(savedPlayers) : [];
  });

  const [log, setLog] = useState(() => {
    const savedLog = localStorage.getItem("log");
    return savedLog ? JSON.parse(savedLog) : [];
  });

  const [isInitialBountyDialogOpen, setIsInitialBountyDialogOpen] = useState(
    initialBounty === ""
  );

  const [playerNames, setPlayerNames] = useState(() => {
    const names = players.map((player) => player.name);
    return [...new Set(names)];
  });

  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const [playerName, setPlayerName] = useState("");
  const [eliminatedPlayerName, setEliminatedPlayerName] = useState("");
  const [eliminatorNames, setEliminatorNames] = useState([]);

  const [editingPlayerName, setEditingPlayerName] = useState(null);
  const [editedPlayerData, setEditedPlayerData] = useState({});

  // Salva no localStorage sempre que players ou log mudam
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("log", JSON.stringify(log));
  }, [log]);

  useEffect(() => {
    if (initialBounty !== "") {
      localStorage.setItem("initialBounty", initialBounty.toString());
    }
  }, [initialBounty]);

  const handleInitialBountySubmit = () => {
    if (initialBounty > 0) {
      localStorage.setItem("initialBounty", initialBounty.toString());
      setIsInitialBountyDialogOpen(false);
    } else {
      alert("Por favor, insira um valor válido para o bounty inicial.");
    }
  };

  const handleAddPlayer = () => {
    if (playerName.trim() === "") {
      alert("Por favor, insira o nome do jogador.");
      return;
    }

    const existingPlayer = players.find((player) => player.name === playerName);

    if (existingPlayer) {
      if (existingPlayer.bounty === 0) {
        // Reentrada
        const updatedPlayers = players.map((player) =>
          player.name === playerName
            ? { ...player, bounty: parseFloat(initialBounty) }
            : player
        );
        setPlayers(updatedPlayers);
        setLog([
          ...log,
          `Jogador ${playerName} reentrou com bounty R$${parseFloat(
            initialBounty
          ).toFixed(2)}`,
        ]);
      } else {
        alert("Jogador já está no torneio.");
      }
    } else {
      // Novo jogador
      const newPlayer = {
        name: playerName,
        bounty: parseFloat(initialBounty),
        balance: 0,
      };
      setPlayers([...players, newPlayer]);
      setPlayerNames([...new Set([...playerNames, playerName])]);
      setLog([
        ...log,
        `Jogador ${playerName} registrado com bounty R$${parseFloat(
          initialBounty
        ).toFixed(2)}`,
      ]);
    }

    setPlayerName("");
  };

  const handleElimination = () => {
    if (eliminatedPlayerName.trim() === "") {
      alert("Por favor, selecione o jogador eliminado.");
      return;
    }
    if (eliminatorNames.length === 0) {
      alert("Por favor, selecione o(s) jogador(es) que eliminaram.");
      return;
    }

    if (eliminatorNames.includes(eliminatedPlayerName)) {
      alert("Um jogador não pode se eliminar a si mesmo.");
      return;
    }

    const eliminatedPlayer = players.find(
      (player) => player.name === eliminatedPlayerName
    );

    if (!eliminatedPlayer || eliminatedPlayer.bounty === 0) {
      alert("Jogador eliminado não está no torneio.");
      return;
    }

    const eliminators = players.filter((player) =>
      eliminatorNames.includes(player.name)
    );

    const bountyPerEliminator =
      eliminatedPlayer.bounty / eliminatorNames.length;

    const updatedPlayers = players.map((player) => {
      if (player.name === eliminatedPlayerName) {
        return { ...player, bounty: 0 };
      }
      if (eliminatorNames.includes(player.name)) {
        const bountyShare = bountyPerEliminator / 2;
        return {
          ...player,
          balance: player.balance + bountyShare,
          bounty: player.bounty + bountyShare,
        };
      }
      return player;
    });

    setPlayers(updatedPlayers);

    setLog([
      ...log,
      `Jogador ${eliminatedPlayerName} foi eliminado por ${eliminatorNames.join(
        ", "
      )}. Bounty de R$${eliminatedPlayer.bounty.toFixed(
        2
      )} distribuído igualmente.`,
    ]);

    // Resetar formulário de eliminação
    setEliminatedPlayerName("");
    setEliminatorNames([]);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayers = [...players].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleEditClick = (player) => {
    setEditingPlayerName(player.name);
    setEditedPlayerData({ ...player });
  };

  const handleSaveEdit = () => {
    const updatedPlayers = players.map((player) =>
      player.name === editingPlayerName ? editedPlayerData : player
    );
    setPlayers(updatedPlayers);
    setLog([...log, `Dados do jogador ${editingPlayerName} atualizados.`]);
    setEditingPlayerName(null);
    setEditedPlayerData({});
  };

  const handleCancelEdit = () => {
    setEditingPlayerName(null);
    setEditedPlayerData({});
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">
        Controle de Bounties do Torneio de Poker
      </Typography>

      {/** Dialogo do Bounty Inicial */}
      <Dialog open={isInitialBountyDialogOpen}>
        <DialogTitle>Insira o Valor do Bounty Inicial</DialogTitle>
        <DialogContent>
          <TextField
            label="Bounty Inicial (R$)"
            type="number"
            value={initialBounty || ""}
            onChange={(e) => setInitialBounty(parseFloat(e.target.value))}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInitialBountySubmit}>Confirmar</Button>
        </DialogActions>
      </Dialog>

      {/** Cadastro de Jogadores */}
      <div style={{ marginTop: 20 }}>
        <Autocomplete
          freeSolo
          options={playerNames}
          value={playerName}
          onChange={(event, newValue) => {
            setPlayerName(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setPlayerName(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Nome do Jogador" variant="outlined" />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPlayer}
          style={{ marginTop: 10 }}
        >
          Registrar Jogador
        </Button>
      </div>

      {/** Formulário de Eliminação */}
      <div style={{ marginTop: 20 }}>
        <Autocomplete
          options={players.filter((p) => p.bounty > 0).map((p) => p.name)}
          value={eliminatedPlayerName}
          onChange={(event, newValue) => {
            setEliminatedPlayerName(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Jogador Eliminado"
              variant="outlined"
            />
          )}
        />

        <Autocomplete
          multiple
          options={players.filter((p) => p.bounty > 0).map((p) => p.name)}
          value={eliminatorNames}
          onChange={(event, newValue) => {
            setEliminatorNames(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Eliminador(es)" variant="outlined" />
          )}
          style={{ marginTop: 10 }}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={handleElimination}
          style={{ marginTop: 10 }}
        >
          Registrar Eliminação
        </Button>
      </div>

      {/** Tabela de Jogadores */}
      <Paper style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "name"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("name")}
                >
                  Nome
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "bounty"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("bounty")}
                >
                  Bounty (R$)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "balance"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("balance")}
                >
                  Saldo (R$)
                </TableSortLabel>
              </TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers.map((player) => (
              <TableRow key={player.name}>
                <TableCell>
                  {editingPlayerName === player.name ? (
                    <TextField
                      value={editedPlayerData.name}
                      onChange={(e) =>
                        setEditedPlayerData({
                          ...editedPlayerData,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    player.name
                  )}
                </TableCell>
                <TableCell>
                  {editingPlayerName === player.name ? (
                    <TextField
                      type="number"
                      value={editedPlayerData.bounty}
                      onChange={(e) =>
                        setEditedPlayerData({
                          ...editedPlayerData,
                          bounty: parseFloat(e.target.value),
                        })
                      }
                    />
                  ) : (
                    player.bounty.toFixed(2)
                  )}
                </TableCell>
                <TableCell>
                  {editingPlayerName === player.name ? (
                    <TextField
                      type="number"
                      value={editedPlayerData.balance}
                      onChange={(e) =>
                        setEditedPlayerData({
                          ...editedPlayerData,
                          balance: parseFloat(e.target.value),
                        })
                      }
                    />
                  ) : (
                    player.balance.toFixed(2)
                  )}
                </TableCell>
                <TableCell>
                  {editingPlayerName === player.name ? (
                    <>
                      <Button onClick={handleSaveEdit}>Salvar</Button>
                      <Button onClick={handleCancelEdit}>Cancelar</Button>
                    </>
                  ) : (
                    <Button onClick={() => handleEditClick(player)}>
                      Editar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/** Log de Eventos */}
      <div style={{ marginTop: 20 }}>
        <Typography variant="h6">Log de Eventos</Typography>
        {log.map((entry, index) => (
          <Typography key={index}>{entry}</Typography>
        ))}
      </div>
    </div>
  );
}

export default App;
