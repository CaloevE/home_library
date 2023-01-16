import React from 'react';
import {BrowserRouter} from "react-router-dom";
import MainMenu from "./components/mainMenu";

function App() {
	return (
		<BrowserRouter>
			<MainMenu/>
		</BrowserRouter>
	);
}

export default App;
