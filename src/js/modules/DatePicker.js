var React = require('react');

var DatePicker = React.createClass(
	{
		getInitialState: function () {
			return {
				date: null
			}
		},
		initDatePicker: function (element) {
			  $(element).pickadate({
			    selectMonths: true, // Creates a dropdown to control month
			    selectYears: 15 // Creates a dropdown of 15 years to control year
			  });
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
			if(content.length !== 0 ){
				var newDate = this.dateFormatAPI(content);
				console.log(newDate);
				this.props.handleChangeDate(newDate);
			}
			else{
				alert('Veuillez entrer une date'); 
			}
		},
		render: function () {
			return(
				<div>
					<input id="input-date" type="date" className="datepicker" placeholder='Click to find a date' ref={this.initDatePicker}/>
					<div className="row">
						<button className="waves-effect waves-light btn" onClick={this.handleClick}>Search</button>
					</div>
				</div>
			);
		}
	}
)

module.exports = DatePicker; 