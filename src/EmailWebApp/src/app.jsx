/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

import './styles/app.scss';

import IndexContainer from './components/IndexContainer';

render(<IndexContainer />, document.getElementById('app'));
