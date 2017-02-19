import React from 'react';

import Index from './Index';
import postMessage from '../api/emailApi';

class IndexContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        text: '',
      },
      alert: {
        type: 'success',
        message: '',
        visible: false,
      },
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.onToChange = this.onToChange.bind(this);
    this.onCcChange = this.onCcChange.bind(this);
    this.onBccChange = this.onBccChange.bind(this);
    this.onSubjectChange = this.onSubjectChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onToChange(event) {
    this.setState({
      message: Object.assign({}, this.state.message, { to: event.target.value }),
      alert: { visible: false, type: '', message: '' },
    });
  }

  onCcChange(event) {
    this.setState({
      message: Object.assign({}, this.state.message, { cc: event.target.value }),
      alert: { visible: false },
    });
  }

  onBccChange(event) {
    this.setState({
      message: Object.assign({}, this.state.message, { bcc: event.target.value }),
      alert: { visible: false },
    });
  }

  onSubjectChange(event) {
    this.setState({
      message: Object.assign({}, this.state.message, { subject: event.target.value }),
      alert: { visible: false },
    },
    );
  }

  onTextChange(event) {
    this.setState({
      message: Object.assign({}, this.state.message, { text: event.target.value }),
      alert: { visible: false },
    });
  }

  sendMessage() {
    postMessage(this.state.message)
      .then((response) => {
        this.setState({ alert: { type: 'success', message: response.data, visible: true } });
      })
      .catch((error) => {
        let errorMsg = 'Unexpected error. Please try again.';
        if (error.response && error.response.data) {
          errorMsg = error.response.data;
        }
        this.setState({ alert: { type: 'danger', message: errorMsg, visible: true } });
      });
  }

  render() {
    return (
      <Index
        onToChange={this.onToChange}
        onCcChange={this.onCcChange}
        onBccChange={this.onBccChange}
        onSubjectChange={this.onSubjectChange}
        onTextChange={this.onTextChange}
        sendMessage={this.sendMessage}
        alert={this.state.alert}
      />
    );
  }

}

export default IndexContainer;
