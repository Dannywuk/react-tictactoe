import React, { Component } from 'react';
import './App.css';
import Replay from './repeat.png'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      player: "O",
      winner: null,
      turn: 0,
      status: "Tic Tac Toe",
      p1Win: 0,
      p2Win: 0,
      draw: 0
    }
  }

  
  getInput=(index)=>{
    
    let newBoard= [...this.state.squares]

    if (this.state.squares[index]=== null && this.state.winner===null){

        newBoard[index]=this.state.player
         this.setState ({
            squares: newBoard
         })
        if (this.checkWin(newBoard)) {
            this.setState({
                winner: this.state.player
            })
            this.scoreBoard()
        } else {
            this.checkTie(newBoard)
        }

        this.setState({
            // squares: newBoard,
            turn: this.state.turn + 1,
            player: this.state.player=== "O"? "X" :"O"
        }) 
    }
  }


  checkWin=(board)=>{
    
    let winningCombo= [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["0", "4", "8"],
        ["2", "4", "6"]
    ];

    for (let index = 0; index <winningCombo.length; index++) {
        const [a,b,c] =winningCombo[index];
        
        if (board[a] && board[a]===board[b] && board[a]===board[c] && board[b]===board[c]){
            // alert(`${this.state.player} Won!!`)

            // this.scoreBoard()

            return true
        }
    } 
    return false
}
  

  checkTie=(board)=>{
   
    if (!this.checkWin(board) && this.state.turn === 8){
         this.setState({
            status: "Game Draw",
            draw: this.state.draw + 1
         })
     }
  }

  scoreBoard=()=>{
    
    if (this.state.player==="O") {
        this.setState ({
            status: "Player 1 Won!!!",
            p1Win: this.state.p1Win +1 
        })
    }
    else if (this.state.player==="X"){
       this.setState ({
            status: "Player 2 Won!!!",
            p2Win: this.state.p2Win +1 
       }) 
    } 
  }


  resetGame=()=>{

    this.setState ({
      squares: Array(9).fill(null),
      player: "O",
      winner: null,
      turn: 0,
      status: "Tic Tac Toe",
    })
  }


    

  render() {

    const Box= this.state.squares.map((box, index)=> <div className="gameBox" key={index} onClick={()=>this.getInput(index)}>{box}</div>)

    return (
      <div className="App">
        <header className="App-header">
          <h1 id="title"> {this.state.status}</h1>
        </header>

        <div className="board-flex">
          <div className="flex-container">
            {Box}
          </div>
        </div>
          
        <div className="record-flex">
         <table id="record">
             <thead>
                 <tr>
                     <th>Player 1</th>
                     <th>Draw</th>
                     <th>Player 2</th>
                 </tr>
             </thead>
             <tbody>
                 <tr>
                     <td id="player-1">{this.state.p1Win}</td>
                     <td id="draw">{this.state.draw}</td>
                     <td id="player-2">{this.state.p2Win}</td>
                 </tr>
             </tbody>
         </table>
         <div className="reset" onClick={()=>this.resetGame()}><img src={Replay} alt="Play again"/></div>   
        </div>
      </div>
    );
  }
}

export default App;
