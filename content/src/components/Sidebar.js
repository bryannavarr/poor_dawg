import React from "react";

import { Link } from "react-router-dom";
import {findDOMNode} from 'react-dom'
import jquery from "jquery";
window.$ = window.jQuery = jquery;
require('smartadmin-plugins/jquery-ui-custom/jquery-ui.core.min.js')
require("smartadmin-plugins/smartwidgets/jarvis.widget.ng2.js");
require('smartadmin-plugins/jquery-ui-custom/jquery-ui.widgets.min.js')



class Sidebar extends React.Component {
  constructor(props) {
      super(props)
  }
  

  componentDidMount(){
    
    
	
		//pass the options variable to the function
		
	
			var defaults = {
				accordion : true,
				speed : 200,
				closedSign : '[+]',
				openedSign : '[-]'
			},
	
			// Extend our default options with those provided.
				opts = window.$.extend(defaults, this.props),
			//Assign current element to variable, in this case is UL element
				$this = window.$(findDOMNode(this));
	
			//add a mark [+] to a multilevel menu
			$this.find("li").each(function() {
				if (window.$(this).find("ul").length !== 0) {
					//add the multilevel sign next to the link
					window.$(this).find("a:first").append("<b class='collapse-sign'>" + opts.closedSign + "</b>");
	
					//avoid jumping to the top of the page when the href is an #
					if (window.$(this).find("a:first").attr('href') == "#") {
						window.$(this).find("a:first").click(function() {
							return false;
						});
					}
				}
			});
	
			//open active level
			$this.find("li.active").each(function() {
				window.$(this).parents("ul").slideDown(opts.speed);
				window.$(this).parents("ul").parent("li").find("b:first").html(opts.openedSign);
				window.$(this).parents("ul").parent("li").addClass("open");
			});
	
			$this.find("li a").click(function() {
	
				if (window.$(this).parent().find("ul").length !== 0) {
	
					if (opts.accordion) {
						//Do nothing when the list is open
						if (!window.$(this).parent().find("ul").is(':visible')) {
							var parents = window.$(this).parent().parents("ul");
							var visible = $this.find("ul:visible");
							visible.each(function(visibleIndex) {
								var close = true;
								parents.each(function(parentIndex) {
									if (parents[parentIndex] == visible[visibleIndex]) {
										close = false;
										return false;
									}
								});
								if (close) {
									if (window.$(this).parent().find("ul") != visible[visibleIndex]) {
										window.$(visible[visibleIndex]).slideUp(opts.speed, function() {
											window.$(this).parent("li").find("b:first").html(opts.closedSign);
											window.$(this).parent("li").removeClass("open");
										});
	
									}
								}
							});
						}
					}// end if
					if (window.$(this).parent().find("ul:first").is(":visible") && !window.$(this).parent().find("ul:first").hasClass("active")) {
						window.$(this).parent().find("ul:first").slideUp(opts.speed, function() {
							window.$(this).parent("li").removeClass("open");
							window.$(this).parent("li").find("b:first").delay(opts.speed).html(opts.closedSign);
						});
	
					} else {
						window.$(this).parent().find("ul:first").slideDown(opts.speed, function() {
							/*window.$(this).effect("highlight", {color : '#616161'}, 500); - disabled due to CPU clocking on phones*/
							window.$(this).parent("li").addClass("open");
							window.$(this).parent("li").find("b:first").delay(opts.speed).html(opts.openedSign);
						});
					} // end else
				} // end if
			});
		 // end function
	
  }
  
