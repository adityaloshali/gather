
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import { development, production } from '../config/config.json'
import actions from '../redux/actions';

class Payments extends Component {
  render() {
    let stripeKey = null;

    if (process.env.NODE_ENV === 'development') {
      stripeKey = development.REACT_APP_STRIPE_KEY
    } else {
      stripeKey = production.REACT_APP_STRIPE_KEY
    }

    return (
      <StripeCheckout
        name="Gather"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={stripeKey}
      >
        <div
          className="button waves-effect waves-light"
          style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
        >
          Add Credits
          <i
            className="material-icons"
            style={{ marginLeft: '10px' }}
          >
            account_balance_wallet
          </i>
        </div>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);