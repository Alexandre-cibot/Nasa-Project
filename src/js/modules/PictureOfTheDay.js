var React = require('react');
var $ = require('jquery');
var PrivateConfig = require('../config/privateConfig');

var PictureOfTheDay = React.createClass({
	getInitialState: function () {
		return {
			data: {},
			translate: false,
			urlType: ""
		}
	},
	componentWillMount: function () {
		var url = 'https://api.nasa.gov/planetary/apod?api_key=' + PrivateConfig.personnal_key; // Change "PrivateConfig.personnal_key" by YOUR personnal key that you can get free here https://api.nasa.gov/index.html#live_example
		var that = this; 
		$.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (data) {
            	//console.log(data);
            	that.setState({data: data});
            	data.url.indexOf('youtube') ? that.setState({urlType: "Video"}) : that.setState({urlType: "Picture"});
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
							<iframe id="video-youtube" src={this.state.data.url} frameBorder="0" allowFullScreen></iframe>
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
	buttonTranslate: function () {

		this.state.translate ? this.setState({translate: false}) : this.setState({translate: true});
	},
	showTranslate_DropDow: function () {
		if(this.state.translate){
			console.log('on affiche');
			return(<div id="google_translate_element"></div>)
		}
		else{
			console.log('On afficge aps')
			return(<div style={{display:"none"}} id="google_translate_element"></div>)
		}
	},
	createBlockImage: function () {
		console.log(PrivateConfig);
		return (
			<div className="container" id="PictureOfTheDay">
				<div className="row">
					<div className="col s12 m4">
						<h2 className="notranslate">{this.state.urlType} of the day</h2>
					</div>
				</div>
				<div className="row">
						{this.checkUrl()}
					
					<div className="col s12 m6">
						<h4 className="grey-text text-darken-4 title-content">{this.state.data.title}</h4>
					 	<blockquote className="explanation"><p>{this.state.data.explanation}</p></blockquote>
					 	<div id="traduction" className="row">
					 		<div className="col s6 m6">
					 			<button className="waves-effect waves-light btn" onClick={this.buttonTranslate}>Translate</button>
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





  