import { useState } from 'react'
import './App.css'

function formatTime(seconds:number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad with leading zeros if needed
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

function getFlagEmoji(countryCode:string) {
  if (typeof countryCode !== 'string' || countryCode.length !== 2) {
    throw new Error("Country code must be a 2-letter string.");
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
  const [commentator1, setCommentator1] = useState("Commentator 1")
  const [commentator2, setCommentator2] = useState("Commentator 2")
  
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
      
      <div className='timer' id='timer1'>{formatTime(player1Timer)}</div>
      <div className='timer' id='timer2'>{formatTime(player2Timer)}</div>

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
    </div>

    </>

  )
}

export default App
