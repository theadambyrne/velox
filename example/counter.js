import { createComponent } from "../src";
import { p } from "../src/element";
import { onClick } from "../src/event";

const initialState = {
	clickedTimes: 0,
};

const methods = {
	changeClickedTimes: (state) => ({
		...state,
		clickedTimes: state.clickedTimes + 1,
	}),
};
const template = ({ clickedTimes, methods }) =>
	p`${onClick(() =>
		methods.changeClickedTimes()
	)} Click me (${clickedTimes.toString()})`;

export const Counter = createComponent({ template, methods, initialState });
