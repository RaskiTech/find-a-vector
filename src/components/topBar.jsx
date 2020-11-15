import React, { Component } from "react";
import {COLORS} from '../colors.js'
import {VECTORS} from '../vectors.js'
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

class TopBar extends Component {
	state = {dropDownTitle: "Select a vector"}

	render() {
		return (
			<Navbar style={{background: COLORS.orangeLight}} expand="lg" sticky="top">
  				<Navbar.Brand className="ml-2">Find a vector</Navbar.Brand>
				
				<Button 
					onClick={this.props.clearPoints} 
					variant="info" 
					style={{background: COLORS.turquoiseDark}} 
					className="ml-3"
				>Clear the board</Button>


				<Button 
					onClick={this.props.openOptions}
					variant="info" 
					style={{background: COLORS.turquoiseDark}}
					className="ml-3"
				>Options</Button>

    			<Nav >
					<NavDropdown className="ml-3" title={this.props.vectorName ? this.props.vectorName : "Select a vector"} id="basic-nav-dropdown">
						<NavDropdown.Item onClick={() => this.props.changeVectorType(VECTORS.line)}>{VECTORS.line}</NavDropdown.Item>
						<NavDropdown.Item onClick={() => this.props.changeVectorType(VECTORS.power2)}>{VECTORS.power2}</NavDropdown.Item>
						<NavDropdown.Item onClick={() => this.props.changeVectorType(VECTORS.power3)}>{VECTORS.power3}</NavDropdown.Item>
						<NavDropdown.Item onClick={() => this.props.changeVectorType(VECTORS.power4)}>{VECTORS.power4}</NavDropdown.Item>
					</NavDropdown>
    			</Nav>

				

				<Button 
					disabled={this.props.findVectorText === "Select a vector type" || this.props.findVectorText === "Put 1 point to visualize"}
					onClick={this.props.visualizeButtonHit} 
					variant={this.props.findVectorButtonType}
					style={{background: COLORS.turquoiseDark}} 
					className="ml-3"
				>{this.props.findVectorText}</Button>

				<Button 
					disabled={this.props.buttonDisabled}
					onClick={this.props.calculateButtonHit} 
					variant="info" 
					style={{background: COLORS.turquoiseDark}} 
					className="ml-3"
				>{this.props.calculateVectorText}</Button>
				
				<Navbar.Brand className="ml-3">Speed:</Navbar.Brand>
				<RangeSlider
					min={1}
					max={60}
					tooltip="off" 
					value={this.props.progressBarValue} 
					onChange={newAmount => this.props.calculatingAmount(newAmount.target.value)}
				/>

				<NavbarCollapse/>


				<Button
					variant="info"
					style={{background: COLORS.turquoiseDark}}
					className="ml-3"
					onClick={this.props.setMoreAccurateFormula}
				>{this.props.moreAccurateFormula ? "Less accurate formula" : "More accurate formula"}</Button>

				<Button 
					onClick={this.props.addScale}
					variant="info" 
					style={{background: COLORS.turquoiseDark}}
					className="ml-3"
				>+</Button>

				<Button 
					onClick={this.props.subtractScale} 
					variant="info" 
					style={{background: COLORS.turquoiseDark}} 
					className="ml-3"
				>-</Button>
			</Navbar>
		)
	}
};
// Spaces are &nbsp;
export default TopBar;