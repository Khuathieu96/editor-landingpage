
import { FullLayout } from "../../layouts/FullLayout";
import { About } from "../About";
import { Dashboard } from "../Dashboard";
import { Game } from "../Game";
import { PathNotFound } from "../PathNotFound";

const routes = [{
	component: About,
	path: '/about',
	layout: FullLayout,
	title: "About",
}, {
	component: Game,
	path: '/game/:id',
	layout: FullLayout,
	title: "Game"
}, {
	component: Dashboard,
	path: '/',
	layout: FullLayout,
	title: "Home"
}, {
	component: PathNotFound,
	path: "*",
	layout: FullLayout,
	title: "404"
}
]

export default routes