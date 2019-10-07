import React from "react";
import $ from "jquery";
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Row, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faKey, faTags } from "@fortawesome/free-solid-svg-icons";
import "./General.css";
import Notification from "../../components/Notification";
import { CustomImg } from "../../components/CustomTag";
import Map from "./Map"
// const api_project = require("../project/api/api");
const api = require("./api/api");
const utils = require("../../utils/utils");

class General extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            data: {},
            isLoaded: false,
            modal: false,
            modalInputPass: false,
            modalCloseAll: false,
            changeName: null,
            changeDescription: null,
            changeIsPrivate: null,
            changeLogo: null,
            tempLogo: null
        };
        this.handleChange = this.handleChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.toggleInputPass = this.toggleInputPass.bind(this)
    }

    handleChange(event) {
        let data = Object.assign({}, this.state.data);
        data[event.target.name] = event.target.value;
        this.setState({ data: data });

        // let name = event.target.name
        // let value = event.target.value
        // this.setState({
        //     [name]: value
        // });
    }

    handleChangeType(type) {
        // let data = Object.assign({}, this.state.data);
        // data.is_private = type === "private";
        // this.setState({data: data})
        this.setState({
            changeIsPrivate: type === "private"
        });
    }


    handleSaveChange() {
        api.modifyStation(this.state.data.sub_id, this.state.data, (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.status + ' ' + err.data._error_message)
            } else {
                console.log(result);
                localStorage.setItem('project', JSON.stringify(result));
                Notification("success", "Edit Station", "Edit station is successfully");
            }
        })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    toggleInputPass() {
        this.setState({
            modalInputPass: !this.state.modalInputPass,
            modalCloseAll: false
        });
    }
    handleDelProject() {
        api.deleteStation(this.state.data.sub_id, (err, result) => {
            if (err) {
                console.log(err)
                Notification("error", "Error", err.data === undefined ? err : err.status + ' ' + err.data._error_message)
            } else {
                window.location.replace('/stations')
            }
        })
    }
    componentDidMount() {
        const that = this;
        api.getInfoProject(utils.getStationInfo().sub_id, (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            } else {
                console.log(result);
                that.setState({
                    data: result
                })
                localStorage.setItem('project', JSON.stringify(result));
            }
        });
    }

    render() {
        return (
            // !this.state.isLoaded ? null :
            <Card className="admin__general__card">
                <CardBody>
                    <Row>
                        <Col md="8">
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="inputStationName">Station name</Label>
                                        <Input
                                            type="text"
                                            name="changeName"
                                            placeholder="Station name"
                                            autoComplete="off"
                                            defaultValue={this.state.data.name}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_manager">Manager</Label>
                                        <Input
                                            type="text" name="manager"
                                            placeholder="Name of manager"
                                            value={this.state.data.manager}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_address">Address</Label>
                                        <Input
                                            type="text" name="address"
                                            placeholder="Address station"
                                            value={this.state.data.address}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_address">Phone Number</Label>
                                        <Input
                                            type="text" name="phone_number"
                                            placeholder="Phone number"
                                            value={this.state.data.phone_number}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_volt_low">Time Update</Label>
                                        <Input
                                            type="text" name="time_update"
                                            placeholder="minute"
                                            value={this.state.data.time_update}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <FormGroup xs="6">
                                                <Label for="name_of_volt_high">Volt High</Label>
                                                <Input
                                                    type="text" name="volt_high"
                                                    placeholder="V"
                                                    value={this.state.data.volt_high}
                                                    onChange={this.handleChange}
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
                                                    value={this.state.data.volt_low}
                                                    onChange={this.handleChange}
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
                                                    value={this.state.data.temp_high}
                                                    onChange={this.handleChange}
                                                    autoComplete="off"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="name_of_oil_temp_low">Oil Temp High</Label>
                                                <Input
                                                    type="text" name="oil_temp_high"
                                                    placeholder="°C"
                                                    value={this.state.data.oil_temp_high}
                                                    onChange={this.handleChange}
                                                    autoComplete="off"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="name_of_current_hight">Current High</Label>
                                                <Input
                                                    type="text" name="current_high"
                                                    placeholder="A"
                                                    value={this.state.data.current_high}
                                                    onChange={this.handleChange}
                                                    autoComplete="off"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="name_of_KI">KI</Label>
                                                <Input
                                                    type="text" name="KI"
                                                    placeholder="KI"
                                                    value={this.state.data.KI}
                                                    onChange={this.handleChange}
                                                    autoComplete="off"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="4" className="mt-3">
                            <Map data={this.state.data} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8"></Col>
                        <Col md="2">
                            <Button type="button" color="primary" onClick={this.handleSaveChange.bind(this)}>Save changes</Button>
                        </Col>
                        <Col md="2" className="pr-4">
                            <Button type="button" color="danger" onClick={this.toggle}>Delete project</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader>Confirm</ModalHeader>
                                <ModalBody>Are you sure delete this project?</ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                    <Button color="success" onClick={this.handleDelProject.bind(this)}>OK</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default General;
