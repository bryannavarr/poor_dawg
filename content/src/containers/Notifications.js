import React from "react";
import * as notificationService from "../services/notification.service";
import NotificationsForm from "./NotificationForm";

class Notifications extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         notifications: []
      };

      this.onCancel = this.onCancel.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.onSave = this.onSave.bind(this);
      this.onSelect = this.onSelect.bind(this);
   }

   componentDidMount() {
      notificationService.readAll().then(data => {
         this.setState({ notifications: data.items });
      });
   }

   onCancel() {
      this.setState({ formData: null });
   }

   onDelete() {
      const formData = this.state.formData;

      notificationService
         .del(formData._id)
         .then(() => {
            this.setState(prevState => {
               const updatedItems = prevState.notifications.filter(item => {
                  return item._id !== formData._id;
               });
               return { notifications: updatedItems };
            });

            this.onCancel();
         })
         .catch(err => console.log(err));
   }

   onSave(updatedFormData) {
      this.setState(prevState => {
         const existingItem = prevState.notifications.filter(item => {
            return item._id === updatedFormData._id;
         });

         let updatedItems = [];

         if (existingItem && existingItem.length > 0) {
            updatedItems = prevState.notifications.map(item => {
               return item._id === updatedFormData._id ? updatedFormData : item;
            });
         } else {
            updatedItems = prevState.notifications.concat(updatedFormData);
         }

         return {
            notifications: updatedItems,
            formData: null,
            errorMessage: null
         };
      });
   }

   onSelect(item, event) {
      event.preventDefault();
      this.setState({
         formData: item
      });
   }

   render() {
      const notifications = this.state.notifications ? (
         this.state.notifications.map(notification => (
            <li
               key={notification._id}
               onClick={this.onSelect.bind(this, notification)}
            >
               {notification.message}
            </li>
         ))
      ) : (
         <React.Fragment />
      );

      return (
         <React.Fragment>
            <div id="main" style={{marginLeft: 0}} role="main">
            <div id="ribbon">
				<span className="ribbon-button-alignment"> 
					<span id="refresh" className="btn btn-ribbon" data-action="resetWidgets" data-title="refresh"  rel="tooltip" data-placement="bottom" data-original-title="<i className='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings." data-html="true">
						<i className="fa fa-refresh"></i>
					</span> 
				</span>
				<ol className="breadcrumb">
					<li>Home</li><li>Notifications</li>
				</ol>
			</div>
            <div id="content" style={{paddingLeft: 13}}>
            <div className="row">
					<div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
						<h1 className="page-title txt-color-blueDark">
							
							<i className="fa-fw fa fa-home"></i> 
								Notifications 
							
						</h1>
					</div>
				</div>
            <section id="widget-grid">
                  <div className="row">
                     <div className="col-sm-6">
                        <div
                           className="jarviswidget"
                           id="wid-id-0"
                           data-widget-colorbutton="false"
                           data-widget-editbutton="false"
                           data-widget-deletebutton="false"
                           data-widget-sortable="false"
                           data-widget-fullscreenbutton="true"
                        >
                           <header>
                              <h2><i className="fa fa-bell-o"/>  Notifications</h2>
                           </header>
                           <div>
                              <div className="jarviswidget-editbox" />
                              <div className="widget-body">
                                 <ul>{notifications}</ul>
                                 <NotificationsForm
                                    formData={this.state.formData}
                                    onSave={this.onSave}
                                    onDelete={this.onDelete}
                                    onCancel={this.onCancel}
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
               </div>
            </div>
         </React.Fragment>
      );
   }
}

export default Notifications;
