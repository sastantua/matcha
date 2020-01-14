# Todo

	- Read hooks documentation
	- Refacto Existing objects to use hooks

	DoneuseState
	DoneuseEffect
	
	- useContext
	- useReducer
	- useCallback
	- useMemo
	- useRef
	- useImperativeHandle
	- useLayoutEffect
	- useDebugValue
	- useCustom (custom hook)

# React Class Components

	UnclearComposition vs inheritance

	DoneHistory {2013facebookopensourceactive and huge community}
	DoneWeb components {a new design}
	DoneJsx and rendering {better than <?= =>}
	DoneConditional rendering {render what you need for a context}
	DoneState and lifecycle {top => bottom: state become props}
	DoneState and lifecycle {bottom => top: pass callback from parent to child component}
	DoneList and keys {allow react self organize better than with basic index}
	DoneVirtual dom {abstract render managment}
	DoneFunction syntax {render "basic" component without state}
	DoneObject syntax {create logic components => constructor, binding, this scope}
	DoneLift state {better design pattern}
	DoneRoutes {navigate in the app: react router dom}
	DoneHooks {a new design pattern}

# React Hooks


## Ressources

		
	DoneReact Tutorial : https://reactjs.org/docs/getting-started.html
	DoneReact Documentation : https://reactjs.org/docs/getting-started.html
	DoneHook Documentation https://reactjs.org/docs/hooks-intro.html
	DoneOpenclassroom Tutorial : https://openclassrooms.com/fr/courses/4286486-build-web-apps-with-reactjs


	ViewedYoutube: Why Hooks: => https://www.youtube.com/watch?v=eX_L39UvZes&t=536s
	ViewedYoutube: Hooks in 15 minutes => https://www.youtube.com/watch?v=d9Pndaq9MJs
	ViewedYoutube: React router dom tutorial => https://www.youtube.com/watch?v=110dW3l5GQY

# Tools

	Fontawsome: https://fontawesome.com/
	Bulma: https://bulma.io/

# Questions

	function Example(props) {You can use Hooks here! return ;}
	const Example = (props) => {You can use Hooks here! return ;}

	this.setState((prevState, props) => ({
	  color: prevState.color === 'red' ? 'blue' : 'red'
	}));

	let productsAsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid]);
