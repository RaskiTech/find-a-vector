import React, { Component } from "react";
import TopBar from "./topBar";
import PlaneCanvas from './PlaneCanvas';
import { COLORS } from '../colors';
import { VECTORS } from "../vectors";
import { zeros, multiply } from "mathjs";
import OptionsMenu from "./OptionsMenu";

var vectorPlane;
var canvasContext;

// Handle the rendering
class Controller extends Component {
	isCalculating = false;
	selectedVector = "";
	state = {
		calculateButtonDisablbed: true,
		calculationsPerDraw: 1,
		vectorName: "",
		findVectorText: "Select a vector type",
		findVectorButtonType: "info",
		calculateVectorText: "Select a vector type",
		useBetterFormula: false,
		showOptionsMenu: false,
		dataPointSize: 7,
		linePointSize: 5,
		pointsInLine: 100
	}
	// Returns the inverse of matrix `M`.
	matrix_invert(M) {
		//if the matrix isn't square: exit (error)
		if(M.length !== M[0].length){return;}
		
		//create the identity matrix (I), and a copy (C) of the original
		var i=0, ii=0, j=0, dim=M.length, e=0, t=0;
		var I = [], C = [];
		for(i=0; i<dim; i+=1){
			// Create the row
			I[I.length]=[];
			C[C.length]=[];
			for(j=0; j<dim; j+=1){
				
				//if we're on the diagonal, put a 1 (for identity)
				if(i===j){ I[i][j] = 1; }
				else{ I[i][j] = 0; }
				
				// Also, make the copy of the original
				C[i][j] = M[i][j];
			}
		}
		
		// Perform elementary row operations
		for(i=0; i<dim; i+=1){
			// get the element e on the diagonal
			e = C[i][i];
			
			// if we have a 0 on the diagonal (we'll need to swap with a lower row)
			if(e===0){
				//look through every row below the i'th row
				for(ii=i+1; ii<dim; ii+=1){
					//if the ii'th row has a non-0 in the i'th col
					if(C[ii][i] !== 0){
						//it would make the diagonal have a non-0 so swap it
						for(j=0; j<dim; j++){
							e = C[i][j];       //temp store i'th row
							C[i][j] = C[ii][j];//replace i'th row by ii'th
							C[ii][j] = e;      //repace ii'th by temp
							e = I[i][j];       //temp store i'th row
							I[i][j] = I[ii][j];//replace i'th row by ii'th
							I[ii][j] = e;      //repace ii'th by temp
						}
						//don't bother checking other rows since we've swapped
						break;
					}
				}
				//get the new diagonal
				e = C[i][i];
				//if it's still 0, not invertable (error)
				if(e===0){return}
			}
			
			// Scale this row down by e (so we have a 1 on the diagonal)
			for(j=0; j<dim; j++){
				C[i][j] = C[i][j]/e; //apply to original matrix
				I[i][j] = I[i][j]/e; //apply to identity
			}
			
			// Subtract this row (scaled appropriately for each row) from ALL of
			// the other rows so that there will be 0's in this column in the
			// rows above and below this one
			for(ii=0; ii<dim; ii++){
				// Only apply to other rows (we want a 1 on the diagonal)
				if(ii===i){continue;}
				
				// We want to change this element to 0
				e = C[ii][i];
				
				// Subtract (the row above(or below) scaled by e) from (the
				// current row) but start at the i'th column and assume all the
				// stuff left of diagonal is 0 (which it should be if we made this
				// algorithm correctly)
				for(j=0; j<dim; j++){
					C[ii][j] -= e*C[i][j]; //apply to original matrix
					I[ii][j] -= e*I[i][j]; //apply to identity
				}
			}
		}
		
		//we've done all operations, C should be the identity
		//matrix I should be the inverse:
		return I;
	}
	setCanvasContext(context) { if(typeof(canvasContext) === 'undefined') canvasContext = context; }
	constructor() {
		super();
		vectorPlane = new VectorPlane(window.innerWidth/2, window.innerHeight/2, 60);
	}
	screenToPlane = (xP, yP) => {
		// Set the planes 0 0 point to pixel 0 0.
		let normalizedX = xP - vectorPlane.xOrigin;
		let normalizedY = yP - vectorPlane.yOrigin;
		// Divide by the scale to get the coordinates
		let x = normalizedX / vectorPlane.scale;
		let y = normalizedY / -vectorPlane.scale; // Use minus because the y axis is flipped in pixels
		return [x, y];
	}
	planeToScreen = (x, y) => {
		// Multiply by the scale to get the pixel difference from the middle
		let xPDifference = x * vectorPlane.scale;
		let yPDifference = y * -vectorPlane.scale; // Use minus because the y axis is flipped in pixels

		// Add it to the pixel center coors to get the coords
		let xP = vectorPlane.xOrigin + xPDifference;
		let yP = vectorPlane.yOrigin + yPDifference; 

		return [xP, yP];
	}

