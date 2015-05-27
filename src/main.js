var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');

THEME.labeledButtonStyle = new Style( { font: "20px", color:"white" } );

var whiteSL = new Skin({fill:"black", borders:{right:1}, stroke:"rgba(255, 255, 255, 0.3)"});
var whiteSR = new Skin({fill:"black", borders:{left:1}, stroke:"rgba(255, 255, 255, 0.3)"});
var whiteS = new Skin({fill:"black", height: 30});

var logoStyle = new Style( {font: "bold 20px", color: "#e74c3c"} );
var fieldStyle = new Style({ color: 'white', font: 'bold 30px'});
var fieldHintStyle = new Style({color: 'rgba(255, 255, 255, 0.9)', font:'bold 15px'});

var myRadioGroup = BUTTONS.RadioGroup.template(function($){ return{
	top:30, bottom:0, left:10, right:10,
	behavior: Object.create(BUTTONS.RadioGroupBehavior.prototype, {
		getSelectedName: { value: function(){
            if ("selectedName" in this) return this.selectedName; 
        }},
        onRadioButtonSelected: { value: function(buttonName){
            this.selectedName = buttonName;
            convert();
	}}})
}});

var radioGroup1 = new myRadioGroup({ buttonNames: "Celsius,Fahrenheit,Kelvin" });
var radioGroup2 = new myRadioGroup({ buttonNames: "Celsius,Fahrenheit,Kelvin" });

var field1 = Container.template(function($) { return { 
	width: 100, height: 60, contents: [
		Scroller($, { 
			left: 4, right: 4, top: 4, bottom: 4, active: true, name: 'scroller',
			behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
				Label($, { 
					left: 0, top: 0, bottom: 0, style: fieldStyle, anchor: 'NAME', name: 'textbox',
					editable: true, string: $.name,
				 	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
				 		onEdited: { value: function(label){
				 			var data = this.data;
				 			data.name = label.string;
				 			convert();
				 			label.container.hint.visible = ( data.name.length == 0 );
				 		}}
				 	})
				 }),
				 Label($, {
	 			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Enter value", name:"hint"
				 })
			]
		})
	]
}});

var field2 = Container.template(function($) { return { 
	width: 100, height: 60, contents: [
		Scroller($, { 
			left: 4, right: 4, top: 4, bottom: 4, active: true, name: 'scroller',
			behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
				Label($, { 
					left: 0, top: 0, bottom: 0, style: fieldStyle, anchor: 'NAME', name: 'textbox',
					editable: true, string: $.name,
				 	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
				 		onEdited: { value: function(label){
				 			var data = this.data;
				 			data.name = label.string;
				 		}}
				 	}),
				 })
			]
		})
	]
}});

var fieldL = new field1({name: ""});
var fieldR = new field2({name: ""});

function convert() {
	var type1 = radioGroup1.behavior.getSelectedName();
	var type2 = radioGroup2.behavior.getSelectedName();
	if (type1 == "Celsius") {
		var cInt = parseInt(fieldL.scroller.textbox.string);
		if (type2 == "Celsius") {
			fieldR.scroller.textbox.string = cInt;
		} else if (type2 == "Fahrenheit") {
			var fInt = cInt*1.8 + 32;
			fieldR.scroller.textbox.string = fInt.toFixed(2).toString();
		} else if (type2 == "Kelvin") {
			fieldR.scroller.textbox.string = cInt + 273.15;
		}
	} else if (type1 == "Fahrenheit") {
		var fInt = parseInt(fieldL.scroller.textbox.string);
		var cInt = (fInt - 32) / 1.8;
		if (type2 == "Celsius") {
			fieldR.scroller.textbox.string = cInt.toFixed(2).toString();
		} else if (type2 == "Fahrenheit") {
			fieldR.scroller.textbox.string = fInt;
		} else if (type2 == "Kelvin") {
			var kInt = cInt + 273.15;
			fieldR.scroller.textbox.string = kInt.toFixed(2);
		}
	} else if (type1 == "Kelvin") {
		var kInt = parseInt(fieldL.scroller.textbox.string);
		var cInt = kInt - 273.15;
		if (type2 == "Celsius") {
			fieldR.scroller.textbox.string = cInt;
		} else if (type2 == "Fahrenheit") {
			var fInt = cInt*1.8 + 32;
			fieldR.scroller.textbox.string = fInt.toFixed(2).toString();
		} else if (type2 == "Kelvin") {
			fieldR.scroller.textbox.string = kInt;
		}
	}
}


var MainCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, active: true,
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
				new Line({left:0, right:0, top:0, bottom:0, height: 30, skin: whiteS,
					contents:[
						new Column({left:0, right:0, top:0, bottom:0, skin: whiteSL, 
							contents:[
								new Label({top: 50, string: "THERMOVERT", style: logoStyle})
							]
						})
					]
				}),
				new Line({left:0, right:0, top:0, bottom:0, skin: whiteS,
					contents:[
						new Column({left:0, right:0, top:30, bottom:30, skin: whiteSL, contents:[fieldL]}),
						new Column({left:0, right:0, top:30, bottom:30, skin: whiteSR, contents:[fieldR]})
					]
				}),
				new Line({left:0, right:0, top:0, bottom:0, skin: whiteS,
					contents: [
						new Line({ left:0, right:0, top:0, bottom:0, contents:[ radioGroup1 ] }),
						new Line({ left:0, right:0, top:0, bottom:0, contents: [ radioGroup2 ] })
					]
				})
			]
		})
	]
}});

var main = new MainCon();

application.add(main);