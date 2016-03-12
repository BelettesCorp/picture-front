import React from 'react';
import ReactDom from 'react-dom';
import { HomeRouter } from './pages/Home';

if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
    // MSIE
    ReactDom.render(<p>Sorry we do not support Internet explorer. Please use either Chrome or Firefox.</p>, document.getElementById('app-container'));
} else {
    ReactDom.render(<HomeRouter />, document.getElementById('app-container'));
}
