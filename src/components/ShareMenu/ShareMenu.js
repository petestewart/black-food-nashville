import React from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// import PropTypes from 'prop-types';

import Dropdown from '../../UI/Dropdown/Dropdown';

import './ShareMenu.scss';

const ShareMenu = (props) => {
  const { rest } = props;
  const url = `http://blackownednashville.com/${rest.id}`;

  const links = () => {
    const items = [
      {
        component: (
        <CopyToClipboard
          text={url}
          onCopy={() => console.warn('COPIED!')}>
          <div className="d-flex align-items-center w-100 m-1"><i className="fas fa-clipboard fa-2x mx-3"></i>Copy URL to clipboard</div>
        </CopyToClipboard>),
      },
      {
        component: (
        <FacebookShareButton
         className="network__share-button w-100 text-left"
         url={url}
         quote={'I AM A FACEBOOK POST'}
        >
          <div className="d-flex align-items-center w-100 m-1"><i className="fab fa-facebook-square fa-2x mx-3"></i> Share to Facebook</div>
        </FacebookShareButton>),
      },
      {
        component: (
        <TwitterShareButton
        className="network__share-button"
        url={url}
        title={'I AM A TWITTER TITLE'}
      >
        <div className="d-flex align-items-center w-100 m-1"><i className="fab fa-twitter-square fa-2x mx-3"></i> Share to Twitter</div>
      </TwitterShareButton>),
      },
      {
        component: (<EmailShareButton
        className="network__share-button"
        url={url}
        subject={`Check out ${rest.name}`}
        body={'I AM AN EMAIL'}
      >
        <div className="d-flex align-items-center w-100 m-1"><i className="fas fa-paper-plane fa-2x mx-3"></i> Share via Email</div>
      </EmailShareButton>),
      },
    ];

    return items;
  };

  return (
    <Dropdown links={links()}>{props.children}</Dropdown>
  );
};

// ShareMenu.propTypes = {}

export default ShareMenu;
