import { createBrowserHistory, createHashHistory } from "history";
import { isElectron } from "../../shared/utils";

export default isElectron() ? createHashHistory() : createBrowserHistory();