	addDataPoint = (xP, yP) => {
		if (vectorPlane.points.length === 0) this.setState({findVectorText: "Visualize a " + this.state.vectorName + " vector"});

		let coors = this.screenToPlane(xP, yP);
		vectorPlane.points.push([coors[0], coors[1]]);

		let dist = Math.sqrt(Math.pow(coors[0], 2) + Math.pow(coors[1], 2));
		if (dist > vectorPlane.maxDistFromOrigin){
			vectorPlane.maxDistFromOrigin = dist;
			this.calculateLearningRate();
		}
		
		// Draw the point. Could call drawDataPoints() but this is faster
		canvasContext.beginPath();
		canvasContext.fillStyle = COLORS.dataPoint;
		canvasContext.arc(xP, yP, this.state.dataPointSize, 0, 2*Math.PI);
		canvasContext.fill()
		this.needDisabledButtons();
	}

	needDisabledButtons() {
		if (vectorPlane.points.length >= vectorPlane.coefficients.length && vectorPlane.selectedVectorID !== 0) {
			this.setState({calculateButtonDisablbed: false, calculateVectorText: "Calculate the vector"});
		}
		else {
			if(vectorPlane.selectedVectorID !== 0) {
			this.setState({calculateButtonDisablbed: true});
				if (vectorPlane.points.length < vectorPlane.coefficients.length) {
					this.setState({calculateVectorText: "Put " +  (vectorPlane.coefficients.length-vectorPlane.points.length) + " more point"+(vectorPlane.coefficients.length-vectorPlane.points.length === 1 ? "" : "s")})
				}
			}
		}
	}

	calculateLearningRate = () => {
		vectorPlane.learningRate = 1/Math.pow(vectorPlane.learningRateMultiplier*vectorPlane.maxDistFromOrigin, vectorPlane.coefficients.length-1) * 0.01;
	}

	onCanvasDrag = (dragX, dragY) => {
		vectorPlane.xOrigin -= dragX;
		vectorPlane.yOrigin -= dragY;
		this.draw(canvasContext);
	}

	setValues = (xOrigin, yOrigin, scale) => {
		vectorPlane.xOrigin = xOrigin;
		vectorPlane.yOrigin = yOrigin;
		vectorPlane.scale = scale;
	}

