import { useState } from 'react'

const MonteCarlo = () => {
	const [numPoints, setNumPoints] = useState(1000000) // State for number of points
	const [progress, setProgress] = useState(0) // State for progress percentage
	const [integral, setIntegral] = useState('') // State for estimated integral, initialized to an empty string
	const [calculating, setCalculating] = useState(false) // State for calculation status

	const f = (x) => Math.abs(Math.sin(x) + Math.sin(2 * x) + Math.sin(4 * x))

	const handleNumPointsChange = (e) => {
		let value = parseInt(e.target.value)
		if (!isNaN(value) && value > 0) {
			setNumPoints(value)
		}
	}

	const calculateIntegral = () => {
		let sum = 0
		let i = 0
		const chunkSize = 1000

		// Set integral to "Calculating..." at the start
		setIntegral('Obliczanie...')
		setCalculating(true) // Set calculating to true

		const calculateChunk = () => {
			for (let j = 0; j < chunkSize && i < numPoints; j++, i++) {
				const x = Math.random() * 2 * Math.PI
				sum += f(x)
			}

			const progressPercent = (i / numPoints) * 100
			setProgress(progressPercent)

			if (i < numPoints) {
				setTimeout(calculateChunk, 0)
			} else {
				// Calculate the average value of the function
				const avg = sum / numPoints

				// Estimate the integral
				const integralValue = 2 * Math.PI * avg
				setIntegral(integralValue.toFixed(6))

				// Reset progress and calculating status after calculation
				setProgress(0)
				setCalculating(false) // Set calculating to false
			}
		}

		calculateChunk()
	}

	return (
		<div>
			<h2>Monte Carlo Całkowanie</h2>
			<div>
				<label>Ilość punktów: </label>
				<input
					type="number"
					value={numPoints}
					onChange={handleNumPointsChange}
					min="1"
					disabled={calculating} // Disable input when calculating
				/>
				<button onClick={calculateIntegral} disabled={calculating}>
					Oblicz
				</button>{' '}
				{/* Disable button when calculating */}
			</div>
			{progress > 0 && (
				<div style={{ marginTop: '20px' }}>
					<progress value={progress} max="100" style={{ width: '100%' }}>
						{progress}%
					</progress>
				</div>
			)}
			<p>Szacowana całka z f(x) = |sin(x) + sin(2x) + sin(4x)| zakres [0, 2π]: {integral}</p>
		</div>
	)
}

export default MonteCarlo
