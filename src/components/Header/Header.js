import React from 'react';
import EthPrice from './EthPrice';

class Header extends React.Component {
  constructor() {
    super();
  }

  // A comprehensive ROI tracker across your wallets.

  render() {
    return (
      <header className='header'>
        <div className='nav'>
          <div className='app-title'>
            <span className='main-char'>track</span>
            <span className='alt-char'>my</span>
            <span className='main-char'>wallet</span>
          </div>
          <EthPrice ethPriceValue={this.props.ethPriceValue} />
          <button className='connect-web3'>
            <i className='fa-brands fa-ethereum connect-eth'></i> Connect
          </button>
        </div>
      </header>
    );
  }
}

export default Header;