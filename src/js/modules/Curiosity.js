
var React = require('react');
var DatePicker = require('./DatePicker');
var Cards = require('./Cards');

//TODO : Il faudra bien entendu rendre la requete Dynamique, afin que les photos ne soient pas toujours les mêmes.
var Curiosity = React.createClass(
	{
		getInitialState: function () {
			return {
				data : {},
				showCards: false,
				JSONLoad: false,
				earth_date_chosen: '2016-09-01',
				max_date:'2016-09-01',
				picsNumber: 20
			}
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
									<span className="important-content">Curiosity takes picture everyday, we receive those pictures with ~3 days delay. This page has been created to let you see those all pictures. Click on the Date Picker to select the date you want.</span>
								</span>
								<hr className="hr-bottom"/>
				</div>
			)
		},
		componentWillMount: function () {

				// Getting the JSON from the API automatically
				var that = this; 
				 $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + this.state.earth_date_chosen + "&api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX", function(result)
				 {
				 	console.log('Initial JSON Taking');
				 	//We check if there is there the newest photos from the rover.
				 	if(result.photos[0].rover.max_date == that.state.earth_date_chosen){
				 		console.log('No update needed !');
				 		that.setState({data: result});
	             		that.props.handleFooter(true);
	             		that.setState({JSONLoad: true})
				 	}
				 	else{
				 		// We get the newest JSON file.
				 		 $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + result.photos[0].rover.max_date + "&api_key=XF9kCOy8zibQ0JSeBX96QpPlPTP3JFUSN8pDXlKX", function(result){
				 		 	console.log('Update well succeed');
				 		 	that.setState({data: result});
				 		 	that.setState({earth_date_chosen: result.photos[0].rover.max_date})
				 		 	that.setState({max_date: result.photos[0].rover.max_date});
				 		 	that.props.handleFooter(true);
				 		 	that.setState({JSONLoad: true})
				 		 });
				 	}

				 	 
				});

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
		dateFormatFR : function (date) {
			//French Format, more readable !
			// Initialy format date : year-mouth-day, ex : 2016-09-01 
			//This is the format that we want : 1 September 2016. 
			date = date.split('-');
			var newDate = date[2] + " " + this.months[date[1]] + ", " + date[0];
			return newDate;
		},
		handleChangeDate: function (newDate) {
			this.setState({showCards: false});
			this.setState({earth_date_chosen : newDate});	
		},
		handleChangePicsNumber: function (number) {
			if(number !== this.state.picsNumber){
				this.setState({picsNumber: number});
			}
			else{
				console.log('PicsNumber hasn\'t change');
			}
		},
		handleGlobalCards: function () {
			if(this.state.showCards == true){
				//console.log('We display Cards');
				return <Cards 
						earth_date_chosen={this.state.earth_date_chosen}
						picsNumber={this.state.picsNumber}
						dateFormatFR={this.dateFormatFR}
						/>
			}
		},
		launchCards: function () {
			this.setState({showCards: true});
		},
		showCuriosity: function () {
			if(this.state.JSONLoad === true){
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
								<DatePicker
									currentDate={this.state.earth_date_chosen}
									max_date={this.state.max_date}
									months={this.months}
									changeDate={this.handleChangeDate}
									changePicsNumber={this.handleChangePicsNumber}
									maxPics={25} picsNumber={this.state.picsNumber}
									dateFormatFR={this.dateFormatFR}
									launchCards={this.launchCards}
									months={this.months}
								/>
							</div>
						</div>
						<div className="row">
							{this.handleGlobalCards()}
		      			</div>
		      		</div>
		      	);
			}
			else{
				console.log('Chargement de la page Curiosity');
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
		render: function () {
				return this.showCuriosity();
		}
	}
)

module.exports = Curiosity; 
