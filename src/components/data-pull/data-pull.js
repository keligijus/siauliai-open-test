import React, { Component } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class DataPull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      loading: false,
      computing: false,
      repos: [],
      jsonData: []
    };
  }

  componentDidMount() {
    // axios.get('https://api.github.com/repos/atvirisiauliai/Viesieji-pirkimai/contents')
    // axios.get('https://raw.githubusercontent.com/halloffame/ynab-csv/gh-pages/sample_data.csv')
    this.setState({loading: true})

    axios.get('https://raw.githubusercontent.com/atvirisiauliai/Viesieji-pirkimai/master/Vie%C5%A1%C5%B3j%C5%B3%20pirkim%C5%B3%20forma%20taisyta09_19.csv')
      .then(response => {
        console.log(response)
        // this.setState({repos: response.data})
        this.parseCsv(response.data)
        this.setState({loading: false})
      })
      .catch(error => {
        console.error(new Error(error))
        this.setState({loading: false})
      })
  }

  parseCsv(csvString) {
    const vm = this;

    const pushedResults = []

    console.log('parseCsv')

    this.setState({computing: true})

    Papa.parse(csvString, {
      header: true,
      encoding: 'UTF-8',
      step (results, parser) {
        console.log('Row data:', results.data);
        console.log('Row errors:', results.errors);
        // vm.state.jsonData.push(results.data[0])

        pushedResults.push(results.data[0])
      },
      complete (results, file) {
        console.log('%cparse complete', 'color: #bada55;', results, file)
        // vm.setState({jsonData: results})
        vm.setState({computing: false})
        vm.setState({jsonData: pushedResults})
      }
    })
  }

  render() {
    const columns = [{
      Header: 'Data',
      accessor: 'Data'
    }, {
      Header: 'Institucija',
      accessor: 'Institucija'
    }, {
      Header: 'Kiekis',
      accessor: 'Kiekis'
    }, {
      Header: 'Matavimo vienetai',
      accessor: 'Matavimo vienetai'
    }, {
      Header: 'Pirkinio pavadinimas',
      accessor: 'Pirkinio pavadinimas'
    }]


// BVP� kodas. : "44190000-8"
// Data : "2016.06.16"
// Institucija : "Dain� muzikos mokykla"
// Kiekis : "8"
// Laim�jusio dalyvio pavadinimas : "UAB ��iauli� lyra� prekybos centras �Viskas namams�"
// Matavimo vienetai : "Vnt."
// Pirkimo b�das : "Apklausa �od�iu"
// Pirkinio pavadinimas : "�vairios statybin�s med�iagos"
// Pirkinys yra: : "PR."
// Sutarties vert� (Eur) su PVM (�od�iu sudarytos sutarties atveju- s�skaitoje fakt�roje ar kt mok�jimo dokumente nurodyta vert� (Eur) su PVM) : "5,41"
// Sutarties �sipareigojim� dalis, kuriai laim�tojas ketina pasitelkti tre�iuosius asmenis kaip subrangovus, subtiek�jus ar subteik�jus : ""

    return (
      <div className="DataPull">
        <h2>DataPull component</h2>
        {this.state.loading ? <h3>Loading...</h3> : false}
        {this.state.computing ? <h3>Preparing data...</h3> : false}
        <ul>
        {this.state.repos.map((item, index) =>
          <li className="item" key={item.name}>
            {item.name}
          </li>
        )}
        </ul>

        <ReactTable
          data={this.state.jsonData}
          columns={columns}
          loading={this.state.loading || this.state.computing}
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default DataPull;
