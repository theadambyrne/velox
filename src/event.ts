export const onClick = (f: EventListenerObject) => ({
	type: "event",
	click: f,
});
