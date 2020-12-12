(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[0],{61:function(e,t,n){e.exports=n(81)},80:function(e,t){},81:function(e,t,n){"use strict";n.r(t);var a,i,r=n(0),o=n.n(r),c=n(18),l=n.n(c),s=(n(66),n(67),n(21)),u=n(19),f=n(26),h=n(24),d="#ecf0f1",p="#bdc3c7",g="#2c3e50",v="#f39c12",m="#16a085",b="#d35400",w="#16a085",O="Linear",S="Quadratic",y="Cubic",x="Quartic",T="Quintic",C=n(92),P=n(58),V=n(91),E=n(89),D=n(38),k=n.n(D),I=n(52),j=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))).state={dropDownTitle:"Select a vector"},e}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return o.a.createElement(C.a,{style:{background:v},expand:"lg",sticky:"top"},o.a.createElement(C.a.Brand,{className:"ml-2"},"Find a vector"),o.a.createElement(P.a,{onClick:this.props.clearPoints,variant:"info",style:{background:m},className:"ml-3"},"Clear the board"),o.a.createElement(P.a,{onClick:this.props.openOptions,variant:"info",style:{background:m},className:"ml-3"},"Options"),o.a.createElement(V.a,null,o.a.createElement(E.a,{className:"ml-3",title:this.props.vectorName?this.props.vectorName:"Select a vector",id:"basic-nav-dropdown"},o.a.createElement(E.a.Item,{onClick:function(){return e.props.changeVectorType(O)}},O),o.a.createElement(E.a.Item,{onClick:function(){return e.props.changeVectorType(S)}},S),o.a.createElement(E.a.Item,{onClick:function(){return e.props.changeVectorType(y)}},y),o.a.createElement(E.a.Item,{onClick:function(){return e.props.changeVectorType(x)}},x))),o.a.createElement(P.a,{disabled:"Select a vector type"===this.props.findVectorText||"Put 1 point to visualize"===this.props.findVectorText,onClick:this.props.visualizeButtonHit,variant:this.props.findVectorButtonType,style:{background:m},className:"ml-3"},this.props.findVectorText),o.a.createElement(P.a,{disabled:this.props.buttonDisabled,onClick:this.props.calculateButtonHit,variant:"info",style:{background:m},className:"ml-3"},this.props.calculateVectorText),o.a.createElement(C.a.Brand,{className:"ml-3"},"Speed:"),o.a.createElement(k.a,{min:1,max:60,tooltip:"off",value:this.props.progressBarValue,onChange:function(t){return e.props.calculatingAmount(t.target.value)}}),o.a.createElement(I.a,null),o.a.createElement(P.a,{variant:"info",style:{background:m},className:"ml-3",onClick:this.props.setMoreAccurateFormula},this.props.moreAccurateFormula?"Less accurate formula":"More accurate formula"),o.a.createElement(P.a,{onClick:this.props.addScale,variant:"info",style:{background:m},className:"ml-3"},"+"),o.a.createElement(P.a,{onClick:this.props.subtractScale,variant:"info",style:{background:m},className:"ml-3"},"-"))}}]),n}(r.Component),B=n(10),z=n(59),M=function(e,t){var n=Object(r.useRef)(null),a=Object(r.useState)(window.innerWidth),i=Object(B.a)(a,2),o=(i[0],i[1]),c=Object(r.useState)(window.innerHeight),l=Object(B.a)(c,2),s=(l[0],l[1]),u=function(){o(window.innerWidth),s(window.innerHeight)};return Object(r.useEffect)((function(){var a=n.current,i=a.getContext("2d");return t(i),a.width=window.innerWidth,a.height=window.innerHeight,a.style.left="0px",a.style.top="0px",a.style.position="absolute",e(i),window.addEventListener("resize",u),function(){return window.removeEventListener("resize",u)}})),n},L=function(e){var t=e.setCanvasContext,n=e.onCanvasDrag,a=e.addDataPoint,i=e.draw,c=(e.vectorPlane,Object(z.a)(e,["setCanvasContext","onCanvasDrag","addDataPoint","draw","vectorPlane"])),l=M(i,t),s=Object(r.useState)(!1),u=Object(B.a)(s,2),f=u[0],h=u[1],d=Object(r.useState)(!1),p=Object(B.a)(d,2),g=p[0],v=p[1],m=Object(r.useState)(0),b=Object(B.a)(m,2),w=b[0],O=b[1],S=Object(r.useState)(0),y=Object(B.a)(S,2),x=y[0],T=y[1];return o.a.createElement("canvas",Object.assign({onTouchStart:function(e){h(!0),v(!1);var t=e.touches[0];O(t.clientX),T(t.clientY)},onTouchEnd:function(e){h(!1),g||a(w,x)},onTouchMove:function(e){v(!0);var t=e.touches[0],a=w-t.clientX,i=x-t.clientY;O(t.clientX),T(t.clientY),n(a,i)},onMouseMove:function(e){var t=e.nativeEvent;if(f){v(!0);var a=t.offsetX,i=t.offsetY,r=w-a,o=x-i;O(a),T(i),n(r,o)}},onMouseDown:function(e){var t=e.nativeEvent;h(!0),v(!1);var n=t.offsetX,a=t.offsetY;O(n),T(a)},onMouseUp:function(e){var t=e.nativeEvent;if(h(!1),!g){var n=t.offsetX,i=t.offsetY;a(n,i)}},ref:l},c))},F=n(88),N=n(90),H=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return o.a.createElement(N.a,{show:this.props.showMenu,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,onHide:this.props.closeMenu},o.a.createElement(N.a.Header,{closeButton:!0},o.a.createElement(N.a.Title,{id:"contained-modal-title-vcenter"},"Options")),o.a.createElement(N.a.Body,null,o.a.createElement("h4",null,"Lines in the vector"),o.a.createElement("p",null,"How many lines are rendered to form the vector"),o.a.createElement("div",null,this.props.pointsInLine,o.a.createElement(k.a,{min:10,max:200,tooltip:"off",value:this.props.pointsInLine,onChange:function(t){return e.props.setPointsInLine(t.target.value)}})),o.a.createElement("h4",null,"Sizes"),o.a.createElement("p",null,"Data point sizes"),o.a.createElement("div",null,this.props.dataPointSize,o.a.createElement(k.a,{min:5,max:30,tooltip:"off",value:this.props.dataPointSize,onChange:function(t){return e.props.setDataPointSize(t.target.value)}})),o.a.createElement("p",null,"Vector size"),o.a.createElement("div",null,this.props.linePointSize,o.a.createElement(k.a,{min:1,max:20,tooltip:"off",value:this.props.linePointSize,onChange:function(t){return e.props.setLinePointSize(t.target.value)}}))),o.a.createElement(N.a.Footer,null,o.a.createElement(P.a,{variant:"info",onClick:this.props.closeMenu},"Close")))}}]),n}(r.Component),R=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(s.a)(this,n),(e=t.call(this)).isCalculating=!1,e.selectedVector="",e.state={calculateButtonDisablbed:!0,calculationsPerDraw:1,vectorName:"",findVectorText:"Select a vector type",findVectorButtonType:"info",calculateVectorText:"Select a vector type",useBetterFormula:!1,showOptionsMenu:!1,dataPointSize:7,linePointSize:5,pointsInLine:100},e.screenToPlane=function(e,t){var n=e-a.xOrigin,i=t-a.yOrigin;return[n/a.scale,i/-a.scale]},e.planeToScreen=function(e,t){var n=e*a.scale,i=t*-a.scale;return[a.xOrigin+n,a.yOrigin+i]},e.addDataPoint=function(t,n){0===a.points.length&&e.setState({findVectorText:"Visualize a "+e.state.vectorName+" vector"});var r=e.screenToPlane(t,n);a.points.push([r[0],r[1]]);var o=Math.sqrt(Math.pow(r[0],2)+Math.pow(r[1],2));o>a.maxDistFromOrigin&&(a.maxDistFromOrigin=o,e.calculateLearningRate()),i.beginPath(),i.fillStyle=b,i.arc(t,n,e.state.dataPointSize,0,2*Math.PI),i.fill(),e.needDisabledButtons()},e.calculateLearningRate=function(){a.learningRate=1/Math.pow(a.learningRateMultiplier*a.maxDistFromOrigin,a.coefficients.length-1)*.01},e.onCanvasDrag=function(t,n){a.xOrigin-=t,a.yOrigin-=n,e.draw(i)},e.setValues=function(e,t,n){a.xOrigin=e,a.yOrigin=t,a.scale=n},e.draw=function(t){t.lineWidth=1,t.fillStyle=d,t.beginPath(),t.fillRect(0,0,t.canvas.width,t.canvas.height),t.fill(),t.beginPath(),t.strokeStyle=p;for(var n=a.xOrigin%a.scale,i=n;i<t.canvas.width;i+=a.scale)t.moveTo(i,0),t.lineTo(i,t.canvas.height);for(var r=n=a.yOrigin%a.scale;r<t.canvas.height;r+=a.scale)t.moveTo(0,r),t.lineTo(t.canvas.width,r);if(t.stroke(),t.beginPath(),t.strokeStyle=g,t.moveTo(0,a.yOrigin),t.lineTo(t.canvas.width,a.yOrigin),t.moveTo(a.xOrigin,0),t.lineTo(a.xOrigin,t.canvas.height),t.stroke(),a.renderLine&&e.drawLine(t),e.drawDataPoints(t),0!=a.selectedVectorID)if(t.font="30px Arial",t.fillStyle=g,e.state.useBetterFormula){var o=["a","b","c","d","e"],c="",l=0;switch(a.coefficients.length){case 5:c+=o[l]+"x\u2074+",l++;case 4:c+=o[l]+"x\xb3+",l++;case 3:c+=o[l]+"x\xb2+",l++;case 2:c+=o[l]+"x+"+o[l+1]}t.fillText(c,30,window.innerHeight-30*(a.coefficients.length+1.5));for(var s=0;s<a.coefficients.length;s++)t.fillText(o[a.coefficients.length-s-1]+" = "+a.coefficients[s].toFixed(8),30,window.innerHeight-30*(s+1))}else t.fillText(e.calculateFormula(),30,window.innerHeight-30)},e.drawDataPoints=function(t){t.beginPath(),t.fillStyle=b;for(var n=0;n<a.points.length;n++){var i=e.planeToScreen(a.points[n][0],a.points[n][1]);t.moveTo(i[0],i[1]),t.arc(i[0],i[1],e.state.dataPointSize,0,2*Math.PI)}t.fill()},e.drawLine=function(t){t.beginPath(),t.lineWidth=e.state.linePointSize,t.strokeStyle=w;for(var n=0;n<e.state.pointsInLine;n++){var i=window.innerWidth*(n/e.state.pointsInLine),r=e.screenToPlane(i,0)[0],o=a.getPrediction(r),c=e.planeToScreen(0,o)[1];t.lineTo(i,c)}var l=window.innerWidth,s=e.screenToPlane(l,0)[0],u=e.planeToScreen(0,a.getPrediction(s))[1];t.lineTo(l,u),t.stroke()},e.changeIsCalculating=function(t){e.isCalculating=t,t?(a.isCalculatingLine=!0,a.renderLine=!0,e.setState({findVectorText:"Stop visualizing the vector",findVectorButtonType:"danger"}),clearInterval(e.calculateInterval),e.calculateInterval=setInterval((function(){for(var t=0;t<e.state.calculationsPerDraw;t++)for(var n=0;n<a.coefficients.length-1;n++)a.calculateLine();e.calculateFormula(),e.draw(i)}),20)):(a.isCalculatingLine=!1,e.setState({findVectorText:"Visualize a "+e.state.vectorName+" vector",findVectorButtonType:"info"}),clearInterval(e.calculateInterval))},e.visualizeButtonHit=function(){a.points.length>0&&0!==a.selectedVectorID&&e.changeIsCalculating(!e.isCalculating)},e.calculateFormula=function(){switch(a.selectedVectorID){case 1:var e="";switch(a.coefficients.length){case 5:e+=a.coefficients[4].toFixed(4)+"x\u2074+";case 4:e+=a.coefficients[3].toFixed(3)+"x\xb3+";case 3:e+=a.coefficients[2].toFixed(3)+"x\xb2+";case 2:e+=a.coefficients[1].toFixed(3)+"x+"+a.coefficients[0].toFixed(2)}return e}},e.changeScale=function(t,n){var r=n?a.scale*t:a.scale/t;r>40&&(a.xOrigin-=window.innerWidth/2,a.yOrigin-=window.innerHeight/2,a.xOrigin*=r/a.scale,a.yOrigin*=r/a.scale,a.xOrigin+=window.innerWidth/2,a.yOrigin+=window.innerHeight/2,a.scale=r,e.draw(i))},e.changeCalculatingAmount=function(t){e.setState({calculationsPerDraw:t}),e.isCalculating&&e.changeIsCalculating(!0)},e.changeVectorType=function(t){switch(e.changeIsCalculating(!1),0===a.points.length?e.setState({findVectorText:"Put 1 point to visualize"}):e.setState({findVectorText:"Visualize a "+t+" vector"}),e.setState({calculateVectorText:"Calculate the vector",vectorName:t}),t){case O:a.selectedVectorID=1,a.coefficients=[0,0],a.learningRateMultiplier=1;break;case S:a.selectedVectorID=1,a.coefficients=[0,0,0],a.learningRateMultiplier=1;break;case y:a.selectedVectorID=1,a.coefficients=[0,0,0,0],a.learningRateMultiplier=2;break;case x:a.selectedVectorID=1,a.coefficients=[0,0,0,0,0],a.learningRateMultiplier=5;break;case T:a.selectedVectorID=1,a.coefficients=[0,0,0,0,0,0],a.learningRateMultiplier=100}e.calculateLearningRate(),e.needDisabledButtons()},e.clearBoard=function(){a.points=[],e.changeIsCalculating(!1),e.disableLine(),e.needDisabledButtons(),e.draw(i)},e.disableLine=function(){a.renderLine=!1,e.changeIsCalculating(!1)},e.regressTheVector=function(){for(var t=a.points,n=Object(F.b)(a.coefficients.length,a.coefficients.length),r=Object(F.b)(1,a.coefficients.length),o=[],c=0;c<2*a.coefficients.length-1;c++){o[c]=0;for(var l=0;l<t.length;l++)o[c]+=Math.pow(t[l][0],c)}n=n.map((function(e,t){return o[t[0]+t[1]]})),r=r.map((function(e,n,a){for(var i=0,r=0;r<t.length;r++)i+=t[r][1]*Math.pow(t[r][0],n[1]);return i}));var s=e.matrix_invert(n._data),u=Object(F.a)(r,s);a.renderLine=!0,a.coefficients=u._data[0],e.draw(i),e.changeIsCalculating(!1)},e.useBetterFormula=function(){e.setState({useBetterFormula:!e.state.useBetterFormula})},a=new A(window.innerWidth/2,window.innerHeight/2,60),e}return Object(u.a)(n,[{key:"matrix_invert",value:function(e){if(e.length===e[0].length){var t=0,n=0,a=0,i=e.length,r=0,o=[],c=[];for(t=0;t<i;t+=1)for(o[o.length]=[],c[c.length]=[],a=0;a<i;a+=1)o[t][a]=t===a?1:0,c[t][a]=e[t][a];for(t=0;t<i;t+=1){if(0===(r=c[t][t])){for(n=t+1;n<i;n+=1)if(0!==c[n][t]){for(a=0;a<i;a++)r=c[t][a],c[t][a]=c[n][a],c[n][a]=r,r=o[t][a],o[t][a]=o[n][a],o[n][a]=r;break}if(0===(r=c[t][t]))return}for(a=0;a<i;a++)c[t][a]=c[t][a]/r,o[t][a]=o[t][a]/r;for(n=0;n<i;n++)if(n!==t)for(r=c[n][t],a=0;a<i;a++)c[n][a]-=r*c[t][a],o[n][a]-=r*o[t][a]}return o}}},{key:"setCanvasContext",value:function(e){"undefined"===typeof i&&(i=e)}}]),Object(u.a)(n,[{key:"needDisabledButtons",value:function(){a.points.length>=a.coefficients.length&&0!==a.selectedVectorID?this.setState({calculateButtonDisablbed:!1,calculateVectorText:"Calculate the vector"}):0!==a.selectedVectorID&&(this.setState({calculateButtonDisablbed:!0}),a.points.length<a.coefficients.length&&this.setState({calculateVectorText:"Put "+(a.coefficients.length-a.points.length)+" more point"+(a.coefficients.length-a.points.length===1?"":"s")}))}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement(j,{buttonDisabled:this.state.calculateButtonDisablbed,formula:this.state.formula,clearPoints:this.clearBoard,changeVectorType:this.changeVectorType,calculatingAmount:this.changeCalculatingAmount,calculateButtonHit:this.regressTheVector,visualizeButtonHit:this.visualizeButtonHit,findVectorButtonType:this.state.findVectorButtonType,findVectorText:this.state.findVectorText,calculateVectorText:this.state.calculateVectorText,progressBarValue:this.state.calculationsPerDraw,addScale:function(){return e.changeScale(1.3,!0)},subtractScale:function(){return e.changeScale(1.3,!1)},moreAccurateFormula:this.state.useBetterFormula,setMoreAccurateFormula:this.useBetterFormula,vectorName:this.state.vectorName,openOptions:function(){return e.setState({showOptionsMenu:!0})}}),o.a.createElement(L,{addDataPoint:this.addDataPoint,setCanvasContext:this.setCanvasContext,onCanvasDrag:this.onCanvasDrag,vectorPlane:a,draw:this.draw,className:"fullScreen",id:"canvas"}),o.a.createElement(H,{showMenu:this.state.showOptionsMenu,closeMenu:function(){return e.setState({showOptionsMenu:!1})},dataPointSize:this.state.dataPointSize,setDataPointSize:function(t){return e.setState({dataPointSize:t})},linePointSize:this.state.linePointSize,setLinePointSize:function(t){return e.setState({linePointSize:t})},pointsInLine:this.state.pointsInLine,setPointsInLine:function(t){return e.setState({pointsInLine:t})}}))}}]),n}(r.Component),A=function(){function e(t,n,a){Object(s.a)(this,e),this.selectedVectorID=0,this.learningRate=.01,this.maxDistFromOrigin=0,this.learningRateMultiplier=1,this.renderLine=!1,this.points=[],this.coefficients=[],this.xOrigin=t,this.yOrigin=n,this.scale=a}return Object(u.a)(e,[{key:"getPrediction",value:function(e){for(var t=0,n=0;n<this.coefficients.length;n++)t+=this.coefficients[n]*Math.pow(e,n);return t}},{key:"calculateLine",value:function(){for(var e=Array.apply(null,new Array(this.coefficients.length)).map(Number.prototype.valueOf,0),t=0;t<this.points.length;t++)for(var n=this.points[t][0],a=this.points[t][1]-this.getPrediction(n),i=0;i<this.coefficients.length;i++)e[i]+=a*Math.pow(n,i);for(var r=0;r<this.coefficients.length;r++)this.coefficients[r]+=e[r]*this.learningRate/this.points.length}}]),e}(),W=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return o.a.createElement(R,null)}}]),n}(r.Component);l.a.render(o.a.createElement(W,null),document.getElementById("root"))}},[[61,1,2]]]);
//# sourceMappingURL=main.f30f9c97.chunk.js.map