import { useRef } from 'react'

const SitoEratostenesa = () => {
	let zakres

	const listDoubleRef = useRef(null)
	const listQuadraRef = useRef(null)
	//const listaDoub=document.getElementById("QuadraList");

	function Work() {
		GetLimit()
		let tablica = TableInit(zakres)
		tablica = SiftForPrimes(tablica)
		let resDouble = GetDoubles(tablica)
		let resQuadra = GetQuadras(tablica)
		ShowQuadras(resQuadra)
		ShowDouble(resDouble)
	}
	function ShowDouble(resDouble) {
		let node
		if (resDouble.length < 1) {
			node = '<li>brak</li>'
		} else {
			node = '<li>' + resDouble[0][0] + ' - ' + resDouble[0][1] + '</li>'
			if (resDouble.length > 1) {
				for (let i = 1; i < resDouble.length; i++) {
					//console.log(resDouble[i][0]);
					node += '<li>' + resDouble[i][0] + ' - ' + resDouble[i][1] + '</li>'
				}
			}
		}
		if (listDoubleRef.current) {
			listDoubleRef.current.innerHTML = node
		}
	}
	function ShowQuadras(resQuadra) {
		let node
		if (resQuadra.length < 1) {
			node = '<li>brak</li>'
		} else {
			node =
				'<li>' +
				resQuadra[0][0] +
				' - ' +
				resQuadra[0][1] +
				' - ' +
				resQuadra[0][2] +
				' - ' +
				resQuadra[0][3] +
				'</li>'
			if (resQuadra.length > 1) {
				for (let i = 1; i < resQuadra.length; i++) {
					//console.log(resQuadra[i][0]);
					node +=
						'<li>' +
						resQuadra[i][0] +
						' - ' +
						resQuadra[i][1] +
						' - ' +
						resQuadra[i][2] +
						' - ' +
						resQuadra[i][3] +
						'</li>'
				}
			}
		}
		if (listQuadraRef.current) {
			listQuadraRef.current.innerHTML = node
		}
	}
	function GetLimit() {
		let temp = parseInt(document.getElementById('zakres').value)
		if (!isNaN(temp)) {
			zakres = temp
		} else {
			console.log('Zakres musi być liczbą!!')
			//alert("Zakres musi być liczbą!!");
		}
	}
	function TableInit(zakresTablicy) {
		let tablica = []
		let k = 3

		for (let i = 0; k <= zakresTablicy; i++) {
			tablica[i] = []
			tablica[i][0] = k
			tablica[i][1] = 1
			//console.log(tablica[i][0]);
			k += 2
		}

		return tablica
	}
	function SiftForPrimes(tablica) {
		for (let i = 0; i < Math.floor(tablica.length / 2); i++) {
			if (tablica[i][0] == 0) {
				break
			}
			for (let j = i + 1; j < tablica.length; j++) {
				//console.log(tablica[j][0] + " % "+tablica[i][0]);
				if (tablica[j][0] % tablica[i][0] == 0) {
					tablica[j][1] = 0
				}
			}
		}

		return tablica
	}
	function GetDoubles(table) {
		let resDouble = []
		let temp = []
		for (let i = 2; i <= table.length; i++) {
			try {
				if (table[i][1] == 1 && table[i + 1][1] == 1) {
					//console.log(table[i][0] + " - "+table[i][1]);
					temp = [table[i][0], table[i + 1][0]]
					resDouble.push(temp)
				}
			} catch (IndexOutOfRangeException) {
				//console.log("Wszystkie pary zostały przypisane");
			}
		}
		return resDouble
	}
	function GetQuadras(table) {
		let resQuadra = []
		let temp = []
		for (let i = 3; i <= table.length; i++) {
			try {
				if (
					table[i][1] == 1 &&
					table[i + 1][1] == 1 &&
					table[i + 3][1] == 1 &&
					table[i + 4][1] == 1
				) {
					temp = [table[i][0], table[i + 1][0], table[i + 3][0], table[i + 4][0]]
					resQuadra.push(temp)
				}
			} catch (IndexOutOfRangeException) {
				//console.log("Wszystkie quadry zostały przypisane");
			}
		}
		return resQuadra
	}
	return (
		<>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
				<div id="Inputs">
					<h2>Podaj zakres dla liczb pierwszych</h2>
					<input id="zakres" />
					<button type="button" id="btn1" onClickCapture={Work}>
						Zatwierdz
					</button>
				</div>
				<div style={{ display: 'flex', flex: '1', overflow: 'hidden' }}>
					<h1>Pary:</h1>
					<div id="Doubles" style={{ flex: '1', overflow: 'auto' }}>
						<ul
							id="DoubleList"
							ref={listDoubleRef}
							style={{ overflow: 'auto', height: '100%' }}
						></ul>
					</div>
					<h1>Czwórki:</h1>
					<div id="Quadres" style={{ flex: '1', overflow: 'auto' }}>
						<ul
							id="QuadraList"
							ref={listQuadraRef}
							style={{ overflow: 'auto', height: '100%' }}
						></ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default SitoEratostenesa