	draw = (ctx) => {
		ctx.lineWidth = 1;

		// BG
        ctx.fillStyle = COLORS.white;
        ctx.beginPath();
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fill();
		
		// The Scale lines
		ctx.beginPath();
		ctx.strokeStyle = COLORS.whiteDark;
		let startDraw = vectorPlane.xOrigin % vectorPlane.scale;// Get the remainder to know where to start drawing the lines
		for (let i = startDraw; i < ctx.canvas.width; i += vectorPlane.scale) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i, ctx.canvas.height);
		}
		startDraw = vectorPlane.yOrigin % vectorPlane.scale;
		for (let i = startDraw; i < ctx.canvas.height; i += vectorPlane.scale) {
			ctx.moveTo(0, i);
			ctx.lineTo(ctx.canvas.width, i);
		}
		ctx.stroke();
		
		// Main axis
		ctx.beginPath();
		ctx.strokeStyle = COLORS.grayDark;
        ctx.moveTo(0, vectorPlane.yOrigin);
		ctx.lineTo(ctx.canvas.width, vectorPlane.yOrigin);
		ctx.moveTo(vectorPlane.xOrigin, 0);
		ctx.lineTo(vectorPlane.xOrigin, ctx.canvas.height);
		ctx.stroke();
		
		// Points
		if (vectorPlane.renderLine)
			this.drawLine(ctx);
		this.drawDataPoints(ctx);
		
		// draw the vector formula
		if (vectorPlane.selectedVectorID != 0) {
			ctx.font = "30px Arial";
			ctx.fillStyle=COLORS.grayDark;
			if (this.state.useBetterFormula) {
				let letters = ["a", "b", "c", "d", "e"];
				let formula = "";
				let index = 0;
				switch (vectorPlane.coefficients.length) {
					case 5:
						formula += letters[index]+"x⁴+";
						index++;
					case 4:
						formula += letters[index]+"x³+";
						index++;
					case 3:
						formula += letters[index]+"x²+";
						index++;
					case 2:
						formula += letters[index]+"x+"+letters[index+1]
						break;
				}

				ctx.fillText(formula, 30, window.innerHeight-(30*(vectorPlane.coefficients.length+1.5)));
				for (let i = 0; i < vectorPlane.coefficients.length; i++){
					ctx.fillText(letters[vectorPlane.coefficients.length-i-1]+" = " + vectorPlane.coefficients[i].toFixed(8), 30, window.innerHeight-(30*(i+1)));
				}
			}
			else ctx.fillText(this.calculateFormula(), 30, window.innerHeight-30);
		}
	}
	drawDataPoints = (ctx) => {
		ctx.beginPath();
		ctx.fillStyle = COLORS.dataPoint;
		for (let i = 0; i < vectorPlane.points.length; i++){
			let pCoors = this.planeToScreen(vectorPlane.points[i][0], vectorPlane.points[i][1]);
			ctx.moveTo(pCoors[0], pCoors[1]);
			ctx.arc(pCoors[0], pCoors[1], this.state.dataPointSize, 0, 2*Math.PI);
		}
		ctx.fill();
	}

	// Draw many lines to form a curving line
	drawLine = (ctx) => {
		ctx.beginPath();
		ctx.lineWidth = this.state.linePointSize;
		ctx.strokeStyle = COLORS.linePoint;

		for (let i = 0; i < this.state.pointsInLine; i++) {
			let xP = window.innerWidth * (i / this.state.pointsInLine);
			let x = this.screenToPlane(xP, 0)[0];
			let y = vectorPlane.getPrediction(x);
			let yP = this.planeToScreen(0, y)[1];
			
			// Draw the line
			ctx.lineTo(xP, yP);
		}
		// Draw the last line to make sure that the line end where the screen ends
		let xP = window.innerWidth;
		let x = this.screenToPlane(xP, 0)[0];
		let yP = this.planeToScreen(0, vectorPlane.getPrediction(x))[1];
		ctx.lineTo(xP, yP);

		ctx.stroke();
	}

	changeIsCalculating = (isCalculating) => {
		this.isCalculating = isCalculating;
		if (isCalculating){
			vectorPlane.isCalculatingLine = true;
			vectorPlane.renderLine = true;
			this.setState({findVectorText: "Stop visualizing the vector", findVectorButtonType: "danger"});

			// Set the calculating happening
			clearInterval(this.calculateInterval);
			this.calculateInterval = setInterval(() => {
				for (let i = 0; i < this.state.calculationsPerDraw; i++){
					for(let j = 0; j < vectorPlane.coefficients.length-1; j++)
						vectorPlane.calculateLine();
				}
				this.calculateFormula();
				this.draw(canvasContext);
			}, 20);
		}
		else {
			vectorPlane.isCalculatingLine = false;
			this.setState({findVectorText: "Visualize a "+this.state.vectorName+" vector", findVectorButtonType: "info"});
			clearInterval(this.calculateInterval);
		}
	}

	visualizeButtonHit = () => {
		if (vectorPlane.points.length > 0 && vectorPlane.selectedVectorID !== 0) {
			this.changeIsCalculating(!this.isCalculating);
		}
	}

	calculateFormula = () => {
		switch (vectorPlane.selectedVectorID) {
			case 1:
				let text = "";
				switch (vectorPlane.coefficients.length) {
					case 5:
						text += vectorPlane.coefficients[4].toFixed(4) + "x⁴+";
					case 4:
						text += vectorPlane.coefficients[3].toFixed(3) + "x³+";
					case 3:
						text += vectorPlane.coefficients[2].toFixed(3) + "x²+";
					case 2:
						text += vectorPlane.coefficients[1].toFixed(3) + "x+" + 
						vectorPlane.coefficients[0].toFixed(2);
						break;
				}
				return text;
		}
	}

	changeScale = (multiplyAmount, add) => {
		let newAmount = add ? vectorPlane.scale * multiplyAmount : vectorPlane.scale / multiplyAmount;
		if (newAmount > 40) {
			// scale from the center
			vectorPlane.xOrigin -= window.innerWidth/2;
			vectorPlane.yOrigin -= window.innerHeight/2;

			vectorPlane.xOrigin *= newAmount/vectorPlane.scale;
			vectorPlane.yOrigin *= newAmount/vectorPlane.scale;

			vectorPlane.xOrigin += window.innerWidth/2;
			vectorPlane.yOrigin += window.innerHeight/2;

			// Set the scale
			vectorPlane.scale = newAmount;

			this.draw(canvasContext);
		}
	}

	changeCalculatingAmount = (amount) => {
		this.setState({calculationsPerDraw: amount})
		if (this.isCalculating) {
			this.changeIsCalculating(true);
		}
	}

	changeVectorType = (vector) => {
		// Set the right coefficient amount if one function supports multiple amounts
		// Use the vectorPlane.selectedVectorID to set what algorythm to run
		this.changeIsCalculating(false);
		if (vectorPlane.points.length === 0) {
			this.setState({findVectorText: "Put 1 point to visualize"});
		} else this.setState({findVectorText: "Visualize a " + vector + " vector"});
		this.setState({calculateVectorText: "Calculate the vector",
			vectorName: vector})
		switch (vector) {
			case VECTORS.line:
				vectorPlane.selectedVectorID = 1;
				vectorPlane.coefficients = [0, 0];
				vectorPlane.learningRateMultiplier = 1;
				break;
			case VECTORS.power2:
				vectorPlane.selectedVectorID = 1;
				vectorPlane.coefficients = [0, 0, 0];
				vectorPlane.learningRateMultiplier = 1;
				break;
			case VECTORS.power3:
				vectorPlane.selectedVectorID = 1;
				vectorPlane.coefficients = [0, 0, 0, 0];
				vectorPlane.learningRateMultiplier = 2;
				break;
			case VECTORS.power4:
				vectorPlane.selectedVectorID = 1;
				vectorPlane.coefficients = [0, 0, 0, 0, 0];
				vectorPlane.learningRateMultiplier = 5;
				break;
			case VECTORS.power5:
				vectorPlane.selectedVectorID = 1;
				vectorPlane.coefficients = [0, 0, 0, 0, 0, 0];
				vectorPlane.learningRateMultiplier = 100;
				break;
		}
		this.calculateLearningRate();
		this.needDisabledButtons();
	}

	clearBoard = () => {
		vectorPlane.points = [];
		this.changeIsCalculating(false);
		this.disableLine();
		this.needDisabledButtons();
		
		this.draw(canvasContext);
	}
	disableLine = () => {
		vectorPlane.renderLine = false;
		this.changeIsCalculating(false);
	}
	regressTheVector = () => {
		let points = vectorPlane.points;
		let matrixA = zeros(vectorPlane.coefficients.length, vectorPlane.coefficients.length)
		let matrixB = zeros(1, vectorPlane.coefficients.length);
		let matAValues = []
		for (let i = 0; i < 2*vectorPlane.coefficients.length-1; i++) {
			matAValues[i] = 0;
			for (let j = 0; j < points.length; j++)
				matAValues[i] += Math.pow(points[j][0], i);
		}
		// Set the values to the matrix
		matrixA = matrixA.map(function(value, index) {
			return matAValues[index[0]+index[1]];
		});

		matrixB = matrixB.map(function(value, index, matrix){
			let newValue = 0;
			for (let i = 0; i < points.length; i++)
				newValue += points[i][1] * Math.pow(points[i][0], index[1]);
			return newValue
		});
		let matrixAT = this.matrix_invert(matrixA._data);

		// Multiply matrixAT and B
		let matrixC = multiply(matrixB, matrixAT);
		vectorPlane.renderLine = true;
		vectorPlane.coefficients = matrixC._data[0];
		
		this.draw(canvasContext);
		this.changeIsCalculating(false);
	}

	useBetterFormula = () => {
		this.setState({useBetterFormula: !this.state.useBetterFormula});
	}
	render() { 
		return (
			<React.Fragment>
				<TopBar 
					buttonDisabled={this.state.calculateButtonDisablbed}
					formula={this.state.formula}
					clearPoints={this.clearBoard}
					changeVectorType={this.changeVectorType}
					calculatingAmount={this.changeCalculatingAmount}
					calculateButtonHit={this.regressTheVector}
					visualizeButtonHit={this.visualizeButtonHit}
					findVectorButtonType={this.state.findVectorButtonType}
					findVectorText={this.state.findVectorText}
					calculateVectorText={this.state.calculateVectorText}
					progressBarValue={this.state.calculationsPerDraw}
					addScale={() => this.changeScale(1.3, true)}
					subtractScale={() => this.changeScale(1.3, false)}
					moreAccurateFormula={this.state.useBetterFormula}
					setMoreAccurateFormula={this.useBetterFormula}
					vectorName={this.state.vectorName}
					openOptions={() => this.setState({showOptionsMenu: true})}/>
				<PlaneCanvas 
					addDataPoint={this.addDataPoint}
					setCanvasContext={this.setCanvasContext}
					onCanvasDrag={this.onCanvasDrag}
					vectorPlane={vectorPlane}
					draw={this.draw}
					className="fullScreen" id="canvas"/>
				<OptionsMenu
					showMenu={this.state.showOptionsMenu}
					closeMenu={() => this.setState({showOptionsMenu: false})}
					dataPointSize={this.state.dataPointSize}
					setDataPointSize={amount => this.setState({dataPointSize: amount})}
					linePointSize={this.state.linePointSize}
					setLinePointSize={amount => this.setState({linePointSize: amount})}
					pointsInLine={this.state.pointsInLine}
					setPointsInLine={amount => this.setState({pointsInLine: amount})}
					/>
			</React.Fragment>
		);
	}

	
}
export default Controller;

