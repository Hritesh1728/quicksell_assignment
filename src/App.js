import * as logos from './logoImports.js';
import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Header';

const Card = (props) => {
  return (
    <div className="card">
      <div className='container1'>
        <p className="start-align">{props.id}</p>
        <div className='profile_logo'>
          {props.imageUrl !== '' ? <img src={props.imageUrl} alt="profile_logo" /> : ""}
        </div>
      </div>
      <div className='title_class'>
        <h5>
          {props.title_logo !== '' ? <img src={props.title_logo} alt="signal_logo" /> : ""}
          <span>{props.title}</span>
        </h5>
      </div>
      <div className="container2">
        {props.signal_icon !== '' ? <button className="rounded-button">
          <img src={props.signal_icon} alt="signal_logo" className="c_c2_logo" />
        </button> : ""}
        <button className="rounded-button">
          {props.tag != null ? <><img src={logos.circle24_logo} alt="circle-24_logo" className="c_c2_logo" />
            <p>{props.tag}</p></> : ""}
        </button>
      </div>
    </div>
  );
};

const fetchData = async () => {
  try {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const GroupName = (props) => {
  return (
    <div className="group_name">
      <div className="left-section">
        <img src={props.group_icon} alt="profile_logo" className="icon" />
        <p>{props.name}</p>
        <div className="grey-counter">{props.count}</div>
      </div>
      <div className="right-section">
        <img src={logos.plus_logo} alt="profile_logo" className="icon" />
        <img src={logos.filled_dots_logo} alt="profile_logo" className="icon" />
      </div>
    </div>
  );
};

function App() {
  // Api call
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        // Handle the error if needed
      }
    };

    fetchDataAndSetState();
  }, []);

  //get data from the header section
  const [selectedGroup, setSelectedGroup] = useState(sessionStorage.getItem('selectedGroup') || 'status');
  const [selectedOrder, setSelectedOrder] = useState(sessionStorage.getItem('selectedOrder') || 'priority');

  // Save selected values to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('selectedGroup', selectedGroup);
    sessionStorage.setItem('selectedOrder', selectedOrder);
  }, [selectedGroup, selectedOrder]);

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
  };

  const handleOrderChange = (value) => {
    setSelectedOrder(value);
  };


  //grouping and sorting
  const groupedTickets = {};
  if (data.tickets) {
    if (selectedGroup === 'status') {
      for (const ticket of data.tickets) {
        const status = ticket.status;

        if (!groupedTickets[status]) {
          groupedTickets[status] = [];
        }

        groupedTickets[status].push(ticket);
      }
    } else if (selectedGroup === 'status') {
      for (const ticket of data.tickets) {
        const status = ticket.status;

        if (!groupedTickets[status]) {
          groupedTickets[status] = [];
        }

        groupedTickets[status].push(ticket);
      }
    } else if (selectedGroup === 'status') {
      for (const ticket of data.tickets) {
        const status = ticket.status;

        if (!groupedTickets[status]) {
          groupedTickets[status] = [];
        }

        groupedTickets[status].push(ticket);
      }
    } else if (selectedGroup === 'userId') {
      for (const ticket of data.tickets) {
        const userId = ticket.userId;

        if (!groupedTickets[userId]) {
          groupedTickets[userId] = [];
        }

        groupedTickets[userId].push(ticket);
      }
    } else {
      for (const ticket of data.tickets) {
        const priority = ticket.priority;

        if (!groupedTickets[priority]) {
          groupedTickets[priority] = [];
        }

        groupedTickets[priority].push(ticket);
      }
    }

    if (selectedOrder === 'priority') {
      Object.keys(groupedTickets).forEach((priority) => {
        groupedTickets[priority].sort((a, b) => b.priority - a.priority);
      });
    } else {
      Object.keys(groupedTickets).forEach((title) => {
        groupedTickets[title].sort((a, b) => a.title.localeCompare(b.title));
      });
    }
  }

  //Priority Type Variable
  const priority_type = {
    '4': 'Urgent',
    '3': 'High',
    '2': 'Medium',
    '1': 'Low',
    '0': 'No priority',
  };

  return (
    <>
      <Header
        selectedGroup={selectedGroup}
        selectedOrder={selectedOrder}
        onGroupChange={handleGroupChange}
        onOrderChange={handleOrderChange}
      />

      <body>
        {selectedGroup === 'status' ?
          <div className="app">
            <div className="container">
              <GroupName
                name='Backlog'
                count={groupedTickets['Backlog'] != null ? Object.keys(groupedTickets['Backlog']).length.toString() : '0'}
                group_icon={logos.backlog_logo}
              />
              {groupedTickets['Backlog'] != null ? Object.keys(groupedTickets['Backlog']).map((ticket) => (
                <Card
                  id={groupedTickets['Backlog'][ticket].id}
                  title={groupedTickets['Backlog'][ticket].title}
                  tag={groupedTickets['Backlog'][ticket].tag}
                  imageUrl={logos.profile_logo}
                  title_logo=''
                  signal_icon={groupedTickets['Backlog'][ticket].priority === 0 ? logos.no_priority_logo : (groupedTickets['Backlog'][ticket].priority === 1 ? logos.low_logo : (groupedTickets['Backlog'][ticket].priority === 2 ? logos.medium_logo : (groupedTickets['Backlog'][ticket].priority === 3 ? logos.signal_logo : logos.urgent_logo)))}
                />
              )) : ""}
            </div>
            <div className="container">
              <GroupName
                name='Todo'
                count={groupedTickets['Todo'] != null ? Object.keys(groupedTickets['Todo']).length.toString() : '0'}
                group_icon={logos.todo_logo}
              />
              {groupedTickets['Todo'] != null ? Object.keys(groupedTickets['Todo']).map((ticket) => (
                <Card
                  id={groupedTickets['Todo'][ticket].id}
                  title={groupedTickets['Todo'][ticket].title}
                  tag={groupedTickets['Todo'][ticket].tag}
                  imageUrl={logos.profile_logo}
                  title_logo=''
                  signal_icon={groupedTickets['Todo'][ticket].priority === 0 ? logos.no_priority_logo : (groupedTickets['Todo'][ticket].priority === 1 ? logos.low_logo : (groupedTickets['Todo'][ticket].priority === 2 ? logos.medium_logo : (groupedTickets['Todo'][ticket].priority === 3 ? logos.signal_logo : logos.urgent_logo)))}
                />
              )) : ""}
            </div>
            <div className="container">
              <GroupName
                name='In Progress'
                count={groupedTickets['In progress'] != null ? Object.keys(groupedTickets['In progress']).length.toString() : '0'}
                group_icon={logos.inprogress_logo}
              />
              {groupedTickets['In progress'] != null ? Object.keys(groupedTickets['In progress']).map((ticket) => (
                <Card
                  id={groupedTickets['In progress'][ticket].id}
                  title={groupedTickets['In progress'][ticket].title}
                  tag={groupedTickets['In progress'][ticket].tag}
                  imageUrl={logos.profile_logo}
                  title_logo=''
                  signal_icon={groupedTickets['In progress'][ticket].priority === 0 ? logos.no_priority_logo : (groupedTickets['In progress'][ticket].priority === 1 ? logos.low_logo : (groupedTickets['In progress'][ticket].priority === 2 ? logos.medium_logo : (groupedTickets['In progress'][ticket].priority === 3 ? logos.signal_logo : logos.urgent_logo)))}
                />
              )) : ""}
            </div>
            <div className="container">
              <GroupName
                name='Done'
                count={groupedTickets['Done'] != null ? Object.keys(groupedTickets['Done']).length.toString() : '0'}
                group_icon={logos.done_logo}
              />
              {groupedTickets['Done'] != null ? Object.keys(groupedTickets['Done']).map((ticket) => (
                <Card
                  id={groupedTickets['Done'][ticket].id}
                  title={groupedTickets['Done'][ticket].title}
                  tag={groupedTickets['Done'][ticket].tag}
                  imageUrl={logos.profile_logo}
                  title_logo=''
                  signal_icon={groupedTickets['Done'][ticket].priority === 0 ? logos.no_priority_logo : (groupedTickets['Done'][ticket].priority === 1 ? logos.low_logo : (groupedTickets['Done'][ticket].priority === 2 ? logos.medium_logo : (groupedTickets['Done'][ticket].priority === 3 ? logos.signal_logo : logos.urgent_logo)))}
                />
              )) : ""}
            </div>
            <div className="container">
              <GroupName
                name='Canceled'
                count={groupedTickets['Canceled'] != null ? Object.keys(groupedTickets['Canceled']).length.toString() : '0'}
                group_icon={logos.canceled_logo}
              />
              {groupedTickets['Canceled'] != null ? Object.keys(groupedTickets['Canceled']).map((ticket) => (
                <Card
                  id={groupedTickets['Canceled'][ticket].id}
                  title={groupedTickets['Canceled'][ticket].title}
                  tag={groupedTickets['Canceled'][ticket].tag}
                  imageUrl={logos.profile_logo}
                  title_logo=''
                  signal_icon={groupedTickets['Canceled'][ticket].priority === 0 ? logos.no_priority_logo : (groupedTickets['Canceled'][ticket].priority === 1 ? logos.low_logo : (groupedTickets['Canceled'][ticket].priority === 2 ? logos.medium_logo : (groupedTickets['Canceled'][ticket].priority === 3 ? logos.signal_logo : logos.urgent_logo)))}
                />
              )) : ""}
            </div>
          </div>
          : ""}
        {selectedGroup === 'userId' ?
          <div className="app">
            {data['users'] ? Object.keys(data['users']).map((user) => (
              <div className="container">
                <GroupName
                  name={data['users'][user]['name']}
                  count={groupedTickets[data['users'][user]['id']] != null ? Object.keys(groupedTickets[data['users'][user]['id']]).length.toString() : '0'}
                  group_icon={logos.profile_logo}
                />
                {groupedTickets[data['users'][user]['id']] != null ? Object.keys(groupedTickets[data['users'][user]['id']]).map((ticket) => (
                  <Card
                    id={groupedTickets[data['users'][user]['id']][ticket].id}
                    title={groupedTickets[data['users'][user]['id']][ticket].title}
                    tag={groupedTickets[data['users'][user]['id']][ticket].tag}
                    imageUrl=''
                    title_logo={groupedTickets[data['users'][user]['id']][ticket].status === 'Todo' ? logos.todo_logo : (groupedTickets[data['users'][user]['id']][ticket].status === 'Backlog' ? logos.backlog_logo : (groupedTickets[data['users'][user]['id']][ticket].status === 'In progress' ? logos.inprogress_logo : (groupedTickets[data['users'][user]['id']][ticket].status === 'Done' ? logos.done_logo : logos.canceled_logo)))}
                    signal_icon={groupedTickets[data['users'][user]['id']][ticket].priority === 0 ? logos.no_priority_logo : (groupedTickets[data['users'][user]['id']][ticket].priority === 1 ? logos.low_logo : (groupedTickets[data['users'][user]['id']][ticket].priority === 2 ? logos.medium_logo : (groupedTickets[data['users'][user]['id']][ticket].priority === 3 ? logos.signal_logo : logos.urgent_logo)))}
                  />
                )) : ""}
              </div>
            )) : ""}
          </div>
          : ""}
        {selectedGroup === 'priority' ?
          <div className="app">
            {Object.keys(groupedTickets).map(priority => (
              <div key={priority} className="container">
                <GroupName
                  name={priority_type[priority]}
                  count={groupedTickets[priority] != null ? Object.keys(groupedTickets[priority]).length.toString() : '0'}
                  group_icon={priority === '0' ? logos.no_priority_logo : (priority === '1' ? logos.low_logo : (priority === '2' ? logos.medium_logo : (priority === '3' ? logos.signal_logo : logos.urgent_logo)))}
                />
                {groupedTickets[priority] != null ? Object.keys(groupedTickets[priority]).map((ticket) => (
                  <Card
                    id={groupedTickets[priority][ticket].id}
                    title={groupedTickets[priority][ticket].title}
                    tag={groupedTickets[priority][ticket].tag}
                    imageUrl={logos.profile_logo}
                    title_logo={groupedTickets[priority][ticket].status === 'Todo' ? logos.todo_logo : (groupedTickets[priority][ticket].status === 'Backlog' ? logos.backlog_logo : (groupedTickets[priority][ticket].status === 'In progress' ? logos.inprogress_logo : (groupedTickets[priority][ticket].status === 'Done' ? logos.done_logo : logos.canceled_logo)))}
                    signal_icon=''
                  />
                )) : ""}
              </div>
            ))}
          </div>

          : ""}
      </body>
    </>
  );
}

export default App;
