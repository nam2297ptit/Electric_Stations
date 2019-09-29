import React from "react";
import {
    Row, Col, Container,
    Button, 
    ModalHeader, ModalFooter, Modal, ModalBody,
    FormGroup, FormFeedback, 
    Input, Label
} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobeAmericas, faKey, faPlus} from "@fortawesome/free-solid-svg-icons";
import TableProject from "./StationsTable"
import Notification from "../../components/Notification";
import {LoadingSprinner} from "../../components/CustomTag";
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
                description: "",
                is_private: false
            },
            submitted: false,
            isLoaderAPI: false,
            keyWord : null,
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

    componentDidMount(){
        const that = this;
        api.getInfoProjectAll((err, result)=>{       
        if(err){
            Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
        } else {
            that.setState({data: result ,isLoaderAPI: true});
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state === nextState) {
          return false;
        }
        return true
    }
    handleChange(event){
        let temp = Object.assign({}, this.state.temp);
        temp[event.target.name] = event.target.value;
        this.setState({temp: temp});
    }

    handleShow(){
        let state = Object.assign({}, this.state);
        state.showModal.create_project = true;
        this.setState(state);
    }

    handleClose(){
        let state = Object.assign({}, this.state);
        state.submitted = false;
        state.temp.name = "";
        state.temp.description = "";
        state.is_private = false;
        state.showModal.create_project = false;
        this.setState(state);
    }

    handleSearch(event){
        this.changeSearchChars(event.target.value);
    }

    changeSearchChars(chars){
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
    handleCreateProject(){
        let state = Object.assign({}, this.state);
        const that = this;
        this.setState({ submitted: true });

        // stop here if form is invalid
        const { name, description } = this.state.temp;
        if (!(name && description)) {
            return;
        }
        api.createProject(state.temp, (err, result)=>{
            if(err){
                if(err.data !== undefined){
                    Notification("error", "Error", err.status + " " + err.data._error_message)
                }
                else{
                    Notification("error", "Error", err)
                }
            } else {
                state.data.push(result);
                that.setState(state);
                that.handleClose();
                Notification("success", "Create Station", "Created station is successfully!!!")
            }
        });
    }

    render() {
        return (
            <React.Fragment >
                <Modal isOpen={this.state.showModal.create_project} className="modal-project">
                    <ModalHeader  className="modal-project__header">New project</ModalHeader>
                    <ModalBody >
                        <FormGroup>
                            <Label for="name_of_project">Station name</Label>
                            <Input  
                                type="text" name="name"  
                                placeholder="Name of project" 
                                value={this.state.temp.name} 
                                onChange={this.handleChange} 
                                invalid={ this.state.submitted && !this.state.temp.name ? true : false}
                            />
                            <FormFeedback invalid>
                                Name Station is a required field!
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input 
                                type="textarea" 
                                rows="5" 
                                name="description"  
                                placeholder="Description" 
                                value={this.state.temp.description} 
                                onChange={this.handleChange}
                                invalid={ this.state.submitted && !this.state.temp.description ? true : false}
                            />
                            <FormFeedback invalid>
                                Description is a required field!
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col className="col-6">
                                    <Button
                                        type="button"
                                        style={{width: "100%"}}
                                      
                                        color="primary"
                                        outline
                                        active={!this.state.temp.is_private}
                                    >
                                        <FontAwesomeIcon icon={faGlobeAmericas}/> Public
                                    </Button>
                                </Col>
                                <Col className="col-6">
                                    <Button
                                        type="button"
                                        style={{width: "100%"}}
                                        
                                        color="warning"
                                        outline
                                        active={this.state.temp.is_private}
                                    >
                                        <FontAwesomeIcon icon={faKey}/> Private
                                    </Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleClose.bind(this)}>
                            Cancel
                        </Button>
                        <Button color="success"  onClick={this.handleCreateProject.bind(this)}>
                            Create
                        </Button>
                    </ModalFooter>
                </Modal>
                
                <h1 className="text-center m-5">Stations</h1>
                <Container className="mt-2">
                    <Row>
                        <Col xs="3">
                            <Input className="width-percent-40 ml-3" id="inputSearch" placeholder="Search Station" onKeyUp={this.handleSearch.bind(this)} />
                        </Col>
                        <Col xs="7"></Col>
                        <Col xs="2" className="pr-4">
                            {/* <Button className="float-right mr-3" onClick={this.handleShow.bind(this)}><FontAwesomeIcon icon={faPlus}/> New Station</Button> */}
                            <Input type="select" onChange={this.handleChangeType} value={this.state.type}  >
                                <option value="list">List</option>
                                <option value="map">Map</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        {
                            this.state.type === "list"
                            ?
                            <Col>
                            {this.state.isLoaderAPI ? 
                                this.state.data.map(({id, manager, machine, photo, i_am_admin, power, sub_id, address}, index) => {
                                    if( ValidInput.isEmpty(this.state.keyWord)){
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
                                    else{
                                        if(manager.indexOf(this.state.keyWord) !== -1){
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
                            :   <h1 className="text-center">Loading....</h1>
                            } 
                            </Col>
                            :
                            <Col>
                                <Maps data={this.state.data}/>
                            </Col>
                        }

                    </Row>
                </Container>
            </React.Fragment>
        )
    }
};

export default Project;
