export type State = {
	template?: string;
	on?: Record<string, () => void>;
};

export const initialState: State = {
	template: "",
	on: {}, // This initial state property will help us manage event handlers in template literals
};
