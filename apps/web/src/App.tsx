import { EbbGame } from './games/ebb/EbbGame';
import { GameShell } from '@ui/GameShell';

function App() {
	return (
		<GameShell orientation="landscape">
			<EbbGame />
		</GameShell>
	);
}

export default App;