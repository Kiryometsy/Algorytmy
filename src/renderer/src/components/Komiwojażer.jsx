import { useState, useEffect } from 'react'
//import PropTypes from 'prop-types'

const Komiwojażer = () => {
	const [NOfCities, setNOfCities] = useState(4)
	const [tries, setTries] = useState(50)
	const [calculating, setCalculating] = useState(false)
	const [tableGenerated, setTableGenerated] = useState(true)
	const [minRoadValue, setMinRoadValue] = useState(1) // Default min road value
	const [maxRoadValue, setMaxRoadValue] = useState(100) // Default max road value
	const [Values, setValues] = useState([])

	useEffect(() => {
		if (Values.length > 0) {
			ShowValues()
		}
	}, [Values])

	const handleNOfCitiesChange = (e) => {
		let value = parseInt(e.target.value)
		if (!isNaN(value) && value > 0) {
			setNOfCities(value)
		}
	}
	function getRandomInt(min, max) {
		const minCeiled = Math.ceil(min)
		const maxFloored = Math.floor(max)
		//console.log(minCeiled + '--' + maxFloored + ' w getRandom')
		return parseInt(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)) // The maximum is exclusive and the minimum is inclusive
	}

	const handleTriesChange = (e) => {
		let value = parseInt(e.target.value)
		if (!isNaN(value) && value > 0) {
			setTries(value)
		}
	}

	const handleMinRoadValueChange = (e) => {
		let value = parseInt(e.target.value)
		if (!isNaN(value)) {
			setMinRoadValue(value)
		}
	}

	const handleMaxRoadValueChange = (e) => {
		let value = parseInt(e.target.value)
		if (!isNaN(value)) {
			setMaxRoadValue(value)
		}
	}

	const handleGenerateRandomRoads = () => {
		setCalculating(true) // Set calculating state to true
		RandomRoads() // Call RandomRoads function
		setCalculating(false) // Set calculating state back to false after computation
	}

	function RandomRoads() {
		let tempValues = []
		for (let i = 0; i < NOfCities; i++) {
			tempValues[i] = []
		}
		if (NOfCities == 0 || isNaN(NOfCities)) {
			console.log('Liczba miast jest 0!!')
		} else {
			for (let i = 0; i < NOfCities; i++) {
				for (let j = 0; j < NOfCities; j++) {
					if (j == i) {
						tempValues[i][j] = 0
					} else if (j < i) {
						continue
					} else {
						let temp = getRandomInt(minRoadValue, maxRoadValue)
						tempValues[i][j] = temp
						tempValues[j][i] = temp
					}
				}
			}
		}

		setValues(tempValues)

		setTableGenerated(false)
		//ShowValues()
	}
	function ShowValues() {
		const table = document.getElementById('ToShowValues')
		let thed = document.createElement('tr')

		for (let i = 0; i < NOfCities; i++) {
			if (i == 0) {
				let tempElement = document.createElement('th')
				tempElement.innerText = '0'
				thed.appendChild(tempElement)
			}
			let tempElement = document.createElement('th')
			tempElement.innerText = i + 1
			thed.appendChild(tempElement)
		}
		table.replaceChildren(thed)

		for (let i = 0; i < NOfCities; i++) {
			let tempRow = document.createElement('tr')
			for (let j = 0; j < NOfCities; j++) {
				if (j == 0) {
					let tempElement = document.createElement('td')
					tempElement.innerText = i + 1
					tempRow.appendChild(tempElement)
				}
				if (j < i) {
					let tempElement = document.createElement('td')
					tempElement.innerText = '-'
					tempRow.appendChild(tempElement)
				} else {
					let tempElement = document.createElement('td')
					tempElement.innerText = Values[i][j]
					tempRow.appendChild(tempElement)
				}
			}
			table.appendChild(tempRow)
		}
	}

	function InitOrder() {
		let temp = new Set()
		let order = []
		for (let i = 1; i <= NOfCities; i++) {
			temp.add(i)
		}

		for (let i = 0; i < NOfCities; i++) {
			let val = Array.from(temp)
			//console.log(val)
			let rand = getRandomInt(0, temp.size)
			let tempValue = val[rand]

			order[i] = tempValue
			//console.log(order)
			temp.delete(tempValue)
		}

		return order
	}

	function sumOfRoadValues(order) {
		let sum = 0
		//console.log(order.length + 'długośc order')
		for (let i = 0; i < order.length - 1; i++) {
			let cityA = order[i]
			let cityB = order[i + 1]

			// Adjust indices since order[i] is 1-based and roadValues is 0-based
			//console.log(Values)
			//console.log(cityA + '-' + cityB + ' ordery w sumowaniu' + Values)
			let roadValue = Values[cityA - 1][cityB - 1]
			sum += roadValue
		}
		//console.log('-------------------------------')
		return sum
	}

	function ShiftOrder(order) {
		let Order = order
		let leng = Order.length - 1
		let temp1 = getRandomInt(0, leng)
		let temp2 = getRandomInt(0, leng)

		// Ensure temp1 and temp2 are different
		while (temp1 === temp2) {
			temp2 = getRandomInt(0, leng)
		}

		//console.log('1 warotść-' + temp1 + ' 2 wartość-' + temp2)

		// Swap elements at temp1 and temp2
		let tempOrderVal = Order[temp1]
		Order[temp1] = Order[temp2]
		Order[temp2] = tempOrderVal

		// Ensure temp4 and temp5 are different and not equal to temp1
		let temp4 = getRandomInt(0, leng)
		let temp5 = getRandomInt(0, leng)

		while (temp4 === temp5 || temp4 === temp1 || temp5 === temp1) {
			temp4 = getRandomInt(0, leng)
			temp5 = getRandomInt(0, leng)
		}
		//console.log('4 warotść-' + temp4 + ' 5 wartość-' + temp5)
		// Swap elements at temp4 and temp5
		tempOrderVal = Order[temp4]
		Order[temp4] = Order[temp5]
		Order[temp5] = tempOrderVal

		return Order
	}

	const Start = () => {
		if (!Values || Values.length === 0) {
			console.log('Values is not properly initialized')
			return
		}
		//setWynik('Obliczanie...')
		setCalculating(true) // Set calculating to true

		let order = InitOrder()

		//console.log(order + ' z inita')
		for (let i = 0; i < tries; i++) {
			let temp = ShiftOrder([...order])
			let tempRoad = sumOfRoadValues(temp)
			let orderRoad = sumOfRoadValues(order)

			if (tempRoad < orderRoad) {
				order = temp
			}
		}

		let nap = ''
		for (let i = 0; i < order.length; i++) {
			nap += order[i]
			if (i < order.length - 1) {
				nap += '->'
			}
		}

		let res = ' '
		for (let i = 0; i < order.length - 1; i++) {
			res += Values[i][i + 1]
			if (i < order.length - 2) {
				res += '+'
			}
		}
		res += '=' + sumOfRoadValues(order)
		document.getElementById('tt').innerText = nap
		document.getElementById('t3').innerText = res

		setCalculating(false)
		//setWynik(sumOfRoadValues(order))
	}

	return (
		<div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
			<h2>Komiwojażer</h2>
			<div>
				<div>
					<div>
						<label>Ilość Miast: </label>
						<input
							type="number"
							value={NOfCities}
							onChange={handleNOfCitiesChange}
							min="2"
							// disabled={calculating} // Disable input when calculating
						/>
						<br />
						<label>Min. wartość drogi: </label>
						<input
							type="number"
							value={minRoadValue}
							onChange={handleMinRoadValueChange}
							disabled={calculating}
						/>
						<br />
						<label>Max. wartość drogi: </label>
						<input
							type="number"
							value={maxRoadValue}
							onChange={handleMaxRoadValueChange}
							disabled={calculating}
						/>
						<br />
						<button onClick={handleGenerateRandomRoads}>Generuj Losowe Drogi</button>
					</div>
				</div>
				<div style={{ marginTop: '10%' }}>
					<label>Ilość prób: </label>
					<input
						type="number"
						value={tries}
						onChange={handleTriesChange}
						min="2"
						disabled={calculating} // Disable input when calculating
					/>
					<button onClick={Start} disabled={calculating || tableGenerated}>
						Oblicz
					</button>{' '}
					{/* Disable button when calculating */}
					<br />
					<p id="tt"></p>
					<p id="t3"></p>
				</div>
				<div
					id="forTable"
					style={{ float: 'right', flex: '1', overflow: 'auto', width: '100%', height: '' }}
				>
					<table id="ToShowValues"></table>
				</div>
			</div>
		</div>
	)
}

export default Komiwojażer
