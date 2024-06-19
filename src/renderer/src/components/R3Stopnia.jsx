import { useState, useEffect } from 'react'

const R3Stopnia = () => {
	const [inputA, setInputA] = useState(0)
	const [inputB, setInputB] = useState(0)
	const [inputC, setInputC] = useState(0)
	const [inputD, setInputD] = useState(0)
	const [roots, setRoots] = useState([])
	const [precision, setPrecision] = useState(6) // Initial precision set to 6 decimal places
	const MAX_PRECISION = 12 // Maximum allowed precision

	const solveCubicEquation = () => {
		// Parse coefficients from input strings to numbers
		const a = parseFloat(inputA === '' ? '0' : inputA)
		const b = parseFloat(inputB === '' ? '0' : inputB)
		const c = parseFloat(inputC === '' ? '0' : inputC)
		const d = parseFloat(inputD === '' ? '0' : inputD)

		// Calculate omega
		const omega = -b / (3 * a)

		// Calculate p and q
		const p = (3 * a * omega ** 2 + 2 * b * omega + c) / a
		const q = (a * omega ** 3 + b * omega ** 2 + c * omega + d) / a

		// Calculate discriminant Delta
		const Delta = (q / 2) ** 2 + (p / 3) ** 3

		if (Delta > 0) {
			// Case 1: Delta > 0 (one real root, two complex conjugate roots)
			const sqrtDelta = Math.sqrt(Delta)
			const u = Math.cbrt(-q / 2 + sqrtDelta)
			const v = Math.cbrt(-q / 2 - sqrtDelta)
			const realRoot = u + v + omega
			setRoots([realRoot])
		} else if (Delta < 0) {
			// Case 2: Delta < 0 (three real roots)
			const sqrtNegP = Math.sqrt(-p / 3)
			const phi = Math.acos(((3 * q) / (2 * p)) * Math.sqrt(3 / -p))
			const root1 = omega + 2 * sqrtNegP * Math.cos(phi / 3)
			const root2 = omega + 2 * sqrtNegP * Math.cos((phi + 2 * Math.PI) / 3)
			const root3 = omega + 2 * sqrtNegP * Math.cos((phi + 4 * Math.PI) / 3)
			setRoots([root1, root2, root3])
		} else {
			// Case 3: Delta = 0 (one real root, two identical real roots)
			const root1 = omega + 2 * Math.cbrt(q / 2)
			const root2 = omega - Math.cbrt(q / 2)
			setRoots([root1, root2, root2])
		}
	}

	// useEffect to trigger solveCubicEquation whenever any input changes
	useEffect(() => {
		solveCubicEquation()
	}, [inputA, inputB, inputC, inputD])

	// Handler for changing precision
	const handlePrecisionChange = (e) => {
		const newPrecision = parseInt(e.target.value)
		if (!isNaN(newPrecision) && newPrecision >= 0 && newPrecision <= MAX_PRECISION) {
			setPrecision(newPrecision)
		} else if (!isNaN(newPrecision) && newPrecision > MAX_PRECISION) {
			setPrecision(MAX_PRECISION) // Cap precision to MAX_PRECISION if exceeded
		}
	}

	return (
		<div>
			<h2>Równanie 3 stopnia</h2>
			<div style={{ display: 'flex', alignItems: 'flex-end' }}>
				<div style={{ textAlign: 'center', marginRight: '10px' }}>
					<input
						type="number"
						value={inputA}
						placeholder="0"
						onChange={(e) => setInputA(e.target.value)}
						style={{ width: '50px' }}
					/>
					<div>a</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
					<span>x³ +</span>
				</div>
				<div style={{ textAlign: 'center', marginRight: '10px' }}>
					<input
						type="number"
						value={inputB}
						placeholder="0"
						onChange={(e) => setInputB(e.target.value)}
						style={{ width: '50px' }}
					/>
					<div>b</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
					<span>x² +</span>
				</div>
				<div style={{ textAlign: 'center', marginRight: '10px' }}>
					<input
						type="number"
						value={inputC}
						placeholder="0"
						onChange={(e) => setInputC(e.target.value)}
						style={{ width: '50px' }}
					/>
					<div>c</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
					<span>x +</span>
				</div>
				<div style={{ textAlign: 'center', marginRight: '10px' }}>
					<input
						type="number"
						value={inputD}
						placeholder="0"
						onChange={(e) => setInputD(e.target.value)}
						style={{ width: '50px' }}
					/>
					<div>d</div>
				</div>
				<div> = 0</div>
			</div>
			<div>
				<h4>Ilość miejsc po przecinku:</h4>
				<input
					type="number"
					value={precision}
					onChange={handlePrecisionChange}
					style={{ width: '50px' }}
				/>
				<div>
					{roots.length > 0 && (
						<div>
							<h3>Miejsca Zerowe:</h3>
							<ul>
								{roots.map((root, index) => (
									<li key={index}>
										x<sub style={{ fontSize: '0.6em' }}>{index + 1}</sub> ={' '}
										{Number.isInteger(root) ? root.toFixed(0) : root.toFixed(precision)}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default R3Stopnia
