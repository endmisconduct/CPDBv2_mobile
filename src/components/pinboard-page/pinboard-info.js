import React, { Component, PropTypes } from 'react';
import AppHistory from 'utils/history';

import styles from './pinboard-info.sass';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


export default class PinboardInfo extends Component {
  componentWillReceiveProps(nextProps) {
    const { pinboard } = this.props;
    if (pinboard.url !== nextProps.pinboard.url) {
      AppHistory.replace(nextProps.pinboard.url);
    }
  }

  render() {
    const { pinboard, updatePinboardInfo } = this.props;
    return (
      <div className={ styles.pinboardInfo }>
        <AutosaveTextareaInput
          className='pinboard-title'
          value={ pinboard.title }
          placeholder='Give your pinboard a title'
          fieldType='title'
          save={ updatePinboardInfo }
          textareaLineHeight={ 31 }
        />
        <AutosaveTextareaInput
          className='pinboard-description'
          value={ pinboard.description }
          placeholder='When you’re ready, add a description for your pinboard here'
          fieldType='description'
          save={ updatePinboardInfo }
          textareaLineHeight={ 16 }
        />
      </div>
    );
  }
}

PinboardInfo.propTypes = {
  pinboard: PropTypes.object,
  updatePinboardInfo: PropTypes.func,
};
