import React from "react";

export default function Dashboard() {
  return (
    <React.Fragment>
      <div id="ribbon">
        <span class="ribbon-button-alignment">
          <span
            id="refresh"
            class="btn btn-ribbon"
            data-action="resetWidgets"
            data-title="refresh"
            rel="tooltip"
            data-placement="bottom"
            data-original-title="<i class='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings."
            data-html="true"
          >
            <i class="fa fa-refresh" />
          </span>
        </span>

        <ol class="breadcrumb">
          <li>Home</li>
          <li>Dashboard</li>
        </ol>
      </div>

      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">
              <i className="fa-fw fa fa-home" /> Dashboard{" "}
              <span>> My Dashboard</span>
            </h1>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            <ul id="sparks" className="">
              <li className="sparks-info">
                <h5>
                  {" "}
                  My Income <span className="txt-color-blue">$47,171</span>
                </h5>
                <div className="sparkline txt-color-blue hidden-mobile hidden-md hidden-sm">
                  1300, 1877, 2500, 2577, 2000, 2100, 3000, 2700, 3631, 2471,
                  2700, 3631, 2471
                </div>
              </li>
              <li className="sparks-info">
                <h5>
                  {" "}
                  Site Traffic{" "}
                  <span className="txt-color-purple">
                    <i className="fa fa-arrow-circle-up" />&nbsp;45%
                  </span>
                </h5>
                <div className="sparkline txt-color-purple hidden-mobile hidden-md hidden-sm">
                  110,150,300,130,400,240,220,310,220,300, 270, 210
                </div>
              </li>
              <li className="sparks-info">
                <h5>
                  {" "}
                  Site Orders{" "}
                  <span className="txt-color-greenDark">
                    <i className="fa fa-shopping-cart" />&nbsp;2447
                  </span>
                </h5>
                <div className="sparkline txt-color-greenDark hidden-mobile hidden-md hidden-sm">
                  110,150,300,130,400,240,220,310,220,300, 270, 210
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* widget grid */}
        <section id="widget-grid" className="">
          {/* row */}
          <div className="row">
            <article className="col-sm-12">
              {/* new widget */}
              <div
                className="jarviswidget"
                id="wid-id-0"
                data-widget-togglebutton="false"
                data-widget-editbutton="false"
                data-widget-fullscreenbutton="false"
                data-widget-colorbutton="false"
                data-widget-deletebutton="false"
              >
                {/* widget options:
                    usage: <div className="jarviswidget" id="wid-id-0" data-widget-editbutton="false">

                    data-widget-colorbutton="false"
                    data-widget-editbutton="false"
                    data-widget-togglebutton="false"
                    data-widget-deletebutton="false"
                    data-widget-fullscreenbutton="false"
                    data-widget-custombutton="false"
                    data-widget-collapsed="true"
                    data-widget-sortable="false"

                    */}
                <header>
                  <span className="widget-icon">
                    {" "}
                    <i className="glyphicon glyphicon-stats txt-color-darken" />{" "}
                  </span>
                  <h2>Live Feeds </h2>

                  <ul className="nav nav-tabs pull-right in" id="myTab">
                    <li className="active">
                      <a data-toggle="tab" href="#s1">
                        <i className="fa fa-clock-o" />{" "}
                        <span className="hidden-mobile hidden-tablet">
                          Live Stats
                        </span>
                      </a>
                    </li>

                    <li>
                      <a data-toggle="tab" href="#s2">
                        <i className="fa fa-facebook" />{" "}
                        <span className="hidden-mobile hidden-tablet">
                          Social Network
                        </span>
                      </a>
                    </li>

                    <li>
                      <a data-toggle="tab" href="#s3">
                        <i className="fa fa-dollar" />{" "}
                        <span className="hidden-mobile hidden-tablet">
                          Revenue
                        </span>
                      </a>
                    </li>
                  </ul>
                </header>

                {/* widget div*/}
                <div className="no-padding">
                  {/* widget edit box */}
                  <div className="jarviswidget-editbox">test</div>
                  {/* end widget edit box */}

                  <div className="widget-body">
                    {/* content */}
                    <div id="myTabContent" className="tab-content">
                      <div
                        className="tab-pane fade active in padding-10 no-padding-bottom"
                        id="s1"
                      >
                        <div className="row no-space">
                          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                            <span className="demo-liveupdate-1">
                              {" "}
                              <span className="onoffswitch-title">
                                Live switch
                              </span>{" "}
                              <span className="onoffswitch">
                                <input
                                  type="checkbox"
                                  name="start_interval"
                                  className="onoffswitch-checkbox"
                                  id="start_interval"
                                />
                                <label
                                  className="onoffswitch-label"
                                  for="start_interval"
                                >
                                  <span
                                    className="onoffswitch-inner"
                                    data-swchon-text="ON"
                                    data-swchoff-text="OFF"
                                  />
                                  <span className="onoffswitch-switch" />{" "}
                                </label>{" "}
                              </span>{" "}
                            </span>
                            <div
                              id="updating-chart"
                              className="chart-large txt-color-blue"
                            />
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 show-stats">
                            <div className="row">
                              <div className="col-xs-6 col-sm-6 col-md-12 col-lg-12">
                                {" "}
                                <span className="text">
                                  {" "}
                                  My Tasks{" "}
                                  <span className="pull-right">
                                    130/200
                                  </span>{" "}
                                </span>
                                <div className="progress">
                                  <div
                                    className="progress-bar bg-color-blueDark"
                                    style={{ width: "65%" }}
                                  />
                                </div>{" "}
                              </div>
                              <div className="col-xs-6 col-sm-6 col-md-12 col-lg-12">
                                {" "}
                                <span className="text">
                                  {" "}
                                  Transfered{" "}
                                  <span className="pull-right">
                                    440 GB
                                  </span>{" "}
                                </span>
                                <div className="progress">
                                  <div
                                    className="progress-bar bg-color-blue"
                                    style={{ width: "34%" }}
                                  />
                                </div>{" "}
                              </div>
                              <div className="col-xs-6 col-sm-6 col-md-12 col-lg-12">
                                {" "}
                                <span className="text">
                                  {" "}
                                  Bugs Squashed<span className="pull-right">
                                    77%
                                  </span>{" "}
                                </span>
                                <div className="progress">
                                  <div
                                    className="progress-bar bg-color-blue"
                                    style={{ width: "77%" }}
                                  />
                                </div>{" "}
                              </div>
                              <div className="col-xs-6 col-sm-6 col-md-12 col-lg-12">
                                {" "}
                                <span className="text">
                                  {" "}
                                  User Testing{" "}
                                  <span className="pull-right">
                                    7 Days
                                  </span>{" "}
                                </span>
                                <div className="progress">
                                  <div
                                    className="progress-bar bg-color-greenLight"
                                    style={{ width: "84%" }}
                                  />
                                </div>{" "}
                              </div>

                              <span className="show-stat-buttons">
                                {" "}
                                <span className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                  {" "}
                                  <a
                                    href="/"
                                    className="btn btn-default btn-block hidden-xs"
                                  >
                                    Generate PDF
                                  </a>{" "}
                                </span>{" "}
                                <span className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                  {" "}
                                  <a
                                    href="/"
                                    className="btn btn-default btn-block hidden-xs"
                                  >
                                    Report a bug
                                  </a>{" "}
                                </span>{" "}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="show-stat-microcharts">
                          <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                            <div
                              className="easy-pie-chart txt-color-orangeDark"
                              data-percent="33"
                              data-pie-size="50"
                            >
                              <span className="percent percent-sign">35</span>
                            </div>
                            <span className="easy-pie-title">
                              {" "}
                              Server Load{" "}
                              <i className="fa fa-caret-up icon-color-bad" />{" "}
                            </span>
                            <ul className="smaller-stat hidden-sm pull-right">
                              <li>
                                <span className="label bg-color-greenLight">
                                  <i className="fa fa-caret-up" /> 97%
                                </span>
                              </li>
                              <li>
                                <span className="label bg-color-blueLight">
                                  <i className="fa fa-caret-down" /> 44%
                                </span>
                              </li>
                            </ul>
                            <div
                              className="sparkline txt-color-greenLight hidden-sm hidden-md pull-right"
                              data-sparkline-type="line"
                              data-sparkline-height="33px"
                              data-sparkline-width="70px"
                              data-fill-color="transparent"
                            >
                              130, 187, 250, 257, 200, 210, 300, 270, 363, 247,
                              270, 363, 247
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                            <div
                              className="easy-pie-chart txt-color-greenLight"
                              data-percent="78.9"
                              data-pie-size="50"
                            >
                              <span className="percent percent-sign">
                                78.9{" "}
                              </span>
                            </div>
                            <span className="easy-pie-title">
                              {" "}
                              Disk Space{" "}
                              <i className="fa fa-caret-down icon-color-good" />
                            </span>
                            <ul className="smaller-stat hidden-sm pull-right">
                              <li>
                                <span className="label bg-color-blueDark">
                                  <i className="fa fa-caret-up" /> 76%
                                </span>
                              </li>
                              <li>
                                <span className="label bg-color-blue">
                                  <i className="fa fa-caret-down" /> 3%
                                </span>
                              </li>
                            </ul>
                            <div
                              className="sparkline txt-color-blue hidden-sm hidden-md pull-right"
                              data-sparkline-type="line"
                              data-sparkline-height="33px"
                              data-sparkline-width="70px"
                              data-fill-color="transparent"
                            >
                              257, 200, 210, 300, 270, 363, 130, 187, 250, 247,
                              270, 363, 247
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                            <div
                              className="easy-pie-chart txt-color-blue"
                              data-percent="23"
                              data-pie-size="50"
                            >
                              <span className="percent percent-sign">23 </span>
                            </div>
                            <span className="easy-pie-title">
                              {" "}
                              Transfered{" "}
                              <i className="fa fa-caret-up icon-color-good" />
                            </span>
                            <ul className="smaller-stat hidden-sm pull-right">
                              <li>
                                <span className="label bg-color-darken">
                                  10GB
                                </span>
                              </li>
                              <li>
                                <span className="label bg-color-blueDark">
                                  <i className="fa fa-caret-up" /> 10%
                                </span>
                              </li>
                            </ul>
                            <div
                              className="sparkline txt-color-darken hidden-sm hidden-md pull-right"
                              data-sparkline-type="line"
                              data-sparkline-height="33px"
                              data-sparkline-width="70px"
                              data-fill-color="transparent"
                            >
                              200, 210, 363, 247, 300, 270, 130, 187, 250, 257,
                              363, 247, 270
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                            <div
                              className="easy-pie-chart txt-color-darken"
                              data-percent="36"
                              data-pie-size="50"
                            >
                              <span className="percent degree-sign">
                                36 <i className="fa fa-caret-up" />
                              </span>
                            </div>
                            <span className="easy-pie-title">
                              {" "}
                              Temperature{" "}
                              <i className="fa fa-caret-down icon-color-good" />
                            </span>
                            <ul className="smaller-stat hidden-sm pull-right">
                              <li>
                                <span className="label bg-color-red">
                                  <i className="fa fa-caret-up" /> 124
                                </span>
                              </li>
                              <li>
                                <span className="label bg-color-blue">
                                  <i className="fa fa-caret-down" /> 40 F
                                </span>
                              </li>
                            </ul>
                            <div
                              className="sparkline txt-color-red hidden-sm hidden-md pull-right"
                              data-sparkline-type="line"
                              data-sparkline-height="33px"
                              data-sparkline-width="70px"
                              data-fill-color="transparent"
                            >
                              2700, 3631, 2471, 2700, 3631, 2471, 1300, 1877,
                              2500, 2577, 2000, 2100, 3000
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end s1 tab pane */}

                      <div className="tab-pane fade" id="s2">
                        <div className="widget-body-toolbar bg-color-white">
                          <form className="form-inline">
                            <div className="form-group">
                              <label className="sr-only" for="s123">
                                Show From
                              </label>
                              <input
                                type="email"
                                className="form-control input-sm"
                                id="s123"
                                placeholder="Show From"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control input-sm"
                                id="s124"
                                placeholder="To"
                              />
                            </div>

                            <div className="btn-group hidden-phone pull-right">
                              <a
                                className="btn dropdown-toggle btn-xs btn-default"
                                data-toggle="dropdown"
                              >
                                <i className="fa fa-cog" /> More{" "}
                                <span className="caret"> </span>{" "}
                              </a>
                              <ul className="dropdown-menu pull-right">
                                <li>
                                  <a href="/">
                                    <i className="fa fa-file-text-alt" /> Export
                                    to PDF
                                  </a>
                                </li>
                                <li>
                                  <a href="/">
                                    <i className="fa fa-question-sign" /> Help
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </form>
                        </div>
                        <div className="padding-10">
                          <div
                            id="statsChart"
                            className="chart-large has-legend-unique"
                          />
                        </div>
                      </div>
                      {/* end s2 tab pane */}

                      <div className="tab-pane fade" id="s3">
                        <div
                          className="widget-body-toolbar bg-color-white smart-form"
                          id="rev-toggles"
                        >
                          <div className="inline-group">
                            <label for="gra-0" className="checkbox">
                              <input
                                type="checkbox"
                                name="gra-0"
                                id="gra-0"
                                checked="checked"
                              />
                              <i /> Target{" "}
                            </label>
                            <label for="gra-1" className="checkbox">
                              <input
                                type="checkbox"
                                name="gra-1"
                                id="gra-1"
                                checked="checked"
                              />
                              <i /> Actual{" "}
                            </label>
                            <label for="gra-2" className="checkbox">
                              <input
                                type="checkbox"
                                name="gra-2"
                                id="gra-2"
                                checked="checked"
                              />
                              <i /> Signups{" "}
                            </label>
                          </div>

                          <div className="btn-group hidden-phone pull-right">
                            <a
                              className="btn dropdown-toggle btn-xs btn-default"
                              data-toggle="dropdown"
                            >
                              <i className="fa fa-cog" /> More{" "}
                              <span className="caret"> </span>{" "}
                            </a>
                            <ul className="dropdown-menu pull-right">
                              <li>
                                <a href="/">
                                  <i className="fa fa-file-text-alt" /> Export
                                  to PDF
                                </a>
                              </li>
                              <li>
                                <a href="/">
                                  <i className="fa fa-question-sign" /> Help
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="padding-10">
                          <div
                            id="flotcontainer"
                            className="chart-large has-legend-unique"
                          />
                        </div>
                      </div>
                      {/* end s3 tab pane */}
                    </div>

                    {/* end content */}
                  </div>
                </div>
                {/* end widget div */}
              </div>
              {/* end widget */}
            </article>
          </div>

          {/* end row */}

          {/* row */}

          <div className="row">
            <article className="col-sm-12 col-md-12 col-lg-6">
              {/* new widget */}
              <div
                className="jarviswidget jarviswidget-color-blueDark"
                id="wid-id-1"
                data-widget-editbutton="false"
                data-widget-fullscreenbutton="false"
              >
                {/* widget options:
                    usage: <div className="jarviswidget" id="wid-id-0" data-widget-editbutton="false">

                    data-widget-colorbutton="false"
                    data-widget-editbutton="false"
                    data-widget-togglebutton="false"
                    data-widget-deletebutton="false"
                    data-widget-fullscreenbutton="false"
                    data-widget-custombutton="false"
                    data-widget-collapsed="true"
                    data-widget-sortable="false"

                    */}

                <header>
                  <span className="widget-icon">
                    {" "}
                    <i className="fa fa-comments txt-color-white" />{" "}
                  </span>
                  <h2> SmartChat </h2>
                  <div className="widget-toolbar">
                    {/* add: non-hidden - to disable auto hide */}

                    <div className="btn-group">
                      <button
                        className="btn dropdown-toggle btn-xs btn-success"
                        data-toggle="dropdown"
                      >
                        Status <i className="fa fa-caret-down" />
                      </button>
                      <ul className="dropdown-menu pull-right js-status-update">
                        <li>
                          <a href="/">
                            <i className="fa fa-circle txt-color-green" />{" "}
                            Online
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <i className="fa fa-circle txt-color-red" /> Busy
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <i className="fa fa-circle txt-color-orange" /> Away
                          </a>
                        </li>
                        <li className="divider" />
                        <li>
                          <a href="/">
                            <i className="fa fa-power-off" /> Log Off
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </header>

                {/* widget div*/}
                <div>
                  {/* widget edit box */}
                  <div className="jarviswidget-editbox">
                    <div>
                      <label>Title:</label>
                      <input type="text" />
                    </div>
                  </div>
                  {/* end widget edit box */}

                  <div className="widget-body widget-hide-overflow no-padding">
                    {/* content goes here */}

                    {/* CHAT CONTAINER */}
                    <div id="chat-container">
                      <span className="chat-list-open-close">
                        <i className="fa fa-user" />
                        <b>!</b>
                      </span>

                      <div className="chat-list-body custom-scroll">
                        <ul id="chat-users">
                          <li>
                            <a href="/">
                              <img src="img/avatars/5.png" alt="" />Robin Berry{" "}
                              <span className="badge badge-inverse">23</span>
                              <span className="state">
                                <i className="fa fa-circle txt-color-green pull-right" />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img src="img/avatars/male.png" alt="" />Mark
                              Zeukartech{" "}
                              <span className="state">
                                <i className="last-online pull-right">2hrs</i>
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img src="img/avatars/male.png" alt="" />Belmain
                              Dolson{" "}
                              <span className="state">
                                <i className="last-online pull-right">45m</i>
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img src="img/avatars/male.png" alt="" />Galvitch
                              Drewbery{" "}
                              <span className="state">
                                <i className="fa fa-circle txt-color-green pull-right" />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img src="img/avatars/male.png" alt="" />Sadi
                              Orlaf{" "}
                              <span className="state">
                                <i className="fa fa-circle txt-color-green pull-right" />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img src="img/avatars/male.png" alt="" />Markus{" "}
                              <span className="state">
                                <i className="last-online pull-right">2m</i>
                              </span>{" "}
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img src="img/avatars/sunny.png" alt="" />Sunny{" "}
                              <span className="state">
                                <i className="last-online pull-right">2m</i>
                              </span>{" "}
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img src="img/avatars/male.png" alt="" />Denmark{" "}
                              <span className="state">
                                <i className="last-online pull-right">2m</i>
                              </span>{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="chat-list-footer">
                        <div className="control-group">
                          <form className="smart-form">
                            <section>
                              <label className="input">
                                <input
                                  type="text"
                                  id="filter-chat-list"
                                  placeholder="Filter"
                                />
                              </label>
                            </section>
                          </form>
                        </div>
                      </div>
                    </div>

                    {/* CHAT BODY */}
                    <div id="chat-body" className="chat-body custom-scroll">
                      <ul>
                        <li className="message">
                          <img
                            src="img/avatars/5.png"
                            className="online"
                            alt=""
                          />
                          <div className="message-text">
                            <time>2014-01-13</time>{" "}
                            <a href="/" className="username">
                              Sadi Orlaf
                            </a>{" "}
                            Hey did you meet the new board of director? He's a
                            bit of an geek if you ask me...anyway here is the
                            report you requested. I am off to launch with Lisa
                            and Andrew, you wanna join?
                            <p className="chat-file row">
                              <b className="pull-left col-sm-6">
                                {" "}
                                {/*<i className="fa fa-spinner fa-spin"></i>*/}{" "}
                                <i className="fa fa-file" />{" "}
                                report-2013-demographic-report-annual-earnings.xls{" "}
                              </b>
                              <span className="col-sm-6 pull-right">
                                {" "}
                                <a
                                  href="/"
                                  className="btn btn-xs btn-default"
                                >
                                  cancel
                                </a>{" "}
                                <a
                                  href="/"
                                  className="btn btn-xs btn-success"
                                >
                                  save
                                </a>{" "}
                              </span>
                            </p>
                            <p className="chat-file row">
                              <b className="pull-left col-sm-6">
                                {" "}
                                <i className="fa fa-ok txt-color-green" />{" "}
                                tobacco-report-2012.doc{" "}
                              </b>
                              <span className="col-sm-6 pull-right">
                                {" "}
                                <a
                                  href="/"
                                  className="btn btn-xs btn-primary"
                                >
                                  open
                                </a>{" "}
                              </span>
                            </p>{" "}
                          </div>
                        </li>
                        <li className="message">
                          <img
                            src="img/avatars/sunny.png"
                            className="online"
                            alt=""
                          />
                          <div className="message-text">
                            <time>2014-01-13</time>{" "}
                            <a href="/" className="username">
                              John Doe
                            </a>{" "}
                            Haha! Yeah I know what you mean. Thanks for the file
                            Sadi!{" "}
                            <i className="fa fa-smile-o txt-color-orange" />
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* CHAT FOOTER */}
                    <div className="chat-footer">
                      {/* CHAT TEXTAREA */}
                      <div className="textarea-div">
                        <div className="typearea">
                          <textarea
                            placeholder="Write a reply..."
                            id="textarea-expand"
                            className="custom-scroll"
                          />
                        </div>
                      </div>

                      {/* CHAT REPLY/SEND */}
                      <span className="textarea-controls">
                        <button className="btn btn-sm btn-primary pull-right">
                          Reply
                        </button>{" "}
                        <span
                          className="pull-right smart-form"
                          style={{
                            "margin-top": "3px",
                            "margin-right": "10px"
                          }}
                        >
                          {" "}
                          <label className="checkbox pull-right">
                            <input
                              type="checkbox"
                              name="subscription"
                              id="subscription"
                            />
                            <i />Press <strong> ENTER </strong> to send{" "}
                          </label>{" "}
                        </span>{" "}
                        <a href="/" className="pull-left">
                          <i className="fa fa-camera fa-fw fa-lg" />
                        </a>{" "}
                      </span>
                    </div>

                    {/* end content */}
                  </div>
                </div>
                {/* end widget div */}
              </div>
              {/* end widget */}

              {/* new widget */}
              <div
                className="jarviswidget jarviswidget-color-blueDark"
                id="wid-id-3"
                data-widget-colorbutton="false"
              >
                {/* widget options:
                    usage: <div className="jarviswidget" id="wid-id-0" data-widget-editbutton="false">

                    data-widget-colorbutton="false"
                    data-widget-editbutton="false"
                    data-widget-togglebutton="false"
                    data-widget-deletebutton="false"
                    data-widget-fullscreenbutton="false"
                    data-widget-custombutton="false"
                    data-widget-collapsed="true"
                    data-widget-sortable="false"

                    */}
                <header>
                  <span className="widget-icon">
                    {" "}
                    <i className="fa fa-calendar" />{" "}
                  </span>
                  <h2> My Events </h2>
                  <div className="widget-toolbar">
                    {/* add: non-hidden - to disable auto hide */}
                    <div className="btn-group">
                      <button
                        className="btn dropdown-toggle btn-xs btn-default"
                        data-toggle="dropdown"
                      >
                        Showing <i className="fa fa-caret-down" />
                      </button>
                      <ul className="dropdown-menu js-status-update pull-right">
                        <li>
                          <a href="/" id="mt">
                            Month
                          </a>
                        </li>
                        <li>
                          <a href="/" id="ag">
                            Agenda
                          </a>
                        </li>
                        <li>
                          <a href="/" id="td">
                            Today
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </header>

                {/* widget div*/}
                <div>
                  {/* widget edit box */}
                  <div className="jarviswidget-editbox">
                    <input className="form-control" type="text" />
                  </div>
                  {/* end widget edit box */}

                  <div className="widget-body no-padding">
                    {/* content goes here */}
                    <div className="widget-body-toolbar">
                      <div id="calendar-buttons">
                        <div className="btn-group">
                          <a
                            href="/"
                            className="btn btn-default btn-xs"
                            id="btn-prev"
                          >
                            <i className="fa fa-chevron-left" />
                          </a>
                          <a
                            href="/"
                            className="btn btn-default btn-xs"
                            id="btn-next"
                          >
                            <i className="fa fa-chevron-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div id="calendar" />

                    {/* end content */}
                  </div>
                </div>
                {/* end widget div */}
              </div>
              {/* end widget */}
            </article>

            <article className="col-sm-12 col-md-12 col-lg-6">
              {/* new widget */}
              <div
                className="jarviswidget"
                id="wid-id-2"
                data-widget-colorbutton="false"
                data-widget-editbutton="false"
              >
                {/* widget options:
                    usage: <div className="jarviswidget" id="wid-id-0" data-widget-editbutton="false">

                    data-widget-colorbutton="false"
                    data-widget-editbutton="false"
                    data-widget-togglebutton="false"
                    data-widget-deletebutton="false"
                    data-widget-fullscreenbutton="false"
                    data-widget-custombutton="false"
                    data-widget-collapsed="true"
                    data-widget-sortable="false"

                    */}

                <header>
                  <span className="widget-icon">
                    {" "}
                    <i className="fa fa-map-marker" />{" "}
                  </span>
                  <h2>Birds Eye</h2>
                  <div className="widget-toolbar hidden-mobile">
                    <span className="onoffswitch-title">
                      <i className="fa fa-location-arrow" /> Realtime
                    </span>
                    <span className="onoffswitch">
                      <input
                        type="checkbox"
                        name="onoffswitch"
                        className="onoffswitch-checkbox"
                        checked="checked"
                        id="myonoffswitch"
                      />
                      <label className="onoffswitch-label" for="myonoffswitch">
                        {" "}
                        <span
                          className="onoffswitch-inner"
                          data-swchon-text="YES"
                          data-swchoff-text="NO"
                        />{" "}
                        <span className="onoffswitch-switch" />{" "}
                      </label>{" "}
                    </span>
                  </div>
                </header>

                {/* widget div*/}
                <div>
                  {/* widget edit box */}
                  <div className="jarviswidget-editbox">
                    <div>
                      <label>Title:</label>
                      <input type="text" />
                    </div>
                  </div>
                  {/* end widget edit box */}

                  <div className="widget-body no-padding">
                    {/* content goes here */}

                    <div id="vector-map" className="vector-map" />
                    <div id="heat-fill">
                      <span className="fill-a">0</span>

                      <span className="fill-b">5,000</span>
                    </div>

                    <table className="table table-striped table-hover table-condensed">
                      <thead>
                        <tr>
                          <th>Country</th>
                          <th>Visits</th>
                          <th className="text-align-center">User Activity</th>
                          <th className="text-align-center hidden-xs">
                            Online
                          </th>
                          <th className="text-align-center">Demographic</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <a href="/">USA</a>
                          </td>
                          <td>4,977</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline txt-color-blue text-align-center"
                              data-sparkline-height="22px"
                              data-sparkline-width="90px"
                              data-sparkline-barwidth="2"
                            >
                              2700, 3631, 2471, 1300, 1877, 2500, 2577, 2700,
                              3631, 2471, 2000, 2100, 3000
                            </div>
                          </td>
                          <td className="text-align-center hidden-xs">143</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline display-inline"
                              data-sparkline-type="pie"
                              data-sparkline-piecolor="[&quot;#E979BB&quot;, &quot;#57889C&quot;]"
                              data-sparkline-offset="90"
                              data-sparkline-piesize="23px"
                            >
                              17,83
                            </div>
                            <div className="btn-group display-inline pull-right text-align-left hidden-tablet">
                              <button
                                className="btn btn-xs btn-default dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                <i className="fa fa-cog fa-lg" />
                              </button>
                              <ul className="dropdown-menu dropdown-menu-xs pull-right">
                                <li>
                                  <a href="/">
                                    <i className="fa fa-file fa-lg fa-fw txt-color-greenLight" />{" "}
                                    <u>P</u>DF
                                  </a>
                                </li>
                                <li>
                                  <a href="/">
                                    <i className="fa fa-times fa-lg fa-fw txt-color-red" />{" "}
                                    <u>D</u>elete
                                  </a>
                                </li>
                                <li className="divider" />
                                <li className="text-align-center">
                                  <a href="/">Cancel</a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="/">Australia</a>
                          </td>
                          <td>4,873</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline txt-color-blue text-align-center"
                              data-sparkline-height="22px"
                              data-sparkline-width="90px"
                              data-sparkline-barwidth="2"
                            >
                              1000, 1100, 3030, 1300, -1877, -2500, -2577,
                              -2700, 3631, 2471, 4700, 1631, 2471
                            </div>
                          </td>
                          <td className="text-align-center hidden-xs">247</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline display-inline"
                              data-sparkline-type="pie"
                              data-sparkline-piecolor="[&quot;#E979BB&quot;, &quot;#57889C&quot;]"
                              data-sparkline-offset="90"
                              data-sparkline-piesize="23px"
                            >
                              22,88
                            </div>
                            <div className="btn-group display-inline pull-right text-align-left hidden-tablet">
                              <button
                                className="btn btn-xs btn-default dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                <i className="fa fa-cog fa-lg" />
                              </button>
                              <ul className="dropdown-menu dropdown-menu-xs pull-right">
                                <li>
                                  <a href="/">
                                    <i className="fa fa-file fa-lg fa-fw txt-color-greenLight" />{" "}
                                    <u>P</u>DF
                                  </a>
                                </li>
                                <li>
                                  <a href="/">
                                    <i className="fa fa-times fa-lg fa-fw txt-color-red" />{" "}
                                    <u>D</u>elete
                                  </a>
                                </li>
                                <li className="divider" />
                                <li className="text-align-center">
                                  <a href="/">Cancel</a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="/">India</a>
                          </td>
                          <td>3,671</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline txt-color-blue text-align-center"
                              data-sparkline-height="22px"
                              data-sparkline-width="90px"
                              data-sparkline-barwidth="2"
                            >
                              3631, 1471, 2400, 3631, 471, 1300, 1177, 2500,
                              2577, 3000, 4100, 3000, 7700
                            </div>
                          </td>
                          <td className="text-align-center hidden-xs">373</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline display-inline"
                              data-sparkline-type="pie"
                              data-sparkline-piecolor="[&quot;#E979BB&quot;, &quot;#57889C&quot;]"
                              data-sparkline-offset="90"
                              data-sparkline-piesize="23px"
                            >
                              10,90
                            </div>
                            <div className="btn-group display-inline pull-right text-align-left hidden-tablet">
                              <button
                                className="btn btn-xs btn-default dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                <i className="fa fa-cog fa-lg" />
                              </button>
                              <ul className="dropdown-menu dropdown-menu-xs pull-right">
                                <li>
                                  <a href="/">
                                    <i className="fa fa-file fa-lg fa-fw txt-color-greenLight" />{" "}
                                    <u>P</u>DF
                                  </a>
                                </li>
                                <li>
                                  <a href="/">
                                    <i className="fa fa-times fa-lg fa-fw txt-color-red" />{" "}
                                    <u>D</u>elete
                                  </a>
                                </li>
                                <li className="divider" />
                                <li className="text-align-center">
                                  <a href="/">Cancel</a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="/">Brazil</a>
                          </td>
                          <td>2,476</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline txt-color-blue text-align-center"
                              data-sparkline-height="22px"
                              data-sparkline-width="90px"
                              data-sparkline-barwidth="2"
                            >
                              2700, 1877, 2500, 2577, 2000, 3631, 2471, -2700,
                              -3631, 2471, 1300, 2100, 3000,
                            </div>
                          </td>
                          <td className="text-align-center hidden-xs ">741</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline display-inline"
                              data-sparkline-type="pie"
                              data-sparkline-piecolor="[&quot;#E979BB&quot;, &quot;#57889C&quot;]"
                              data-sparkline-offset="90"
                              data-sparkline-piesize="23px"
                            >
                              34,66
                            </div>
                            <div className="btn-group display-inline pull-right text-align-left hidden-tablet">
                              <button
                                className="btn btn-xs btn-default dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                <i className="fa fa-cog fa-lg" />
                              </button>
                              <ul className="dropdown-menu dropdown-menu-xs pull-right">
                                <li>
                                  <a href="/">
                                    <i className="fa fa-file fa-lg fa-fw txt-color-greenLight" />{" "}
                                    <u>P</u>DF
                                  </a>
                                </li>
                                <li>
                                  <a href="/">
                                    <i className="fa fa-times fa-lg fa-fw txt-color-red" />{" "}
                                    <u>D</u>elete
                                  </a>
                                </li>
                                <li className="divider" />
                                <li className="text-align-center">
                                  <a href="/">Cancel</a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="/">Turkey</a>
                          </td>
                          <td>1,476</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline txt-color-blue text-align-center"
                              data-sparkline-height="22px"
                              data-sparkline-width="90px"
                              data-sparkline-barwidth="2"
                            >
                              1300, 1877, 2500, 2577, 2000, 2100, 3000, -2471,
                              -2700, -3631, -2471, 2700, 3631
                            </div>
                          </td>
                          <td className="text-align-center hidden-xs">123</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline display-inline"
                              data-sparkline-type="pie"
                              data-sparkline-piecolor="[&quot;#E979BB&quot;, &quot;#57889C&quot;]"
                              data-sparkline-offset="90"
                              data-sparkline-piesize="23px"
                            >
                              75,25
                            </div>
                            <div className="btn-group display-inline pull-right text-align-left hidden-tablet">
                              <button
                                className="btn btn-xs btn-default dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                <i className="fa fa-cog fa-lg" />
                              </button>
                              <ul className="dropdown-menu dropdown-menu-xs pull-right">
                                <li>
                                  <a href="/">
                                    <i className="fa fa-file fa-lg fa-fw txt-color-greenLight" />{" "}
                                    <u>P</u>DF
                                  </a>
                                </li>
                                <li>
                                  <a href="/">
                                    <i className="fa fa-times fa-lg fa-fw txt-color-red" />{" "}
                                    <u>D</u>elete
                                  </a>
                                </li>
                                <li className="divider" />
                                <li className="text-align-center">
                                  <a href="/">Cancel</a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="/">Canada</a>
                          </td>
                          <td>146</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline txt-color-orange text-align-center"
                              data-sparkline-height="22px"
                              data-sparkline-width="90px"
                              data-sparkline-barwidth="2"
                            >
                              5, 34, 10, 1, 4, 6, -9, -1, 0, 0, 5, 6, 7
                            </div>
                          </td>
                          <td className="text-align-center hidden-xs">23</td>
                          <td className="text-align-center">
                            <div
                              className="sparkline display-inline"
                              data-sparkline-type="pie"
                              data-sparkline-piecolor="[&quot;#E979BB&quot;, &quot;#57889C&quot;]"
                              data-sparkline-offset="90"
                              data-sparkline-piesize="23px"
                            >
                              50,50
                            </div>
                            <div className="btn-group display-inline pull-right text-align-left hidden-tablet">
                              <button
                                className="btn btn-xs btn-default dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                <i className="fa fa-cog fa-lg" />
                              </button>
                              <ul className="dropdown-menu dropdown-menu-xs pull-right">
                                <li>
                                  <a href="/">
                                    <i className="fa fa-file fa-lg fa-fw txt-color-greenLight" />{" "}
                                    <u>P</u>DF
                                  </a>
                                </li>
                                <li>
                                  <a href="/">
                                    <i className="fa fa-times fa-lg fa-fw txt-color-red" />{" "}
                                    <u>D</u>elete
                                  </a>
                                </li>
                                <li className="divider" />
                                <li className="text-align-center">
                                  <a href="/">Cancel</a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="5">
                            <ul className="pagination pagination-xs no-margin">
                              <li className="prev disabled">
                                <a href="/">Previous</a>
                              </li>
                              <li className="active">
                                <a href="/">1</a>
                              </li>
                              <li>
                                <a href="/">2</a>
                              </li>
                              <li>
                                <a href="/">3</a>
                              </li>
                              <li className="next">
                                <a href="/">Next</a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tfoot>
                    </table>

                    {/* end content */}
                  </div>
                </div>
                {/* end widget div */}
              </div>
              {/* end widget */}

              {/* new widget */}
              <div
                className="jarviswidget jarviswidget-color-blue"
                id="wid-id-4"
                data-widget-editbutton="false"
                data-widget-colorbutton="false"
              >
                {/* widget options:
                    usage: <div className="jarviswidget" id="wid-id-0" data-widget-editbutton="false">

                    data-widget-colorbutton="false"
                    data-widget-editbutton="false"
                    data-widget-togglebutton="false"
                    data-widget-deletebutton="false"
                    data-widget-fullscreenbutton="false"
                    data-widget-custombutton="false"
                    data-widget-collapsed="true"
                    data-widget-sortable="false"

                    */}

                <header>
                  <span className="widget-icon">
                    {" "}
                    <i className="fa fa-check txt-color-white" />{" "}
                  </span>
                  <h2> ToDo's </h2>
                  {/* <div className="widget-toolbar">
                        add: non-hidden - to disable auto hide

                        </div>*/}
                </header>

                {/* widget div*/}
                <div>
                  {/* widget edit box */}
                  <div className="jarviswidget-editbox">
                    <div>
                      <label>Title:</label>
                      <input type="text" />
                    </div>
                  </div>
                  {/* end widget edit box */}

                  <div className="widget-body no-padding smart-form">
                    {/* content goes here */}
                    <h5 className="todo-group-title">
                      <i className="fa fa-warning" /> Critical Tasks (<small className="num-of-tasks">
                        1
                      </small>)
                    </h5>
                    <ul id="sortable1" className="todo">
                      <li>
                        <span className="handle">
                          {" "}
                          <label className="checkbox">
                            <input type="checkbox" name="checkbox-inline" />
                            <i />{" "}
                          </label>{" "}
                        </span>
                        <p>
                          <strong>Ticket #17643</strong> - Hotfix for WebApp
                          interface issue [<a
                            href="/"
                            className="font-xs"
                          >
                            More Details
                          </a>]{" "}
                          <span className="text-muted">
                            Sea deep blessed bearing under darkness from God air
                            living isn't.{" "}
                          </span>
                          <span className="date">Jan 1, 2014</span>
                        </p>
                      </li>
                    </ul>
                    <h5 className="todo-group-title">
                      <i className="fa fa-exclamation" /> Important Tasks (<small className="num-of-tasks">
                        3
                      </small>)
                    </h5>
                    <ul id="sortable2" className="todo">
                      <li>
                        <span className="handle">
                          {" "}
                          <label className="checkbox">
                            <input type="checkbox" name="checkbox-inline" />
                            <i />{" "}
                          </label>{" "}
                        </span>
                        <p>
                          <strong>Ticket #1347</strong> - Inbox email is being
                          sent twice <small>(bug fix)</small> [<a
                            href="/"
                            className="font-xs"
                          >
                            More Details
                          </a>] <span className="date">Nov 22, 2013</span>
                        </p>
                      </li>
                      <li>
                        <span className="handle">
                          {" "}
                          <label className="checkbox">
                            <input type="checkbox" name="checkbox-inline" />
                            <i />{" "}
                          </label>{" "}
                        </span>
                        <p>
                          <strong>Ticket #1314</strong> - Call customer support
                          re: Issue{" "}
                          <a href="/" className="font-xs">
                            #6134
                          </a>
                          <small>(code review)</small>
                          <span className="date">Nov 22, 2013</span>
                        </p>
                      </li>
                      <li>
                        <span className="handle">
                          {" "}
                          <label className="checkbox">
                            <input type="checkbox" name="checkbox-inline" />
                            <i />{" "}
                          </label>{" "}
                        </span>
                        <p>
                          <strong>Ticket #17643</strong> - Hotfix for WebApp
                          interface issue [<a
                            href="/"
                            className="font-xs"
                          >
                            More Details
                          </a>]{" "}
                          <span className="text-muted">
                            Sea deep blessed bearing under darkness from God air
                            living isn't.{" "}
                          </span>
                          <span className="date">Jan 1, 2014</span>
                        </p>
                      </li>
                    </ul>

                    <h5 className="todo-group-title">
                      <i className="fa fa-check" /> Completed Tasks (<small className="num-of-tasks">
                        1
                      </small>)
                    </h5>
                    <ul id="sortable3" className="todo">
                      <li className="complete">
                        <span className="handle" style={{ display: "none" }}>
                          {" "}
                          <label className="checkbox state-disabled">
                            <input
                              type="checkbox"
                              name="checkbox-inline"
                              checked="checked"
                              disabled="disabled"
                            />
                            <i />{" "}
                          </label>{" "}
                        </span>
                        <p>
                          <strong>Ticket #17643</strong> - Hotfix for WebApp
                          interface issue [<a
                            href="/"
                            className="font-xs"
                          >
                            More Details
                          </a>]{" "}
                          <span className="text-muted">
                            Sea deep blessed bearing under darkness from God air
                            living isn't.{" "}
                          </span>
                          <span className="date">Jan 1, 2014</span>
                        </p>
                      </li>
                    </ul>

                    {/* end content */}
                  </div>
                </div>
                {/* end widget div */}
              </div>
              {/* end widget */}
            </article>
          </div>

          {/* end row */}
        </section>
      </div>
    </React.Fragment>
  );
}
