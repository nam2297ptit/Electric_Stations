import React from "react";
import { Link } from "react-router-dom";
import {
    Row, Col, Container,
    Button,
    ModalHeader, ModalFooter, Modal, ModalBody,
    FormGroup,
    Input, Label
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TableProject from "./StationsTable"
import Notification from "../../components/Notification";
import Maps from "./Maps";
const api = require("./api/api");
const ValidInput = require("../../utils/ValidInput");

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showModal: {
                create_project: false
            },
            temp: {
                name: "",
                manager: "",
                location: {
                    latitude: 40.712784,
                    longtitude: -74.005941,
                }
            },
            submitted: false,
            isLoaderAPI: false,
            keyWord: null,
            type: "list",
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateProject = this.handleCreateProject.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.changeSearchChars = this.changeSearchChars.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
    }

    componentDidMount() {
        const that = this;
        api.getInfoProjectAll((err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            } else {
                that.setState({ data: result, isLoaderAPI: true });
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state === nextState) {
            return false;
        }
        return true
    }
    handleChange(event) {
        let temp = Object.assign({}, this.state.temp);
        temp[event.target.name] = event.target.value;
        this.setState({ temp: temp });
    }
    handleShow() {
        let state = Object.assign({}, this.state);
        state.showModal.create_project = true;
        this.setState(state);
    }

    handleClose() {
        let state = Object.assign({}, this.state);
        state.submitted = false;
        state.temp = {};
        state.is_private = false;
        state.showModal.create_project = false;
        this.setState(state);
    }

    handleSearch(event) {
        this.changeSearchChars(event.target.value);
    }

    changeSearchChars(chars) {
        let state = Object.assign({}, this.state);
        state.keyWord = chars;
        this.setState(state);
    }

    handleChangeType(event) {
        console.log(event.target.value);

        this.setState({
            type: event.target.value
        })
    }
    handleCreateProject(event) {
        // event.preventDefault();
        this.setState({ submitted: true });
        // const { name, manager, sub_id, phone_number, temp_high, oil_temp_high, volt_high, volt_low, current_high } = this.state;

        // // stop here if form is invalid
        // if (!(name && manager && sub_id && phone_number && temp_high && oil_temp_high && volt_high && volt_low && current_high)) {
        //     return;
        // }

        // stop here if form is invalid
        api.createProject(this.state.temp, (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            } else {
                this.state.data.push(result)
                Notification("success");
                this.handleClose();
            }
        })
    }

    render() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const isAdmin = userInfo.is_admin;
        return (
            <React.Fragment >
                <Modal isOpen={this.state.showModal.create_project} className="modal-project">
                    <ModalHeader className="modal-project__header">New station</ModalHeader>
                    <ModalBody >
                        <FormGroup>
                            <Label for="name_of_station">Station name</Label>
                            <Input
                                type="text" name="name"
                                placeholder="Name of station"
                                value={this.state.temp.name}
                                onChange={this.handleChange}
                                size="sm"
                                autoComplete="off"
                            />
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="name_of_manager">Manager</Label>
                                    <Input
                                        type="text" name="manager"
                                        placeholder="Name of manager"
                                        value={this.state.temp.manager}
                                        onChange={this.handleChange}
                                        size="sm"
                                        autoComplete="off"
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="name_of_phone">Phone Number</Label>
                                    <Input
                                        type="text" name="phone_number"
                                        placeholder="Phone number"
                                        value={this.state.temp.phone_number}
                                        onChange={this.handleChange}
                                        size="sm"
                                        autoComplete="off"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name_of_id">ID</Label>
                                            <Input
                                                type="text" name="sub_id"
                                                placeholder="ID station"
                                                value={this.state.temp.sub_id}
                                                onChange={this.handleChange}
                                                size="sm"
                                                autoComplete="off"

                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name_of_ki">KI</Label>
                                            <Input
                                                type="text" name="KI"
                                                placeholder="KI"
                                                value={this.state.temp.KI}
                                                onChange={this.handleChange}
                                                size="sm"
                                                autoComplete="off"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <FormGroup xs="6">
                                            <Label for="name_of_volt_high">Volt High</Label>
                                            <Input
                                                type="text" name="volt_high"
                                                placeholder="V"
                                                value={this.state.temp.volt_high}
                                                onChange={this.handleChange}
                                                size="sm"
                                                autoComplete="off"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name_of_volt_low">Volt Low</Label>
                                            <Input
                                                type="text" name="volt_low"
                                                placeholder="V"
                                                value={this.state.temp.volt_low}
                                                onChange={this.handleChange}
                                                size="sm"
                                                autoComplete="off"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <FormGroup xs="6">
                                            <Label for="name_of_temp_high">Temp High</Label>
                                            <Input
                                                type="text" name="temp_high"
                                                placeholder="°C"
                                                value={this.state.temp.temp_high}
                                                onChange={this.handleChange}
                                                size="sm"
                                                autoComplete="off"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name_of_oil_temp_high">Oil Temp High</Label>
                                            <Input
                                                type="text" name="oil_temp_high"
                                                placeholder="°C"
                                                value={this.state.temp.oil_temp_high}
                                                onChange={this.handleChange}
                                                size="sm"
                                                autoComplete="off"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <FormGroup xs="6">
                                            <Label for="name_of_volt_high">Current High</Label>
                                            <Input
                                                type="text" name="current_high"
                                                placeholder="A"
                                                value={this.state.temp.current_high}
                                                onChange={this.handleChange}
                                                size="sm"
                                                autoComplete="off"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name_of_volt_low">Time Update</Label>
                                            <Input
                                                type="text" name="time_update"
                                                placeholder="minute"
                                                value={this.state.temp.time_update}
                                                onChange={this.handleChange}
                                                size="sm"
                                                autoComplete="off"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleClose.bind(this)}>
                            Cancel
                        </Button>
                        <Button color="success" onClick={this.handleCreateProject.bind(this)}>
                            Create
                        </Button>
                    </ModalFooter>
                </Modal>
                {
                    this.state.data.length !== 0 ?
                        <React.Fragment>
                            <h1 className="text-center m-5">Stations</h1>
                            <Container className="mt-2">
                                <Row>
                                    <Col xs="3">
                                        <Input className="width-percent-40 ml-3" id="inputSearch" autoComplete="off" placeholder="Search Station" onKeyUp={this.handleSearch.bind(this)} />
                                    </Col>
                                    <Col xs="2"></Col>
                                    <Col xs="2" className="pr-4">
                                        <Input type="select" onChange={this.handleChangeType} value={this.state.type}  >
                                            <option value="list">List</option>
                                            <option value="map">Map</option>
                                        </Input>
                                    </Col>
                                    <Col xs="3"></Col>
                                    <Col xs="2" className="pr-4">
                                        {isAdmin === true ? <Button className="float-right mr-3 " onClick={this.handleShow.bind(this)}><FontAwesomeIcon icon={faPlus} /> New Station</Button> : null}
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        this.state.type === "list"
                                            ?
                                            <Col>
                                                {this.state.isLoaderAPI ?
                                                    this.state.data.map(({ id, manager, machine, photo, i_am_admin, power, sub_id, address, name }, index) => {
                                                        if (ValidInput.isEmpty(this.state.keyWord)) {
                                                            return (
                                                                <TableProject
                                                                    key={index}
                                                                    id={id}
                                                                    index={index + 1}
                                                                    i_am_admin={i_am_admin}
                                                                    manager={manager}
                                                                    machine={machine}
                                                                    sub_id={sub_id}
                                                                    photo={photo}
                                                                    power={power}
                                                                    address={address}
                                                                    name={name}
                                                                />
                                                            );
                                                        }
                                                        else {
                                                            if (manager.indexOf(this.state.keyWord) !== -1) {
                                                                return (
                                                                    <TableProject
                                                                        key={index}
                                                                        id={id}
                                                                        index={index + 1}
                                                                        i_am_admin={i_am_admin}
                                                                        manager={manager}
                                                                        machine={machine}
                                                                        sub_id={sub_id}
                                                                        photo={photo}
                                                                        power={power}
                                                                        address={address}
                                                                    />
                                                                );
                                                            }
                                                        }

                                                    })
                                                    : <h1 className="text-center">Loading....</h1>
                                                }
                                            </Col>
                                            :
                                            <Col>
                                                <Maps data={this.state.data} />
                                            </Col>
                                    }

                                </Row>
                            </Container>
                        </React.Fragment>
                        :
                        <div className="text-center mt-5">
                            <h1 className="display-1 font-weight-bold">404</h1>
                            <p className="h1">Stations not found.</p>
                            <p className="h2 font-weight-normal mt-3 mb-4">Please contact the administrator for information</p>
                            <Link to="/logout">
                                <Button color="primary" size="lg">
                                    Return to login
                          </Button>
                            </Link>
                        </div>
                }

            </React.Fragment>
        )
    }
};

export default Project;
