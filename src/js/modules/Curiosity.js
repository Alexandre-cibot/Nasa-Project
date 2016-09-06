var React = require('react');
var DatePicker = require('./DatePicker');

//TODO : Il faudra bien entendu rendre la requete Dynamique, afin que les photos ne soient pas toujours les mêmes.
var Curiosity = React.createClass(
	{
		getInitialState: function () {
			return {
				data : {},
				showImages: false,
				failJSON: false,
				cardsArray: [],
				earth_date_chosen: '2016-09-01',
				max_date:'2016-09-01'
			}
		},

		months : {
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
		},
		introduction_content: function () {
			//Storage for Introduction textual content
			return (
				<div className="introduction">
							<hr className="hr-top"/>
								<span className="introduction-content">
									Curiosity is a car-sized robotic rover exploring <b>Gale Crater</b> on <b>Mars</b> as part of <b>NASA's Mars Science Laboratory mission</b> (MSL).<br /> And this is what it does since landing on <b>August 6, 2012</b>. 

									Curiosity was launched from Cape Canaveral on <b>November 26, 2011</b> aboard the MSL spacecraft.
									<br />
									<b>What a journey !</b> After 563,000,000 km (350,000,000 mi) and 2080 days, so more than 5 years, Curiosity has reached the red planet. <br />

									The rover's goals include: investigation of the Martian climate and geology assessment of whether the selected field site inside Gale Crater has ever offered environmental conditions favorable for microbial life, including investigation of the role of water; and planetary habitability studies in preparation for future human exploration.<br />
									<span className="important-content">Curiosity takes picture everyday, this page has been created to let you see those all pictures. Click on the Date Picker to select the date you want.</span>
								</span>
								<hr className="hr-bottom"/>
				</div>
			)
		},
		componentWillMount: function () {

				// Getting the JSON from the API automatically
				var that = this; 
				 $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + this.state.earth_date_chosen + "&api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX", function(result){
				 	console.log('Initial JSON Taking');
				 	//We check if there is there the newest photos from the rover.
				 	if(result.photos[0].rover.max_date == that.state.earth_date_chosen){
				 		console.log('No update needed !');
				 		that.setState({data: result});
	             		that.setState({showImages: true});
	             		that.props.handleFooter(true);
				 	}
				 	else{
				 		// We get the newest JSON file.
				 		 $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + result.photos[0].rover.max_date + "&api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX", function(result){
				 		 	console.log('Update well succeed');
				 		 	that.setState({data: result});
				 		 	that.setState({earth_date_chosen: result.photos[0].rover.max_date})
				 		 	that.setState({max_date: result.photos[0].rover.max_date});
				 		 	that.setState({showImages: true});
				 		 	that.props.handleFooter(true);
				 		 });
				 	}
				});
		},
		updateJSON: function (newDate) {
			//We make a new request when the user change the Date. 
				var that = this; 
				 $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + newDate + "&api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX", function(result){
				 	that.setState({data: result});
				 	that.setState({earth_date_chosen: newDate});

				 	// we say that the JSON hasn't failed. 
				 	
				 	if(that.state.failJSON == true){
				 		that.setState({failJSON: false})
				 	}
	             	that.setState({showImages: true});

	             	that.props.handleFooter(true);
				 	
				})
				 .fail(function(){
				 	// ex: 9 june 2014, there is no pictures for that day. 	
				 	that.setState({failJSON: true});
				 });
		},
		dateFormatFR : function (date) {
			//French Format, more readable !
			// Initialy format date : year-mouth-day, ex : 2016-09-01 
			//This is the format that we want : 1 September 2016. 
			date = date.split('-');
			var newDate = date[2] + " " + this.months[date[1]] + " " + date[0];
			return newDate;
		},
		handleChangeDate: function (newDate) {
			this.setState({showImages:false});
			this.props.handleFooter(false);
			this.updateJSON(newDate);
		
		},
		handleJSONFailed: function (){
			console.log('Impossible to reach data, because they doesn\'t exist yet');
			var that = this;
			var handleClick = function () {
				//We handle the click for return back
				console.log('Go Back');
				return that.updateJSON(that.state.max_date);
			}
				return (
					<div className="failJSON">
						<img src="../src/img/alien.gif"/>
						<h3>I'm affraid, there is no photos at this date.</h3>
						<a href="#" onClick={handleClick}className="waves-effect waves-light btn btn-large"><i className="material-icons right">replay</i>Back</a>
					</div>
				)
		},

		imagesCharged: function () {
			this.state.data.photos !== undefined ? true : false;
		},
		generateCards: function () {
			// We generate as many cards as we need. With a limit of 100. (to be sure)
			var cards = [];
			var cardsLimit = function (numberOfPhotos, limit) {
				// Return the number of photos, width a maximum limit
				return numberOfPhotos <= limit ?  numberOfPhotos : limit; 

			};

			for(var i = 0; i < cardsLimit(this.state.data.photos.length, 50); i++){
				cards.push(
					<div className="col m2" key={i}>
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
											<p>This photo has been taken the {this.dateFormatFR(this.state.data.photos[i].earth_date)}</p>
											<p> Last photo taken by this Curiosity rover : {this.dateFormatFR(this.state.data.photos[i].rover.max_date)}</p>
										</blockquote>
								</div>
							</div>
					</div>
					)
			}
			return cards; 
		},
		displayContent: function () {
			return (
				<div id="Curiosity">
					<div className="row">
						<div className="col s12 m8 push-m2">
							<h2>Curiosity</h2>
							{this.introduction_content()}
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<DatePicker currentDate={this.state.earth_date_chosen} max_date={this.state.max_date} dateFormatFR={this.dateFormatFR} months={this.months} handleChangeDate={this.handleChangeDate}/>
						</div>
					</div>
					<div className="row">
		      			{this.generateCards()}
	      			</div>
	      		</div>
			)
		},
		render: function () {
			//Everything goes well
			if(this.state.showImages == true){
				console.log('current Date : ' + this.state.earth_date_chosen);
				return (this.displayContent())
			}
			//The date return no photos
			else if (this.state.failJSON == true){
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

module.exports = Curiosity; 

