import { Route } from 'react-router-dom';

var React = require('react')
class DeathRollPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            gamePhase : 0,
            teams:{
                team1: '',
                team2: ''
            },
            drinks: 0,
            coinSide: ''
        }
    }

    setGamePhase = () =>{
        var gamePhaseVar = this.state.gamePhase
        var team1Var = this.state.teams.team1
        var team2Var = this.state.teams.team2
        if(gamePhaseVar<5){
            if(gamePhaseVar == 1 && team1Var == ''){
                team1Var = 'Team 1'
            }
            if(gamePhaseVar == 1 && team2Var == ''){
                team2Var = 'Team 2'
            }
            gamePhaseVar=gamePhaseVar+1
        }else{
            gamePhaseVar=1
        }
        this.setState({
            gamePhase:gamePhaseVar,
            teams:{
                team1:team1Var,
                team2:team2Var
            }
        })
    }

    handleChange = (event) => {
        if (event.target.id == 'team1Name'){
            this.setState({
                teams: {
                    team1:event.target.value,
                    team2:this.state.teams.team2
                }
            });
        }
        if (event.target.id == 'team2Name'){
            this.setState({
                teams: {
                    team1:this.state.teams.team1,
                    team2:event.target.value
                }
            });
        }
        console.log(this.state)
    }

    flipCoin = () =>{
        var flipResult = Math.random();
        this.setState({
            coinSide: ''
        })
        setTimeout(()=>{
            if(flipResult <= 0.5){
                this.setState({
                    coinSide: 'heads'
                })
            }
            else{
                this.setState({
                    coinSide: 'tails'
                })
            }
        }, 100);
    }

    render(){
        return(
            <div className='flex-column flex_spaceCenter flex_stretch' style={{'textAlign':'center'}}>
                <h1>Death Roll</h1>

                {this.state.gamePhase == 0 &&
                    <div>
                        <h2>Instructions</h2>
                        <ol>
                            <li>Two people or teams choose to face off</li>
                            <li>A coinflip happens to determine who chooses the wager</li>
                            <li>The person/team makes a wager of a certain number of drinks, that number is multiplied by 10 and becomes the upperbound of the first death roll in the game</li>
                            <li>Once the initial roll finishes, the number from the initial roll becomes the upper bound for the next roll</li>
                            <li>The above process repeats until one team rolls a 1 and loses</li>
                            <button 
                            onClick={this.setGamePhase}
                            className='submitButton'>
                                I certify that I understand the game deathroll and will drink responsibly while playing
                            </button>
                        </ol>
                    </div>
                }

                {this.state.gamePhase == 1 &&
                    <div>
                        <h2>Enter the Team Name</h2>
                        <p>Team 1 Name</p>
                        <input id ='team1Name' type='text' value={this.state.teams.team1} onChange={this.handleChange}></input>
                        <p>Team 2 Name</p>
                        <input id ='team2Name' type='text' value={this.state.teams.team2} onChange={this.handleChange}></input>
                        <button onClick={this.setGamePhase} className='submitButton'>Submit</button>
                    </div>
                }

                {this.state.gamePhase == 2 &&
                    <div className='flex-row'>
                        <div className='flex-column' style={{flex:1}}>
                            <h2>The blue team is</h2>
                            <p style={{'color':'#3348FF'}}>{this.state.teams.team1}</p>
                        </div>
                        <div className='flex-column' style={{flex:2}}>
                            <a id="coin" className={this.state.coinSide} onClick={this.flipCoin}>
                                <div className="side-a"></div>
                                <div className="side-b"></div>
                            </a>
                        </div>
                        <div className='flex-column' style={{flex:1}}>
                            <h2>The red team is</h2>
                            <p style={{'color':'#bb0000'}}>{this.state.teams.team2}</p>
                        </div>
                    </div>
                }
                {this.state.gamePhase==2 && this.state.coinSide == 'tails' &&
                    <div className='coinText' style={{'textAlign':'center'}}>
                        <h2 className='coinText'>{this.state.teams.team1+" will wager the following amount of drinks"}</h2>
                        <input type='text'></input>
                        <button onClick={this.setGamePhase} className='submitButton'>Submit</button>
                    </div>
                }
                {this.state.gamePhase==2 && this.state.coinSide == 'heads' &&
                    <div className='coinText' style={{'textAlign':'center'}}>
                        <h2>{this.state.teams.team2+" will wager the following amount of drinks"}</h2>
                        <input type='text'></input>
                        <button onClick={this.setGamePhase} className='submitButton'>Submit</button>
                    </div>
                }

                {this.state.gamePhase == 3 &&
                    <div className='flex-row'>
                    </div>
                }
            </div>
        )
    }
}

export default DeathRollPage 