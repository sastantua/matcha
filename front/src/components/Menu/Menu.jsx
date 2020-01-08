import React from 'react';
import './Menu.css';
import logo from './matcha.png';


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
            <div id='Menu'>
                <img id='logo' src={logo} alt="logo"/>
                <p>Logo</p>
                <p>Home</p>
                <p>Profile</p>
                <p>Match</p>

                <p>Message</p>
                <p>Notifications</p>
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