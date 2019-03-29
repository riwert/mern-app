import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { addItem } from '../../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        item: PropTypes.object.isRequired,
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const { user } = this.props;

        const newItem = {
            name: this.state.name,
            user: user
        }
        this.props.addItem(newItem);
        this.toggle();
    }

    render() {
        const { isAuthenticated } = this.props;

        return (
            <>
                {isAuthenticated ? (
                    <>
                        <Button
                            color="dark"
                            style={{ marginBottom: '2rem' }}
                            onClick={this.toggle}
                        >
                            Add item
                        </Button>

                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            autoFocus={false}
                        >
                            <ModalHeader toggle={this.toggle}>Add new item to the list</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup>
                                        <Label for="item">New item</Label>
                                        <Input
                                            type="text"
                                            id="item"
                                            name="name"
                                            placeholder="name"
                                            onChange={this.onChange}
                                            autoFocus
                                        />
                                        <Button
                                            color="dark"
                                            style={{ marginTop: '1rem' }}
                                            onClick={this.onSubmit}
                                        >
                                            Save
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                        </Modal>
                    </>
                ) : (
                    <h4 className="mb-3">Log in to manage items.</h4>
                )}
            </>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
