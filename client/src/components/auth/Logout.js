import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/authActions';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <>
            <NavLink onClick={this.props.logout} href="#">
                Logout
            </NavLink>
            </>
        )
    }
}

export default connect(null, { logout })(Logout);
