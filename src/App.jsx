import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Update imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	About,
	Contact,
	Experience,
	Hero,
	Navbar,
	Tech,
	Works,
	StarsCanvas,
} from "./components";
import AllProjects from "./components/AllProjects"; // Add this import
import { div } from "three/tsl";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<div className="relative z-0 bg-primary">
							<div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
								<Navbar />
								<Hero />
							</div>
							<About />
							<Experience />
							<Tech />
							<Works />
							<ToastContainer></ToastContainer>
							<div className="relative z-0">
								<Contact />
								<StarsCanvas />
							</div>
						</div>
					}
				/>
				<Route
					path="/projects"
					element={
						<div className="relative z-0 bg-primary">
							<div className=" bg-cover bg-no-repeat bg-center">
								<AllProjects />
								<StarsCanvas />
							</div>
						</div>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
