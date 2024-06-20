import { useState } from 'react'
//import PropTypes from 'prop-types'

const Komiwojażer = () => {
	const [NOfCities, setNOfCities] = useState(4)
	const [tries, setTries] = useState(50)
	const [calculating, setCalculating] = useState(false)
	const [wynik, setWynik] = useState('')
	const [minRoadValue, setMinRoadValue] = useState(1) // Default min road value
	const [maxRoadValue, setMaxRoadValue] = useState(100) // Default max road value
	//const [currentOrder, setCurrentOrder] = useState([])
	const Values = []

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
		for (let i = 0; i < NOfCities; i++) {
			Values[i] = []
		}
		if (NOfCities == 0 || isNaN(NOfCities)) {
			console.log('Liczba miast jest 0!!')
		} else {
			for (let i = 0; i < NOfCities; i++) {
				for (let j = 0; j < NOfCities; j++) {
					if (j == i) {
						Values[i][j] = 0
					} else if (j < i) {
						continue
					} else {
						let temp = getRandomInt(minRoadValue, maxRoadValue)
						Values[i][j] = temp
						Values[j][i] = temp
					}
				}
			}
		}
		ShowValues()
	}

	function ShowValues() {
		for (let i = 0; i < NOfCities; i++) {
			let napis = ''
			for (let j = 0; j < NOfCities; j++) {
				napis += Values[i][j] + '-'
			}
			console.log(napis)
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
			//console.log(order + '-order')
			//console.log(cityA + '-' + cityB + ' ordery w sumowaniu' + Values)
			let roadValue = Values[cityA - 1][cityB - 1]
			sum += roadValue
		}
		//console.log('-------------------------------')
		return sum
	}

	function ShiftOrder(order) {
		let leng = order.length - 1
		let temp1 = getRandomInt(0, leng)
		let temp2 = getRandomInt(0, leng)

		// Ensure temp1 and temp2 are different
		while (temp1 === temp2) {
			temp2 = getRandomInt(0, leng)
		}

		//console.log('1 warotść-' + temp1 + ' 2 wartość-' + temp2)

		// Swap elements at temp1 and temp2
		let tempOrderVal = order[temp1]
		order[temp1] = order[temp2]
		order[temp2] = tempOrderVal

		// Ensure temp4 and temp5 are different and not equal to temp1
		let temp4 = getRandomInt(0, leng)
		let temp5 = getRandomInt(0, leng)

		while (temp4 === temp5 || temp4 === temp1 || temp5 === temp1) {
			temp4 = getRandomInt(0, leng)
			temp5 = getRandomInt(0, leng)
		}
		//console.log('4 warotść-' + temp4 + ' 5 wartość-' + temp5)
		// Swap elements at temp4 and temp5
		tempOrderVal = order[temp4]
		order[temp4] = order[temp5]
		order[temp5] = tempOrderVal

		return order
	}

	const Start = () => {
		setWynik('Obliczanie...')
		setCalculating(true) // Set calculating to true
		let order = InitOrder()
		//console.log(order + ' z inita')
		for (let i = 0; i < tries; i++) {
			let temp = ShiftOrder(order)
			//console.log(order + ' z losowania')
			if (sumOfRoadValues(temp) < sumOfRoadValues(order)) {
				order = [...temp]
			}
		}

		//setCurrentOrder(order)
		//console.log(currentOrder)
		document.getElementById('tt').innerText = order + ' -- ' + sumOfRoadValues(order)
		setCalculating(false)
	}
	// const OrderAndSum = ({ currentOrder }) => {
	// 	const sum = sumOfRoadValues(currentOrder)

	// 	return (
	// 		<div>
	// 			<h3>Order of Cities:</h3>
	// 			<ul>
	// 				{currentOrder.map((city, index) => (
	// 					<li key={index}>City {city}</li>
	// 				))}
	// 			</ul>
	// 			<p>Total Sum of Road Values: {sum}</p>
	// 		</div>
	// 	)
	// }

	// OrderAndSum.propTypes = {
	// 	currentOrder: PropTypes.array.isRequired // Ensure order is an array and is required
	// }

	return (
		<div>
			<h2>Komiwojażer</h2>
			<div>
				<label>Ilość Miast: </label>
				<input
					type="number"
					value={NOfCities}
					onChange={handleNOfCitiesChange}
					min="2"
					disabled={calculating} // Disable input when calculating
				/>
				<label>Ilość prób: </label>
				<input
					type="number"
					value={tries}
					onChange={handleTriesChange}
					min="2"
					disabled={calculating} // Disable input when calculating
				/>
				<label>Min. wartość drogi: </label>
				<input
					type="number"
					value={minRoadValue}
					onChange={handleMinRoadValueChange}
					disabled={calculating}
				/>
				<label>Max. wartość drogi: </label>
				<input
					type="number"
					value={maxRoadValue}
					onChange={handleMaxRoadValueChange}
					disabled={calculating}
				/>
				<button onClick={handleGenerateRandomRoads} disabled={calculating}>
					Generuj Losowe Drogi
				</button>
				<button onClick={Start} disabled={calculating}>
					Oblicz
				</button>{' '}
				{/* Disable button when calculating */}
			</div>
			<div>
				<p id="tt"></p>
			</div>
			{/* {currentOrder.length > 0 && (
				<div>
					<OrderAndSum currentOrder={currentOrder} />
				</div>
			)} */}
			<p>{wynik}</p>
		</div>
	)
}

export default Komiwojażer
