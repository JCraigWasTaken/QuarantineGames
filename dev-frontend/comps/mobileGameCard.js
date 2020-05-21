import React from 'react';

import InstructionsModal from '../comps/instructionsModal.js';

class MobileGameCard extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            extendCardVisible:false,
            instructionsVisible:false,
            link:''
        }
    }

    extendCardToggle = () =>{
        this.setState({
            extendCardVisible:!this.state.extendCardVisible,
            link:this.props.link
        })
    }

    instructionsToggle = () =>{
        this.setState({
            instructionsVisible:!this.state.instructionsVisible
        })
    }

    openLink = () =>{
        this.props.openLink(this.state.link);
    }

    render() {
        return (
            <div className='flex-column'>
                <button className='margin_vertical50 padding_vertical25 margin_horizontal4 padding_horizontal4 flex-row color-background_secondary color-text_light flex_stretch' style={{'border': '3px solid var(--primary_dark)', 'height':'250px','marginBottom':'0px', 'cursor':'pointer'}} onClick={this.extendCardToggle}>
                    <div className='margin_horizontal2 padding10 color-background_dominant flex-column flex_center flex_spaceCenter' style={{'flex':'1'}}>
                        <img className='mobileGameCardImage' src={this.props.gameImage}></img>
                    </div>
                    <div className='margin_horizontal2 padding10 color-background_dominant flex-column flex_center flex_spaceCenter' style={{'flex':'2'}}>
                        <h2>{this.props.gameTitle}</h2>
                    </div>
                </button>
                {this.state.extendCardVisible &&
                    <div className='flex-column padding10 margin_horizontal4 padding_horizontal4 color-background_secondary color-text_light flex_stretch'>
                        <button className='submitButton' onClick={this.instructionsToggle}>Instructions</button>
                        <button className='submitButton' onClick={this.openLink}>Play</button>
                    </div>
                }
                {this.state.instructionsVisible &&
                    <InstructionsModal title={'How ' + this.props.gameTitle + ' Works'} close={this.instructionsToggle}>
                        {this.props.instructionsModalContent}
                    </InstructionsModal>
                }
            </div>
        );
      }
}

export default MobileGameCard;