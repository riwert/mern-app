import React, { Component } from 'react';
import {
    Container
} from 'reactstrap';

class AppFooter extends Component {
    render() {
        return (
            <footer className="footer fixed-bottom p-3">
                <Container className="text-center">
                    Made by <a href="http://revert.pl" title="Web Developer">Revert</a>                    
                </Container>
            </footer>
        );
    }
}

export default AppFooter;
