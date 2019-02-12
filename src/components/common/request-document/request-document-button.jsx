import React, { PropTypes, Component } from 'react';
import Modal from 'react-modal';
import { noop } from 'lodash';

import style from './request-document-button.sass';
import RequestDocumentContent from './request-document-content';


export default class RequestDocumentButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requestFormOpened: false,
    };

    this.modalStyles = {
      overlay: {
      },
      content: {
        width: '288px',
        height: 'auto',
        left: 'calc(50% - 144px)',
        bottom: 'none',
        borderRadius: 0,
        padding: 0,
        border: 0
      }
    };

    this.closeRequestForm = this.closeRequestForm.bind(this);
    this.openRequestForm = this.openRequestForm.bind(this);
  }

  closeRequestForm() {
    this.setState({ requestFormOpened: false });
  }

  openRequestForm() {
    this.setState({ requestFormOpened: true });
  }

  render() {
    const {
      isRequested,
      id,
      requestDocument,
      message,
      customClassName,
      hasData,
      documentRequestMessage,
      newDocumentNotificationMessage
    } = this.props;
    return (
      <div className={ `${style.requestDocumentButton} ${customClassName}` }>
        <div
          className='request-button'
          onClick={ isRequested ? noop : this.openRequestForm }
        >
          {
            isRequested
              ? <span>Documents Requested<span className='check-mark'>✔</span></span>
              : hasData ? 'New Document Notifications' : 'Request Documents'
          }
        </div>
        <Modal isOpen={ this.state.requestFormOpened } style={ this.modalStyles }>
          <RequestDocumentContent
            closeModal={ this.closeRequestForm }
            id={ id }
            requestDocument={ requestDocument }
            message={ message }
            isRequested={ isRequested }
            hasData={ hasData }
            documentRequestMessage={ documentRequestMessage }
            newDocumentNotificationMessage={ newDocumentNotificationMessage }
          />
        </Modal>
      </div>
    );
  }
}

RequestDocumentButton.propTypes = {
  isRequested: PropTypes.bool,
  hasData: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  requestDocument: PropTypes.func,
  message: PropTypes.string,
  customClassName: PropTypes.string,
  documentRequestMessage: PropTypes.string,
  newDocumentNotificationMessage: PropTypes.string,
};

RequestDocumentButton.defaultProps = {
  isRequested: false,
  hasData: false,
  customClassName: '',
};
