import React from "react";
import {
Card,CardBody,CardHeader,CardTitle,
Col,
Container,
Row,Table,
ListGroup,ListGroupItem,
Input
} from "reactstrap";
import Notification from "../../components/Notification";
import { CustomImg, LoadingSprinner } from "../../components/CustomTag";
const api = require("./api/clientsApi");
const ValidInput = require("../../utils/ValidInput");
const utils = require("../../utils/utils");

class RowMember extends React.Component{
	render(){
		return(
		<tr key={this.props.infomember.id}>
			<td>
			<CustomImg
				src={this.props.infomember.photo}
				width="32"
				height="32"
				className="rounded-circle my-n1"
				alt="Avatar"
			/>
			</td>
			<td>
			<a href='#' className="text-decoration-none text-reset"> {this.props.infomember.full_name} </a>
			</td>
			<td>{this.props.role.name[this.props.role.id.indexOf(this.props.infomember.role)]}</td>
			<td>{this.props.infomember.email}</td>
			<td>{this.props.infomember.phone}</td>
		</tr>
		)
	}
}

class Clients extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		isLoaded:{
			role: false,
			listMemberships: false
		},
		role: {
			id: [],
			name:[]
		},
		listMemberships : [],
		find: {
			role_name: "all",
			keyWord : null
		}
		};
		this.changeOptionDisplay = this.changeOptionDisplay.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	changeOptionDisplay(setOptionTo){
		let state = Object.assign({}, this.state);
		state.find.role_name= setOptionTo;
		this.setState(state);
	}
	handleSearch(event){
		let state = Object.assign({}, this.state);
		state.find.keyWord = event.target.value;
		this.setState(state);
	}

	componentWillMount(){
		let state = Object.assign({}, this.state);
		state.listMemberships = utils.getMemberInProject();         
		if(ValidInput.isEmpty(state.listMemberships)){
		api.listMemberships([{id: 'id', photo: 'photo', full_name:'full_name', role:'role'}],(err, result)=>  {
			if(err){
			Notification("error", "Error", err);
			} else {
			state.listMemberships = result;
			state.isLoaded.listMemberships = true;
			this.setState(state);
			}
		})
		} else{
		state.isLoaded.listMemberships = true;
		this.setState(state);
		}
		api.getIdRole([{id:'id',name:'name'}],(err, result)=>  {
		if(err){
			Notification("error", "Error", err);
		} else {
			result.map((result)=>{
			state.role.id.push(result.id);
			state.role.name.push(result.name);
			});
			state.isLoaded.role = true;
			this.setState(state);
		}
		})
	}
	
	render() {
		if(!this.state.isLoaded.role || !this.state.isLoaded.listMemberships) return(<LoadingSprinner/>)
		else return (
			<React.Fragment>
				<Container fluid className="p-0">
					<h1 className="h3 mb-3">Project member management page</h1>
					<Row>
						<Col xl="3">
						<Card>
							<CardHeader>
								<CardTitle tag="h5" className="mb-0">
								Team
								</CardTitle>
							</CardHeader>
							<ListGroup flush>
								<ListGroupItem tag="a" href="#" action className={this.state.find.role_name==="all" ? "active" : "inactive"} onClick={this.changeOptionDisplay.bind(this,"all")}>
									All
								</ListGroupItem>
								{
								this.state.role.id.map((idRole,index) => {
									return(
									<ListGroupItem tag="a" href="#" key={utils.randomString()} action className={this.state.find.role_name=== idRole ? "active" : "inactive"} onClick={this.changeOptionDisplay.bind(this,idRole)}>
										{this.state.role.name[index]}
									</ListGroupItem>
									)
								})
								}
							</ListGroup>
						</Card>
						</Col>
						<Col xl="9">
						<Card>
							<CardHeader>
							<CardTitle tag="h5" className="mb-0">
								<Row>
								<Col xl="6">
									Member information
								</Col>
								<Col xl="6">
									{/* Text box */}
									<Input type="search" id="inputSearch" placeholder="Search from member infomation" onKeyUp={this.handleSearch.bind(this)}/>
								</Col>
								</Row>
							</CardTitle>
							</CardHeader>
							
							<CardBody>
							<Table className="mb-0">
								<thead>
								<tr>
									<th>Avatar</th>
									<th>Name</th>
									<th>Role name</th>
									<th>Email</th>
									<th>Phone</th>
								</tr>
								</thead>
								<tbody>
								{
									this.state.listMemberships.map((infoMember,index) => {
									let keyWord = ValidInput.isEmpty(this.state.find.keyWord) ? this.state.find.keyWord : this.state.find.keyWord.toLowerCase();
									let team = this.state.find.role_name;
									if(ValidInput.isEmpty(infoMember.full_name)){
										Notification("warning", "Data field has errors", "Please go to admin page check infomation all member. This member will hide");
									} else{
										if(team !== "all"){
										if( infoMember.role === team){ // Team == backend || frontend  => chỉ hiển thị kết quả trùng với tùy chọn frontend hoặc backend
											if( ValidInput.isEmpty(keyWord) ){
											// (Team == backend || frontend) && (không có seach từ khóa)
											return (
												<RowMember infomember = {infoMember}
												role = {this.state.role}
												key = {utils.randomString()}
												/>
											);
											}
											else{
											// (Team == backend || frontend) && (có seach từ khóa)  => tìm từ khóa trùng trong cột name, email, phone
											if(((infoMember.full_name.toLowerCase()).indexOf(keyWord) !== -1) ){
												return (
												<RowMember infomember = {infoMember}
													role = {this.state.role}
													key = {utils.randomString()}
												/>
												);
											}
											}
										}
										}
										else{ // (Team == All) => hiển thị cả backend, frontend
										if(ValidInput.isEmpty(keyWord)){
											// (Team = ALL) && (không có seach từ khóa)
											return (
											<RowMember infomember = {infoMember}
												role = {this.state.role}
												key = {utils.randomString()}
											/>
											);
										}
										else{
											// (Team == backend || frontend) && (có seach từ khóa)  => tìm từ khóa trùng trong cột name, email, phone
											if(((infoMember.full_name.toLowerCase()).indexOf(keyWord) !== -1) ){
											return (
												<RowMember infomember = {infoMember}
												role = {this.state.role}
												key = {utils.randomString()}
												/>
											);
											}
										}
										}
									}
									})
								}
								</tbody>
							</Table>
							</CardBody>
						</Card>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		)
	}
}

export default Clients;