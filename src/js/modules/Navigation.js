var React = require('react');
var Navigation = React.createClass(
	{
		getInitialState: function () {
			return {
				activeLink: 'Home'
			}
		},
		listenClick: function (activeLink) {
			console.log(activeLink)
			this.setState({activeLink: activeLink});
			this.props.handleClick(activeLink);
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
			
			return (
				<div className="row">
					<nav className='blue-grey lighten-1'>
					    <div className="nav-wrapper">
					      <a href="#!" className="brand-logo left">Nasa</a>
					      <ul className="right">
					        {this.createContent()}
					      </ul>
					    </div>
					</nav>
				</div>
				

			)
		}
	}
)
module.exports = Navigation; 

  

