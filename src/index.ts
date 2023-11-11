import * as snabbdom from "snabbdom";
import { State } from "./state";

const patch = snabbdom.init([
	require("snabbdom/modules/eventlisteners").default,
]);

type Component = {
	template: snabbdom.VNode;
	type: string;
};

export const init = (selector: any, component: Component) => {
	const app = document.querySelector(selector);
	patch(app, component.template);
};

let state: State = {};
export const createComponent = ({
	template,
	methods = {},
	initialState = {},
}: {
	template: (props: any) => Component;
	methods?: Record<string, (state: State, ...args: string[]) => State>;
	initialState?: { [key: string]: any };
}) => {
	state = initialState;

	const mappedMethods = Object.keys(methods).reduce(
		(acc, key) => ({
			...acc,
			[key]: (...args: string[]) => {
				state = methods[key](state, ...args);
				console.log(state); // this prints "Thomas" as firstName :D
				return state;
			},
		}),
		{}
	);

	return (props) => template({ ...props, ...state, methods: mappedMethods });
};
