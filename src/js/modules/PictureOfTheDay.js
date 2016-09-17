var React = require('react');
var $ = require('jquery');

var PictureOfTheDay = React.createClass({
	getInitialState: function () {
		return {
			data: {}
		}
	},
	componentWillMount: function () {
		var urlTest = 'http://hiring.js-back.rd00/todo/list';
		var realUrl = 'https://api.nasa.gov/planetary/apod?api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX';
		//Demo url
		var url = 'https://api.nasa.gov/planetary/apod?api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX';
		var that = this; 
		$.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (data) {
            	//console.log(data);
            	that.setState({data: data});
            	that.props.handleFooter(true);
            }
        });
	},
	createBlockImage: function () {
		return (
			<div className="container" id="PictureOfTheDay">
				<div className="row">
					<div className="col s12 m4">
						<h2>Picture of the day</h2>
					</div>
				</div>
				<div className="row">
					<div className="col s12 m6">
						<img className="responsive-img materialboxed" src={this.state.data.url} />
					</div>
					<div className="col s12 m6">
						<h4 className="grey-text text-darken-4 title-content">{this.state.data.title}</h4>
					 	<blockquote className="explanation"><p>{this.state.data.explanation}</p></blockquote>
					</div>  
	      		</div>
      		</div>
			)	
	},
	render: function () {
		
		return this.createBlockImage();
	}
})

module.exports = PictureOfTheDay; 





  