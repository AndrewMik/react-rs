import { Component } from 'react';
import './style.css';

export default class LoadingSpinner extends Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
}
