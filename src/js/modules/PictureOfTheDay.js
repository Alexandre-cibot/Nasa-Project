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
            }
        });
	},

	handleShowModal(){
        this.setState({showModal: true})
    },

	createBlockImage: function () {
	
		return (
			  <div className="row">
      			<div className="col s4 push-s4">
      			<h2>Picture of the day</h2>
      				<div className="card" id='PictureOfTheDay'>
					    <div className="card-image waves-effect waves-block waves-light">
					      <img className="activator" src={this.state.data.url} />
					    </div>
					    <div className="card-content">
					      <span className="card-title activator grey-text text-darken-4">{this.state.data.title}<i className="material-icons right">more_vert</i></span>
					      <p>By {this.state.data.copyright}</p>
					      <br />
					      <p><a href="#" className="activator">More infos ..</a></p>
					    </div>
					    <div className="card-reveal">
					      <span className="card-title grey-text text-darken-4">{this.state.data.title}<i className="material-icons right">close</i></span>
					      <p>{this.state.data.explanation}</p>
					    </div>
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





  