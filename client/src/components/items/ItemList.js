import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getItems, deleteItem } from '../../actions/itemActions';

class ItemList extends Component {

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    render() {
        const { items } = this.props.item;
        const { isAuthenticated } = this.props;
        return (
            <>
                <ListGroup>
                    <TransitionGroup className="item-list">
                        {items.map(({ _id, name, user }) => (
                            <CSSTransition key={_id} timeout={500} classNames="item">
                                <ListGroupItem>
                                    {isAuthenticated ? (
                                        <Button
                                            className="remove-btn mr-2"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times;</Button>
                                    ) : (
                                        <span className="mr-1">&bull;</span>
                                    )}
                                    {name}
                                    {user ? (<div className="float-right">Added by: <strong>{user.name}</strong></div>) : ''}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ItemList);
