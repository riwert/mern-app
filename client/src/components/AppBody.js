import React, { Component } from 'react';
import {
    Container
} from 'reactstrap';
import ItemList from './items/ItemList';
import ItemModal from './items/ItemModal';

class AppBody extends Component {
    render() {
        return (
            <Container>
                <ItemModal />
                <ItemList />
            </Container>
        );
    }
}

export default AppBody;