    render(){
    return (
    <aside id="left-panel">
      {/* {/* User info */} */}
      <div className="login-info">
        <span>
          {" "}
          {/* User image size is adjusted inside CSS, it should stay as it */}
          <a
            href="/"
            id="show-shortcut"
            data-action="toggleShortcut"
          >
            <img
              src="smartadmin/img/avatars/sunny.png"
              alt="me"
              className="online"
            />
            <span>john.doe</span>
            <i className="fa fa-angle-down" />
          </a>
        </span>
      </div>
      {/* end user info */}
      {/* NAVIGATION : This navigation is also responsive*/}
      <nav>
        {/* 
				NOTE: Notice the gaps after each icon usage <i></i>..
				Please note that these links work a bit different than
				traditional href="" links. See documentation for details.
				*/}

        <ul>
          <li className="active">
            <Link to="/dashboard">
              <i className="fa fa-lg fa-fw fa-home" />{" "}
              <span className="menu-item-parent">Dashboard</span>
            </Link>
            <ul style={{ display: "block" }}>
            <li className="active">
                <Link to="/notifications">
                  <span className="menu-item-parent">Notifications</span>
                </Link>
              </li>
              <li className="active">
                <Link to="/hackers">
                  <span className="menu-item-parent">Hackers</span>
                </Link>
              </li>
              <li className="active">
                <Link to="/vets">
                  <span className="menu-item-parent">Vets</span>
                </Link>
              </li>
              <li>
                <Link to="/interactions">
                  <span className="menu-item-parent">Interactions</span>
                </Link>
              </li>
              <li>
                <a href="dashboard-marketing.html" title="Dashboard">
                  <span className="menu-item-parent">Marketing Dashboard</span>
                </a>
              </li>
              <li className="">
                <a href="dashboard-social.html" title="Dashboard">
                  <span className="menu-item-parent">Social Wall</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="top-menu-invisible">
            <a href="#">
              <i className="fa fa-lg fa-fw fa-cube txt-color-blue" />{" "}
              <span className="menu-item-parent">SmartAdmin Intel</span>
            </a>
            <ul>
              <li className="">
                <a href="layouts.html" title="Dashboard">
                  <i className="fa fa-lg fa-fw fa-gear" />{" "}
                  <span className="menu-item-parent">App Layouts</span>
                </a>
              </li>
              <li className="">
                <a href="skins.html" title="Dashboard">
                  <i className="fa fa-lg fa-fw fa-picture-o" />{" "}
                  <span className="menu-item-parent">Prebuilt Skins</span>
                </a>
              </li>
              <li>
                <a href="applayout.html">
                  <i className="fa fa-cube" /> App Settings
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="inbox.html">
              <i className="fa fa-lg fa-fw fa-inbox" />{" "}
              <span className="menu-item-parent">Outlook</span>{" "}
              <span className="badge pull-right inbox-badge margin-right-13">
                14
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-lg fa-fw fa-bar-chart-o" />{" "}
              <span className="menu-item-parent">Graphs</span>
            </a>
            <ul>
              <li>
                <a href="flot.html">Flot Chart</a>
              </li>
              <li>
                <a href="morris.html">Morris Charts</a>
              </li>
              <li>
                <a href="sparkline-charts.html">Sparklines</a>
              </li>
              <li>
                <a href="easypie-charts.html">EasyPieCharts</a>
              </li>
              <li>
                <a href="dygraphs.html">Dygraphs</a>
              </li>
              <li>
                <a href="chartjs.html">Chart.js</a>
              </li>
              <li>
                <a href="hchartable.html">
                  HighchartTable{" "}
                  <span className="badge pull-right inbox-badge bg-color-yellow">
                    new
                  </span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-lg fa-fw fa-table" />{" "}
              <span className="menu-item-parent">Tables</span>
            </a>
            <ul>
              <li>
                <a href="table.html">Normal Tables</a>
              </li>
              <li>
                <a href="datatables.html">
                  Data Tables{" "}
                  <span className="badge inbox-badge bg-color-greenLight hidden-mobile">
                    responsive
                  </span>
                </a>
              </li>
              <li>
                <a href="jqgrid.html">Jquery Grid</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-lg fa-fw fa-pencil-square-o" />{" "}
              <span className="menu-item-parent">Forms</span>
            </a>
            <ul>
              <li>
                <a href="form-elements.html">Smart Form Elements</a>
              </li>
              <li>
                <a href="form-templates.html">Smart Form Layouts</a>
              </li>
              <li>
                <a href="validation.html">Smart Form Validation</a>
              </li>
              <li>
                <a href="bootstrap-forms.html">Bootstrap Form Elements</a>
              </li>
              <li>
                <a href="bootstrap-validator.html">Bootstrap Form Validation</a>
              </li>
              <li>
                <a href="plugins.html">Form Plugins</a>
              </li>
              <li>
                <a href="wizard.html">Wizards</a>
              </li>
              <li>
                <a href="other-editors.html">Bootstrap Editors</a>
              </li>
              <li>
                <a href="dropzone.html">Dropzone</a>
              </li>
              <li>
                <a href="image-editor.html">Image Cropping</a>
              </li>
              <li>
                <a href="ckeditor.html">CK Editor</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-lg fa-fw fa-desktop" />{" "}
              <span className="menu-item-parent">UI Elements</span>
            </a>
            <ul>
              <li>
                <a href="general-elements.html">General Elements</a>
              </li>
              <li>
                <a href="buttons.html">Buttons</a>
              </li>
              <li>
                <a href="#">Icons</a>
                <ul>
                  <li>
                    <a href="fa.html">
                      <i className="fa fa-plane" /> Font Awesome
                    </a>
                  </li>
                  <li>
                    <a href="glyph.html">
                      <i className="glyphicon glyphicon-plane" /> Glyph Icons
                    </a>
                  </li>
                  <li>
                    <a href="flags.html">
                      <i className="fa fa-flag" /> Flags
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="grid.html">Grid</a>
              </li>
              <li>
                <a href="treeview.html">Tree View</a>
              </li>
              <li>
                <a href="nestable-list.html">Nestable Lists</a>
              </li>
              <li>
                <a href="jqui.html">JQuery UI</a>
              </li>
              <li>
                <a href="typography.html">Typography</a>
              </li>
              <li>
                <a href="#">Six Level Menu</a>
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-fw fa-folder-open" /> Item #2
                    </a>
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa fa-fw fa-folder-open" /> Sub #2.1{" "}
                        </a>
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fa fa-fw fa-file-text" /> Item
                              #2.1.1
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-fw fa-plus" /> Expand
                            </a>
                            <ul>
                              <li>
                                <a href="#">
                                  <i className="fa fa-fw fa-file-text" /> File
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-fw fa-folder-open" /> Item #3
                    </a>

                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa fa-fw fa-folder-open" /> 3ed Level{" "}
                        </a>
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fa fa-fw fa-file-text" /> File
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-fw fa-file-text" /> File
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#" className="inactive">
                      <i className="fa fa-fw fa-folder-open" /> Item #4
                      (disabled)
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="widgets.html">
              <i className="fa fa-lg fa-fw fa-list-alt" />{" "}
              <span className="menu-item-parent">Widgets</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-lg fa-fw fa-cloud">
                <em>3</em>
              </i>{" "}
              <span className="menu-item-parent">Cool Features!</span>
            </a>
            <ul>
              <li>
                <a href="calendar.html">
                  <i className="fa fa-lg fa-fw fa-calendar" />{" "}
                  <span className="menu-item-parent">Calendar</span>
                </a>
              </li>
              <li>
                <a href="gmap-xml.html">
                  <i className="fa fa-lg fa-fw fa-map-marker" />{" "}
                  <span className="menu-item-parent">GMap Skins</span>
                  <span className="badge bg-color-greenLight pull-right inbox-badge">
                    9
                  </span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-lg fa-fw fa-puzzle-piece" />{" "}
              <span className="menu-item-parent">App Views</span>
            </a>
            <ul>
              <li>
                <a href="projects.html">
                  <i className="fa fa-file-text-o" /> Projects
                </a>
              </li>
              <li>
                <a href="blog.html">
                  <i className="fa fa-paragraph" /> Blog
                </a>
              </li>
              <li>
                <a href="gallery.html">
                  <i className="fa fa-picture-o" /> Gallery
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-comments" /> Forum Layout
                </a>
                <ul>
                  <li>
                    <a href="forum.html">General View</a>
                  </li>
                  <li>
                    <a href="forum-topic.html">Topic View</a>
                  </li>
                  <li>
                    <a href="forum-post.html">Post View</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="profile.html">
                  <i className="fa fa-group" /> Profile
                </a>
              </li>
              <li>
                <a href="timeline.html">
                  <i className="fa fa-clock-o" /> Timeline
                </a>
              </li>
              <li>
                <a href="search.html">
                  <i className="fa fa-search" /> Search Page
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-lg fa-fw fa-shopping-cart" />{" "}
              <span className="menu-item-parent">E-Commerce</span>
            </a>
            <ul>
              <li>
                <a href="orders.html">Orders</a>
              </li>
              <li>
                <a href="products-view.html">Products View</a>
              </li>
              <li>
                <a href="products-detail.html">Products Detail</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-lg fa-fw fa-windows" />{" "}
              <span className="menu-item-parent">Miscellaneous</span>
            </a>
            <ul>
              <li>
                <a href="../Landing_Page/" target="_blank">
                  Landing Page <i className="fa fa-external-link" />
                </a>
              </li>
              <li>
                <a href="pricing-table.html">Pricing Tables</a>
              </li>
              <li>
                <a href="invoice.html">Invoice</a>
              </li>
              <li>
                <a href="login.html" target="_top">
                  Login
                </a>
              </li>
              <li>
                <a href="register.html" target="_top">
                  Register
                </a>
              </li>
              <li>
                <a href="forgotpassword.html" target="_top">
                  Forgot Password
                </a>
              </li>
              <li>
                <a href="lock.html" target="_top">
                  Locked Screen
                </a>
              </li>
              <li>
                <a href="error404.html">Error 404</a>
              </li>
              <li>
                <a href="error500.html">Error 500</a>
              </li>
              <li>
                <a href="blank_.html">Blank Page</a>
              </li>
            </ul>
          </li>
          <li className="chat-users top-menu-invisible">
            <a href="#">
              <i className="fa fa-lg fa-fw fa-comment-o">
                <em className="bg-color-pink flash animated">!</em>
              </i>{" "}
              <span className="menu-item-parent">
                Smart Chat API <sup>beta</sup>
              </span>
            </a>
            <ul>
              <li>
                {/* DISPLAY USERS */}
                <div className="display-users">
                  <input
                    className="form-control chat-user-filter"
                    placeholder="Filter"
                    type="text"
                  />

                  <a
                    href="/"
                    className="usr"
                    data-chat-id="cha1"
                    data-chat-fname="Sadi"
                    data-chat-lname="Orlaf"
                    data-chat-status="busy"
                    data-chat-alertmsg="Sadi Orlaf is in a meeting. Please do not disturb!"
                    data-chat-alertshow="true"
                    data-rel="popover-hover"
                    data-placement="right"
                    data-html="true"
                    data-content="
											<div className='usr-card'>
												<img src='img/avatars/5.png' alt='Sadi Orlaf'>
												<div className='usr-card-content'>
													<h3>Sadi Orlaf</h3>
													<p>Marketing Executive</p>
												</div>
											</div>
										"
                  >
                    <i />Sadi Orlaf
                  </a>

                  <a
                    href="/"
                    className="usr"
                    data-chat-id="cha2"
                    data-chat-fname="Jessica"
                    data-chat-lname="Dolof"
                    data-chat-status="online"
                    data-chat-alertmsg=""
                    data-chat-alertshow="false"
                    data-rel="popover-hover"
                    data-placement="right"
                    data-html="true"
                    data-content="
											<div className='usr-card'>
												<img src='img/avatars/1.png' alt='Jessica Dolof'>
												<div className='usr-card-content'>
													<h3>Jessica Dolof</h3>
													<p>Sales Administrator</p>
												</div>
											</div>
										"
                  >
                    <i />Jessica Dolof
                  </a>

                  <a
                    href="/"
                    className="usr"
                    data-chat-id="cha3"
                    data-chat-fname="Zekarburg"
                    data-chat-lname="Almandalie"
                    data-chat-status="online"
                    data-rel="popover-hover"
                    data-placement="right"
                    data-html="true"
                    data-content="
											<div className='usr-card'>
												<img src='img/avatars/3.png' alt='Zekarburg Almandalie'>
												<div className='usr-card-content'>
													<h3>Zekarburg Almandalie</h3>
													<p>Sales Admin</p>
												</div>
											</div>
										"
                  >
                    <i />Zekarburg Almandalie
                  </a>

                  <a
                    href="/"
                    className="usr"
                    data-chat-id="cha4"
                    data-chat-fname="Barley"
                    data-chat-lname="Krazurkth"
                    data-chat-status="away"
                    data-rel="popover-hover"
                    data-placement="right"
                    data-html="true"
                    data-content="
											<div className='usr-card'>
												<img src='img/avatars/4.png' alt='Barley Krazurkth'>
												<div className='usr-card-content'>
													<h3>Barley Krazurkth</h3>
													<p>Sales Director</p>
												</div>
											</div>
										"
                  >
                    <i />Barley Krazurkth
                  </a>

                  <a
                    href="/"
                    className="usr offline"
                    data-chat-id="cha5"
                    data-chat-fname="Farhana"
                    data-chat-lname="Amrin"
                    data-chat-status="incognito"
                    data-rel="popover-hover"
                    data-placement="right"
                    data-html="true"
                    data-content="
											<div className='usr-card'>
												<img src='img/avatars/female.png' alt='Farhana Amrin'>
												<div className='usr-card-content'>
													<h3>Farhana Amrin</h3>
													<p>Support Admin <small><i className='fa fa-music'></i> Playing Beethoven Classics</small></p>
												</div>
											</div>
										"
                  >
                    <i />Farhana Amrin (offline)
                  </a>

                  <a
                    href="/"
                    className="usr offline"
                    data-chat-id="cha6"
                    data-chat-fname="Lezley"
                    data-chat-lname="Jacob"
                    data-chat-status="incognito"
                    data-rel="popover-hover"
                    data-placement="right"
                    data-html="true"
                    data-content="
											<div className='usr-card'>
												<img src='img/avatars/male.png' alt='Lezley Jacob'>
												<div className='usr-card-content'>
													<h3>Lezley Jacob</h3>
													<p>Sales Director</p>
												</div>
											</div>
										"
                  >
                    <i />Lezley Jacob (offline)
                  </a>

                  <a
                    href="chat.html"
                    className="btn btn-xs btn-default btn-block sa-chat-learnmore-btn"
                  >
                    About the API
                  </a>
                </div>
                {/* END DISPLAY USERS */}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <span className="minifyme" data-action="minifyMenu">
        <i className="fa fa-arrow-circle-left hit" />
      </span>
    </aside>
  )};
}

export default Sidebar