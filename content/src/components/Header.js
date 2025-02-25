import React from "react";

export default function Header() {
  return (
    <header id="header">
      <div id="logo-group">
        {/*  PLACE YOUR LOGO HERE */}
        <span id="logo">
          {" "}
          <img src="smartadmin/img/logo.png" alt="SmartAdmin" />{" "}
        </span>
        {/*  END LOGO PLACEHOLDER */}

        {/*  Note: The activity badge color changes when clicked and resets the number to 0
				Suggestion: You may want to set a flag when this happens to tick off all checked messages / notifications */}
        <span id="activity" className="activity-dropdown">
          {" "}
          <i className="fa fa-user" /> <b className="badge"> 21 </b>{" "}
        </span>

        {/*  AJAX-DROPDOWN : control this dropdown height, look and feel from the LESS variable file */}
        <div className="ajax-dropdown">
          {/*  the ID links are fetched via AJAX to the ajax container "ajax-notifications" */}
          <div className="btn-group btn-group-justified" data-toggle="buttons">
            <label className="btn btn-default">
              <input type="radio" name="activity" id="ajax/notify/mail.html" />
              Msgs (14){" "}
            </label>
            <label className="btn btn-default">
              <input
                type="radio"
                name="activity"
                id="ajax/notify/notifications.html"
              />> notify (3){" "}
            </label>
            <label className="btn btn-default">
              <input type="radio" name="activity" id="ajax/notify/tasks.html" />>
              Tasks (4){" "}
            </label>
          </div>

          {/*  notification content */}
          <div className="ajax-notifications custom-scroll">
            <div className="alert alert-transparent">
              <h4>Click a button to show messages here</h4>
              This blank page message helps protect your privacy, or you can
              show the first message here automatically.
            </div>

            <i className="fa fa-lock fa-4x fa-border" />
          </div>
          {/*  end notification content */}

          {/*  footer: refresh area */}
          <span>
            {" "}
            Last updated on: 12/12/2013 9:43AM
            <button
              type="button"
              data-loading-text="<i className='fa fa-refresh fa-spin'></i> Loading..."
              className="btn btn-xs btn-default pull-right"
            >
              <i className="fa fa-refresh" />
            </button>
          </span>
          {/*  end footer */}
        </div>
        {/*  END AJAX-DROPDOWN */}
      </div>

      {/*  projects dropdown */}
      <div className="project-context hidden-xs">
        <span className="label">Projects:</span>
        <span
          className="project-selector dropdown-toggle"
          data-toggle="dropdown"
        >
          Recent projects <i className="fa fa-angle-down" />
        </span>

        {/*  Suggestion: populate this list with fetch and push technique */}
        <ul className="dropdown-menu">
          <li>
            <a href="/">
              Online e-merchant management system - attaching integration with
              the iOS
            </a>
          </li>
          <li>
            <a href="/">Notes on pipeline upgradee</a>
          </li>
          <li>
            <a href="/">
              Assesment Report for merchant account
            </a>
          </li>
          <li className="divider" />
          <li>
            <a href="/">
              <i className="fa fa-power-off" /> Clear
            </a>
          </li>
        </ul>
        {/*  end dropdown-menu*/}
      </div>
      {/*  end projects dropdown */}

      {/*  pulled right: nav area */}
      <div className="pull-right">
        {/*  collapse menu button */}
        <div id="hide-menu" className="btn-header pull-right">
          <span>
            {" "}
            <a
              href="/"
              data-action="toggleMenu"
              title="Collapse Menu"
            >
              <i className="fa fa-reorder" />
            </a>{" "}
          </span>
        </div>
        {/*  end collapse menu */}

        {/*  #MOBILE */}
        {/*  Top menu profile link : this shows only when top menu is active */}
        <ul
          id="mobile-profile-img"
          className="header-dropdown-list hidden-xs padding-5"
        >
          <li className="">
            <a
              href="/"
              className="dropdown-toggle no-margin userdropdown"
              data-toggle="dropdown"
            >
              <img
                src="smartadmin/img/avatars/sunny.png"
                alt="John Doe"
                className="online"
              />
            </a>
            <ul className="dropdown-menu pull-right">
              <li>
                <a
                  href="/"
                  className="padding-10 padding-top-0 padding-bottom-0"
                >
                  <i className="fa fa-cog" /> Setting
                </a>
              </li>
              <li className="divider" />
              <li>
                <a
                  href="profile.html"
                  className="padding-10 padding-top-0 padding-bottom-0"
                >
                  {" "}
                  <i className="fa fa-user" /> <u>P</u>rofile
                </a>
              </li>
              <li className="divider" />
              <li>
                <a
                  href="/"
                  className="padding-10 padding-top-0 padding-bottom-0"
                  data-action="toggleShortcut"
                >
                  <i className="fa fa-arrow-down" /> <u>S</u>hortcut
                </a>
              </li>
              <li className="divider" />
              <li>
                <a
                  href="/"
                  className="padding-10 padding-top-0 padding-bottom-0"
                  data-action="launchFullscreen"
                >
                  <i className="fa fa-arrows-alt" /> Full <u>S</u>creen
                </a>
              </li>
              <li className="divider" />
              <li>
                <a
                  href="login.html"
                  className="padding-10 padding-top-5 padding-bottom-5"
                  data-action="userLogout"
                >
                  <i className="fa fa-sign-out fa-lg" />{" "}
                  <strong>
                    <u>L</u>ogout
                  </strong>
                </a>
              </li>
            </ul>
          </li>
        </ul>

        {/*  logout button */}
        <div id="logout" className="btn-header transparent pull-right">
          <span>
            {" "}
            <a
              href="login.html"
              title="Sign Out"
              data-action="userLogout"
              data-logout-msg="You can improve your security further after logging out by closing this opened browser"
            >
              <i className="fa fa-sign-out" />
            </a>{" "}
          </span>
        </div>
        {/*  end logout button */}

        {/*  search mobile button (this is hidden till mobile view port) */}
        <div id="search-mobile" className="btn-header transparent pull-right">
          <span>
            {" "}
            <a href="/" title="Search">
              <i className="fa fa-search" />
            </a>{" "}
          </span>
        </div>
        {/*  end search mobile button */}

        {/*  input: search field */}
        <form action="search.html" className="header-search pull-right">
          <input
            id="search-fld"
            type="text"
            name="param"
            placeholder="Find reports and more"
            data-autocomplete="[
					&quot;ActionScript&quot;,
					&quot;AppleScript&quot;,
					&quot;Asp&quot;,
					&quot;BASIC&quot;,
					&quot;C&quot;,
					&quot;C++&quot;,
					&quot;Clojure&quot;,
					&quot;COBOL&quot;,
					&quot;ColdFusion&quot;,
					&quot;Erlang&quot;,
					&quot;Fortran&quot;,
					&quot;Groovy&quot;,
					&quot;Haskell&quot;,
					&quot;Java&quot;,
					&quot;JavaScript&quot;,
					&quot;Lisp&quot;,
					&quot;Perl&quot;,
					&quot;PHP&quot;,
					&quot;Python&quot;,
					&quot;Ruby&quot;,
					&quot;Scala&quot;,
					&quot;Scheme&quot;]"
          />
          <button type="submit">
            <i className="fa fa-search" />
          </button>
          <a
            href="/"
            id="cancel-search-js"
            title="Cancel Search"
          >
            <i className="fa fa-times" />
          </a>
        </form>
        {/*  end input: search field */}

        {/*  fullscreen button */}
        <div id="fullscreen" className="btn-header transparent pull-right">
          <span>
            {" "}
            <a
              href="/"
              data-action="launchFullscreen"
              title="Full Screen"
            >
              <i className="fa fa-arrows-alt" />
            </a>{" "}
          </span>
        </div>
        {/*  end fullscreen button */}

        {/*  #Voice Command: Start Speech */}
        <div
          id="speech-btn"
          className="btn-header transparent pull-right hidden-sm hidden-xs"
        >
          <div>
            <a
              href="/"
              title="Voice Command"
              data-action="voiceCommand"
            >
              <i className="fa fa-microphone" />
            </a>
            <div className="popover bottom">
              <div className="arrow" />
              <div className="popover-content">
                <h4 className="vc-title">
                  Voice command activated <br />
                  <small>Please speak clearly into the mic</small>
                </h4>
                <h4 className="vc-title-error text-center">
                  <i className="fa fa-microphone-slash" /> Voice command failed
                  <br />
                  <small className="txt-color-red">
                    Must <strong>"Allow"</strong> Microphone
                  </small>
                  <br />
                  <small className="txt-color-red">
                    Must have <strong>Internet Connection</strong>
                  </small>
                </h4>
                <a
                  href="/"
                  className="btn btn-success"
                >
                  See Commands
                </a>
                <a
                  href="/"
                  className="btn bg-color-purple txt-color-white"
                >
                  Close Popup
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*  end voice command */}

        {/*  multiple lang dropdown : find all flags in the flags page */}
        <ul className="header-dropdown-list hidden-xs">
          <li>
            <a href="/" className="dropdown-toggle" data-toggle="dropdown">
              {" "}
              <img
                src="smartadmin/img/blank.gif"
                className="flag flag-us"
                alt="United States"
              />{" "}
              <span> English (US) </span> <i className="fa fa-angle-down" />{" "}
            </a>
            <ul className="dropdown-menu pull-right">
              <li className="active">
                <a href="/">
                  <img
                    src="smartadmin/img/blank.gif"
                    className="flag flag-us"
                    alt="United States"
                  />{" "}
                  English (US)
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="smartadmin/img/blank.gif"
                    className="flag flag-fr"
                    alt="France"
                  />{" "}
                  Français
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="smartadmin/img/blank.gif"
                    className="flag flag-es"
                    alt="Spanish"
                  />{" "}
                  Español
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="smartadmin/img/blank.gif"
                    className="flag flag-de"
                    alt="German"
                  />{" "}
                  Deutsch
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="smartadmin/img/blank.gif"
                    className="flag flag-jp"
                    alt="Japan"
                  />{" "}
                  日本語
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="smartadmin/img/blank.gif"
                    className="flag flag-cn"
                    alt="China"
                  />{" "}
                  中文
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="smartadmin/img/blank.gif"
                    className="flag flag-it"
                    alt="Italy"
                  />{" "}
                  Italiano
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="smartadmin/img/blank.gif"
                    className="flag flag-pt"
                    alt="Portugal"
                  />{" "}
                  Portugal
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="smartadmin/img/blank.gif"
                    className="flag flag-ru"
                    alt="Russia"
                  />{" "}
                  Русский язык
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="smartadmin/img/blank.gif"
                    className="flag flag-kr"
                    alt="Korea"
                  />{" "}
                  한국어
                </a>
              </li>
            </ul>
          </li>
        </ul>
        {/*  end multiple lang */}
      </div>
      {/*  end pulled right: nav area */}
    </header>
  );
}
