import React, { Component } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Button, Card, CardBody, Media,
} from "reactstrap";
import Notification from "../../components/Notification";
import classnames from 'classnames';
import "./Profile.css"
import LoadingSprinner from "../../components/LoadingSprinner"
import {CustomImg} from "../../components/CustomTag"
import { Link, Eye, Key } from "react-feather"
import moment from 'moment'
import empty_avatar from "../../assets/img/avatars/empty_avatar.png"
import {getUserId} from "../../utils/utils"
import {isEmpty} from "../../utils/ValidInput"
const api = require('./api/api')

class ProfActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max: 10,
      page: 2,
      status_load: true,
      receiveTimeline: true,
      receiveProject: false,
      receiveWatched: false,
      receiveContact: false,

      activeTab: 'timeline',
    }
  }

  toggle(tab) {
    if(tab==='project'){
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab,
          receiveTimeline: false,
          receiveProject: true,
          receiveWatched: false,
          receiveContact: false,
        });
      }
    }
    else if(tab==='watched'){
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab,
          receiveTimeline: false,
          receiveProject: false,
          receiveWatched: true,
          receiveContact: false,
        });
      }
    }
    else if(tab==='contact'){
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab,
          receiveTimeline: false,
          receiveProject: false,
          receiveWatched: false,
          receiveContact: true,
        });
      }
    }
    else 
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab,
          receiveTimeline: true,
          receiveProject: false,
          receiveWatched: false,
          receiveContact: false,
        });
      }
  }


  render() {
    return (
      <div>
        <Nav tabs className="mb-3">
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'timeline' })}
              onClick={this.toggle.bind(this,'timeline')}
            >
              TimeLine
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'project' })}
              onClick={this.toggle.bind(this,'project')}
            >
              Project
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'watched' })}
              onClick={this.toggle.bind(this,'watched')}
            >
              Watched
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'contact' })}
              onClick={this.toggle.bind(this,'contact')}
            >
              Contact
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="timeline">
            {this.state.receiveTimeline && <ActTimeline id={this.props.id}/>}
          </TabPane>
          <TabPane tabId="project">
            {this.state.receiveProject && <ActProject id={this.props.id}/>}
          </TabPane>
          <TabPane tabId="watched">
            
            {this.state.receiveWatched && <ActWatched id={this.props.id}/>}
          </TabPane>
          <TabPane tabId="contact">
            
            {this.state.receiveContact && <ActContact id={this.props.id}/>}
          </TabPane>
         
        </TabContent>
      </div>
    )
  }
}
class ActTimeline extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: [],
            maxLoad: 10,
            page: 2,
            wikiChangeID: null,
        }
    }
    loadMore(){
        this.setState({ maxLoad: this.state.maxLoad + 10 })
    }
    componentDidMount() {
        this.setState({loadApiGetTimeline: false});
        api.getTimeline(this.props.id, 1, (err, result) => {
            if (err) {
              Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            }
            else {
              this.setState({ data: result, loadApiGetTimeline: true, newPageLength: result.length })
            }
        })
    }
    wikiChangeMore(id) {
        this.setState({
            wikiChangeID: id
        });
    }
    wikiChangeLess() {
        this.setState({
            wikiChangeID: null
        });
    }
    updateTimeLine() {
        this.setState({ page: this.state.page + 1 });
        api.getTimeline(this.props.id, this.state.page, (err, result) => {
          if (err) {
            Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
          } else {
            this.setState({
              maxLoad: this.state.maxLoad + 10
            })
            let tempdata = this.state.data
            for (let i = 0; i < result.length; i++) {
              tempdata.push(result[i]);
            }
            this.setState({
              data:tempdata,
              newPageLength: result.length
            });
          }
        })
      }
    
    render() {
        return (
            <div>
            {!this.state.loadApiGetTimeline ? <LoadingSprinner /> :
            <Card>
              <CardBody className="tiles mb-4" aria-live="polite">
                {this.state.data==='No Content' ? this.state.data : this.state.data.slice(0, this.state.maxLoad).map((data, index) => (
                  <div key={index}>
                    <Media>
                      <Media left href={data.data.user.id !== getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>
                        <CustomImg
                          src={data.data.user.photo}
                          className="rounded-circle mr-2 img--user--square-3x"
                          title={`@${data.data.user.username}`}
                          alt="Avatar"
                        />
                      </Media>
                      <Media body>
                        <div className="float-left Profile__width_88">
                          <Media>
                            {data.event_type === "users.user.create" ? 
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has joined Fwork</div>

                            : data.event_type === "projects.project.create" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> created the project <a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}/timeline`}>{data.data.project.name}</a></div>
                            : data.event_type === "projects.project.change" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> updated something in the project <a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}/timeline`}>{data.data.project.name}</a></div>

                            : data.event_type === "projects.membership.create" ?
                            <div ><strong><a href={`${window.location.origin}/project/${data.data.project.slug}/timeline`}>{data.data.project.name}</a></strong> has a new member</div>
                            
                            : data.event_type === "userstories.userstory.create" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has created a new US <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}/us/${data.data.userstory.ref}`}>#{data.data.userstory.ref} {data.data.userstory.subject}</a></strong> in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/timeline`}>{data.data.project.name}</a></strong></div>
                            
                            //
                            : data.event_type === "userstories.userstory.change" && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.new.length>0 ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has uploaded a new attachment in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/us/${data.data.userstory.ref}`}>#{data.data.userstory.ref} {data.data.userstory.subject}</a></strong></div>
                            : data.event_type === "userstories.userstory.change" && !isEmpty(data.data.values_diff.status) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Status" of the US <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/us/${data.data.userstory.ref}`}>#{data.data.userstory.ref} {data.data.userstory.subject}</a></strong> to {data.data.values_diff.status[1]}</div>
                            : data.event_type === "userstories.userstory.change" && !isEmpty(data.data.values_diff.subject) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Subject" of the US <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/us/${data.data.userstory.ref}`}>#{data.data.userstory.ref} {data.data.userstory.subject}</a></strong> to {data.data.values_diff.subject[1]}</div>
                            : data.event_type === "userstories.userstory.change" && !isEmpty(data.data.values_diff.description_diff) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Description" of the US <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/us/${data.data.userstory.ref}`}>#{data.data.userstory.ref} {data.data.userstory.subject}</a></strong></div>
                            : data.event_type === "userstories.userstory.change" && !isEmpty(data.data.values_diff.due_date) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Due date" of the US <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/us/${data.data.userstory.ref}`}>#{data.data.userstory.ref} {data.data.userstory.subject}</a></strong> to {data.data.values_diff.due_date[1] === null ? `not set` : data.data.values_diff.due_date[1]}</div>
                            : data.event_type === "userstories.userstory.change" && !isEmpty(data.data.values_diff.assigned_users) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Assigned users" of the US <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/us/${data.data.userstory.ref}`}>#{data.data.userstory.ref} {data.data.userstory.subject}</a></strong> to {data.data.values_diff.assigned_users[1]}</div>
                            : data.event_type === "userstories.userstory.change" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated something in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/us/${data.data.userstory.ref}`}>#{data.data.userstory.ref} {data.data.userstory.subject}</a></strong></div>
                            : data.event_type === "userstories.userstory.delete" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has deleted the US <strong>#{data.data.userstory.ref} {data.data.userstory.subject}</strong></div>

                            : data.event_type === "issues.issue.create" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has created a new issue <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/issue/${data.data.issue.ref}`}>#{data.data.issue.ref} {data.data.issue.subject}</a></strong> in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/timeline`}>{data.data.project.name}</a></strong></div>
                            
                            //
                            : data.event_type === "issues.issue.change" && !isEmpty(data.data.values_diff.subject) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Subject" of the issue <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/issue/${data.data.issue.ref}`}>#{data.data.issue.ref} {data.data.issue.subject}</a></strong> to {data.data.values_diff.subject[1]}</div>
                            : data.event_type === "issues.issue.change" && !isEmpty(data.data.values_diff.description_diff) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Description" of the issue <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/issue/${data.data.issue.ref}`}>#{data.data.issue.ref} {data.data.issue.subject}</a></strong></div>
                            : data.event_type === "issues.issue.change" && !isEmpty(data.data.values_diff.due_date) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Due date" of the issue <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/issue/${data.data.issue.ref}`}>#{data.data.issue.ref} {data.data.issue.subject}</a></strong> to {data.data.values_diff.due_date[1] === null ? `not set` : data.data.values_diff.due_date[1]}</div>
                            : data.event_type === "issues.issue.change" && !isEmpty(data.data.values_diff.assigned_to) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Assigned to" of the issue <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/issue/${data.data.issue.ref}`}>#{data.data.issue.ref} {data.data.issue.subject}</a></strong> to {data.data.values_diff.assigned_to[1]}</div>
                            : data.event_type === "issues.issue.change" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated something of the issue <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/issue/${data.data.issue.ref}`}>#{data.data.issue.ref} {data.data.issue.subject}</a></strong> in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/timeline`}>{data.data.project.name}</a></strong></div>

                            : data.event_type === "issues.issue.delete" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has deleted the issue <strong>#{data.data.issue.ref} {data.data.issue.subject}</strong> in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/timeline`}>{data.data.project.name}</a></strong></div>
                            : data.event_type === "tasks.task.create" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has created a new task <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}-${data.data.task.userstory.ref}/task/${data.data.task.ref}`}>#{data.data.task.ref} {data.data.task.subject}</a></strong> in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/timeline`}>{data.data.project.name}</a></strong> which belongs to the US <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}/us/${data.data.task.userstory.ref}`}>#{data.data.task.userstory.ref} {data.data.task.userstory.subject}</a></strong></div>

                            //
                            : data.event_type === "tasks.task.change" && !isEmpty(data.data.values_diff.subject)?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Subject" of the task <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}-${data.data.task.userstory.ref}/task/${data.data.task.ref}`}>#{data.data.task.ref} {data.data.task.subject}</a></strong> which belongs to the US <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}/us/${data.data.task.userstory.ref}`}>#{data.data.task.userstory.ref} {data.data.task.userstory.subject}</a></strong> to {data.data.values_diff.subject[1]}</div>
                            : data.event_type === "tasks.task.change" && !isEmpty(data.data.values_diff.description_diff)?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Description" of the task <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}-${data.data.task.userstory.ref}/task/${data.data.task.ref}`}>#{data.data.task.ref} {data.data.task.subject}</a></strong> which belongs to the US <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}/us/${data.data.task.userstory.ref}`}>#{data.data.task.userstory.ref} {data.data.task.userstory.subject}</a></strong></div>
                            : data.event_type === "tasks.task.change" && !isEmpty(data.data.values_diff.due_date)?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Due date" of the task <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}-${data.data.task.userstory.ref}/task/${data.data.task.ref}`}>#{data.data.task.ref} {data.data.task.subject}</a></strong> which belongs to the US <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}/us/${data.data.task.userstory.ref}`}>#{data.data.task.userstory.ref} {data.data.task.userstory.subject}</a></strong> to {data.data.values_diff.due_date[1] == null ? `not set` : data.data.values_diff.due_date[1]}</div>
                            : data.event_type === "tasks.task.change" && !isEmpty(data.data.values_diff.assigned_to)?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated the attribute "Assigned to" of the task <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}-${data.data.task.userstory.ref}/task/${data.data.task.ref}`}>#{data.data.task.ref} {data.data.task.subject}</a></strong> which belongs to the US <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}/us/${data.data.task.userstory.ref}`}>#{data.data.task.userstory.ref} {data.data.task.userstory.subject}</a></strong> to {data.data.values_diff.assigned_to[1]}</div>
                            : data.event_type === "tasks.task.change" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated something of the task <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}-${data.data.task.userstory.ref}/task/${data.data.task.ref}`}>#{data.data.task.ref} {data.data.task.subject}</a></strong> which belongs to the US <strong><a href={`${window.location.origin}/project/${data.data.user.username}-${data.data.project.name}/us/${data.data.task.userstory.ref}`}>#{data.data.task.userstory.ref} {data.data.task.userstory.subject}</a></strong></div>

                            : data.event_type === "wiki.wikipage.create" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has created a new wiki <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/wiki/${data.data.wikipage.slug}`}>{data.data.wikipage.slug}</a></strong></div>

                            : (data.event_type === "wiki.wikipage.change"  && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.new.length>0) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has uploaded a new attachment in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/wiki/${data.data.wikipage.slug}`}>{data.data.wikipage.slug}</a></strong></div>
                            : (data.event_type === "wiki.wikipage.change"  && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.changed.length>0) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated a attachment in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/wiki/${data.data.wikipage.slug}`}>{data.data.wikipage.slug}</a></strong></div>
                            : (data.event_type === "wiki.wikipage.change"  && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.deleted.length>0) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has deleted a attachment in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/wiki/${data.data.wikipage.slug}`}>{data.data.wikipage.slug}</a></strong></div>
                            : (data.event_type === "wiki.wikipage.change" && !isEmpty(data.data.values_diff.content_diff)) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has changed description of <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/wiki/${data.data.wikipage.slug}`}>{data.data.wikipage.slug}</a></strong></div>

                            : data.event_type === "wiki.wikipage.delete" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has deleted the wiki <strong>{data.data.wikipage.slug}</strong></div>

                            : data.event_type === "epics.epic.create" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has created a new epic <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/epic/${data.data.epic.ref}`}>#{data.data.epic.ref} {data.data.epic.subject}</a></strong> in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/timeline`}>{data.data.project.name}</a></strong></div>

                            : (data.event_type === "epics.epic.change"  && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.new.length>0) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has uploaded a new attachment in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/epic/${data.data.epic.ref}`}>#{data.data.epic.ref} {data.data.epic.subject}</a></strong></div>
                            : (data.event_type === "epics.epic.change"  && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.changed.length>0) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has updated a attachment in <strong><a href={`${window.location.origin}/project/${data.data.project.slug}/epic/${data.data.epic.ref}`}>#{data.data.epic.ref} {data.data.epic.subject}</a></strong></div>
                            : (data.event_type === "epics.epic.change"  && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.deleted.length>0) ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has deleted a attachment in<strong><a href={`${window.location.origin}/project/${data.data.project.slug}/epic/${data.data.epic.ref}`}>#{data.data.epic.ref} {data.data.epic.subject}</a></strong></div>

                            : data.event_type === "epics.epic.delete" ?
                            <div ><strong><a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a></strong> has deleted the epic <strong>#{data.data.epic.ref} {data.data.epic.subject}</strong></div>
                            : null
                            }
                          </Media>
                        </div>
                        <div className="float-right">
                          {moment(new Date(data.created)).fromNow()}
                        </div>
                      </Media>
                    </Media>
                    <div className="Profile__marginleft_58px_toRem">
                    { data.event_type === "projects.project.create" ?
                      <div><blockquote className="Profile__activity-comment-quote">{data.data.project.description}</blockquote></div>
                      :data.event_type === "projects.project.change" ?
                      null
                      : data.event_type === "projects.membership.create" ?
                      <div>
                        <blockquote className="Profile__activity-comment-quote">
                          <div className="float-left">
                            <Media left href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>
                            <CustomImg
                              src={data.data.user.photo}
                              className="rounded-circle mr-2 img--user--square-3x"
                              title={`@${data.data.user.username}`}
                              alt="Avatar"
                            />
                            </Media>
                          </div>
                          <Media heading>
                            <a title={data.data.user.name} href={data.data.user.id!==getUserId() ? `?username=${data.data.user.username}` : window.location.pathname}>{data.data.user.name}</a>
                          </Media>
                          <Media>{data.data.role.name}</Media>
                        </blockquote>
                      </div>
                      : data.event_type === "userstories.userstory.change" && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.new.length>0 ?
                          data.data.values_diff.attachments.new.map((attachNew,index)=>(
                            <div key={index}><blockquote className="Profile__activity-comment-quote">{attachNew.thumb_url!==null ? <a title={`See ${attachNew.filename}`} target="_blank" href={attachNew.url}><CustomImg src={attachNew.thumb_url}/></a> : <div><div>{attachNew.description}</div><a title={`Click to download ${attachNew.filename}`} target="_blank" href={attachNew.url}><Link size="2%"/>{` ${attachNew.filename}`}</a></div>}</blockquote></div>
                          ))
                      : data.event_type === "issues.issue.change" ?
                      null
                      : data.event_type === "tasks.task.change" ?
                      null
                      : (data.event_type === "wiki.wikipage.change" && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.new.length>0) ?
                          data.data.values_diff.attachments.new.map((attachNew,index)=>(
                            <div key={index}><blockquote className="Profile__activity-comment-quote">{attachNew.thumb_url!==null ? <a title={`See ${attachNew.filename}`} target="_blank" href={attachNew.url}><CustomImg src={attachNew.thumb_url}/></a> : <div><div>{attachNew.description}</div><a title={`Click to download ${attachNew.filename}`} target="_blank" href={attachNew.url}><Link size="2%"/>{` ${attachNew.filename}`}</a></div>}</blockquote></div>
                          ))
                      : (data.event_type === "wiki.wikipage.change" && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.changed.length>0) ?
                      <div><blockquote className="Profile__activity-comment-quote">{data.data.values_diff.attachments.changed[0].thumb_url!==null ? <a title={`See ${data.data.values_diff.attachments.changed[0].filename}`} target="_blank" href={data.data.values_diff.attachments.changed[0].url}><CustomImg src={data.data.values_diff.attachments.changed[0].thumb_url}/></a> : <div><div><del style={{background: '#ffe6e6'}}>{data.data.values_diff.attachments.changed[0].changes.description[0]}</del><ins style={{background: '#e6ffe6'}}>{data.data.values_diff.attachments.changed[0].changes.description[1]}</ins></div><a title={`Click to download ${data.data.values_diff.attachments.changed[0].filename}`} target="_blank" href={data.data.values_diff.attachments.changed[0].url}><Link size="2%"/>{` ${data.data.values_diff.attachments.changed[0].filename}`}</a></div>}</blockquote></div>
                      : (data.event_type === "wiki.wikipage.change" && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.deleted.length>0) ?
                      <div><blockquote className="Profile__activity-comment-quote"><del style={{background: '#ffe6e6'}}><Link size="2%"/>{data.data.values_diff.attachments.deleted[0].filename}</del></blockquote></div>
                      : (data.event_type === "wiki.wikipage.change" && !isEmpty(data.data.values_diff.content_diff) && data.data.values_diff.content_diff[1].length>500 && this.state.wikiChangeID !== data.id) ?
                      <div><blockquote className="Profile__activity-comment-quote"><p dangerouslySetInnerHTML={{ __html: data.data.values_diff.content_diff[1].slice(0,500) }} /><div onClick={this.wikiChangeMore.bind(this,data.id)} className="TextColor">See more</div></blockquote></div>
                      : (data.event_type === "wiki.wikipage.change" && !isEmpty(data.data.values_diff.content_diff) && data.data.values_diff.content_diff[1].length>500 && this.state.wikiChangeID === data.id) ?
                      <div><blockquote className="Profile__activity-comment-quote"><p dangerouslySetInnerHTML={{ __html: data.data.values_diff.content_diff }} /><div onClick={this.wikiChangeLess.bind(this)} className="TextColor">Hide less</div></blockquote></div>
                      : (data.event_type === "wiki.wikipage.change" && !isEmpty(data.data.values_diff.content_diff)) ?
                      <div><blockquote className="Profile__activity-comment-quote"><p dangerouslySetInnerHTML={{ __html: data.data.values_diff.content_diff[1] }} /></blockquote></div>



                      : (data.event_type === "epics.epic.change"  && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.new.length>0) ?
                          data.data.values_diff.attachments.new.map((attachNew,index)=>(
                            <div key={index}><blockquote className="Profile__activity-comment-quote">{attachNew.thumb_url!==null ? <a title={`See ${attachNew.filename}`} target="_blank" href={attachNew.url}><CustomImg src={attachNew.thumb_url}/></a> : <div><div>{attachNew.description}</div><a title={`Click to download ${attachNew.filename}`} target="_blank" href={attachNew.url}><Link size="2%"/>{` ${attachNew.filename}`}</a></div>}</blockquote></div>
                          ))
                      : (data.event_type === "epics.epic.change"  && !isEmpty(data.data.values_diff.attachments) && data.data.values_diff.attachments.deleted.length>0) ?
                      <div><blockquote className="Profile__activity-comment-quote"><del style={{background: '#ffe6e6'}}><Link size="2%"/>{data.data.values_diff.attachments.deleted[0].filename}</del></blockquote></div>

                      : null
                    }</div>
                    <hr />
                  </div>
                ))}
                {this.state.maxLoad < this.state.data.length ? <Button block color="primary" className="load-more" onClick={this.loadMore.bind(this)}>Load More</Button>
                  : this.state.newPageLength === 30 ?
                    <Button block color="primary" className="load-more" onClick={this.updateTimeLine.bind(this)}>Load More</Button>
                  :
                  null
                }
              </CardBody>
            </Card>}
            </div>
        );
    }
}

class ActProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxLoad: 10,
            listProject: [],
            listContact: []
        }
    }
    loadMore(){
        this.setState({ maxLoad: this.state.maxLoad + 10 })
    }
    componentDidMount() {
        this.setState({loadApiGetProject: false, loadApiGetContact: false });
        api.getProject((err,result) => {
            if (err) {
              Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            }
            else {
              this.setState({listProject:result, loadApiGetProject: true});
            }
        })
        api.getContacts(this.props.id,(err,result) => {
            if (err) {
              Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            }
            else {
              this.setState({listContact:result, loadApiGetContact: true});
            }
        })
    }
    render() {
        return (
            <div>
                {(!this.state.loadApiGetProject || !this.state.loadApiGetContact) ? <LoadingSprinner /> :
                    <Card>
                        <CardBody className="tiles mb-4" aria-live="polite">
                            {this.state.listProject.slice(0, this.state.maxLoad).map((data, index) => (
                                <div key={index}>
                                    <Media>
                                        <div className="w-100">
                                            <div className="float-left">
                                                <Media left href={`${window.location.origin}/project/${data.slug}/timeline`}>
                                                    <CustomImg
                                                        src={data.logo_small_url}
                                                        className="rounded-circle mr-2 img--user--square-3x"
                                                        title={`${data.name}`}
                                                        alt="Avatar"
                                                    />
                                                </Media>
                                                <Media body className="float-right">
                                                    <Media heading>
                                                        <a title={data.name} href={`${window.location.origin}/project/${data.slug}/timeline`}>
                                                            {data.name}
                                                        </a>
                                                    </Media>
                                                    {data.description}
                                                </Media>
                                            </div>
                                            <div className="float-right w-25">
                                                {this.state.listContact.map((user, index) => (
                                                    data.members.indexOf(user.id) === -1 ? null :
                                                        <div key={index} className="float-right">
                                                            <a href={user.id !== getUserId() ? `?username=${user.username}` : window.location.pathname}>
                                                                <CustomImg
                                                                    src={user.photo}
                                                                    className="mr-1 mt-1 img--user--square-2x"
                                                                    title={`@${user.username}`}
                                                                    alt="Avatar"
                                                                />
                                                            </a>
                                                        </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Media>
                                    <hr />
                                </div>
                            ))}
                            {this.state.maxLoad < this.state.listProject.length && <Button block color="primary" className="load-more" onClick={this.loadMore.bind(this)}>Load More</Button>}
                        </CardBody>
                    </Card>
                }
            </div>
        );
    }
}

class ActWatched extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxLoad: 10,
            listWatched: [],
            page: 2,
        }
    }
    loadMore(){
        this.setState({ maxLoad: this.state.maxLoad + 10 })
    }
    componentDidMount() {
        this.setState({loadApiGetWatched: false});
        api.getWatched(this.props.id, 1, (err, result) => {
            if (err) {
              Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            }
            else {
                this.setState({ listWatched: result, loadApiGetWatched: true,  newPageLength: result.length });
            }
        })
    }
    updateWatched() {
        this.setState({ page: this.state.page + 1 });
        api.getWatched(this.props.id, this.state.page, (err, result) => {
          if (err) {
            Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
          } else {
            this.setState({
                maxLoad: this.state.maxLoad + 10
            })
            let tempdata = this.state.listWatched
            for (let i = 0; i < result.length; i++) {
              tempdata.push(result[i]);
            }
            this.setState({
              listWatched: tempdata,
              newPageLength: result.length
            });
          }
        })
      }
    render() {
        return (
            <div>
                {!this.state.loadApiGetWatched ? <LoadingSprinner /> :
                    <Card>
                        <CardBody className="tiles mb-4" aria-live="polite">
                            {this.state.listWatched.slice(0, this.state.maxLoad).map((data, index) => (
                                <div key={index}>
                                    <Media>
                                        <Media left href={data.type === "userstory" && !isEmpty(data.assigned_to_extra_info) ? (data.assigned_to_extra_info.id !== getUserId() ? `?username=${data.assigned_to_extra_info.username}` : window.location.pathname)
                                                        : data.type === "project" ? "#"
                                                        : data.type === "task" && !isEmpty(data.assigned_to_extra_info) ? (data.assigned_to_extra_info.id !== getUserId() ? `?username=${data.assigned_to_extra_info.username}` : window.location.pathname)
                                                        : "#"
                                        }>
                                            <CustomImg
                                                src={data.type === "userstory" && data.assigned_to_extra_info !== null ? data.assigned_to_extra_info.photo
                                                    : data.type === "project" ? data.logo_small_url
                                                    : data.type === "task" && data.assigned_to_extra_info !== null ? data.assigned_to_extra_info.photo
                                                    : empty_avatar}
                                                className="rounded-circle mr-2 img--user--square-3x"
                                                title={(data.type === "userstory"  || data.type === "task") && data.assigned_to_extra_info !== null ? `@${data.assigned_to_extra_info.username}`
                                                    : data.type === "project" ? data.name
                                                    : null}
                                                alt="Avatar"
                                            />
                                        </Media>
                                        <Media body>
                                            <div className="float-left">
                                                <Media heading>
                                                    {data.type === "userstory" ? <div><span>{data.project_name}</span><span> USER STORY </span> <span style={{ color: data.status_color }}>{data.status}</span></div>
                                                    : data.type === "project" ? (data.is_private ? <div><span><a title={data.name} href={`${window.location.origin}/project/${data.slug}/timeline`}>{data.name}</a></span><span className="mx-3"><Key size="20px" /></span></div> : <a href="#">{data.name}</a>)
                                                    : data.type === "task" ? <div><span>{data.project_name}</span><span> TASK </span> <span style={{ color: data.status_color }}>{data.status}</span></div>
                                                    : null
                                                    }
                                                </Media>
                                                    {data.type === "userstory" ? <strong>#{data.ref + ' '}<a href={`${window.location.origin}/project/${data.project_slug}/us/${data.ref}`} title={`#${data.ref} ${data.subject}`}>{data.subject}</a></strong>
                                                    : data.type === "project" ? data.description
                                                    : data.type === "task" ? <strong>#{data.ref + ' '}<a href={`${window.location.origin}/project/${data.project_slug}/task/${data.ref}`} title={`#${data.ref} ${data.subject}`}>{data.subject}</a></strong>
                                                    : "null"
                                                }
                                            </div>
                                            <div className="float-right">
                                                <span title={data.total_watchers < 2 ? `${data.total_watchers} watcher` : `${data.total_watchers} watchers`}>
                                                    <div className="float-right">{data.total_watchers}</div>
                                                    <Eye size="6%" className="float-right mx-1" />
                                                </span>
                                            </div>
                                        </Media>
                                    </Media>
                                    <hr />
                                </div>
                            ))}
                            {this.state.maxLoad < this.state.listWatched.length ? <Button block color="primary" className="load-more" onClick={this.loadMore.bind(this)}>Load More</Button>
                            : this.state.newPageLength === 30 ?
                                <Button block color="primary" className="load-more" onClick={this.updateWatched.bind(this)}>Load More</Button>
                            :
                            null
                            }
                        </CardBody>
                    </Card>
                }
            </div>
        );
    }
}

class ActContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxLoad: 10,
            listContact: []
        }
    }
    loadMore(){
        this.setState({ maxLoad: this.state.maxLoad + 10 })
    }
    componentDidMount() {
        this.setState({loadApiGetContact: false});
        api.getContacts(this.props.id,(err,result) => {
            if (err) {
              Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            }
            else {
              this.setState({listContact: result, loadApiGetContact: true});
            }
        })
    }
    
    render() {
        return (
            <div>
            {!this.state.loadApiGetContact ? <LoadingSprinner/> :
            <Card>
                <CardBody className="tiles mb-4" aria-live="polite">
                {this.state.listContact.slice(0,this.state.maxLoad).map((data,index)=>(
                    <div key={index}>
                        <Media>
                            <Media left href={data.id !== getUserId() ? `?username=${data.username}` : window.location.pathname}>
                                <CustomImg
                                    src={data.photo}
                                    className="rounded-circle mr-2 img--user--square-3x"
                                    title={`@${data.username}`}
                                    alt="Avatar"
                                />
                            </Media>
                            <Media body>
                                <Media>
                                    <strong><a title={data.full_name} href={data.id !== getUserId() ? `?username=${data.username}` : window.location.pathname}>
                                        {data.full_name}
                                    </a></strong>
                                </Media>
                                {data.roles.join(', ')}
                                <br/>
                                {data.bio}
                            </Media>
                        </Media>
                        <hr/>
                    </div>
                ))}
                {this.state.maxLoad < this.state.listContact.length && <Button block color="primary" className="load-more" onClick={this.loadMore.bind(this)}>Load More</Button>}
                </CardBody>
          </Card>}
          </div>
        );
    }
}

export default ProfActivities;