import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './matcha.png';
import messageIcon from './message.png';
import notificationIcon from './notification.png';
import { Navbar } from 'react-bulma-components';

class Menu extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isLog: 0,
			notification: 0
		};
	}
	
	render () {
		return (
			<Navbar>
				<Navbar.Brand>
					<Navbar.Item>
						<img src={logo} />
					</Navbar.Item>
				</Navbar.Brand>
				<Navbar.Menu>
					<Navbar.Container>
						<Navbar.Item renderAs="p">
							<Link to="/">
								Home
							</Link>
						</Navbar.Item>
						<Navbar.Item renderAs="p">
							<Link to="/account">
								Account
							</Link>
						</Navbar.Item>
						<Navbar.Item renderAs="p">
							<Link to="/">
								Match
							</Link>
						</Navbar.Item>
						<Navbar.Item renderAs="p">
							<Link to="/">
								Message
							</Link>
						</Navbar.Item>
					</Navbar.Container>
					<Navbar.Container position="end">
						<Navbar.Item dropdown hoverable>
							<Navbar.Link arrowless={false}>
								<img src="https://via.placeholder.com/150"/>
							</Navbar.Link>
							<Navbar.Dropdown className="is-right">
								<Navbar.Item renderAs="p" >
									<Link to='/notification'>
										Notification
									</Link>
								</Navbar.Item>
								<Navbar.Item renderAs="p" >
									Logout
								</Navbar.Item>
							</Navbar.Dropdown>
						</Navbar.Item>
					</Navbar.Container>
				</Navbar.Menu>
			</Navbar>
		
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