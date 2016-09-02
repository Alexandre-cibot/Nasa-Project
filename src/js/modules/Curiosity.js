var React = require('react');
var DatePicker = require('./DatePicker');


//TODO : Il faudra bien entendu rendre la requete Dynamique, afin que les photos ne soient pas toujours les mêmes.
var Curiosity = React.createClass(
	{
		getInitialState: function () {
			return {
				data : {},
				showImages: false,
				cardsArray: []
			}
		},
		componentWillMount: function () {

				// Getting the JSON from the API
				var that = this; 
				 $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-6-3&api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX", function(result){
				 	console.log(result);
				 	that.setState({data: result});
	             	that.setState({showImages: true});
				 });
		},
		dateFormatFR : function (date) {
			//French Format, more readable !
			var months = {
				'01':  'January',
				'02':  'Februry',
				'03':  'March',
				'04':  'April',
				'05':  'May',
				'06':  'June',
				'07':  'July',
				'08':  'August',
				'09':  'September',
				'10': 'October',
				'11': 'November',
				'12': 'December'
			}
			date = date.split('-');
			var newDate = date[2] + " " + months[date[1]] + " " + date[0];
			return newDate;
		},

		imagesCharged: function () {
			this.state.data.photos !== undefined ? true : false;
		},
		generateCards: function () {
			// We generate as many cards as we need. With a limit of 100. (to be sure)
			console.log(this.state.data.photos);
			var cards = [];
			var cardsLimit = function (numberOfPhotos, limit) {
				// Return the number of photos, width a maximum limit
				return numberOfPhotos <= limit ?  numberOfPhotos : limit; 

			};

			for(var i = 0; i < cardsLimit(this.state.data.photos.length, 50); i++){
				cards.push(
					<div className="col s3 m2" key={i}>
							<div className="card">
								<div className="card-image waves-light">
									<img className="materialboxed" src={this.state.data.photos[i].img_src} ref={this.initMaterialBox}/>
								</div>
								<div className="card-content">
									<span className="card-title activator grey-text text-darken-4">Title<i className="material-icons right">more_vert</i></span>
									<p>Date : {this.dateFormatFR(this.state.data.photos[i].earth_date)}</p>
									<br />
									<p><a className="activator">More infos ..</a></p>
								</div>
								<div className="card-reveal">
									<span className="card-title grey-text text-darken-4">Title<i className="material-icons right">close</i></span>
										<blockquote className="explanation">
											<p><b>Rover : </b>{this.state.data.photos[i].rover.name}</p>
											<p><b>Camera : </b>{this.state.data.photos[i].camera.full_name}, ("{this.state.data.photos[i].camera.name}")</p>
											<p>This rover has landed on Mars the {this.dateFormatFR(this.state.data.photos[i].rover.landing_date)}, and will normaly leave the planet the {this.dateFormatFR(this.state.data.photos[i].rover.max_date)}</p>
										</blockquote>
								</div>
							</div>
					</div>
					)
			}
			return cards; 
		},
		displayContent: function () {
			console.log('Enter in the Display function');
			return (
				<div className="Curiosity">
					<DatePicker />
					<div className="row">
		      			
		      				{this.generateCards()}
		      			

	      			</div>

	      		</div>
			)
		},
		render: function () {
			console.log('render');
			if(this.state.showImages == true){
				console.log('images displayed')
				return (this.displayContent())
			}
			else{
				console.log('Chargement des images ...');
				return(
					<div>
						<p className="loadingImages">Chargement ...<img src="../src/img/loader.gif"/></p>
					</div>
				)
			}
			
		},
		initMaterialBox: function (element) {
    		$(element).materialbox();
		}
	}
)

module.exports = Curiosity; 

