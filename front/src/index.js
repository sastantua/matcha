import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/js/all'
import App from './components/App.jsx';

// import Typography from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { makeStyles, styled as styledMaterial } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

// export {
//     Typography, Button, TextField, makeStyles, styledMaterial, useMediaQuery
// }

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

/*
user = {[
    {firstname: { en: Jeanine, wookie: wouglouglou},...},
    {...},
    {...},
    ...
]}

*/

// <userCard user={user[key]} />

/* 
class userCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: props.user };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({user.firstname: event.target.value });
        sendMod(e.target.value);
    }
    
    render() {
        return (
            <input type="text" onChange={this.handleChange} value={this.state.user.firstname}
        )
    }

}

*/

// class Clock extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {date: new Date()};
//     }
  
//     componentDidMount() {
//       this.timerID = setInterval(
//         () => this.tick(),
//         1000
//       );
//     }
  
//     componentWillUnmount() {
//       clearInterval(this.timerID);
//     }
  
//     tick() {
//       this.setState({
//         date: new Date()
//       });
//     }
  
//     render() {
//       return (
//         <div>
//           <h1>Hello, world!</h1>
//           <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//         </div>
//       );
//     }
//   }
  
//   ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
//   );