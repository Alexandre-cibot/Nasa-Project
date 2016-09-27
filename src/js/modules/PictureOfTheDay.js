var React = require('react');
var $ = require('jquery');
var PrivateConfig = require('../../../dist/config/privateConfig');

var PictureOfTheDay = React.createClass({
	getInitialState: function () {
		return {
			data: {},
			translate: false,
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
	checkUrl: function () {
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
								<img className="responsive-img materialboxed" src={this.state.data.url} />
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
	buttonTranslate: function () {

		this.state.translate ? this.setState({translate: false}) : this.setState({translate: true});
	},
	showTranslate_DropDow: function () {
		if(this.state.translate){
			return(<div id="google_translate_element"></div>)
		}
		else{
			return(<div style={{display:"none"}} id="google_translate_element"></div>)
		}
	},
	showTitle: function () {
		if(this.state.urlType){
			return(<h2 className="notranslate">{this.state.urlType} of the day</h2>);
		}
	},
	showButtonTranslate: function () {
		if(this.state.data.explanation){
			return (<button className="waves-effect waves-light btn" onClick={this.buttonTranslate}>Translate</button>)
		}
	},
	createBlockImage: function () {
		return (
			<div className="container" id="PictureOfTheDay">
				<div className="row">
					<div className="col s12 m4">
						{this.showTitle()}
					</div>
				</div>
				<div className="row">
						{this.checkUrl()}
					
					<div className="col s12 m6">
						<h4 className="grey-text text-darken-4 title-content">{this.state.data.title}</h4>
					 	<blockquote className="explanation"><p>{this.state.data.explanation}</p></blockquote>
					 	<div id="traduction" className="row">
					 		<div className="col s6 m6">
					 			{this.showButtonTranslate()}
					 		</div>
					 		<div className="col s6 m6">
					 			{this.showTranslate_DropDow()}
					 			
					 		</div>
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





  