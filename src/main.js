var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');

var fieldStyle = new Style({ color: 'rgba(255, 255, 255, 1.0)', font: '70px'});
var temptype = new Style({ color: 'rgba(255, 255, 255, 0.5)', font: '100px'});
var whiteS = new Skin({fill:"white"});

var celsiusS = new Skin({fill:"#e67e22"});
var fahrenheitS = new Skin({fill:"#f1c40f"});
var kelvinS = new Skin({fill:"#e74c3c"});

var labelStyle = new Style( { font:"50px", color:"white"} );
							
var celsiusField = Container.template(function($) { return { 
	width: 300, height: 100, contents: [
		Scroller($, { 
			left: 4, right: 4, top: 4, bottom: 4, active: true, name: 'scroller',
			behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
				Label($, { 
					left: 20, top: 0, bottom: 0, style: fieldStyle, anchor: 'NAME', name: 'textbox',
					editable: true, string: $.name,
				 	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
				 		onEdited: { value: function(label){
				 			var data = this.data;
							var cInt = parseInt(label.string);
							var fInt = (cInt - 32) / 1.8;
							var kInt = cInt + 273.15;
							fahrenheit.scroller.textbox.string = fInt.toFixed(2);
							kelvin.scroller.textbox.string = kInt.toFixed(2);
				 		}}
				 	}),
				 }),
				 Label($, { left:230, height: 70, style:temptype, string: "C" })
			]
		})
	]
}});

var fahrenheitField = Container.template(function($) { return { 
	width: 300, height: 100, contents: [
		Scroller($, { 
			left: 4, right: 4, top: 4, bottom: 4, active: true, name: 'scroller',
			behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
				Label($, { 
					left: 20, top: 0, bottom: 0, style: fieldStyle, anchor: 'NAME', name: 'textbox',
					editable: true, string: $.name,
				 	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
				 		onEdited: { value: function(label){
				 			var data = this.data;
							var fInt = parseInt(label.string);
							var cInt = fInt*1.8 + 32
							var kInt = cInt + 273.15;
							celsius.scroller.textbox.string = cInt.toFixed(2);
							kelvin.scroller.textbox.string = kInt.toFixed(2);
				 		}}
				 	}),
				 }),
				 Label($, { left:230, height: 100, style: temptype, string: "F" })
			]
		})
	]
}});

var kelvinField = Container.template(function($) { return { 
	width: 300, height: 100, contents: [
		Scroller($, { 
			left: 4, right: 4, top: 4, bottom: 4, active: true, name: 'scroller',
			behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
				Label($, { 
					left: 20, top: 0, bottom: 0, style: fieldStyle, anchor: 'NAME', name: 'textbox',
					editable: true, string: $.name,
				 	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
				 		onEdited: { value: function(label){
				 			var data = this.data;
							var kInt = parseInt(label.string);
							var cInt = kInt - 273.15;
							var fInt = (cInt - 32) / 1.8;
							celsius.scroller.textbox.string = cInt.toFixed(2);
							fahrenheit.scroller.textbox.string = fInt.toFixed(2);
				 		}}
				 	}),
				 }),
				 Label($, { left:230, height: 100, style: temptype, string: "K" })
			]
		})
	]
}});

var celsius = new celsiusField({name: "25"});
var fahrenheit = new fahrenheitField({name: ""});
var kelvin = new kelvinField({name: ""});


var MainCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteS, active: true,
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
		}}
	}), 
	contents: [
		new Column({
			left:0, right:0, top:0, bottom:0,
			contents: [
				new Line({left:0, right:0, top:0, bottom:0, skin: celsiusS, contents:[celsius]}),
				new Line({left:0, right:0, top:0, bottom:0, skin: fahrenheitS, contents:[fahrenheit]}),
				new Line({left:0, right:0, top:0, bottom:0, skin: kelvinS, contents:[kelvin]})
			]
		})
	]
}});

var main = new MainCon();

application.add(main);