import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: '',
      companySlug: '',
      file: null,
    }
  }

  onChangeApiKey = (event) => {
    this.setState({ apiKey: event.target.value })
  }

  onChangeCompanySlug = (event) => {
    this.setState({ companySlug: event.target.value })
  }

  fileUpload = (event) => {
    this.setState({
      file: event.target.files[0],
    })
  }

  onClickHandler = (e) => {
    e.preventDefault();
    if (this.state.apiKey === '' || this.state.companySlug === '' || this.state.file === null) return;
    const data = new FormData();
    data.append('apiKey', this.state.apiKey);
    data.append('companySlug', this.state.companySlug);
    data.append('file', this.state.file);
    axios.post("http://localhost:3000/api/shopifyFikenImport", data, {
    })
  }

  render() {
    return (
      <>
        <h1>Import shopify order CSV to fiken.</h1>
        <form encType="multipart/form-data">
          <input
            type="password"
            placeholder="Personal API token"
            onChange={e => this.onChangeApiKey(e)}
          />
          <br />
          <input
            type="text"
            placeholder="Your-company-slug"
            onChange={e => this.onChangeCompanySlug(e)}
          />
          <br />
          <input
            name="uploaded_file"
            type="file"
            accept=".csv"
            onChange={e => this.fileUpload(e)}
          />
          <br />
          <input
            type="submit"
            value="Import to Fiken"
            onClick={(e) => { this.onClickHandler(e) }}
          />
        </form>
      </>
    )
  }
}

export default App;
