var React = require('react');
var Navigation = React.createClass(
	{
		getInitialState: function () {
			return {
				activeLink: 'Home',
				headerImgSrc: {
					"Home": "src/img/home.jpeg",
					"Curiosity": "src/img/mars.jpg",
					'FAQ': "src/img/home.jpg",
					"Help": "src/img/home.jpg"
				}
			}
		},
		listenClick: function (activeLink) {
			this.props.handleFooter(false);
			console.log(activeLink)
			this.setState({activeLink: activeLink});
			this.props.handleClick(activeLink);


			//this.setState({headerImgSrc: activeLink})
	
		},
		createContent: function () {
			var numberOflinks = Object.keys(this.props.links).length;
			var linksArray = new Array;
			var currentLink = this.props.links;
			var that = this; 
			for(var i = 0; i < numberOflinks; i++){
				//On test si le lien doit etre active ou non
				//console.log(currentLink[i].name == this.state.activeLink);
				//console.log("--->" + currentLink[i].name + " VS " + this.state.activeLink);

				linksArray.push(<li key={currentLink[i].id} 
								className={this.state.activeLink == currentLink[i].name ? "active" : "" }>
									<a 
									name={currentLink[i].name}
									href={currentLink[i].url}
									onClick={this.listenClick.bind(null,currentLink[i].name)}>

										{currentLink[i].name}
									</a>
								</li>
								);
			}
			return linksArray; 
		},
		render: function () {
			var headerImgStyle = {
				  background: 'url(' + this.state.headerImgSrc[this.state.activeLink] + ')',
				  backgroundPosition: "center"
				};

			return (
					
					<div className="container-fluid">
						<nav className='Navigation'>
						    <div className="nav-wrapper">
						      <a href="#!" className="brand-logo">Nasa - Project</a>
						      <a href="#" data-activates="mobile-demo" className="button-collapse" ref={this.initNavbar}><i className="material-icons">menu</i></a>
						      <ul className="right hide-on-med-and-down">
						      	{/*List for large screen*/}
						        {this.createContent()}
						      </ul>
						       <ul className="side-nav" id="mobile-demo">
						   		{/*List for mobile phone*/}
						        {this.createContent()}
						        <img className="background-bottom" src="/src/img/background-mobile-navbar.jpg"></img>
					      	  </ul>
						    </div>
						</nav>
						<div className="row wrapper-header-image">
							<div className="header-image" style={headerImgStyle}></div>
						</div>
					</div>
			)
		},
		initNavbar: function (element) {
			$(element).sideNav({
				menuWidth: 300, // Default is 240
		        edge: 'left', // Choose the horizontal origin
				closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
			});
		}
	}

)
module.exports = Navigation; 

