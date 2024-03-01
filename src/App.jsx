import "./App.css"
import { deleteJoke, getAllJokes, postJoke, updateJokeStatus } from "./JokeService.jsx"
import stevePic from "./assets/steve.png"
import {useEffect, useState} from "react"

export const App = () => {
  const [newUserJoke, setNewUserJoke] = useState([])
  const [allJokes, setAllJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [count, setCount] = useState(0)

const refreshJokes = () => {
  getAllJokes().then((jokesArray) => {
    setAllJokes(jokesArray)
  })
}


useEffect(() => {
  refreshJokes()
}, [])

useEffect(() => {

  const allToldJokes = allJokes.filter(joke => joke.told === true)
  setToldJokes(allToldJokes)

  const allUntoldJokes = allJokes.filter(joke => joke.told === false)
  setUntoldJokes(allUntoldJokes)

}, [allJokes])



return (
<>
  <div className="app-heading">
    <div className="app-heading-circle">
      <img className="app-logo" src={stevePic} alt="Good job Steve"/>
    </div>
    <div className="app-heading-text">
      <h1>Chuckle Checklist</h1>
    </div>
    <input
      className="joke-add-form"
      type="text"
      placeholder="New One Liner"
      value={newUserJoke}
      onChange={(event) => {
        setNewUserJoke(event.target.value)
      }}/>
    <div>
      <button className="joke-input-submit :hover"
        onClick={ async () => {
          await postJoke(newUserJoke)
          setNewUserJoke("")
          refreshJokes()
        }}>Add Joke</button>
    </div>
    <div className="joke-lists-container">
      <div className="joke-list-container">
        <div className="joke-list-container-heading">
          <h2 className="joke-label">Told Jokes</h2>
          <ul>
            {toldJokes.map(joke => {
            return (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <button className="joke-btn btn secondary" onClick = {() => {
                  updateJokeStatus(joke)
                  refreshJokes()
                }}>
                  Untell Joke
                </button>
                <button className="joke-btn btn-secondary" onClick = {() => {
                  deleteJoke(joke)
                  refreshJokes()
                }}>Delete Joke</button>
              </li>
            )
          })}
          </ul>
          <h2 className="joke-label">Untold Jokes</h2>
          <ul>
          {untoldJokes.map(joke => {
            return ( 
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <button className="joke-btn btn secondary" onClick={() => {
                  updateJokeStatus(joke)
                  refreshJokes()
                }}>
                  Tell Joke
                </button>
                <button className="joke-btn btn-secondary" onClick = {() => {
                  deleteJoke(joke)
                  refreshJokes()
                }}>Delete Joke</button>
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    </div>
  </div>
</>
)

}