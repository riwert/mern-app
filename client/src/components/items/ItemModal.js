import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { addItem } from '../../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
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

        const newItem = {
            name: this.state.name
        }
        this.props.addItem(newItem);
        this.toggle();
    }

    render() {
        return (
            <>
                {this.props.isAuthenticated ? (
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
                            modal={this.toggle}
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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
