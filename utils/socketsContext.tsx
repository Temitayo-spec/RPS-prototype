import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextType = {
  socket: Socket;
  roomId: string;
  setRoomId: (roomId: string) => void;
  playerId: number;
  setPlayerId: (playerId: number) => void;
  playerOneConnected: boolean;
  setPlayerOneConnected: (playerOneConnected: boolean) => void;
  playerTwoConnected: boolean;
  setPlayerTwoConnected: (playerTwoConnected: boolean) => void;
  room: any;
  setRoom: (room: any) => void;
  openJoinRoom: boolean;
  setOpenJoinRoom: (openJoinRoom: boolean) => void;
  openCreateRoom: boolean;
  setOpenCreateRoom: (openCreateRoom: boolean) => void;
  error: {
    status: boolean;
    message: string;
  };
  setError: (error: { status: boolean; message: string }) => void;
  winner: {
    status: boolean;
    message: string;
  };
  setWinner: (winner: { status: boolean; message: string }) => void;
  playerOneChoice: string;
  setPlayerOneChoice: (playerOneChoice: string) => void;
  playerTwoChoice: string;
  setPlayerTwoChoice: (playerTwoChoice: string) => void;
  playerOneScore: number;
  setPlayerOneScore: (playerOneScore: number) => void;
  playerTwoScore: number;
  setPlayerTwoScore: (playerTwoScore: number) => void;
  canChoose: boolean;
  setCanChoose: (canChoose: boolean) => void;
  isCreate: boolean;
  setIsCreate: (isCreate: boolean) => void;
  createRoom: (id: string) => void;
  joinRoom: (id: string) => void;
  joinRandom: () => void;
  checkForConnected: (playerId: number) => void;
  reset: () => void;
  playerTwoLeftTheGame: () => void;
  displayScore: () => void;
  choose: (choice: string) => void;
  removeChoice: (choice: string) => void;
  checkForWinner: (message: string) => void;
};
const socket = io('https://rps-prototype-be-production.up.railway.app/');

const SocketContext = createContext<SocketContextType>({
  socket: socket,
  roomId: '',
  setRoomId: () => {},
  playerId: 0,
  setPlayerId: () => {},
  playerOneConnected: false,
  setPlayerOneConnected: () => {},
  playerTwoConnected: false,
  setPlayerTwoConnected: () => {},
  room: {},
  setRoom: () => {},
  openJoinRoom: false,
  setOpenJoinRoom: () => {},
  openCreateRoom: false,
  setOpenCreateRoom: () => {},
  error: {
    status: false,
    message: '',
  },
  setError: () => {},
  winner: {
    status: false,
    message: '',
  },
  setWinner: () => {},
  playerOneChoice: '',
  setPlayerOneChoice: () => {},
  playerTwoChoice: '',
  setPlayerTwoChoice: () => {},
  playerOneScore: 0,
  setPlayerOneScore: () => {},
  playerTwoScore: 0,
  setPlayerTwoScore: () => {},
  canChoose: true,
  setCanChoose: () => {},
  isCreate: false,
  setIsCreate: () => {},
  createRoom: () => {},
  joinRoom: () => {},
  joinRandom: () => {},
  checkForConnected: () => {},
  reset: () => {},
  playerTwoLeftTheGame: () => {},
  displayScore: () => {},
  choose: () => {},
  removeChoice: () => {},
  checkForWinner: () => {},
});

