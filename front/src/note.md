# Todo


	Objectif du jour:
		- picture grid
		- delete request
		- hobbies handling
		- clean up
		- check with new accounts
		- read useEffect






	Account
		- pictures
		- interets
		- localisation
		- proteger upload sans picture

	Match:
		- getuserinfo

	Login / Signup:
		- problem with default route (nomatch)
		- view mobile

	Learn:
		- useEffect micka post
	
	Components:
		- switch button	https://material-ui.com/components/switches/
		- picture list https://material-ui.com/components/grid-list/
		- calendar https://material-ui.com/components/pickers/

	Others:
		- changer la couleur des textfields
		- utiliser la snackbar de material ui ?
		- faire la vue mobile signup
		- faire la vue mobile login

		- multipart form data (tuto photo react)


	Ask Guillaume:
		- comment wait un console.log dans un call a l api
		- wtf with react dev tool
		- help with useStyle() https://material-ui.com/styles/basics/

	Color:
		- #FF3860

		upload image https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
		https://www.relevantprogrammer.com/posts/todo-with-react-hooks/

# React Hooks

	OkRead hooks documentation

	OkuseState
	OkuseEffect

	
	- Read https://overreacted.io/a-complete-guide-to-useeffect/
	- Read https://reactjs.org/docs/hooks-reference.html
	
	- useContext
	- useReducer
	- useCallback
	- useMemo
	- useRef
	- useImperativeHandle
	- useLayoutEffect
	- useDebugValue
	- useCustom (custom hook)

	################### DONE ###################

# React Basic

	- History { 2013facebookopensourceactive and huge community }
	- Web components { a new design }
	- Jsx and rendering { html in javascript }
	- Conditional rendering { render what you need for a context }
	- State and lifecycle { top => bottom: state become props }
	- State and lifecycle { bottom => top: pass callback from parent to child component }
	- List and keys { allow react self organize better than with basic index }
	- Virtual dom { abstract render managment }
	- Function syntax { render "basic" component without state }
	- Object syntax { create logic components => constructor, binding, this scope }
	- Render props { sharing code between components using a prop whose value is a function }
	- Lift state / higher order component { better design pattern }
	- Routes { navigate in the app: react router dom }
	- Context

	UnclearHooks { a new design pattern }
	UnclearComposition vs inheritance



## Ressources

		
	DoneReact Tutorial : https://reactjs.org/docs/getting-started.html
	DoneReact Documentation : https://reactjs.org/docs/getting-started.html
	DoneHook Documentation https://reactjs.org/docs/hooks-intro.html
	DoneOpenclassroom Tutorial : https://openclassrooms.com/fr/courses/4286486-build-web-apps-with-reactjs


	ViewedYoutube: Why Hooks: => https://www.youtube.com/watch?v=eX_L39UvZes&t=536s
	ViewedYoutube: Hooks in 15 minutes => https://www.youtube.com/watch?v=d9Pndaq9MJs
	ViewedYoutube: React router dom tutorial => https://www.youtube.com/watch?v=110dW3l5GQY

# Questions

	this.setState((prevState, props) => ({
	  color: prevState.color === 'red' ? 'blue' : 'red'
	 }));

	let productsAsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid]);
