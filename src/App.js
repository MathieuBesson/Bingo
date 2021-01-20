import React, { useState } from 'react';
import './App.css';

function App() {
	const [cases, setCases] = useState([]);
	const [input, setInput] = useState('');
	const [setupStep, setSetupStep] = useState(false);
	const [colorCasesId, setColorCasesId] = useState([]);

	const handleRemoveItem = id => {
		setCases(cases.filter((item, index) => (index !== id)));
	}

	const updateCase = (id, value) => {
		setCases(
			cases.map((item, index) => (
				index === id ? value : item
			))
		)
	}

	function addActive(id) {
		if (colorCasesId.includes(id)) {
			setColorCasesId(colorCasesId.filter((item) => (item !== id)));
			return
		}
		setColorCasesId([...colorCasesId, id]);
	}

	const tdCases = cases.map((item, id) => (
		!setupStep ?
			<td key={id} >
				<input value={item} onChange={(e) => updateCase(id, e.target.value)} />
				<button className="bg-secondary" onClick={() => handleRemoveItem(id)}>Remove</button>
			</td>
			:

			<td key={id} className={colorCasesId.includes(id) ? 'active' : ''} onClick={() => addActive(id)}>
				{item}
			</td>
	));

	function chunkArray(array, size) {
		if (array.length <= size) {
			return [array]
		}
		return [array.slice(0, size), ...chunkArray(array.slice(size), size)]
	}

	const addCase = () => {
		setCases([...cases, input])
		setInput('');
	}

	const tr = chunkArray(tdCases, Math.sqrt(tdCases.length))

	return (
		<div className="App">
			<h1 className={!setupStep ? 'admin' : 'game'}>BINNNNGGOOO !!!  --- {!setupStep ? 'ADMIN' : 'GAME'}</h1>
			{!setupStep &&
				<>
					<input className="add" type="text" placeholder="Add cas" value={input} onChange={(e) => setInput(e.target.value)} />
					<button className="bg-primary" onClick={addCase}>Add</button>
				</>
			}
			{cases.length !== 0 && <button className="bg-thirdary" onClick={() => setSetupStep(!setupStep)}>{setupStep ? 'Edit' : 'Valid'} Changes</button>}
			{(!setupStep && cases.length !== 0)  && <button className="bg-secondary" onClick={() => setCases([])}>Reset</button>}
			<table>
				<tbody>
					{tr.map((item, id) => <tr key={id}>{item}</tr>)}
				</tbody>
			</table>
			{cases.length === 0 && <p className="error-message">Tableau vide</p>}
		</div>
	);
}



export default App;
