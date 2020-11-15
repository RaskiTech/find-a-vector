import React, { Component } from 'react';
import {  Button, Modal } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';

class OptionsMenu extends Component {
    render() { 
        return ( 
            <Modal
				show={this.props.showMenu}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={this.props.closeMenu}
				>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
					Options
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>Points in the vector</h4>
					<p>How many points are rendered to form the vector</p>
                    <div>
                        {this.props.pointsInLine}
                        <RangeSlider 
                            min={10}
					        max={200}
                            tooltip="off"
                            value={this.props.pointsInLine}
                            onChange={newAmount => this.props.setPointsInLine(newAmount.target.value)}/>
                    </div>

					<h4>Point sizes</h4>
					<p>Data points</p>
                    <div>
                        {this.props.dataPointSize}
                        <RangeSlider 
                            min={5}
					        max={30}
                            tooltip="off"
                            value={this.props.dataPointSize}
                            onChange={newAmount => this.props.setDataPointSize(newAmount.target.value)}/>
                    </div>
                    <p>Line points</p>
                    <div>
                        {this.props.linePointSize}
                        <RangeSlider 
                            min={5}
					        max={30}
                            tooltip="off"
                            value={this.props.linePointSize}
                            onChange={newAmount => this.props.setLinePointSize(newAmount.target.value)}/>
                    </div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant={"info"} onClick={this.props.closeMenu}>Close</Button>
				</Modal.Footer>
			</Modal>
         );
    }
}
 
export default OptionsMenu;