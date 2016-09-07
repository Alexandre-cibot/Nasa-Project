var React = require('react');
var ReactDOM = require('react-dom');
var DatePicker = React.createClass(
	{
		getInitialState: function () {
			return {
				date: null,
				picsNumber: this.props.picsNumber
			}
		},
		initDatePicker: function (element) {
			  $(element).pickadate({
			  	firstDay: 1,
			    selectMonths: true, // Creates a dropdown to control month
			    selectYears: 5, // Creates a dropdown of 5 years to control year
			    max: new Date(this.props.max_date),
			    min: new Date(2012,(8-1), 6) // Rover's landing date. There is no picture before.
			  });
			  console.log(this.props.max_date + ' init datePicker')
		},
		dateFormatAPI: function (date) { 
			//The date that we inital have is format like : 30 May, 1992
			//We need to have this format : 1992-05-30

			//function to find a key associate to a value's object
			this.props.months.getKeyByValue = function( value ) {
				    for( var prop in this ) {
				        if( this.hasOwnProperty( prop ) ) {
				             if( this[ prop ] === value )
				                 return prop;
				        }
				    }
			};
			date = date.split(' '); 
			// We replace the full name of the mounth bu a number, but before, lets remove the coma ! 
			date[1] = date[1].substr(0, date[1].length -1);
			date[1] = this.props.months.getKeyByValue(date[1]);
			var newDate = date[2] + "-" + date[1] + "-" + date[0];
			//console.log(newDate);
			return newDate; 
		},

		handleClick: function () {
			var content = $('#input-date').val(); 
			var numberOfPics = $('#dropdown').val();
			if(content.length !== 0 ){
				var newDate = this.dateFormatAPI(content);
				console.log(newDate);
				this.props.changeDate(newDate);
				this.props.changePicsNumber(numberOfPics);
				this.props.launchCards();
			}
			else{
				alert('Veuillez entrer une date'); 
			}
		},
		definePicsNumber: function () {
			let options = [];
			let maxPics = this.props.maxPics;
				//We create 5 option, 10 to 50. 
				for(let i = 10; i <= 20; i+=10){
				    options.push(<option key={i} value={i}>{i}</option>);
				}
				options.push(<option key={maxPics} value={maxPics}>{maxPics}</option>)
				return (
					 <select id="dropdown" defaultValue={this.state.picsNumber}>
				        <option disabled>Number of pictures displayed</option>
				        {options}
				     </select>
				)
		},
		componentDidMount: function () {
			  var element = ReactDOM.findDOMNode(this.refs.dropdown)

			  $(element).ready(function() {
			    $('select').material_select();
			  });
		},

		render: function () {
			console.log('return DatePicker: max_date = ' + this.props.max_date);
			return(
				<div>
					<input id="input-date" type="text" className="datepicker" defaultValue={this.props.dateFormatFR(this.props.currentDate)} ref={this.initDatePicker}  />
					<div className="row">
					{/* Number of pictures displayed */}
					{this.definePicsNumber()}
					 
     
					</div>
					<div className="row">
						<button className="waves-effect waves-light btn" onClick={this.handleClick}>Search</button>
					</div>
				</div>
			);
		}
	}
)

module.exports = DatePicker; 