import intro, {introEvents} from "./intro";
import {selectScreen} from "./utils";

export const main = document.getElementById(`main`);

selectScreen(intro, introEvents);
