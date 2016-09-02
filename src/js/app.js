var React = require('react');
var ReactDOM = require('react-dom');
var Navigation = require('./modules/Navigation');
var PictureOfTheDay = require ('./modules/PictureOfTheDay');
var Curiosity = require('./modules/Curiosity');

var App = React.createClass(
	{	
		getInitialState: function () {
			return{
				//Links represents the navbar links
				links:[
					{
						name:'Home',
						id:'0',
						headerImgSrc: '/src/img/home.jpg'
					},
					{
						name: 'Curiosity',
						id: '3',
						headerImgSrc:'/src/img/mars.jpg'
					},
					{
						name:'FAQ',
						id:'1',
						headerImgSrc: '/src/img/home.jpg'
					},
					{
						name: 'Help',
						id:'2',
						headerImgSrc: '/src/img/home.jpg'
					}
				],
				page: 'Home'
			}
		},
		handleNavigationClick: function (currentLink) {
			console.log( "this.state.page = " + this.state.page + " AND currentLink = " + currentLink);
			//On test si le lien cliqué est différent de la page actuelle
			this.state.page !== currentLink ? this.setState({page: currentLink}) : console.log('pas de rechargement');


		},
		showPage: function () {
			switch(this.state.page){
				case 'Home':
					return <PictureOfTheDay />;
				break;
				case 'Curiosity':
					return <Curiosity />;
				break;
				case 'FAQ':
					return <p className="loadingImages">Nothing yet ! </p>;
				break;
				case 'Help':
				 	return <p className="loadingImages">Nothing yet !</p>;
				break; 
			}
		},

		render: function () {
			return (
				<div>
					<div className="container-fluid">
						<div className="container-fluid">
							<header>
								<Navigation links={this.state.links} handleClick={this.handleNavigationClick}/>
							</header>
						</div>
						<div id="main-content">
							{this.showPage()}
						</div>
					</div>
				</div>
				);
		}
	}
)

ReactDOM.render(<App />, document.getElementById('app'))