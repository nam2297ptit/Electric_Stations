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
            data: [],
            isLoaded: false,
            modal: false,
            id_project: null,
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
        this.handleImageChange = this.handleImageChange.bind(this)
    }

    handleChange(event) {
        // let data = Object.assign({}, this.state.data);
        // data[event.target.name] = event.target.value;
        // this.setState({data: data});
        let name = event.target.name
        let value = event.target.value
        this.setState({
            [name]: value
        });
    }

    handleChangeType(type) {
        // let data = Object.assign({}, this.state.data);
        // data.is_private = type === "private";
        // this.setState({data: data})
        this.setState({
            changeIsPrivate: type === "private"
        });
    }

    handleAddTag(event) {
        if (event.key === "Enter") {
            let tag = $("#inputTags").val();
            if (tag !== "") {
                let data = Object.assign({}, this.state.data);
                data.tags.push(tag);
                this.setState({ data: data });
                $("#inputTags").val("");
            }
        }
    }

    handleRemoveTag(index) {
        let data = Object.assign({}, this.state.data);
        data.tags.splice(index, 1);
        this.setState({ data: data })
    }

    handleImageChange(event) {
        this.setState({
            changeLogo: event.target.files[0],
            tempLogo: URL.createObjectURL(event.target.files[0])
        })
        // e.preventDefault();
        // let reader = new FileReader();
        // let file = e.target.files[0];
        // const that = this;
        // let data = Object.assign({}, this.state.data);
        // reader.onloadend = () => {
        //     data.logo = reader.result;
        //     that.setState({
        //         file: file,
        //         data: data
        //     });
        // };

        // this.props.handleLoading(true);
        // api.changePhoto(file, (err, result)=>{
        //     if(err){
        //         this.props.handleLoading(false);
        //         Notification("error", "Edit project", "Error when editing project");
        //     } else {
        //         this.props.handleLoading(false);
        //         Notification("success", "Edit project", "Edit project is successfully");
        //     }
        // })
        // reader.readAsDataURL(file)
    }

    handleSaveChange() {
        this.props.handleLoading(true);
        api.modifyProject(this.state.id_project, { name: this.state.changeName, description: this.state.changeDescription, is_private: this.state.changeIsPrivate }, (err, result) => {
            if (err) {
                this.props.handleLoading(false)
                Notification("error", "Error", err.data === undefined ? err : err.status + ' ' + err.data._error_message)
            } else {
                this.props.handleLoading(false);
                Notification("success", "Edit project", "Edit project is successfully");
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
        this.setState(prevState => ({
            modal: !prevState.modal,
            modalInputPass: !this.state.modalInputPass,
            modalCloseAll: true
        }));
        api.deleteProject(this.state.id_project, (err, result) => {
            if (err) {
                console.log(err)
                Notification("error", "Error", err.data === undefined ? err : err.status + ' ' + err.data._error_message)
            } else {
                window.location.replace('/project')
            }
        })
    }
    componentDidMount() {
        const that = this;
        api.getInfoProject(utils.getProjectId(), (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            } else {
                console.log(result);

                // localStorage.setItem('project', JSON.stringify(result));
                // window.location.replace("/dashboard");
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
                            <FormGroup>
                                <Label for="inputStationName">Station name</Label>
                                <Input
                                    type="text"
                                    name="changeName"
                                    placeholder="Project name"
                                    autoComplete="off"
                                    defaultValue={this.state.data.name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Row>
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
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_phone">Phone Number</Label>
                                        <Input
                                            type="text" name="phone"
                                            placeholder="Phone number"
                                            value={this.state.data.phone}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_id">ID</Label>
                                        <Input
                                            type="text" name="sub_id"
                                            placeholder="ID station"
                                            value={this.state.data.sub_id}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <FormGroup xs="6">
                                                <Label for="name_of_volt_hight">Volt Hight</Label>
                                                <Input
                                                    type="text" name="volt_hight"
                                                    placeholder="V"
                                                    value={this.state.data.volt_hight}
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
                                                <Label for="name_of_temp_hight">Temp Hight</Label>
                                                <Input
                                                    type="text" name="temp_hight"
                                                    placeholder="°C"
                                                    value={this.state.data.temp_hight}
                                                    onChange={this.handleChange}
                                                    autoComplete="off"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="name_of_oil_temp_low">Oil Temp Hight</Label>
                                                <Input
                                                    type="text" name="oil_temp_hight"
                                                    placeholder="°C"
                                                    value={this.state.data.oil_temp_hight}
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
                                            <FormGroup xs="6">
                                                <Label for="name_of_volt_hight">Current Hight</Label>
                                                <Input
                                                    type="text" name="curent_hight"
                                                    placeholder="A"
                                                    value={this.state.data.current_hight}
                                                    onChange={this.handleChange}
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
                                                    value={this.state.data.time_update}
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
                            {/* <div className="text-center">
                                <Label for="logoChange">
                                    <CustomImg
                                        alt="Avatar project"
                                        src={this.state.tempLogo || this.state.changeLogo}
                                        className="rounded-circle img-responsive mt-2 admin__imgUpdate"
                                        width="128"
                                        height="128"
                                    />
                                </Label>
                                <Input type="file" id="logoChange" hidden onChange={this.handleImageChange} />
                                <div><small>
                                    For best results, use an image at least 128px by 128px in .jpg
                                    format
                                </small></div>
                            </div> */}
                            <Map data={this.state.data} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8"></Col>
                        <Col md="2">
                            <Button type="button" color="primary" onClick={this.handleSaveChange.bind(this)}>Save changes</Button>
                        </Col>
                        <Col md="2" className="pr-4">
                            <Button type="button" color="danger" onClick={this.toggleInputPass}>Delete project</Button>
                            <Modal isOpen={this.state.modalInputPass} toggle={this.toggleInputPass}>
                                <ModalHeader>Confirm</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Please enter your password"
                                            autoComplete="off"
                                        // onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Repassword</Label>
                                        <Input
                                            type="password"
                                            placeholder="Please enter your password again"
                                            autoComplete="off"
                                        // onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="success" onClick={this.toggle}>OK</Button>
                                    <Button color="secondary" onClick={this.toggleInputPass}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader>Confirm</ModalHeader>
                                <ModalBody>Are you sure delete this project?</ModalBody>
                                <ModalFooter>
                                    <Button color="success" onClick={this.handleDelProject.bind(this)}>OK</Button>
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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
