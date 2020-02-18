import React from 'react';

import style from './markdown-link.sass';


export default function MarkdownLink() {
  return (
    <a className={ style.markdownLink } { ...this.props } />
  );
}
