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
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        if (this.state.modal && isAuthenticated) {
            this.toggle();
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: ! this.state.modal
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        
        const { name, email, password } = this.state;

        const newUser = {
            name,
            email,
            password
        };

        this.props.register(newUser);        
    }

    onKeyUp = e => {
        if (e.key === 'Enter') {
            this.onSubmit(e);
        }
    }

    render() {
        return (
            <>
                <NavLink
                    href="#"
                    onClick={this.toggle}
                >
                    Register
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    autoFocus={false}                    
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    className="mb-3"
                                    id="name"
                                    name="name"
                                    placeholder="name"
                                    onChange={this.onChange}
                                    onKeyUp={this.onKeyUp}
                                    autoFocus
                                />
                                <Label for="email">E-mail</Label>
                                <Input
                                    type="text"
                                    className="mb-3"
                                    id="email"
                                    name="email"
                                    placeholder="e-mail"
                                    onChange={this.onChange}
                                    onKeyUp={this.onKeyUp}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    className="mb-3"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    onChange={this.onChange}
                                    onKeyUp={this.onKeyUp}
                                />
                                <div className="text-center">
                                    <Button
                                        color="dark"
                                        style={{ marginTop: '1rem' }}
                                        onClick={this.onSubmit}
                                    >                                
                                        Sign up
                                    </Button>
                                </div>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
