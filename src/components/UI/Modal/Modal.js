import React, {Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Dropdown from '../Dropdown/Dropdown';

class Modal extends Component {
  state = {
    dropdownOpen: true
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    
    return (
      <React.Fragment>
        <Backdrop 
          show={this.props.show}
          clicked={this.props.modalClosed} />
        <div 
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
          <Dropdown isOpen={this.state.dropdownOpen}>
            Hello
          </Dropdown>
        </div>
      </React.Fragment>
    )
  }
}


export default Modal;