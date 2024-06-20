import { useState } from 'react'

const PolynomialRootFinder = () => {
	const [coefficients, setCoefficients] = useState({ a: 1, b: 0, c: 0, d: 0, e: 0, f: 0 })
	const [result, setResult] = useState(null)

	const handleChange = (event) => {
		const { name, value } = event.target
		setCoefficients({ ...coefficients, [name]: parseFloat(value) })
	}

	const calculateRoot = () => {
		const { a, b, c, d, e, f } = coefficients
		const epsilon = 0.000001
		let min = -100
		let max = 100
		const step = 0.01

		const func = (x) =>
			a * Math.pow(x, 5) +
			b * Math.pow(x, 4) +
			c * Math.pow(x, 3) +
			d * Math.pow(x, 2) +
			e * x +
			f

		let root = null
		for (let x = min; x < max; x += step) {
			if (func(x) * func(x + step) < 0) {
				// Narrow down the root interval
				let x0 = x
				let x1 = x + step
				while (Math.abs(func((x0 + x1) / 2)) > epsilon) {
					const xMid = (x0 + x1) / 2
					if (func(x0) * func(xMid) < 0) {
						x1 = xMid
					} else {
						x0 = xMid
					}
				}
				root = (x0 + x1) / 2
				break
			}
		}

		setResult(root)
	}

	return (
		<div>
			<h2>Find Root of Polynomial</h2>
			<div style={{ display: 'flex', alignItems: 'flex-end' }}>
				<div style={{ textAlign: 'center', marginRight: '10px' }}>
					<input
						type="number"
						name="a"
						value={coefficients.a}
						placeholder="0"
						onChange={handleChange}
						style={{ width: '50px' }}
					/>
					<div>a</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
					<span>x⁵ +</span>
				</div>
				<div style={{ textAlign: 'center', marginRight: '10px' }}>
					<input
						type="number"
						name="b"
						value={coefficients.b}
						placeholder="0"
						onChange={handleChange}
						style={{ width: '50px' }}
					/>
					<div>b</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
					<span>x⁴ +</span>
				</div>
				<div style={{ textAlign: 'center', marginRight: '10px' }}>
					<input
						type="number"
						name="c"
						value={coefficients.c}
						placeholder="0"
						onChange={handleChange}
						style={{ width: '50px' }}
					/>
					<div>c</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
					<span>x³ +</span>
				</div>
				<div style={{ textAlign: 'center', marginRight: '10px' }}>
					<input
						type="number"
						name="d"
						value={coefficients.d}
						placeholder="0"
						onChange={handleChange}
						style={{ width: '50px' }}
					/>
					<div>d</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
					<span>x² +</span>
				</div>
				<div style={{ textAlign: 'center', marginRight: '10px' }}>
					<input
						type="number"
						name="e"
						value={coefficients.e}
						placeholder="0"
						onChange={handleChange}
						style={{ width: '50px' }}
					/>
					<div>e</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
					<span>x +</span>
				</div>
				<div style={{ textAlign: 'center', marginRight: '10px' }}>
					<input
						type="number"
						name="f"
						value={coefficients.f}
						placeholder="0"
						onChange={handleChange}
						style={{ width: '50px' }}
					/>
					<div>f</div>
				</div>
				<div> = 0</div>
			</div>
			<button onClick={calculateRoot}>Calculate Root</button>
			{result !== null && <p>Root: {result}</p>}
		</div>
	)
}

export default PolynomialRootFinder
