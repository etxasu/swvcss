// Select a particular banner by javascript for index and launch2 pages: Must match a "Landing page banner" in the CMS
var all_banners = $('.primary_media_feature .feature_container');
var banner = mb_utils.getParam('title');
var active_banner = [];
//console.log('Checking requested title: ' + banner);
if (banner != undefined && banner != 'undefined') {
	active_banner = $('#pmf_' + banner);
}

//console.log('Checking matching banners: ' + active_banner.length);
if (active_banner.length == 0) {
	var path = window.location.pathname;
	//console.log('Path: ' + path);
	switch (true) {
		case path.indexOf("exoplanets\/launch2") > -1:
		  banner = 'exoplanets';
		  break;
		case path.indexOf("earth\/launch2") > -1:
		  banner = 'earth';
		  break;
		case path.indexOf("launch2") > -1:
			banner = 'solar_system';
			break;
		default:
		  banner = 'homepage';
		  break;
	}
	active_banner = $('#pmf_' + banner);
}

//console.log('Displaying banner: ' + banner);
active_banner = $('#pmf_' + banner);
if (active_banner.length > 0) { 
	all_banners.hide();
	var background_image = active_banner.data( "source" );
	active_banner.css('background-image', 'url(' + background_image + ')');
	active_banner.show();
}
;
