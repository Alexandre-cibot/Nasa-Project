var React = require('react');
var ReactDOM = require('react-dom');
var Navigation = require('./modules/Navigation');
var PictureOfTheDay = require ('./modules/PictureOfTheDay');
var Curiosity = require('./modules/Curiosity');
var Footer = require('./modules/Footer');

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
				page: 'Home',
				showFooter: false
			}
		},
		handleNavigationClick: function (currentLink) {
			//We check if the clicked link if different than the current link
			this.state.page !== currentLink ? this.setState({page: currentLink}) : console.log('No reloading needed');
		},
		showPage: function () {
			switch(this.state.page){
				case 'Home':
					return <PictureOfTheDay handleFooter={this.handleFooter}/>;
				break;
				case 'Curiosity':
					return <Curiosity handleFooter={this.handleFooter}/>;
				break;
				case 'FAQ':
					return <p className="loadingImages">Nothing yet ! </p>;
				break;
				case 'Help':
				 	return <p className="loadingImages">Nothing yet !</p>;
				break; 
			}
		},
		handleFooter: function (boolean) {
			// the parametre is a bolean, to define if YES we should display the footer, or not. 
			this.setState({showFooter: boolean}) 
		},
		showFooter: function () {
			if(this.state.showFooter == true){
				return <Footer />
			}
		},
		render: function () {
			return (
				<div>
					<div className="container-fluid">
						<div className="container-fluid">
							<header>
								<Navigation links={this.state.links} handleClick={this.handleNavigationClick} handleFooter={this.handleFooter}/>
							</header>
						</div>
						<div id="main-content">
							{this.showPage()}
						</div>
					</div>
	
					{this.showFooter()}
				
				</div>
				);
		}
	}
)

ReactDOM.render(<App />, document.getElementById('app'))