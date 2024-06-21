/* eslint-disable react/no-unescaped-entities */
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import SitoEratostenesa from './SitoEratostenesa'
import MonteCarlo from './MonteCarlo'
import R3Stopnia from './R3Stopnia'
import R5Stopnia from './R5Stopnia'
import Komiwojażer from './Komiwojażer'

const TabComponent = () => (
	<Tabs disableUpDownKeys disableLeftRightKeys>
		<TabList>
			<Tab>Sito Eratostenesa</Tab>
			<Tab>Monte Carlo</Tab>
			<Tab>Równanie 3 stopnia</Tab>
			<Tab>Równanie 5 stopnia</Tab>
			<Tab>Komiwojażer</Tab>
		</TabList>

		<TabPanel>
			<SitoEratostenesa />
		</TabPanel>
		<TabPanel>
			<MonteCarlo />
		</TabPanel>
		<TabPanel>
			<R3Stopnia />
		</TabPanel>
		<TabPanel>
			<R5Stopnia />
		</TabPanel>
		<TabPanel>
			<Komiwojażer />
		</TabPanel>
	</Tabs>
)

export default TabComponent
