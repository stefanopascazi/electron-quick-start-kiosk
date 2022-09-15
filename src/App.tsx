import React from 'react';
/**layout and part of */
import {
	Routes,
	Route,
} from "react-router-dom";
import { Container } from 'react-bootstrap';

const Dashboard = React.lazy(() => import("./pages/index"))
const Header = React.lazy(() => import("./components/header"))

const App: React.FC = (): JSX.Element => {

	return (
		<main>
			<Header />
			<Container fluid className='pb-3 wrapper bg-login'>
				<Routes>
					<Route  path="/" element={
						<React.Suspense fallback={<p>Sto caricando...</p>}>
							<Dashboard />
						</React.Suspense>
					} />
				</Routes>
			</Container>
		</main>
	)
}

export default App;