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
	checkUrl: function () {
		// We check ih the url in an youtube link, or an image link. 
		if(this.state.data.url){
			if(this.state.data.url.indexOf('youtube')){
				return (
						<div id="container-picture-pictureOfTheDay" className="col s12 m6">
							<iframe width="450" height="260" src={this.state.data.url} frameBorder="0" allowFullScreen></iframe>
						</div>
						)
			}
			else{
				return (
						<div id="container-picture-pictureOfTheDay" className="col s12 m6">
							<img className="responsive-img materialboxed" src={this.state.data.url} />
						</div>
						)
			}
		}
		else{
			return (
					<div id="container-gif-pictureOfTheDay" className="col s12 m6">
						<img src="public/img/ring.gif" />
					</div>
					)
		}
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
						{this.checkUrl()}
					
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





  