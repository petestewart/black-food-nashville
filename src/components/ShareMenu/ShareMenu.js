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
  const url = `http://blackfoodnashville.com/${rest.id}`;

  const links = () => {
    const message = `Check out ${rest.name} and support #Blackowned businesses in Nashville!`;
    const items = [
      {
        component: (
        <CopyToClipboard
          text={url}
          onCopy={() => console.warn('COPIED!')}>
          <div className="d-flex align-items-center w-100 m-1"><i className="fas fa-clipboard fa-2x mx-3 text-muted"></i>Copy URL to clipboard</div>
        </CopyToClipboard>),
      },
      {
        component: (
        <FacebookShareButton
         className="network__share-button w-100 text-left"
         url={url}
         quote={message}
         style={{ width: '100%' }}
        >
          <div className="d-flex align-items-center w-100 m-1"><i className="fab fa-facebook-square fa-2x mx-3 text-muted"></i> Share to Facebook</div>
        </FacebookShareButton>),
      },
      {
        component: (
        <TwitterShareButton
        className="network__share-button"
        url={url}
        title={message}
        style={{ width: '100%' }}
      >
        <div className="d-flex align-items-center w-100 m-1"><i className="fab fa-twitter-square fa-2x mx-3 text-muted"></i> Share to Twitter</div>
      </TwitterShareButton>),
      },
      {
        component: (<EmailShareButton
        className="network__share-button"
        url={url}
        subject={message}
        body={''}
        style={{ width: '100%' }}
      >
        <div className="d-flex align-items-center w-100 m-1"><i className="fas fa-paper-plane fa-2x mx-3 text-muted"></i> Share via Email</div>
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
