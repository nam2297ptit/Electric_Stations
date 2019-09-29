import React from "react";
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import "./Pricing.css";

const data = [

    {
        "package": "Public",
        "intro": "For individuals or teams just getting started with project management.",
        "cost": "0",
        "des": "Manage tasks and personal:",
        "button": "Sign up",
        "feature": ["Private project: 1", "Add user : 3", "Task", "List view", "Board view", "Calendar view", "Assignees and due dates", "Collaborate with up to 15 teammates", "Integrate with your favorite apps"],
        "refer": "Learn more",
        "projectManagement": {
            "List view projects": true,
            "Board view projects": true,
            "Assignee work to complete and due dates": true,
            "Task dependencies": true,
            "Timeline": true,
            "Custom Templates": true,
            "Milestones": true,
            "Work User": false,
            "Work Task": false,
            "Assignment For User To Manage Work": false,
            "Work": false,
            "Track Work Progress": false
        },
        "viewsAndReporting": {
            "Boad Project": true,
            "Wiki": true,
            "Template Table": true,
            "Template Kanban": false,
            "Admin": false,
            "Track Work Progress": false,
            "Reports And Statistics": false,
        },
        "supportAndControl": {
            "Priority Support": false,
            "Admin Consolse": false,
            "Google SSO": false,
            "Customer success options": false,
            "SAML": false,
            "User provisioning & deprovisioning": false,
            "Data deletion": false,
            "Service accounts": false,
            "Premium Academy trainings": false,

        }
    },
    {
        "package": "Premium User",
        "intro": "For teams that need to create project plans with confidence.",
        "cost": "19",
        "des": "Track team projects with features and resources like:",
        "button": "Try for free!",
        "feature": ["Private project: 10", "Add user: 10", "Timeline", "Advanced Search & reporting", "Custom fields", "Custom Templates", "Workflow Rules - Coming Soon!", "Task dependencies", "Milestones", "Admin Console", "Private teams & projects", "Premium content in the Asana Academy", "Customer success onboarding and training"],
        "refer": "Learn more about Premium User",
        "projectManagement": {
            "List view projects": true,
            "Board view projects": true,
            "Assignee work to complete and due dates": true,
            "Task dependencies": true,
            "Timeline": true,
            "Custom Templates": true,
            "Milestones": true,
            "Work User": true,
            "Work Task": true,
            "Assignment For User To Manage Work": false,
            "Work": false,
            "Track Work Progress": false

        },
        "viewsAndReporting": {
            "Boad Project": true,
            "Wiki": true,
            "Template Table": true,
            "Template Kanban": true,
            "Admin": true,
            "Track Work Progress": false,
            "Reports And Statistics": false,
        },
        "supportAndControl": {
            "Priority Support": true,
            "Admin Consolse": true,
            "Google SSO": true,
            "Customer success options": true,
            "SAML": true,
            "User provisioning & deprovisioning": false,
            "Data deletion": false,
            "Service accounts": false,
            "Premium Academy trainings": false,

        }
    },
    {
        "package": "Company User",
        "intro": "For teams that need to create project plans with confidence.",
        "cost": "39",
        "des": "Everything in Company, plus:",
        "button": "Try for free",
        "feature": ["Private project: unlimited", "Add user: unlimited", "Portfolios", "Workload - New!", "Advanced Workflow Rules - Coming Soon!", "Forms", "Proofing", "Lock custom fields", "Adobe Creative Cloud Integration", "More Advanced Integrations"],
        "refer": "Learn more about Company User ",
        "projectManagement": {
            "List view projects": true,
            "Board view projects": true,
            "Assignee work to complete and due dates": true,
            "Task dependencies": true,
            "Timeline": true,
            "Custom Templates": true,
            "Milestones": true,
            "Work User": true,
            "Work Task": true,
            "Assignment For User To Manage Work": true,
            "Work": true,
            "Track Work Progress": true

        },
        "viewsAndReporting": {
            "Boad Project": true,
            "Wiki": true,
            "Template Table": true,
            "Template Kanban": true,
            "Admin": true,
            "Track Work Progress": true,
            "Reports And Statistics": true,
        },
        "supportAndControl": {
            "Priority Support": true,
            "Admin Consolse": true,
            "Google SSO": true,
            "Customer success options": true,
            "SAML": true,
            "User provisioning & deprovisioning": true,
            "Data deletion": true,
            "Service accounts": true,
            "Premium Academy trainings": true,

        }
    }

]

