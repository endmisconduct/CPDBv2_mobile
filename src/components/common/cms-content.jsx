import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';
import { isEmpty } from 'lodash';


const CMSContent = ({ content, className }) => {
  if (isEmpty(content)) {
    return null;
  }

  return (
    <div className={ className }>
      <Editor
        editorState={ content }
        readOnly={ true }
      />
    </div>
  );
};

CMSContent.propTypes = {
  content: PropTypes.object,
  className: PropTypes.string,
};

export default CMSContent;
