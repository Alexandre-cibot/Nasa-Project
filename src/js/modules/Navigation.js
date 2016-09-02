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
			var divStyle = {
				  background: 'url(' + this.state.headerImgSrc[this.state.activeLink] + ')',
				};

			return (
				<div className="container-fluid">
					<nav className='Navigation'>
					    <div className="nav-wrapper">
					      <a href="#!" className="brand-logo left">Nasa - Project</a>
					      <ul className="right">
					        {this.createContent()}
					      </ul>
					    </div>
					</nav>
					<div className="row">
						<div className="header-image" style={divStyle}></div>
					</div>
				</div>
			)
		}
	}
)
module.exports = Navigation; 


  

