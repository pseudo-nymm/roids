import Table from 'react-bootstrap/Table'

const NeosTable = ({neo_data})=>{
    var flattened_array =[];
    var count = neo_data.length;

    /* flattning the 2d neo_data array so that it 
    can be mapped onto the table */
    if(count!==0){
        for(var i=0; i<count; i++){
            var n = neo_data[i].length;
           
            for (var j=0; j<n; j++){
                flattened_array.push(Object.values(neo_data[i])[j]);
            }   
       } 
    }
       
    const renderTableBody = ()=>{
        if(count!==0){
            return(
                flattened_array.map((neo) => {
                    return(
                        <tr key={neo.id} className="table-body-row">
                            <td> {neo.id} </td>
                            <td> {neo.name} </td>
                            <td> {neo.absolute_magnitude_h} </td>
                            <td> 
                                {neo.close_approach_data[0].close_approach_date_full} 

                            </td>
                            <td> 
                                {neo.close_approach_data[0].miss_distance.kilometers} 
                                
                            </td>
                            <td> 
                                Earth
                                
                            </td>

                            <td> 
                                {neo.close_approach_data[0].relative_velocity.kilometers_per_second} 
                                
                            </td>
                        
                            <td> 
                                {neo.estimated_diameter.kilometers.estimated_diameter_min} 
                            
                            </td> 
                            
                            <td> 
                                {JSON.stringify(neo.is_potentially_hazardous_asteroid)} 
                            
                            </td>
                            <td> 
                                {JSON.stringify(neo.is_sentry_object)} 
                            
                            </td>
                        </tr> 
                    )
                })
            );
        } else return null;
    }  

    return(
        <div className="table-panel">
            <div className='table-wrapper'> 
                <Table className="neos-table">
                    <thead>
                        <tr className='table-heading-row'>
                            <th rowSpan="2"> Id </th>
                            <th rowSpan="2"> Name </th>
                            <th rowSpan="2"> Absolute Magnitude </th>
                            <th colSpan="4"> Close Approach Data </th>
                            <th rowSpan="2"> Estimated Diameter </th>
                            <th rowSpan="2"> Is potentially hazardous asteroid </th>
                            <th rowSpan="2"> Is sentry object </th>
                        </tr>

                        <tr className='table-heading-row'>
                            <th> Date and Time </th>
                            <th> Miss Distance </th>
                            <th> Orbiting Body </th>
                            <th> Relative Velocity </th> 
                        </tr>
                        
                    </thead>

                    <tbody>
                        { renderTableBody() }
                    </tbody>
                </Table>
            </div> 
        </div>
    
    );
}

export default NeosTable;