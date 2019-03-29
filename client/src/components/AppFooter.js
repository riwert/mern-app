import React, { Component } from 'react';
import {
    Container
} from 'reactstrap';

const footerStyle = {
    backgroundColor: '#fff'
}

class AppFooter extends Component {
    render() {
        return (
            <footer className="footer fixed-bottom p-3" style={footerStyle}>
                <Container className="text-center">
                    Made by <a href="http://revert.pl" title="Web Developer">Revert</a>                    
                </Container>
            </footer>
        );
    }
}

export default AppFooter;
