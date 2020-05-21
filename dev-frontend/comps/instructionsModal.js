import React from 'react';
import Baby from '../media/crying-baby.png';

class InstructionsModal extends React.Component {

constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='big-popup'>
        <div className='popup-content padding_horizontal4'>
          <div>
            <h1 className='center'>{this.props.title}</h1>
          </div>
          <div>
            {this.props.children}
          </div>
          <div className='center'>
            <button type='button' className='submitButton' onClick={this.props.close}>Thanks, I get it</button>
          </div>
        </div>
      </div>
    );
  }
}


export default InstructionsModal;
