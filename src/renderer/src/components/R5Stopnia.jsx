import { useState } from 'react'

const R5Stopnia = () => {
	const E = 0.000001
	//const { input1, setInput1 } = useState('')

	const [inputA, setInputA] = useState(0)
	const [inputB, setInputB] = useState(0)
	const [inputC, setInputC] = useState(0)
	const [inputD, setInputD] = useState(0)
	const [inputE, setInputE] = useState(0)
	const [inputF, setInputF] = useState(0)

	function func(x) {
		let a = parseFloat(inputA) // Coefficient for x^5 1
		let b = parseFloat(inputB) // Coefficient for x^4 0
		let c = parseFloat(inputC) // Coefficient for x^3 2
		let d = parseFloat(inputD) // Coefficient for x^2 5
		let e = parseFloat(inputE) // Coefficient for x^1 1
		let f = parseFloat(inputF) // Constant term       4
		// console.log("a:"+a+" b:"+b+" c:"+c+" d:"+d+" e:"+e+" f:"+f);
		return (
			a * Math.pow(x, 5) +
			b * Math.pow(x, 4) +
			c * Math.pow(x, 3) +
			d * Math.pow(x, 2) +
			e * x +
			f
		)
	}
	function FindX() {
		let MIN = -100
		let MAX = 100
		let STEP = 0.01

		let root = null
		for (let x = MIN; x < MAX; x += STEP) {
			if (func(x) * func(x + STEP) < 0) {
				// Narrow down the root interval
				let x0 = x
				let x1 = x + STEP
				while (Math.abs(func(x1) - func(x0)) > E) {
					const xMid = (x0 + x1) / 2
					if (func(x0) * func(xMid) < 0) {
						x1 = xMid
					} else {
						x0 = xMid
					}
					//console.log(func(x0)+"-- "+func(xMid)+" = "+(func(x1)-func(x0)))
				}
				root = (x0 + x1) / 2
				break
			}
		}
		document.getElementById('res').innerText = root
	}
	return (
		<div>
			<h2>Równanie 5 stopnia</h2>
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
					<span>
						x<sup>5</sup> +
					</span>
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
					<span>
						x<sup>4</sup> +
					</span>
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
					<span>
						x<sup>3</sup> +
					</span>
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
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
					<span>
						x<sup>2</sup> +
					</span>
				</div>
				<div style={{ textAlign: 'center', marginRight: '10px' }}>
					<input
						type="number"
						value={inputE}
						placeholder="0"
						onChange={(e) => setInputE(e.target.value)}
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
						value={inputF}
						placeholder="0"
						onChange={(e) => setInputF(e.target.value)}
						style={{ width: '50px' }}
					/>
					<div>f</div>
				</div>
				<div> = 0</div>
				<button type="button" onClick={FindX}>
					Oblicz
				</button>
			</div>

			<div>
				<p>
					Znaleziony X=
					<span id="res" />
				</p>
			</div>
		</div>
	)
}

export default R5Stopnia
