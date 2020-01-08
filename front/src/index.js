import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.jsx';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

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
    
    Jeanin

    render() {
        return (
            <input type="text" onChange={this.handleChange} value={this.state.user.firstname}
        )
    }

}

machin = userCard(props);

machin.handleChange(rtrhtrh);

bidule.handleChange(HROIJ);

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