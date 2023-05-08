import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {Component} from 'react'
import ParaScore from '../styledComponents'
import './index.css'

class RockPaperScissors extends Component {
  state = {
    score: 0,
    status: false,
    me: '',
    image: '',
    matchItem: '',
  }

  getDetails = item => {
    const {score} = this.state
    let yourScore = score

    const {choicesList} = this.props
    const y = choicesList.find(each => each.id === item)
    const my = y.imageUrl
    const r = choicesList[Math.ceil(Math.random() * 100) % 3]
    const opp = r.imageUrl
    const item1 = y.id
    const item2 = r.id

    let matchStatus
    if (item1 === 'ROCK' && item2 === 'SCISSORS') {
      matchStatus = 'YOU WON'
      yourScore += 1
    } else if (item1 === 'SCISSORS' && item2 === 'PAPER') {
      matchStatus = 'YOU WON'
      yourScore += 1
    } else if (item1 === 'PAPER' && item2 === 'ROCK') {
      matchStatus = 'YOU WON'
      yourScore += 1
    } else if (item1 === item2) {
      matchStatus = 'IT IS DRAW'
    } else {
      matchStatus = 'YOU LOSE'
      yourScore -= 1
    }
    this.setState({
      me: my,
      image: opp,
      status: true,
      matchItem: matchStatus,
      score: yourScore,
    })
  }

  initial = () => {
    const {choicesList} = this.props
    const v = ['rockButton', 'paperButton', 'scissorsButton']
    let k = -1
    return (
      <ul>
        {choicesList.map(each => {
          k += 1
          return (
            <li key={v[k]}>
              <button
                type="button"
                onClick={() => this.getDetails(each.id)}
                data-testid={v[k]}
              >
                <img src={each.imageUrl} height={60} width={60} alt={each.id} />
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  onDo = () => {
    this.setState({
      status: false,
    })
  }

  details = () => {
    const {me, image, matchItem} = this.state

    return (
      <div>
        <p>YOU</p>
        <img src={me} height={60} width={60} alt="your choice" />
        <p>OPPONENT</p>
        <img src={image} height={60} width={60} alt="opponent choice" />

        <p>{matchItem}</p>

        <button type="button" onClick={this.onDo} className="playagainButton">
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {score, status} = this.state
    const u = score
    return (
      <div className="continer">
        <h1>Rock Paper Scissors</h1>
        <div className="game-container">
          <div>
            <p>Rock</p>
            <p>Paper</p>
            <p>Scissors</p>
          </div>
          <div className="scorevalue">
            <p className="cm-para">Score</p>
            <ParaScore>{u}</ParaScore>
          </div>
        </div>
        <div>
          {status === false ? this.initial() : null}
          {status ? this.details() : null}
        </div>
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                Rules
              </button>
            }
          >
            {close => (
              <>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                  />
                </div>
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  Close
                </button>
              </>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}
export default RockPaperScissors
