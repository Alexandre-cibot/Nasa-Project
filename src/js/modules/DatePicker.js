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
		handleSubmit: function () {
			console.log('');
		},
		render: function () {
			return(
				<input type="date" className="datepicker" placeholder='Rechercher par date ...' ref={this.initDatePicker}/>
			);
		}
	}
)

module.exports = DatePicker; 