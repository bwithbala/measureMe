
var startLat;
var startLong;
var stopLat;
var stopLong;
var dist;


sap.ui.jsview("measureme.landingView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf measureme.landingView
	*/ 
	getControllerName : function() {
		return "measureme.landingView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf measureme.landingView
	*/ 
	createContent : function(oController) {

		jQuery.sap.require("sap.ui.core.IconPool");		
		
		alert("Creating App");
		
		jQuery.sap.require("measureme.resources.app");		
		

		
		
	var butStartStop = new sap.m.Button("butStartStop",
			{   
		        type: sap.m.ButtonType.Emphasized,
    	    	icon:sap.ui.core.IconPool.getIconURI("begin"),
    	    	text: "Start",
    	    	press: function(){
    	    		var butText = butStartStop.getText();
    	    		alert("BUtton Text:" +butText);
    	    		
    	    		if ( butText == "Start" ) {
    	    			butStartStop.setText("Stop");
    	    			
    					if (navigator.geolocation)
    					{    						
    					alert("Before Show Position Start Function ");
    					   navigator.geolocation.getCurrentPosition(showPositionStart,showError);
    					}
    					else{
    						alert("Geolocation is not supported by this browser.");
    						}      	    			
    	    			

    	    		}
	    			else {
	    				
	    				butStartStop.setText("Start");
	    				
    					alert("Inside Stop");
    					if (navigator.geolocation)
    					{    						
    					alert("Before Show Position Stop Function ");    					
    					   navigator.geolocation.getCurrentPosition(showPositionStop,showError);
    					}
    					else{
    						alert("Geolocation is not supported by this browser.");
    						}      
    					   
    					   alert("Start Lat" +startLat);
    					   alert("Start Long" +startLong);
    					   alert("Stop Lat" +stopLat);
    					   alert("Stop Long" +stopLong);
    					   
    					   distance(startLat, startLong, stopLat, stopLong);
    					   
    					   ioDistMiles.setValue(dist);
    					   alert("Distance in Miles:" + dist);
    					   
    					   var distKMValue = dist * 1.609344;
    					   
    					   ioDistKM.setValue(distKMValue);
    					   alert("Distance in KM:" + distKMValue);

    					
    					   var distNauValue = dist * 0.8684;
    					   
    					   ioDistNau.setValue(distNauValue);
    					   alert("Distance in Nautical Miles:" + distNauValue);
    					   
    					
	    				
	    				
	    			}	
 
    	    	     }
    	    		} 
	);	
		
	var barFooter =	new sap.m.Bar({
			id: 'mainPage-footer',
			contentMiddle: [
                             butStartStop
							]
		});
		
		
		var mainPage = new sap.m.Page("mainPage", {
			title : "Measure Me",
			BackgroundDesign: sap.m.BackgroundDesign.translucent,
			showHeader : true,
			enableScrolling : true,
			footer: barFooter,
		});		
		
		
		var rfl = sap.ui.layout.ResponsiveFlowLayout;
		var rflLD = sap.ui.layout.ResponsiveFlowLayoutData;		
		
		var oLayout = new rfl("rfl_firstname");
		oLayout.setLayoutData(new rflLD({
			minWidth : 250,
			margin : false
		}));		
		
		
		var ioDistMiles = new sap.m.Input({
			enabled: false,
			placeholder : "Distance In Miles"});
		
		ioDistMiles.setLayoutData(new rflLD({
			//minWidth : 250,
			margin : false
		}));		

		var ioDistKM = new sap.m.Input({
			enabled: false,
			placeholder : "Distance In Kilometer"});
		
		ioDistKM.setLayoutData(new rflLD({
			//minWidth : 250,
			margin : false
		}));		
		
		var ioDistNau = new sap.m.Input({
			enabled: false,
			placeholder : "Distance In Nautical Miles"});
		
		ioDistNau.setLayoutData(new rflLD({
			//minWidth : 250,
			margin : false
		}));		
		
		oLayout.addContent(ioDistMiles);
		oLayout.addContent(ioDistKM);
		oLayout.addContent(ioDistNau);
		
		mainPage.addContent(oLayout);			
		measureApp.addPage(mainPage);		


		//alert("App Created" +measureApp);
		
		
		function showPositionStart(position)
		{
	//	var latlon=position.coords.latitude+","+position.coords.longitude;
	//	alert("Lat & Long" +latlon);
		
		startLat = position.coords.latitude;
		startLong = position.coords.longitude;
		alert("Start Lat " +startLat);
		alert("Start Long " +startLong);
		
		
		/*var  img_url="http://maps.googleapis.com/maps/api/staticmap?center="
		+latlon+"&zoom=14&size=300x200&sensor=false";
		// document.getElementById("mapholder").innerHTML="<img src='"+img_url+"'>";
		//alert("Image URL inside Show Position:" +img_url);
		var vUserLocImage = sap.ui.getCore().byId("imgUserLoc");	
		vUserLocImage.setSrc(img_url);
		vUserLocImage.setAlt("My Location");*/
		//return vUserLocImage;

		}
		
		function showPositionStop(position)
		{
			//alert("Inside Show Position Stop");
		//var latlon=position.coords.latitude+","+position.coords.longitude;
	//	alert("Lat & Long" +latlon);
		
		stopLat = position.coords.latitude;
		stopLong = position.coords.longitude;
		alert("Stop Lat " +stopLat);
		alert("Sttop Long " +stopLong);

		/*var  img_url="http://maps.googleapis.com/maps/api/staticmap?center="
		+latlon+"&zoom=14&size=300x200&sensor=false";
		// document.getElementById("mapholder").innerHTML="<img src='"+img_url+"'>";
		//alert("Image URL inside Show Position:" +img_url);
		var vUserLocImage = sap.ui.getCore().byId("imgUserLoc");	
		vUserLocImage.setSrc(img_url);
		vUserLocImage.setAlt("My Location");*/
		//return vUserLocImage;

		}		
		

		function showError(error)
		{
		switch(error.code) 
		  {
		 case error.PERMISSION_DENIED:
		    //x.innerHTML="User denied the request for Geolocation."
		    alert("User denied the request for Geolocation.");	  
		    break;
		  case error.POSITION_UNAVAILABLE:
		  //  x.innerHTML="Location information is unavailable."
		  	alert("Location information is unavailable.");
		    break;
		  case error.TIMEOUT:
		    //x.innerHTML="The request to get user location timed out."
		  	  alert("The request to get user location timed out.");  
		    break;
		  case error.UNKNOWN_ERROR:
		    //x.innerHTML="An unknown error occurred."
		  	  alert("An unknown error occurred.");  
		    break;
	
		}
		}
		
		function distance(lat1, lon1, lat2, lon2) {
			alert("Inside Distance");
			
			    var radlat1 = Math.PI * lat1/180;
			
			    var radlat2 = Math.PI * lat2/180;
			
			    var radlon1 = Math.PI * lon1/180;
			
			    var radlon2 = Math.PI * lon2/180;
			
			    var theta = lon1-lon2;
			
			    var radtheta = Math.PI * theta/180;
			
			    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			
			    dist = Math.acos(dist);
			
			    dist = dist * 180/Math.PI;
			
			    dist = dist * 60 * 1.1515;
                alert("Dist:" +dist);
			//    return dist;
			
			}
		
		
	}

});