const field = {

    "projectManagement": [
        "List view projects", "Board view projects", "Assignee work to complete and due dates", "Task dependencies", "Timeline", "Custom Templates", "Milestones", "Work User", "Work Task", "Assignment For User To Manage Work", "Work", "Track Work Progress"
    ],
    "viewsAndReporting":[
        "Boad Project", "Wiki", "Template Table", "Template Kanban", "Admin", "Track Work Progress", "Reports And Statistics"
    ],
    "supportAndControl":[
        "Priority Support", "Admin Consolse", "Google SSO", "Customer success options", "SAML", "User provisioning & deprovisioning", "Data deletion", "Service accounts", "Premium Academy trainings"
    ]

}

const cardTitle = [
    {
        "question": "Do I need a credit card to sign up?",
        "answer": "Etiam rhoncus. Maecenas tempus, tellus eget condimentum  rhoncus, sem quam semper libero, sit amet adipiscing sem  neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem."
    },
    {
        "question": "Do you offer a free trial?",
        "answer": "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem."
    },
    {
        "question": "What if I decide to cancel my plan?",
        "answer": "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem."
    },
    {
        "question": "Can I cancel at anytime?",
        "answer": " Etiam rhoncus. Maecenas tempus, tellus eget condimentum  rhoncus, sem quam semper libero, sit amet adipiscing sem  neque sed ipsum. Nam quam nunc, blandit vel, luctus  pulvinar, hendrerit id, lorem."
    }
]


