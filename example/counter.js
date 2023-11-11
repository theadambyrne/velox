import { createComponent } from "../src";
import { div } from "../src/element";
import { onClick } from "../src/event";

const methods = {
	changeClickedTimes: (state) => ({
		...state,
		clickedTimes: state.clickedTimes + 1,
	}),
};

const initialState = {
	clickedTimes: 0,
};

const template = ({ clickedTimes, methods }) =>
	div`${onClick(() =>
		methods.changeClickedTimes()
	)} Click me (${clickedTimes.toString()})`;

export const Counter = createComponent({ template, methods, initialState });
