import { useEffect, useState, useRef } from 'react'
import './App.css'

function formatTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  // Pad with leading zeros if needed
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

function getFlagEmoji(countryCode:string) {
  if (typeof countryCode !== 'string' || countryCode.length !== 2) {
    return "";
  }

  // Convert to uppercase and map each character to regional indicator symbols
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 0x1F1E6 + char.charCodeAt(0) - 65);

  return String.fromCodePoint(...codePoints);
}

function App() {
  const [player1, setPlayer1] = useState("Player 1")
  const [player2, setPlayer2] = useState("Player 2")
  const [player1Seed, setPlayer1Seed] = useState('1')
  const [player2Seed, setPlayer2Seed] = useState('16')
  const [player1Country, setPlayer1Country] = useState("us")
  const [player2Country, setPlayer2Country] = useState("jp")
  const [commentator1Country, setCommentator1Country] = useState("us")
  const [commentator2Country, setCommentator2Country] = useState("jp")
  const [player1Timer, setPlayer1Timer] = useState(0)
  const [player2Timer, setPlayer2Timer] = useState(0)
  const [player1TimerIsActive, setPlayer1TimerIsActive] = useState(false)
  const [player2TimerIsActive, setPlayer2TimerIsActive] = useState(false)
  const [player1Minutes, setPlayer1Minutes] = useState("")
  const [player1Seconds, setPlayer1Seconds] = useState("")
  const [player2Minutes, setPlayer2Minutes] = useState("")
  const [player2Seconds, setPlayer2Seconds] = useState("")
  const [player1Finished, setPlayer1Finished] = useState(false)
  const [player2Finished, setPlayer2Finished] = useState(false)
  const [commentator1, setCommentator1] = useState("Commentator 1")
  const [commentator2, setCommentator2] = useState("Commentator 2")
  const player1Interval = useRef<number | null>(null)
  const player2Interval = useRef<number | null>(null)

  const handleStart = (isRunning : boolean, setIsRunning : React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsRunning(true);
    console.log(isRunning); // im lazy sorry
  };

  const handlePause = (setIsRunning : React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsRunning(false);
  };

  const handleStop = (setIsRunning : React.Dispatch<React.SetStateAction<boolean>>, setTime : React.Dispatch<React.SetStateAction<number>>) => {
    setIsRunning(false);
    setTime(0);
  };

  const handleSetTimer = (
    minutes: string,
    seconds: string,
    setTimer: React.Dispatch<React.SetStateAction<number>>,
    setMinutes: React.Dispatch<React.SetStateAction<string>>,
    setSeconds: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const minutesNum = parseInt(minutes) || 0;
    const secondsNum = parseInt(seconds) || 0;
    const totalMilliseconds = (minutesNum * 60 + secondsNum) * 1000;
    setTimer(totalMilliseconds);
    setMinutes("");
    setSeconds("");
  };

// Player 1 Timer

  useEffect(() => {
    if (player1TimerIsActive) {
      player1Interval.current = setInterval(() => {
        setPlayer1Timer(prevTime => prevTime + 10);
      }, 10);
    }

    return () => {
      if (player1Interval.current !== null) clearInterval(player1Interval.current)
    }
  }, [player1TimerIsActive]);

  useEffect(() => {
    if (player2TimerIsActive) {
      player2Interval.current = setInterval(() => {
        setPlayer2Timer(prevTime => prevTime + 10);
      }, 10);
    }

    return () => {
      if (player2Interval.current !== null) clearInterval(player2Interval.current)
    }
  }, [player2TimerIsActive]);
  
  const splitPronouns = (pronouns: string): [string, string] => {
    const parts = pronouns.split("/");
    if (parts.length === 2 && parts[0].trim() && parts[1].trim()) {
      return [parts[0].trim(), parts[1].trim()];
    } else {
      return ["", ""]; // return blanks if the format isn't valid
    }
  };
  
  const [player1Pronouns, setPlayer1Pronouns] = useState("He/Him")
  const [player2Pronouns, setPlayer2Pronouns] = useState("She/Her")
  const [player1Subject, player1Object] = splitPronouns(player1Pronouns);
  const [player2Subject, player2Object] = splitPronouns(player2Pronouns);
  const [commentator1Pronouns, setCommentator1Pronouns] = useState("He/Him")
  const [commentator2Pronouns, setCommentator2Pronouns] = useState("She/Her")
  const [commentator1Subject, commentator1Object] = splitPronouns(commentator1Pronouns);
  const [commentator2Subject, commentator2Object] = splitPronouns(commentator2Pronouns);

  return (
    <>
    <div className='layout'> {/* Visual On The Stream */}
      <div className='outerplayercontainer right' id='player1'> {/* Player 1 Name And Seed */}
        <div className='center'>
          <div className='innerplayercontainer'><div className='seed'>{player1Seed}</div><div className='player'>{player1.toUpperCase()}</div></div>
        </div>
      </div>
      
      <div className='outerplayercontainer left' id='player2'> {/* Player 2 Name And Seed */}
        <div className='center'>
          <div className='innerplayercontainer'><div className='player'>{player2.toUpperCase()}</div><div className='seed'>{player2Seed}</div></div>
        </div>
      </div>

      <div className='commentary' id='commentator1'>{commentator1.toUpperCase()}</div>
      <div className='commentary' id='commentator2'>{commentator2.toUpperCase()}</div>
      
      <div className='timer' id='timer1' style={{ color: player1Finished ? 'gold' : 'white' }}>{formatTime(player1Timer)}</div>
      <div className='timer' id='timer2' style={{ color: player2Finished ? 'gold' : 'white' }}>{formatTime(player2Timer)}</div>

      <div className='playerflag' id="player1flag">{getFlagEmoji(player1Country)}</div>
      <div className='playerpronouns left' id='playerpronouns1'>
        <div className='top'>{player1Subject.toUpperCase()}</div>
        <div className='bottom'>{player1Object.toUpperCase()}</div>
      </div>

      <div className='playerflag' id="player2flag">{getFlagEmoji(player2Country)}</div>
      <div className='playerpronouns right' id='playerpronouns2'>
        <div className='top'>{player2Subject.toUpperCase()}</div>
        <div className='bottom'>{player2Object.toUpperCase()}</div>
      </div>

      <div className='commentatorflag' id="commentator1flag">{getFlagEmoji(commentator1Country)}</div>
      <div className='commentatorpronouns' id="commentatorpronouns1">
        <div className='top'>{commentator1Subject.toUpperCase()}</div>
        <div className='bottom'>{commentator1Object.toUpperCase()}</div>
      </div>

      <div className='commentatorflag' id="commentator2flag">{getFlagEmoji(commentator2Country)}</div>
      <div className='commentatorpronouns' id="commentatorpronouns2">
        <div className='top'>{commentator2Subject.toUpperCase()}</div>
        <div className='bottom'>{commentator2Object.toUpperCase()}</div>
      </div>
    </div>

    <div className='controls'>
      <div className='playerinfo'>
        <div className='player1info'>
          <input type='text' value={player1} onChange={(e) => setPlayer1(e.target.value)} />
          <input type='text' value={player1Pronouns} onChange={(e) => setPlayer1Pronouns(e.target.value)} />
          <input type='text' value={player1Country} onChange={(e) => setPlayer1Country(e.target.value)} />
          <input type='text' value={player1Seed} onChange={(e) => setPlayer1Seed(e.target.value)} />
        </div>
        <div className='player2info'>
          <input type='text' value={player2} onChange={(e) => setPlayer2(e.target.value)} />
          <input type='text' value={player2Pronouns} onChange={(e) => setPlayer2Pronouns(e.target.value)} />
          <input type='text' value={player2Country} onChange={(e) => setPlayer2Country(e.target.value)} />
          <input type='text' value={player2Seed} onChange={(e) => setPlayer2Seed(e.target.value)} />
        </div>
      </div>
      <div className='commentatorinfo'>
        <div className='commentator1info'>
          <input type='text' value={commentator1} onChange={e => setCommentator1(e.target.value)} />
          <input type='text' value={commentator1Pronouns} onChange={e => setCommentator1Pronouns(e.target.value)} />
          <input type='text' value={commentator1Country} onChange={e => setCommentator1Country(e.target.value)} />
        </div>
        <div className='commentator2Info'>
          <input type='text' value={commentator2} onChange={e => setCommentator2(e.target.value)} />
          <input type='text' value={commentator2Pronouns} onChange={e => setCommentator2Pronouns(e.target.value)} />
          <input type='text' value={commentator2Country} onChange={e => setCommentator2Country(e.target.value)} />
        </div>
      </div>
      <div className='timercontrols'>
        <button className='pause' onClick={() => {handlePause(setPlayer1TimerIsActive); handlePause(setPlayer2TimerIsActive);}}>Pause Both Player Timers</button>
        <button className='start' onClick={() => {handleStart(player1TimerIsActive, setPlayer1TimerIsActive); handleStart(player2TimerIsActive, setPlayer2TimerIsActive); }}>Start Both Player Timers</button>
        <button className='stop' onClick={() => {handleStop(setPlayer1TimerIsActive, setPlayer1Timer); handleStop(setPlayer2TimerIsActive, setPlayer2Timer)}}>Stop Both Player Timers</button>
      </div>
      <div className='timercontrols'>
        <button className='pause' onClick={() => handlePause(setPlayer1TimerIsActive)}>Pause Player 1 Timer</button>
        <button className='start' onClick={() => handleStart(player1TimerIsActive, setPlayer1TimerIsActive)}>Start Player 1 Time</button>
        <button className='stop' onClick={() => handleStop(setPlayer1TimerIsActive, setPlayer1Timer)}>Stop Player 1 Time</button>
        <button 
          className={`finished ${player1Finished ? 'active' : ''}`} 
          onClick={() => setPlayer1Finished(!player1Finished)}
        >
          {player1Finished ? 'Unmark Finished' : 'Mark Finished'}
        </button>
        <div className='timerinputs'>
          <input
            type="number"
            min="0"
            placeholder="Minutes"
            value={player1Minutes}
            onChange={(e) => setPlayer1Minutes(e.target.value)}
          />
          <input
            type="number"
            min="0"
            max="59"
            placeholder="Seconds"
            value={player1Seconds}
            onChange={(e) => setPlayer1Seconds(e.target.value)}
          />
          <button onClick={() => handleSetTimer(player1Minutes, player1Seconds, setPlayer1Timer, setPlayer1Minutes, setPlayer1Seconds)}>
            Set Timer
          </button>
        </div>
      </div>
      <div className='timercontrols'>
        <button className='pause' onClick={() => handlePause(setPlayer2TimerIsActive)}>Pause Player 2 Timer</button>
        <button className='start' onClick={() => handleStart(player2TimerIsActive, setPlayer2TimerIsActive)}>Start Player 2 Time</button>
        <button className='stop' onClick={() => handleStop(setPlayer2TimerIsActive, setPlayer2Timer)}>Stop Player 2 Time</button>
        <button 
          className={`finished ${player2Finished ? 'active' : ''}`} 
          onClick={() => setPlayer2Finished(!player2Finished)}
        >
          {player2Finished ? 'Unmark Finished' : 'Mark Finished'}
        </button>
        <div className='timerinputs'>
          <input
            type="number"
            min="0"
            placeholder="Minutes"
            value={player2Minutes}
            onChange={(e) => setPlayer2Minutes(e.target.value)}
          />
          <input
            type="number"
            min="0"
            max="59"
            placeholder="Seconds"
            value={player2Seconds}
            onChange={(e) => setPlayer2Seconds(e.target.value)}
          />
          <button onClick={() => handleSetTimer(player2Minutes, player2Seconds, setPlayer2Timer, setPlayer2Minutes, setPlayer2Seconds)}>
            Set Timer
          </button>
        </div>
      </div>
    </div>

    </>

  )
}

export default App