class Pricing extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: "monthly"

        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {

        return (

            <Container fluid className="p-0">
                <h1 className="h3 mb-3">Plans & Pricing</h1>
                {/*<div className="duration-demo .el">*/}
                {/*</div>*/}
                <Row >
                    <Col md="10" className="mx-auto">
                        <h1 className="text-center">We have a plan for everyone</h1>
                        <h4 className="m-0 !important lead text-center mb-4">
                            Whether you're a business or an individual, 14-day trial no credit
                            card required!
                        </h4>

                        <Row className="justify-content-center mt-3 mb-5 !important">
                            <Col xs="auto">
                                <ButtonGroup>
                                    <Button
                                        color="primary"
                                        outline
                                        onClick={() => {
                                            this.toggle("monthly");
                                        }}
                                        className={
                                            this.state.activeTab === "monthly" ? "active" : ""
                                        }
                                    >
                                        Monthly billing
                                    </Button>
                                    <Button
                                        color="primary"
                                        outline
                                        onClick={() => {
                                            this.toggle("annual");
                                        }}
                                        className={
                                            this.state.activeTab === "annual" ? "active" : ""
                                        }
                                    >
                                        Annual billing
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>

                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="monthly">
                                <Row className="pb-0 pt-0 !important">
                                    <Col sm="4">
                                    </Col>
                                    <Col sm="4" className="mt-0 mb-0 p-0 ml-auto mr-auto !important pricing-table__tab-content__tab-pane__row__col-width"  >
                                        <Card className="mb-0 !important pricing-table__row__col-save">
                                            <div  className="mb-3 mt-3 !important text-white text-center pricing-table__tab-content__tab-pane__row__col-text">Small teams save big!</div>
                                        </Card>
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                </Row>
                                <Row className="pb-4 pt-0 !important">
                                    {
                                        data.map((value, key) => {
                                            return (
                                                value.package === "Premium User" ?

                                                    <Col sm="4" className="mb-3 mb-md-0 w-33 mx-0 px-0 border-right-0 border-left-0 !important pricing-table__tab-content__tab-pane__col">
                                                        <Card className="text-center h-100 border-left-0 border-right-0 !important pricing-table__tab-content__tab-pane__col__card-background-color">
                                                            <CardBody className="d-flex flex-column font-weight-bolder pb-0 pricing-table__tab-content__tab-pane__row__col__card__card-body">
                                                                <div className="mb-2">
                                                                    <h3 className="text-align-center font-weight-bolder  pricing-table__tab-content__tab-pane__row__col__card__card-body-package">{value.package}</h3>
                                                                    <h5 className="pricing-table__tab-content__tab-pane__row__col__card__card-body-intro">{value.intro}</h5>

                                                                </div>
                                                                <h2 className="display-4 pb-4 pricing-table__tab-content__tab-pane__row__col__card__car-body-cost ">${parseInt(value.cost)}</h2>
                                                                <h4 className="text-left font-weight-bold pricing-table__tab-content__tab-pane__row__col__card__car-body-des" >{value.des}</h4>
                                                                <ul className="list-unstyled text-left mt-2 !important">
                                                                    {
                                                                        value.feature.map((value) => {
                                                                            return (
                                                                                <li className="mt-3 !important">
                                                                                    <div className="float-left pr-lg-1  pricing-table__tab-content__tab-pane__row__cad__car-body__li__span">&#10003;</div>
                                                                                    <h4 className="mt-3 !important pricing-table__tab-content__tab-pane__card__font-family">{value}</h4>
                                                                                </li>

                                                                            )
                                                                        })
                                                                    }
                                                                </ul>


                                                                <div className="mt-auto">
                                                                    <Button className="btn btn-primary">
                                                                        {value.button}
                                                                    </Button>
                                                                </div>
                                                                <hr/>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>

                                                    :
                                                    <Col sm="4" className="mb-3 mb-md-0 w-33 mx-0 px-0 border-right-0 border-left-0 !important pricing-table__tab-content__tab-pane__col" >
                                                        <Card className="text-center h-100  border-left-0 border-right-0 !important" >
                                                            <CardBody className="d-flex flex-column font-weight-bolder pb-0 pricing-table__tab-content__tab-pane__row__col__card__card-body">
                                                                <div className="mb-2">
                                                                    <h3 className="text-align-center font-weight-bolder  pricing-table__tab-content__tab-pane__row__col__card__card-body-package">{value.package}</h3>
                                                                    <h5 className="pricing-table__tab-content__tab-pane__row__col__card__card-body-intro">{value.intro}</h5>

                                                                </div>
                                                                <h2 className="display-4 pb-4 pricing-table__tab-content__tab-pane__row__col__card__car-body-cost ">${value.cost}</h2>
                                                                <h4 className="text-left font-weight-bold pricing-table__tab-content__tab-pane__row__col__card__car-body-des" >{value.des}</h4>
                                                                <ul className="list-unstyled text-left mt-2 !important">
                                                                    {
                                                                        value.feature.map((value) => {
                                                                            return (
                                                                                <li className="mt-3 !important">
                                                                                    <div className="float-left pr-lg-1 pricing-table__tab-content__tab-pane__row__cad__car-body__li__span">&#10003;</div>
                                                                                    <h4 className="mt-3 !important pricing-table__tab-content__tab-pane__card__font-family">{value}</h4>
                                                                                </li>

                                                                            )
                                                                        })
                                                                    }
                                                                </ul>


                                                                <div className="mt-auto">
                                                                    <Button  className="btn btn-primary">
                                                                        {value.button}
                                                                    </Button>
                                                                </div>
                                                                <hr/>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            )
                                        })
                                    }

                                </Row>
                            </TabPane>
                        </TabContent>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="annual">
                                <Row className="pb-0 pt-0 !important">
                                    <Col sm="4">
                                    </Col>
                                    <Col sm="4" className="mt-0 mb-0 p-0 ml-auto mr-auto !important pricing-table__tab-content__tab-pane__row__col-width"  >
                                        <Card className="mb-0 !important pricing-table__row__col-save">
                                            <div  className="mb-3 mt-3 !important text-white text-center pricing-table__tab-content__tab-pane__row__col-text">Small teams save big!</div>
                                        </Card>
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                </Row>
                                <Row className="pb-4 pt-0 !important">
                                    {
                                        data.map((value, key) => {
                                            return (
                                                value.package === "Premium User" ?

                                                    <Col sm="4" className="mb-3 mb-md-0 w-33 mx-0 px-0 border-right-0 border-left-0 !important pricing-table__tab-content__tab-pane__col">
                                                        <Card className="text-center h-100 border-left-0 border-right-0 !important pricing-table__tab-content__tab-pane__col__card-background-color">
                                                            <CardBody className="d-flex flex-column font-weight-bolder pb-0 pricing-table__tab-content__tab-pane__row__col__card__card-body">
                                                                <div className="mb-4">
                                                                    <h3 className="text-align-center font-weight-bolder  pricing-table__tab-content__tab-pane__row__col__card__card-body-package">{value.package}</h3>
                                                                    <h5 className="pricing-table__tab-content__tab-pane__row__col__card__card-body-intro">{value.intro}</h5>
                                                                </div>
                                                                <h2 className="display-4 pb-4 pricing-table__tab-content__tab-pane__row__col__card__car-body-cost">${parseInt(value.cost)*11}</h2>
                                                                <h4 className="text-left font-weight-bold pricing-table__tab-content__tab-pane__row__col__card__car-body-des" >{value.des}</h4>
                                                                <ul className="list-unstyled text-left mt-2 !important">
                                                                    {
                                                                        value.feature.map((value) => {
                                                                            return (
                                                                                <li className="mt-3 !important">
                                                                                    <div className="float-left pr-lg-1 pricing-table__tab-content__tab-pane__row__cad__car-body__li__span">&#10003;</div>
                                                                                    <h4 className="pricing-table__tab-content__tab-pane__card__font-family">{value}</h4>
                                                                                </li>

                                                                            )
                                                                        })
                                                                    }
                                                                </ul>


                                                                <div className="mt-auto">
                                                                    <Button className="btn btn-primary">
                                                                        {value.button}
                                                                    </Button>
                                                                </div>
                                                                <hr/>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>

                                                    :
                                                    <Col sm="4" className="mb-3 mb-md-0 w-33 mx-0 px-0 border-right-0 border-left-0 !important pricing-table__tab-content__tab-pane__col">
                                                        <Card className="text-center h-100  border-left-0 border-right-0 !important" >
                                                            <CardBody className="d-flex flex-column font-weight-bolder pb-0 pricing-table__tab-content__tab-pane__row__col__card__card-body">
                                                                <div className="mb-4">
                                                                    <h3 className="text-align-center font-weight-bolder pricing-table__tab-content__tab-pane__row__col__card__card-body-package">{value.package}</h3>
                                                                    <h5 className="pricing-table__tab-content__tab-pane__row__col__card__card-body-intro">{value.intro}</h5>

                                                                </div>
                                                                <h2 className="display-4 pb-4 pricing-table__tab-content__tab-pane__row__col__card__car-body-cost">${parseInt(value.cost)*11}</h2>
                                                                <h4 className="text-left font-weight-bold pricing-table__tab-content__tab-pane__row__col__card__car-body-des" >{value.des}</h4>
                                                                <ul className="list-unstyled text-left mt-2 !important">
                                                                    {
                                                                        value.feature.map((value) => {
                                                                            return (
                                                                                <li className="mt-3 !important">
                                                                                    <div className="float-left pr-lg-1 pricing-table__tab-content__tab-pane__row__cad__car-body__li__span">&#10003;</div>
                                                                                    <h4 className="pricing-table__tab-content__tab-pane__card__font-family">{value}</h4>
                                                                                </li>

                                                                            )
                                                                        })
                                                                    }
                                                                </ul>


                                                                <div className="mt-auto">
                                                                    <Button  className="btn btn-primary">
                                                                        {value.button}
                                                                    </Button>
                                                                </div>
                                                                <hr/>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            )
                                        })
                                    }

                                </Row>
                            </TabPane>
                        </TabContent>
                        <h1 className="text-center mt-0 mb-4 font-weight-bolder pricing-table__h1-text">See how our plans compare </h1>
                        <table className="w-100 p-3 text-left bord !important pricing-table__table">
                            <thead className="pricing-table__table__thead">
                            <tr>
                                <td className="text-left w-25 p-3 border-top font-weight-bolder !important pricing-table__thead__tr__td"><h4 className="mb-0 font-weight-bold">Project Management</h4></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Public</h4></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Premium user</h4></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Company User</h4></td>
                            </tr>
                            </thead>
                            <tbody >
                            {
                                field.projectManagement.map((value, key) => {
                                    return(
                                        <tr className="border-bottom-0">
                                            <td >
                                                <h4 className="m-0 font-weight-lighter !important pricing-table__table__tbody__td-text">{value}</h4>
                                            </td>
                                            <td>
                                                {
                                                    data[0].projectManagement[value]? <span className="d-flex justify-content-around pricing-table__table__tbody__td-span">&#10003;</span> : null
                                                }

                                            </td>
                                            <td className="pricing-table__table__tbody__td-background-color">
                                                {
                                                    data[1].projectManagement[value]? <span className="d-flex justify-content-around pricing-table__table__tbody__td-span">&#10003;</span> : null
                                                }
                                            </td>
                                            <td>
                                                {
                                                    data[2].projectManagement[value]? <span className="d-flex justify-content-around pricing-table__table__tbody__td-span">&#10003;</span> : null
                                                }
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <table className="w-100 p-3 text-left  !important pricing-table__table">
                            <thead className="pricing-table__table__thead">
                            <tr>
                                <td className="text-left w-25 p-3 border-top font-weight-bolder !important pricing-table__thead__tr__td"><h4 className="mb-0 font-weight-bold">Views & Reporting</h4></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Public</h4></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Premium user</h4></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Company User</h4></td>
                            </tr>
                            </thead>
                            <tbody >
                            {
                                field.viewsAndReporting.map((value, key) => {
                                    return(
                                        <tr className="border-bottom-0">
                                            <td>
                                                <h4 className="m-0 font-weight-lighter !important pricing-table__table__tbody__td-text">{value}</h4>
                                            </td>
                                            <td>
                                                {
                                                    data[0].viewsAndReporting[value]? <span className="d-flex justify-content-around pricing-table__table__tbody__td-span">&#10003;</span> : null
                                                }

                                            </td>
                                            <td className="pricing-table__table__tbody__td-background-color">
                                                {
                                                    data[1].viewsAndReporting[value]? <span className="d-flex justify-content-around pricing-table__table__tbody__td-span">&#10003;</span> : null
                                                }
                                            </td>
                                            <td>
                                                {
                                                    data[2].viewsAndReporting[value]? <span className="d-flex justify-content-around pricing-table__table__tbody__td-span">&#10003;</span> : null
                                                }
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <table className="w-100 p-3 text-left !important pricing-table__table">
                            <thead className="pricing-table__table__thead">
                            <tr>
                                <td className="text-left w-25 p-3 border-top font-weight-bolder !important pricing-table__thead__tr__td"><h4 className="mb-0 font-weight-bold">Support & Control</h4></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Public</h4></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Premium user</h4></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Company User</h4></td>
                            </tr>
                            </thead>
                            <tbody >
                            {
                                field.supportAndControl.map((value, key) => {
                                    return(
                                        <tr className="border-bottom-0">
                                            <td>
                                                <h4 className="m-0 font-weight-lighter !important pricing-table__table__tbody__td-text">{value}</h4>
                                            </td>
                                            <td>
                                                {
                                                    data[0].supportAndControl[value]? <span className="d-flex justify-content-around pricing-table__table__tbody__td-span">&#10003;</span> : null
                                                }

                                            </td>
                                            <td className="pricing-table__table__tbody__td-background-color">
                                                {
                                                    data[1].supportAndControl[value]? <span className="d-flex justify-content-around pricing-table__table__tbody__td-span">&#10003;</span> : null
                                                }
                                            </td>
                                            <td>
                                                {
                                                    data[2].supportAndControl[value]? <span className="d-flex justify-content-around pricing-table__table__tbody__td-span">&#10003;</span> : null
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <table className="w-100 p-3 text-left !important pricing-table__table">
                            <thead className="pricing-table__table__thead">
                            <tr>
                                <td className="text-left w-25 p-3 border-top font-weight-bolder !important pricing-table__thead__tr__td"></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Public</h4></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Premium user</h4></td>
                                <td className="text-center pt-0 pb-0 !important pricing-table__thead__tr__td__span-text"><h4 className="mb-0 ">Company User</h4></td>
                            </tr>
                            </thead>
                            <tbody >
                            <tr className="border-bottom-0">
                                <td>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-around">
                                        <Button  className="btn btn-primary" >
                                            Sign up
                                        </Button>
                                    </div>
                                </td>
                                <td className="pricing-table__table__tbody__td-background-color">
                                    <div className="d-flex justify-content-around">
                                        <Button  className="btn btn-primary" >
                                            Try for free!
                                        </Button>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-around">
                                        <Button  className="btn btn-primary" >
                                            Try for free!
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="text-center my-4">
                            <h2>Frequently asked questions</h2>
                        </div>
                        <Row>
                            {
                                cardTitle.map((value, key) => {
                                    return(
                                        <Col sm="6" md="5" className="mx-auto">
                                            <Card>
                                                <CardBody>

                                                    <div className="m-b-5 font-weight-bolder h4 ">{value.question}</div>
                                                    <div className="m-0 font-weight-lighter h5 ">{value.answer}</div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Pricing;

