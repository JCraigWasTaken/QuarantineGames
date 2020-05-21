import React from 'react';

import mainLogo from '../media/main-logo.png';
import deathBoxLogo from '../media/deathBox-logo.png';
import deathRollLogo from '../media/deathRoll-logo.png';

import MobileGameCard from '../comps/mobileGameCard.js';
import DeathBoxHowToPlayFrontPage from '../comps/deathBoxHowToPlayFrontPage.js'
import DeathRollHowToPlayFrontPage from '../comps/deathRollHowToPlayFrontPage.js'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.initState = {
            link:null,
            flipClass: '',
            buttonAnimation: '',
            buttonVisible: 'hidden',
            firstLogo: deathBoxLogo,
            firstTitle: '',
            firstInstructions : '',
            firstClass: '',
            secondLogo: mainLogo,
            secondTitle:'',
            secondInstructions:'',
            secondClass: '',
            cardVisible: 'hidden',
            reloadID:[0,1,2,3,4,5]
        };
        this.state = this.initState;
        this.deathBoxInstructions = 'This game can have any amount of players. The game starts with a grid made of 4 rows of 4 cards laid out in front of you. You must guess higher or lower for any card face up in the grid. Once you guess, a card is pulled from the deck and placed on top of the card in the grid. If you guess incorrectly, you must drink an amount of drinks equivalent to the pile size underneath the card you picked and you must go again. If you do not want to do that, you can hit the baby button and you are out of the game. If you guess correctly 3 times in a row (or 2 times once the grid is 2x2) your turn is over. Once the deck is completely dealt out, the row or column with the highest number of cards gets reshuffled into a new deck. The game ends once the deck of card is complete, or if everyone has hit the baby button.';
        this.deathRollInstructions = 'This game takes place between two teams. The two teams flip a coin to start, and the winning team gets to wager any amount of drinks between 1 and 99. That amount of drinks is multiplied by 10 and set as the maximum roll value (ie. 20 drinks would mean a maximum roll of 200). The game then begins and the team that lost the coin toss makes their first roll. Each roll gives a number from 1 to the value previously rolled, (ie. roll one would be any number from 1-200, so if a 50 is rolled, the next roll would be any number from 1-50). The rolling team alternates between rolls, and the first team to roll a 1 loses and must drink the wagered amount.';
        this.deathBoxLink = window.location.href+"death-box";
        this.deathRollLink = window.location.href+"death-roll";
      }

    pickGame = (e) =>{
        var target = e.target.id;
        var timeoutTime = 0;
        if(this.state.flipClass == ' flip-card-inner-flipped'){
            this.setState({
                flipClass: '',
                cardVisible: 'hidden',
                buttonAnimation:'',
                buttonVisible: 'hidden'
            });
            timeoutTime = 2000;
        }
        setTimeout(()=>{
            if(target == 'DeathBox'){
                if (this.state.secondTitle != 'Death Box'){
                    this.setState({
                        firstLogo: this.state.secondLogo,
                        firstTitle: this.state.secondTitle,
                        firstInstructions: this.state.secondInstructions,
                        firstClass:'card-1',
                        secondLogo: deathBoxLogo,
                        secondTitle: 'Death Box',
                        secondInstructions: this.deathBoxInstructions,
                        secondClass:'card-2',
                        link: this.deathBoxLink,
                        buttonAnimation:'fadeText 3s ease-out forwards',
                        buttonVisible: 'visible',
                        cardVisible: 'visible',
                        reloadID:[Date.now(),Date.now()+1,Date.now()+2,Date.now()+3,Date.now()+4,Date.now()+5]
                    })
                }
            }else if(target == 'DeathRoll'){
                if (this.state.secondTitle != 'Death Roll'){
                    this.setState({
                        firstLogo: this.state.secondLogo,
                        firstTitle: this.state.secondTitle,
                        firstInstructions: this.state.secondInstructions,
                        firstClass:'card-1',
                        secondLogo: deathRollLogo,
                        secondTitle: 'Death Roll',
                        secondInstructions: this.deathRollInstructions,
                        secondClass:'card-2',
                        link: this.deathRollLink,
                        buttonAnimation:'fadeText 3s ease-out forwards',
                        buttonVisible: 'visible',
                        cardVisible: 'visible',
                        reloadID:[Date.now(),Date.now()+1,Date.now()+2,Date.now()+3,Date.now()+4,Date.now()+5]
                    })
                }
            }
        }, timeoutTime);
    }

    flipCard = () =>{
            if (this.state.flipClass == '')
                this.setState({
                    flipClass:' flip-card-inner-flipped',
                    cardVisible: 'hidden'
                })
            else(
                this.setState({
                    flipClass:'',
                    cardVisible: 'hidden'
                })
            )
    }

    openLink = () =>{
        this.props.openLink(this.state.link);
    }

    render(){
        return(
            <div className='flex-RowToColumn_Tablet padding_horizontal8' style={{'height':'100%'}}>
                {/*Desktop Layout Here Down*/}
                <div className='flex-column margin_horizontal4 showDesktop_HideTablet' style={{'flex':'5', 'margin-left':'0'}}>
                    <h1 className='color-text_dominant' style = {{'margin-left':'0', 'flex':'2', 'marginTop':'30px', 'marginBottom':'50px'}}>Bored Games</h1>
                    <div className ='flex-column flex_spaceCenter' style={{'height':'100%'}}>
                        <div className = 'flip-cardPile'>
                            <div key = {this.state.reloadID[0]} className = {"flip-card "+this.state.firstClass+this.state.flipClass}  style = {{'visibility':this.state.cardVisible}}>
                                <div class={'flip-card-inner flex-column flex_Center'}>
                                    <div className={'flip-card-front'}>
                                        <div>
                                            <img src={this.state.firstLogo}></img>
                                        </div>
                                    </div>
                                    <div className={'flip-card-back flex-column flex_spaceEvenly color-text_light'} style={{'width':'90%'}}>
                                        <h2>{this.state.firstTitle}</h2>
                                        <p>{this.state.firstInstructions}</p>
                                    </div>
                                </div>
                            </div>
                            <div key = {this.state.reloadID[1]} className = {"flip-card "+this.state.secondClass+this.state.flipClass}>
                                <div class={'flip-card-inner flex-column flex_Center'}>
                                    <div className={'flip-card-front'}>
                                        <div>
                                            <img src={this.state.secondLogo}></img>
                                        </div>
                                    </div>
                                    <div className={'flip-card-back flex-column flex_spaceEvenly color-text_light'} style={{'width':'90%'}}>
                                        <h2>{this.state.secondTitle}</h2>
                                        <p>{this.state.secondInstructions}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='buttonRow' style={{'flex':'2', 'marginTop':'50px'}}>
                            <div key = {this.state.reloadID[2]} className='flex-row flex_Center' style={{'animation':this.state.buttonAnimation, 'visibility':this.state.buttonVisible}}>
                                <button className='submitButton' style={{'width':'50%'}} onClick={this.flipCard}>Rules</button>
                                <button className='submitButton' style={{'width':'50%'}} onClick={this.openLink}>Play</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-column showDesktop_HideTablet' style={{'flex':'5'}}>
                    <div className='homePageButtonRow'>
                        <button id='DeathRoll' onClick={this.pickGame} className='homePageButton'>Death Roll</button>
                        <div id='arrow'>
                            <div id='arrowBody'>
                            </div>
                        </div>
                    </div>
                    <div className='homePageButtonRow'>
                        <button id='DeathBox' onClick={this.pickGame} className='homePageButton'>Death Box</button>
                        <div id='arrow'>
                            <div id='arrowBody'>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Mobile And Tablet Layout Here Down*/}
                <div className='showTablet_HideDesktop' style={{'textAlign':'center', 'flex':'1'}}>
                    <h1 className='color-text_dominant' style = {{'margin-left':'0', 'marginTop':'30px', 'marginBottom':'50px'}}>Bored Games</h1>
                </div>
                <div className='flex-column flex_spacestretch margin_vertical25 showTablet_HideDesktop' style={{'flex':'4'}}>
                    <MobileGameCard gameImage={deathBoxLogo} gameTitle={'Death Box'} instructions={this.deathBoxInstructions} link={this.deathBoxLink} openLink={this.props.openLink} instructionsModalContent={<DeathBoxHowToPlayFrontPage/>}/>
                    <MobileGameCard gameImage={deathRollLogo} gameTitle={'Death Roll'} instructions={this.deathRollInstructions} link={this.deathRollLink} openLink={this.props.openLink} instructionsModalContent={<DeathRollHowToPlayFrontPage/>}/>
                </div>
            </div>
        )
    }
}

export default HomePage;
