var React = require('react');
var $ = require('jquery');
var PrivateConfig = require('../../../dist/config/privateConfig');

var PictureOfTheDay = React.createClass({
	getInitialState: function () {
		return {
			data: {},
			urlType: ""
		}
	},

	componentWillMount: function () {
		var url = 'https://api.nasa.gov/planetary/apod?api_key=' + PrivateConfig.personnal_key;
		var that = this; 
		$.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (data) {
            	//console.log(data);
            	that.setState({data: data});
            	// We check if it is an video or an picture.
            	if(data.url.indexOf('youtube') > -1 ){
            		that.setState({urlType: "Video"});
            	}
            	else{
            		that.setState({urlType: "Picture"});
            	}
            	that.props.handleFooter(true);
            }
        });
	},

	displayMedia: function () {
		// We check ih the url in an youtube link, or an image link. 

		if(this.state.urlType.length > 0){
			switch (this.state.urlType) {
				case "Video":
					return (
							<div id="container-picture-pictureOfTheDay" className="col s12 m6">
								<iframe id="video-youtube" src={this.state.data.url} frameBorder="0" allowFullScreen></iframe>
							</div>
							)
					break;
				case "Picture":
					return (
							<div id="container-picture-pictureOfTheDay" className="col s12 m6">
								<img className="responsive-img" src={this.state.data.url} />
							</div>
							)
					break; 
				default:
					return (
							<div id="container-gif-pictureOfTheDay" className="col s12 m6">
								<img src="public/img/ring.gif" />
							</div>
							)
			}
		}
	},
	
	showTitle: function () {
		if(this.state.urlType){
			return(<h2 className="notranslate">{this.state.urlType} of the day</h2>);
		}
	},

	render: function () {
		return (
			<div className="container" id="PictureOfTheDay">
				<div className="row">
					<div className="col s12 m4">
						{this.showTitle()}
					</div>
				</div>
				<div className="row">
						{this.displayMedia()}
					
					<div className="col s12 m6">
						<h4 className="grey-text text-darken-4 title-content">{this.state.data.title}</h4>
					 	<blockquote className="explanation"><p>{this.state.data.explanation}</p></blockquote>
					</div> 
	      		</div>
      		</div>
			)	
	}
})

module.exports = PictureOfTheDay; 





  