const SocketsProvider = ({ children }: any) => {
  const [canChoose, setCanChoose] = useState(false);
  const [playerOneConnected, setPlayerOneConnected] = useState(false);
  const [playerTwoConnected, setPlayerTwoConnected] = useState(false);
  const [playerId, setPlayerId] = useState(0);
  const [playerOneChoice, setPlayerOneChoice] = useState('');
  const [playerTwoChoice, setPlayerTwoChoice] = useState('');
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [room, setRoom] = useState();
  const [openJoinRoom, setOpenJoinRoom] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [isCreate, setIsCreate] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [winner, setWinner] = useState({
    status: false,
    message: '',
  });

  const createRoom = (id: string) => {
    setError({
      status: false,
      message: '',
    });

    socket.emit('create_room', id);
  };

  const joinRoom = (id: string) => {
    setError({
      status: false,
      message: '',
    });

    socket.emit('join_room', id);
  };

  const joinRandom = () => {
    setError({
      status: false,
      message: '',
    });

    socket.emit('join_random');
  };

  const checkForConnected = (playerId: number) => {
    if (playerId === 1) {
      setPlayerOneConnected(true);
    } else {
      setPlayerTwoConnected(true);
    }
  };
  const displayScore = useCallback(() => {
    setPlayerOneScore(playerOneScore);
    setPlayerTwoScore(playerTwoScore);
  }, [playerOneScore, playerTwoScore]);

  const reset = useCallback(() => {
    setCanChoose(false);
    setPlayerOneConnected(false);
    setPlayerTwoConnected(false);
    setRoom(undefined);
    setRoomId('');
    setIsCreate(false);
    setOpenCreateRoom(false);
    setOpenJoinRoom(false);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);

    displayScore();
  }, [displayScore]);

  const playerTwoLeftTheGame = () => {
    setPlayerTwoConnected(false);
  };

  const choose = (choice: string) => {
    console.log({ choice });
    if (choice === 'rock') {
      setPlayerOneChoice('rock');
    } else if (choice === 'paper') {
      setPlayerOneChoice('paper');
    } else {
      setPlayerOneChoice('scissors');
    }

    setCanChoose(false);
  };

  const removeChoice = (choice: string) => {
    if (choice === 'rock') {
      setPlayerOneChoice('');
    } else if (choice === 'paper') {
      setPlayerOneChoice('');
    } else {
      setPlayerOneChoice('');
    }
  };

  const checkForWinner = useCallback(
    (message: string) => {
      setWinner({
        status: true,
        message: message,
      });

      setTimeout(() => {
        removeChoice(playerOneChoice);
        setPlayerTwoChoice('');
        setCanChoose(true);
        setWinner({
          status: false,
          message: '',
        });
      }, 3000);
    },
    [playerOneChoice]
  );

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('display_error', (error) => {
      setError({
        status: true,
        message: error,
      });
    });

    socket.on('room_created', (id) => {
      setPlayerId(1);
      setRoomId(id);
      setRoom(id);
      console.log('room created');
    });

    socket.on('player_1_connected', () => {
      checkForConnected(1);
    });

    socket.on('player_2_connected', () => {
      checkForConnected(2);
      setCanChoose(true);
    });

    socket.on('room_joined', (room) => {
      setPlayerId(2);
      setRoomId(room);
      setRoom(room);
      setPlayerOneConnected(true);
    });

    socket.on('player_1_disconnected', () => {
      reset();
    });

    socket.on('player_2_disconnected', () => {
      setCanChoose(false);
      playerTwoLeftTheGame();
      setPlayerTwoScore(0);
      setPlayerOneScore(0);
      displayScore();
    });

    socket.on('draw', (message) => {
      setWinner({
        status: true,
        message: message,
      });
    });

    socket.on('player_1_wins', (message) => {
      setPlayerOneScore(playerOneScore + 1);
      checkForWinner(message);
    });
    socket.on('player_2_wins', (message) => {
      setPlayerTwoScore(playerTwoScore + 1);
      checkForWinner(message);
    });
  }, [checkForWinner, displayScore, playerOneScore, playerTwoScore, reset]);
  return (
    <SocketContext.Provider
      value={{
        socket,
        canChoose,
        setCanChoose,
        playerOneConnected,
        setPlayerOneConnected,
        playerTwoConnected,
        setPlayerTwoConnected,
        playerId,
        setPlayerId,
        playerOneChoice,
        setPlayerOneChoice,
        playerTwoChoice,
        setPlayerTwoChoice,
        playerOneScore,
        setPlayerOneScore,
        playerTwoScore,
        setPlayerTwoScore,
        room,
        setRoom,
        openJoinRoom,
        setOpenJoinRoom,
        openCreateRoom,
        setOpenCreateRoom,
        roomId,
        setRoomId,
        isCreate,
        setIsCreate,
        error,
        setError,
        winner,
        setWinner,
        createRoom,
        joinRoom,
        joinRandom,
        checkForConnected,
        reset,
        playerTwoLeftTheGame,
        displayScore,
        choose,
        removeChoice,
        checkForWinner,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketsProvider');
  }
  return context;
};

export { SocketsProvider, useSocket };

// Language: typescript
