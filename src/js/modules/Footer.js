var React = require('react');

const Footer = function () {
		return (
			<footer id="footer"className="page-footer">
					          <div className="container">
					            <div className="row">
					              <div className="col l6 s12">
					                <h5 className="white-text">Why this Website</h5>
					                <p className="grey-text text-lighten-4">I've made this website to improve my knowledge using those <b>Technologies / Frameworks / Libraries</b> : <i>Html - Css - Javascript - React - NodeJS.</i> <br /> Also to work with an API. I use the the NASA Open API, available here <a href="https://api.nasa.gov/index.html">https://api.nasa.gov/index.html</a>to find Photos and descriptions trasnmited by the Rover.</p>
					              </div>
					              <div className="col l4 offset-l2 s12">
					                <h5 className="white-text">Want to see the code ? </h5>
					                <ul>
					                  <li><a className="" href="https://github.com/Alexandre-cibot/Nasa-Project">Github - Nasa-Project</a></li>
					                </ul>
					              </div>
					            </div>
					          </div>
					          <div className="footer-copyright">
					            <div className="container">
					            © 2016 Alexandre Cibot
					            {/*<a className="grey-text text-lighten-4 right" href="#!">More Links</a>*/}
					            </div>
					          </div>
			</footer>
		)	
}

module.exports = Footer; 