// Handle the logic
class VectorPlane {

	// Other options
	selectedVectorID = 0;
	learningRate = 0.01;

	maxDistFromOrigin = 0;
	learningRateMultiplier = 1;

	renderLine = false;
	points = [];
	coefficients = [];

    constructor(xOrigin, yOrigin, scale) {
      this.xOrigin = xOrigin;
      this.yOrigin = yOrigin;
      this.scale = scale;
	}

	getPrediction(xPosition) {
  		let prediction = 0;
  		for (let i = 0; i < this.coefficients.length; i++) {
			prediction += this.coefficients[i] * Math.pow(xPosition, i);
		}
 		return prediction;
	}

	calculateLine() {
		// Array with zeros
		let corrections = Array.apply(null, new Array(this.coefficients.length)).map(Number.prototype.valueOf,0);

		for(let i = 0; i < this.points.length; i++) {
			let x = this.points[i][0];
			let y = this.points[i][1];
			
			let guess = this.getPrediction(x)
			let error = y - guess;

			// Add the values to the correction
			for (let i = 0; i < this.coefficients.length; i++)
				corrections[i] += error * Math.pow(x, i);
		}

		for (let i = 0; i < this.coefficients.length; i++)
				this.coefficients[i] += (corrections[i] * this.learningRate) / this.points.length;
	}
}