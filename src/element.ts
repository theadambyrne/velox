import { h } from "snabbdom/h";

import { initialState } from "./state";
import { type State } from "./state";
import { VNode } from "snabbdom/vnode";

const createReducer =
	(args: any[]) => (acc: State, currentString: string, index: number) => {
		const currentArg = args[index];

		// behaviour of event node
		if (currentArg && currentArg.type === "event") {
			return { ...acc, on: { click: currentArg.click } };
		}

		return {
			...acc,
			template: acc.template + currentString + (args[index] || ""),
		};
	};

const createElement =
	(tagName: string) =>
	(strings: string[], ...args: string[]) => {
		const { template, on } = strings.reduce(createReducer(args), initialState);
		return {
			type: "element",
			template: h(tagName, { on }, template as VNode | any), // the second argument concerns attributes, properties and events
		};
	};

export const div = createElement("div");
export const p = createElement("p");
