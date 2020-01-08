import React from 'react';
import './App.css';
import logo from './logo.svg';
import Menu from '../Menu/Menu';
import EmojiButton from '../EmojiButton/EmojiButton';
// import ReactNotifications from 'react-notifications-component';
// import 'react-notifications-component/dist/theme.css';
// import 'animate.css';


class App extends React.Component {
	render() {
		var duration = 5;

		var changeDuration = () => {
			let logo = document.getElementById("App-logo");
			duration > 0.15 ? duration -= .25 : duration = 1;
			console.log(duration);
			logo.animate([
				{ transform: 'rotate(0deg)' },
				{ transform: 'rotate(360deg)' }
			],
			{
				duration: duration,
				iterations: Infinity
			})
		}

		// function Test() {
		// 	return (
		// 	  <>
		// 		My Website
		// 		<button
		// 		  onClick={() => {
		// 			store.addNotification({
		// 			  title: 'Dropbox',
		// 			  message: 'Files were synced',
		// 			  type: 'default',                         // 'default', 'success', 'info', 'warning'
		// 			  container: 'bottom-left',                // where to position the notifications
		// 			  animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
		// 			  animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
		// 			  dismiss: {
		// 				duration: 3000 
		// 			  }
		// 			})
		// 		  }}
		// 		>
		// 		  Add notification
		// 		</button>
		// 	  </>
		// 	)
		//   }
		  

		return (
			<div id="App">
				    {/* <ReactNotifications /> */}
					<Menu />
					<img src={logo} id="App-logo" alt="logo" />
					{/* <Test /> */}
					<EmojiButton id='EmojiButton' changeDuration={changeDuration} />
			</div>
		);
	}
}

export default App;