var React = require('react');

var Navigation = React.createClass({

  	getInitialState: function () {
  		return {
  			numberOfLinks : 0
  		}
  	},
  	getNumberOfLinks: function () {
  			// We want to know how many props "link" we have;
		var numberOfProps = Object.keys(this.props).lenght;
		//var numberOfLinks = 0;
		var newNumberOfLinks = 0; 
		var keys = Object.keys(this.props); // Array
		console.log(keys);
		for( var key in keys){
			if(keys[key].slice(0,4) == "link"){
				newNumberOfLinks ++; 
			}
		}
		this.setState({numberOfLinks: newNumberOfLinks});
		return this.state.numberOfLinks;
  	},
	render: function () {
	
		console.log('Nombre de links : ' + this.getNumberOfLinks);
		return <div>{this.getNumberOfLinks}</div>
	}
})

module.exports = Navigation; 