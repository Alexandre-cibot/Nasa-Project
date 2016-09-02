var React = require('react');
var $ = require('jquery');


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
			var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX';
			var urlEarth = 'https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&cloud_score=True&api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX';
			var that = this; 
			$.ajax({
	            url: 'https://cors-anywhere.herokuapp.com/' + url,
	            type: "GET",
	            dataType: "json",
	            success: function (data) {
	            	//console.log(data);
	            	that.setState({data: data});
	            	that.setState({showImages: true});
	            }
	        });
		},
		imagesCharged: function () {
			this.state.data.photos !== undefined ? true : false;
		},
		generateCards: function () {
			// TODO --> générer les cartes en fonction du nombre que l'on recoit via l'API
			console.log(this.state.data.photos[0]);
			return(
				<div className="card">
					<div className="card-image waves-effect waves-block waves-light">
						<img className="materialboxed" src={this.state.data.photos[0].img_src} />
					</div>
					<div className="card-content">
						<span className="card-title activator grey-text text-darken-4">Title<i className="material-icons right">more_vert</i></span>
						<p>Date : {this.state.data.photos[0].earth_date}</p>
						<br />
						<p><a href="#" className="activator">More infos ..</a></p>
					</div>
					<div className="card-reveal">
						<span className="card-title grey-text text-darken-4">Title<i className="material-icons right">close</i></span>
							<blockquote className="explanation">
								<p><b>Rover : </b>{this.state.data.photos[0].rover.name}</p>
								<p><b>Camera : </b>{this.state.data.photos[0].camera.full_name}, ("{this.state.data.photos[0].camera.name}")</p>
								<p>This rover has landed on Mars the {this.state.data.photos[0].rover.landing_date}, and will normaly leave the planet the {this.state.data.photos[0].rover.max_date}</p>
							</blockquote>
					</div>
				</div>
			)
		},
		displayContent: function () {
			console.log('Enter in the Display function');
			return (
				<div className="Curiosity-container">
					<div className="row">
		      			<div className="col s4 m3">
		      				{this.generateCards()}
		      			</div>

	      			</div>

	      		</div>
			)
		},
		render: function () {
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
			
		}
	}
)

module.exports = Curiosity; 

