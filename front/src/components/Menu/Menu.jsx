import React from 'react';
import './Menu.css';
import logo from './matcha.png';
import messageIcon from './message.png';
import notificationIcon from './notification.png';


class Menu extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isLog: 0,
			notification: 0
		};
	}
	
	render () {
		const handleClick = () => {
		}
		return (
            <div id='menu'>
                <div id='menuLeft'>
					<img id='logo' src={logo}/>
                	<p>Home</p>
                	<p>Profile</p>
                	<p>Match</p>
				</div>
				<div id='menuRight'>
				<p>Match</p>
				<p>Match</p>
				<p>Match</p>
					<img id='messageIcon' src={messageIcon}/>
					<img id='notificationIcon' src={notificationIcon}/>
				</div>
                {/* <p>logout</p> //   <p>login</p> */}
            </div>
		)
	}
}

// let time = new Date().toLocaleString();

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           Hi {this.props.name}!
//         </p>
//         <p className="App-clock">
//           The time is {time}.
//         </p> 
//       </div>
//     );
//   }
// }

export default Menu;