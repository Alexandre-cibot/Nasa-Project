var React = require('react');
var DatePicker = require('./DatePicker');

//TODO : Il faudra bien entendu rendre la requete Dynamique, afin que les photos ne soient pas toujours les mêmes.
var Cards= React.createClass(
	{
		getInitialState: function () {
			return {
				data : {},
				showImages: false,
				failJSON: false,
				cardsArray: [],
				earth_date_chosen: this.props.earth_date_chosen,
				max_date: this.props.max_date,
				picsNumber: this.props.picsNumber
			}
		},		
		componentWillMount: function () {
			//We make a new request when the user change the Date. 
				var that = this; 
				 $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + this.state.earth_date_chosen + "&api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX", function(result){
				 	that.setState({data: result});
				 	
				 	if(that.state.failJSON == true){
				 		that.setState({failJSON: false})
				 	}
	             	that.setState({showImages: true}); 	
				})
				 .fail(function(){
				 	// ex: 9 june 2014, there is no pictures for that day. 	
				 	that.setState({failJSON: true});
				 });
		},
		componentWillReceiveProps: function(nextProps) {
			//If the date has changed
			this.state.showImages ? this.setState({showImages : false}) : null // on change, the "load" gif has to be displayed
			if(nextProps.earth_date_chosen !== this.state.earth_date_chosen){
				let that = this; 
				 $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + nextProps.earth_date_chosen  + "&api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX", function(result){
				 	that.setState({data: result});
				 	
				 	if(that.state.failJSON == true){
				 		that.setState({failJSON: false})
				 	}
	             	that.setState({showImages: true});
	             	that.setState({earth_date_chosen: nextProps.earth_date_chosen })
	             	that.setState({picsNumber: nextProps.picsNumber})
				 	
				}).fail(function(){
				 	// ex: 9 june 2014, there is no pictures for that day. 	
				 	that.setState({showImages: false})
				 	that.setState({failJSON: true});
				 });
			}
			else if(nextProps.picsNumber !== this.state.picsNumber){
				this.setState({picsNumber: nextProps.picsNumber});
			}
		},
		handleJSONFailed: function (){
			console.log('Impossible to reach data, because they doesn\'t exist yet');
				return (
					<div className="failJSON">
						<img src="public/img/alien.gif"/>
						<p>I'm affraid, there is no photos at this date.</p>
						<h3>Try Again</h3>
					</div>
				)
		},
		generateCards: function () {
			// We generate as many cards as we need. With a limit of 100. (to be sure)
			var cards = [];
			var cardsLimit = function (numberOfPhotos, limit) {
				// Return the number of photos, width a maximum limit
				return numberOfPhotos <= limit ?  numberOfPhotos : limit; 
			};

			for(var i = 0; i < cardsLimit(this.state.data.photos.length, this.state.picsNumber); i++){
				cards.push(
					<div className="col m2" key={i}>
							<div className="card">
								<div className="card-image waves-light">
									<img className="materialboxed" src={this.state.data.photos[i].img_src} ref={this.initMaterialBox}/>
								</div>
								<div className="card-content">
									<span className="card-title activator grey-text text-darken-4"> N° {i + 1}<i className="material-icons right">more_vert</i></span>
									<p>Date : {this.props.dateFormatFR(this.state.data.photos[i].earth_date)}</p>
									<br />
									<p><a className="activator">More infos ..</a></p>
								</div>
								<div className="card-reveal">
									<span className="card-title grey-text text-darken-4">Infos<i className="material-icons right">close</i></span>
										<blockquote className="explanation">
											<p><b>Rover : </b>{this.state.data.photos[i].rover.name}</p>
											<p><b>Camera : </b>{this.state.data.photos[i].camera.full_name}, ("{this.state.data.photos[i].camera.name}")</p>
											<p>This photo has been taken the {this.props.dateFormatFR(this.state.data.photos[i].earth_date)}</p>
											<p> Last photo taken by this Curiosity rover : {this.props.dateFormatFR(this.state.data.photos[i].rover.max_date)}</p>
										</blockquote>
								</div>
							</div>
					</div>
					)
			}
			return (<div>{cards}</div>); 
		},
		render: function () {
			//Everything goes well
			if(this.state.showImages == true){
				return (this.generateCards());
			}
			//The date return no photos
			else if (this.state.failJSON == true){
				console.log('JSON request has failed');
				return this.handleJSONFailed(); 
			}
			//The data is charging
			else{
				console.log('Chargement des images ...');
				return(
					<div className="row">
						<div className="col s6 offset-s3">
							<p className="loadingImages">Chargement ...
								<img src="public/img/loader.gif"/>
							</p>
						</div>
					</div>
				)
			}
		},
		initMaterialBox: function (element) {
			//Required for datePicker
    		$(element).materialbox();
		}
	}
)

module.exports = Cards; 
