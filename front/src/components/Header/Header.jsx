import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './matcha.png';
import { Navbar } from 'react-bulma-components';

function Header() {
	return (
		<Navbar id="header">
			<Navbar.Brand>
				<Navbar.Item>
					<img src={logo} alt="app logo"/>
				</Navbar.Item>
			</Navbar.Brand>
			<Navbar.Menu>
				<Navbar.Container>
					<Navbar.Item renderAs="p">
						<Link to="/" style={{ color: '#FFF' }}>
							Home
						</Link>
					</Navbar.Item>
					<Navbar.Item renderAs="p">
						<Link to="/account" style={{ color: '#FFF' }}>
							Account
						</Link>
					</Navbar.Item>
					<Navbar.Item renderAs="p">
						<Link to="/" style={{ color: '#FFF' }}>
							Match
						</Link>
					</Navbar.Item>
					<Navbar.Item renderAs="p">
						<Link to="/" style={{ color: '#FFF' }}>
							Message
						</Link>
					</Navbar.Item>
				</Navbar.Container>
				<Navbar.Container position="end">
					<Navbar.Item dropdown hoverable>
						<Navbar.Link arrowless={false}>
							<img src="https://via.placeholder.com/150" alt="test"/>
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
	);
}

export default Header;