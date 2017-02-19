import React, { PropTypes } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';

function Index(props) {
  return (
    <div className="index container">
      <h1 className="text-center">Message Sender</h1>
      <Form horizontal>
        {
          props.alert.visible ?
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Alert bsStyle={props.alert.type}>
                  {props.alert.message}
                </Alert>
              </Col>
            </FormGroup>
          : null
        }
        <FormGroup controlId="formHorizontalTo">
          <Col componentClass={ControlLabel} sm={2}>
            To
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" onChange={props.onToChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalCC">
          <Col componentClass={ControlLabel} sm={2}>
            CC
      </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="CC" onChange={props.onCcChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalBCC">
          <Col componentClass={ControlLabel} sm={2}>
            BCC
      </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="BCC" onChange={props.onBccChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalSubject">
          <Col componentClass={ControlLabel} sm={2}>
            Subject
      </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Subject" onChange={props.onSubjectChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalText">
          <Col componentClass={ControlLabel} sm={2}>
            Text
      </Col>
          <Col sm={10}>
            <FormControl
              componentClass="textarea"
              placeholder="Text"
              onChange={props.onTextChange}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle="primary" onClick={props.sendMessage}>
              Send message
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

const alertType = {
  type: PropTypes.string,
  message: PropTypes.string,
  visible: PropTypes.bool,
};

Index.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  onToChange: PropTypes.func.isRequired,
  onCcChange: PropTypes.func.isRequired,
  onBccChange: PropTypes.func.isRequired,
  onSubjectChange: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  alert: PropTypes.shape(alertType).isRequired,
};

export default Index;
