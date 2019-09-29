import React from "react";
import {Link, NavLink} from "react-router-dom";
import {LoadingSprinner} from "../../components/CustomTag";
import {
    Button,
    Card,CardBody,CardTitle,
    Form,FormGroup, FormFeedback,
    Label,
    Input,CustomInput, 
    Alert
} from "reactstrap";
const api = require("./api/api");
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
   
        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }

        this.setState({ loading: true });
        setTimeout(() => {
            api.login(email, password, (err, result) =>{
                if(err){
                    this.setState({ error : err.data === undefined ? err : err.data._error_message, loading: false })
                } else {
                    console.log(result);
                    
                    if (result._id !== undefined) { 
                        localStorage.setItem('userInfo', JSON.stringify({
                            id: result._id,
                            token: result.auth_token,
                            full_name: result.full_name,
                            photo: result.photo
                        }))
                    }
                    window.location.replace("/stations");
                }
            })
        }, 500);
    }

    render() {
        const { email, password, submitted, loading, error } = this.state;
        return (
       
            <React.Fragment>
                {error &&
                    <Alert  color="danger"  className="p-2" >{error}</Alert>
                }
                <Card>
                    <CardTitle className="text-center mt-4"><h1>Login</h1></CardTitle>
                    <CardBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label className="text-primary ">Email</Label>
                                <Input
                                    bsSize="lg"
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="Email"
                                    invalid={submitted && !email ? true : false}
                                />
                                <FormFeedback invalid>
                                    Email is a required field!
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-primary ">Mật khẩu</Label>
                                <Input
                                    bsSize="lg"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    placeholder="Mật khẩu"
                                    invalid={submitted && !password  ? true : false}
                                />
                                <FormFeedback invalid>
                                    Passwords is a required field!
                                </FormFeedback>

                            </FormGroup>
                            <FormGroup>
                            <Link to="/auth/reset-password" className="d-inline float-right" >Fogot Password</Link>
                            
                                <CustomInput
                                    type="checkbox"
                                    id="rememberMe"
                                    label="Ghi nhớ đăng nhập"
                                    defaultChecked
                                    className="d-inline"
                                />
               
                            </FormGroup>
                            <div className="text-center mt-4">
                                {loading === false? 
                                    <Button color="primary" size="lg" className="">
                                        SignIn
                                    </Button>
                                    :
                                    <LoadingSprinner/>
                                }
                            </div>
                        </Form>
                        <div className="text-center mt-2">
                            <NavLink to="/auth/sign-up">Chưa có tài khoản. Đăng ký ngay?</NavLink>
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default SignIn;
