# Todo

	Objectif du jour:
		- sort account in search ascending vs descending
		- sort add info (name / lastname / popularity / gender)
		- sort add like / unlike
		- sort add city
		- add link return to search (history go back)
		- why modal is bug?
		- is profile liked or not?
		- block account
		- report as fake account
		- 

	Login / Signup:
		- problem with default route (nomatch)


	Others:
		- utiliser la snackbar de material ui ?


	Ask Guillaume:
		- wtf with react dev tool

	Color:

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
