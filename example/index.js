import { init } from "../src";
import { User } from "../example/user";

const firstName = "Marvin";
const lastName = "Frachet";

init("#app", User({ firstName, lastName }));
