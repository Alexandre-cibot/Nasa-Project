var React = require('react');
var DatePicker = require('./DatePicker');

//TODO : Il faudra bien entendu rendre la requete Dynamique, afin que les photos ne soient pas toujours les mêmes.
var Cards= React.createClass(
	{
		getInitialState: function () {
			return {
				data : this.props.data,
				showImages: false,
				failJSON: false,
				cardsArray: [],
				earth_date_chosen: this.props.earth_date_chosen,
				max_date: this.props.max_date,
				picsNumber: 20
			}
		},
		
		componentWillMount: function () {
			//We make a new request when the user change the Date. 
				var that = this; 
				 $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + this.state.earth_date_chosen + "&api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX", function(result){
				 	that.setState({data: result});
				 	//that.setState({earth_date_chosen: newDate});

				 	// we say that the JSON hasn't failed. 
				 	
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
		
		handleJSONFailed: function (){
			console.log('Impossible to reach data, because they doesn\'t exist yet');
			var that = this;
			var handleClick = function () {
				//We handle the click for return back
				console.log('Go Back');
				return that.setState({showImages: false});
			}
				return (
					<div className="failJSON">
						<img src="../src/img/alien.gif"/>
						<h3>I'm affraid, there is no photos at this date.</h3>
						<a href="#" onClick={handleClick}className="waves-effect waves-light btn btn-large"><i className="material-icons right">replay</i>Back</a>
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
									<span className="card-title activator grey-text text-darken-4">Title<i className="material-icons right">more_vert</i></span>
									<p>Date : {this.props.dateFormatFR(this.state.data.photos[i].earth_date)}</p>
									<br />
									<p><a className="activator">More infos ..</a></p>
								</div>
								<div className="card-reveal">
									<span className="card-title grey-text text-darken-4">Title<i className="material-icons right">close</i></span>
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
				console.log('current Date : ' + this.state.earth_date_chosen);
				return (this.generateCards());
			}
			//The date return no photos
			else if (this.state.failJSON == true){
				console.log('fail')
				return this.handleJSONFailed(); 
			}
			//The data is charging
			else{
				console.log('Chargement des images ...');
				return(
					<div className="row">
						<div className="col s6 offset-s3">
							<p className="loadingImages">Chargement ...
								<img src="../src/img/loader.gif"/>
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
