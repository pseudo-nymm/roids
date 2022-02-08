
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import TotalNeosPanel from './components/totalNeosPanel';
import NeosChart from './components/neosChart';
import NeosTable from './components/neosTable';

const App = ()=> {
	var arr = [];
	var sorted_keys=[];
	var sorted_vals = [];

	const [neos, setNeos] = useState({
		neo_dates:[],
		neo_data:[],
		isLoading: false,
		isError: false,

	});

	const [neosFrequency, setNeosFrequency] = useState([]);
	const [totalNeos, setTotalNeos] = useState(0);
	
	/* for connecting to NASA API */
	const api_key = "DEMO_KEY";
	const baseURL= "https://api.nasa.gov/neo/rest/v1/feed";

	useEffect(()=>{
		const handleNeos = (json)=>{
			var keys = Object.keys(json);
			var vals = Object.values(json);
	
			/* storing keys (dates) and vals (data about neos on each date) 
			into 2d array */
			for(var i=0; i<keys.length; i++){
				arr[i] = [keys[i], vals[i]];
			}
	
			//sorting array based on dates
			arr.sort();
	
			//can this be changed to map?
			for( var j=0; j<arr.length; j++){
				sorted_keys[j] = arr[j][0];
				sorted_vals[j] = arr[j][1];
			} 
				
				setNeos({
					neo_dates: sorted_keys, 
					neo_data: sorted_vals
				});
		}

		const fetchNeos = async ()=>{
			try {
				const resp = await axios.get(
					baseURL+`?api_key=${api_key}`
				);
				
			var json = resp.data.near_earth_objects; 
				handleNeos(json); 
	
			} catch(err) {
				console.log(err);
			} 
		} 
		
		fetchNeos();

	}); 

	//processing data for chart and stats panel
	useEffect(()=>{
		var data = neos.neo_data;

		if(data.length !== 0){
			//getting frequency of neos on each date
			let frequencies = [];
			let sum=0;
	
			for (var i=0; i<data.length; i++){
				frequencies.push(data[i].length);
	
				//getting total number of neos (sum of all frequencies)
				sum += data[i].length;
				
			} 
			setNeosFrequency(frequencies);
			setTotalNeos(sum);
		}
		
	},[neos.neo_data]

	);

	return(
		<Container fluid>
			<h1> ROIDS </h1>      
			
			<Row className="top-row">
	
				<Col className="total-neos-col" xs={10} lg={3}>
					<TotalNeosPanel totalNeos={totalNeos}/>
				</Col>

				<Col className="chart-col" xs={10} lg={6}>
					<NeosChart neosFrequency={neosFrequency} dates={neos.neo_dates}/> 
				</Col> 
				
			</Row> 

			<Row className="bottom-row">
				<Col className="table-col" xs={10} lg={9}>
				<NeosTable neo_data={ neos.neo_data }/>
				</Col> 
			</Row> 
		</Container> 
	);
}

export default App;
