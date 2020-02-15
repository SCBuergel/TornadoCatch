import React, {Component} from 'react'
import axios from 'axios';

class Matches extends Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: null,
        }
    }

    async componentDidMount() {
        const matches = (await axios.get("http://localhost:8081/")).data;
        this.setState({
            matches,
        });
    }

    render() {
        if(this.state.matches === null) return <div className='alert-info'>No match yet. Please check later.</div>
        return (
            this.state.matches && this.state.matches.map(match => (
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h3>MAC: {match.mac}</h3>
                                    <p>Trx: {match.trx}</p>
                                    <p>Issue At: {match.issueAt}</p>
                                </div>
                            </div>
                        </div>
                    </div> 
            ))
        )
    }

}


export default Matches;