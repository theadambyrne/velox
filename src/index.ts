import { State } from "./state";
import * as snabbdom from "snabbdom";

type VNode = {
	children: VNode[];
	data: Record<string, any>;
	elm: Element | Text | undefined;
	key: string | number | undefined;
	sel: string | undefined;
	text: string | undefined;
};
type Component = {
	template: VNode;
	type: string;
};

const patch = snabbdom.init([
	require("snabbdom/modules/eventlisteners").default,
]);

export const init = (selector: string, component: Component) => {
	const app = document.querySelector(selector);

	if (!app) throw new Error(`Could not find element with selector ${selector}`);

	patch(app, component.template);
};

let state = {};

export const createComponent = ({
	template,
	methods = {},
	initialState = {},
}: {
	template: (props: any) => Component;
	methods?: Record<string, (state: State, ...args: string[]) => State>;
	initialState?: State;
}) => {
	state = initialState;
	let previous: Component;

	const mappedMethods = (props: State) =>
		Object.keys(methods).reduce(
			(acc, key) => ({
				...acc,
				[key]: (...args: string[]) => {
					state = methods[key](state, ...args);
					const nextNode = template({
						...props,
						...state,
						methods: mappedMethods(props),
					});
					patch(previous.template, nextNode.template);
					previous = nextNode;
					return state;
				},
			}),
			{}
		);

	return (props: State) => {
		previous = template({ ...props, ...state, methods: mappedMethods(props) });
		return previous;
	};
};
