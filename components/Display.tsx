import Image from 'next/image';

const Display = ({
  styles,
  playerOne: { connected, score },
  playerTwo: { connected: connected2, score: score2 },
  canChoose,
  choose,
  socket,
  playerId,
  roomId,
  playerOneChoice,
}: any): JSX.Element => {
  const makeMove = (choice: string) => {
    if (canChoose) {
      choose(choice);
      socket.emit('make_move', {
        roomId,
        myChoice: choice,
        playerId,
      });
    }
  };

  return (
    <div className={styles.rock__paper__scissors}>
      <header className={styles.header}>
        {connected && connected2 ? (
          <h1>Rock Paper Scissors</h1>
        ) : (
          <h1>Waiting for player 2...</h1>
        )}
        {connected && <p>Player 1 ID: {playerId}</p>}
        <p>Player 1 is {connected ? 'connected' : 'not connected'}</p>
        {connected2 && <p>Player 2 ID: {playerId}</p>}
        <p>Player 2 is {connected2 ? 'connected' : 'not connected'}</p>
      </header>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className={styles.rock__paper__scissors__container}
      >
        <h1>
          {score} - {score2}
          {playerOneChoice} - {roomId}
        </h1>
        <div className={styles.rock__paper__scissors__container__item}>
          <Image
            src="/rock.png"
            alt="rock"
            width={200}
            height={128}
            className={styles.rock__paper__scissors__container__item__image}
            onClick={() => {
              makeMove('rock');
            }}
          />
        </div>
        <div className={styles.rock__paper__scissors__container__item}>
          <Image
            src="/paper.png"
            alt="paper"
            width={200}
            height={128}
            className={styles.rock__paper__scissors__container__item__image}
            onClick={() => {
              makeMove('paper');
            }}
          />
        </div>
        <div className={styles.rock__paper__scissors__container__item}>
          <Image
            src="/scissors.png"
            alt="scissors"
            width={200}
            height={128}
            className={styles.rock__paper__scissors__container__item__image}
            onClick={() => {
              makeMove('scissors');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Display;
