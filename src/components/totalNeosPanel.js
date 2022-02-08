
const TotalNeosPanel = ({totalNeos})=>{
    return(
        <div className='total-neos-panel'>
            <div className="total-neos-wrapper">
                <p className='neos-sum'> {totalNeos} </p>
                <p className='small-text'> total NEOs </p>

            </div>
            
        </div>
    )
}

export default TotalNeosPanel;