import { setupWorker } from "msw/browser";
import { handlers } from "./handler";

export const worker = setupWorker(...handlers);
console.log(worker);

export default worker;
