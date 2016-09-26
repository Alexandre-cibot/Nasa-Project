var React = require('react');

const Footer = function () {
		return (
			<footer id="footer"className="page-footer notranslate">
					          <div className="container">
					            <div className="row">
					              <div className="col l6 s12">
					                <h5 className="white-text">Why this Website ? </h5>
					                <div className="grey-text text-lighten-4">
					                	I've made this website to improve my knowledge using : 
					                	<br />
					                	<p>Javascript - React - NodeJS - Webpack</p>
					                	<br />
					                	Also to work with an API. I use the NASA Open API, available here <a href="https://api.nasa.gov/index.html">https://api.nasa.gov</a> to find pictures and descriptions transmited by the Rover.

					                </div>
					              </div>
					              <div className="col l4 offset-l2 s12">
					                <h5 className="white-text">Want to know more ?</h5>
					                <ul>
					                  <li><a className="" href="https://github.com/Alexandre-cibot/Nasa-Project">Github - Nasa-Project</a></li>
					                  <li><a className="" href="https://www.alexandrecibot.com">Check-out my Port-Folio</a></li>
					                </ul>
					              </div>
					            </div>
					          </div>
					          <div className="footer-copyright">
					            <div className="container">
					            © 2016 Alexandre Cibot					       
					            </div>
					          </div>
			</footer>
		)	
}

module.exports = Footer; 