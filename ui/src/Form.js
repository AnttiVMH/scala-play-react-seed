import React from 'react';
import Client from './Client';

export default class Form extends React.Component {
  state = {
    clubName: '',
    members: [{id: 'member0', name: ''}],
  };

  /**
   * Function for handling input.
   * If classname of the e.target matches 'Member_name',
   * then we handle a members change.
   * If not then we work with clubName
   * @param e the change event
   */
  change = e => {
    if (['Member_name'].includes(e.currentTarget.className)) {
      let members = [...this.state.members];
      members[e.target.id.split('member')[1]]['name'] = e.target.value.toString();
      this.setState({members}, () => console.log(this.state.members))
    } else {
      this.setState({[e.target.name]: e.target.value.toString()})
    }
  };

  /**
   * Function for submitting a club.
   * After adding we clear the state of the form.
   */
  onSubmit() {
    if (this.state.clubName.trim() === '') {
      this.setState({'clubName': 'Club must have a name!'})
    } else {
      Client.addClub(this.state, c => {
      });
      this.setState({'clubName': '', 'members': [{id: 'member0', name: ''}]})
    }
  };

  /**
   * Function for adding member inputs to the form.
   */
  addMember() {
    var newMember = {id: `member${this.state.members.length}`, name: ''};
    this.setState((prevState) => ({members: [...prevState.members, newMember]}));
  };

  /**
   * This render function generates the required inputs
   * based on the this.state.members field.
   * @returns {*}
   */
  render() {
    return (
      <div>
        <form id='clubForm' key='clubForm'>
          <input placeholder='Club Name' name='clubName' key='clubName' value={this.state.clubName}
                 onChange={e => this.change(e)}/>
          <br/>
          {this.state.members.map((member, idx) => {
            return (<div><input id={this.state.members[idx].id} className='Member_name' key={this.state.members[idx].id}
                                value={this.state.members[idx].name} placeholder='Member Name'
                                onChange={e => this.change(e)}/></div>)
          })}
        </form>
        <button onClick={() => this.addMember()}>
          Add a club member
        </button>
        <br/>
        <button onClick={() => this.onSubmit()}>
          Submit
        </button>
      </div>
    )
  };
}
