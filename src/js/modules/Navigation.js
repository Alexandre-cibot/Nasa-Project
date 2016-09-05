var React = require('react');
var Navigation = React.createClass(
	{
		getInitialState: function () {
			return {
				activeLink: 'Home',
				headerImgSrc: {
					"Home": "/src/img/home.jpg",
					"Curiosity": "/src/img/mars.jpg",
					'FAQ': "/src/img/home.jpg",
					"Help": "/src/img/home.jpg"
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
				  background: 'url(' + this.state.headerImgSrc[this.state.activeLink] + ')'
				};

			return (
					<div className="container-fluid" ref={this.initNavigation}>
					<nav className='Navigation'>
					    <div className="nav-wrapper">
					      <a href="#!" className="brand-logo left">Nasa - Project</a>
					      <ul className="right hide-on-med-and-down">
					        {this.createContent()}
					      </ul>
					       <ul className="side-nav" id="mobile-demo">
					        <li><a href="sass.html">Sass</a></li>
					        <li><a href="badges.html">Components</a></li>
					        <li><a href="collapsible.html">Javascript</a></li>
					        <li><a href="mobile.html">Mobile</a></li>
				      	  </ul>
					    </div>
					</nav>
					<div className="row">
						<div className="header-image" style={headerImgStyle}></div>
					</div>
				</div>
			)
		},
		initNavbar: function (element) {
			$(element).slideNav();
		}
	}

)
module.exports = Navigation; 


/*
	



					<nav>
				    <div className="nav-wrapper" ref={this.initNavbar}>
				      <a href="#!" className="brand-logo">Logo</a>
				      <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
				      <ul className="right hide-on-med-and-down">
				        <li><a href="sass.html">Sass</a></li>
				        <li><a href="badges.html">Components</a></li>
				        <li><a href="collapsible.html">Javascript</a></li>
				        <li><a href="mobile.html">Mobile</a></li>
				      </ul>
				      <ul className="side-nav" id="mobile-demo">
				        <li><a href="sass.html">Sass</a></li>
				        <li><a href="badges.html">Components</a></li>
				        <li><a href="collapsible.html">Javascript</a></li>
				        <li><a href="mobile.html">Mobile</a></li>
				      </ul>
				    </div>
				  </nav>
*/

  

