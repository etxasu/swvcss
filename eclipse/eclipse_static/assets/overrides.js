// Eyes Team JS Code (See config.js for Eyes Team config variables)
function loadEyes(button, params)
{
	var referrer = '';
	var firstQuestionMark = document.referrer.indexOf('?');
	if(firstQuestionMark == -1)
	{
		referrer = document.referrer;
	}
	else
	{
		referrer = document.referrer.substring(0, firstQuestionMark);
	}
	params = params + '&referrer=' + referrer;

	if(typeof protocol == 'undefined')
	{
		protocol = 'eyes';
	}

	var url = protocol + "://?" + params;

	button.onblur = function()
	{
		button.onblur = null;
		window.onblur = null;
		$('#no_protocol').slideUp(1000);
	}
	window.onblur = function()
	{
		window.onblur = null;
		button.onblur = null;
		$('#no_protocol').slideUp(1000);
	}
	setTimeout(function(button)
	{
		if(button.onblur != null || window.onblur != null)
		{
			console.log("No protocol handler!");
			$('#no_protocol').slideDown(1000);
			button.onblur = null;
		}
	}, 2000, button);

	window.open(url, "_self");
}

function loadEyesOnTheSolarSystem(button)
{
  var defaults =
  {
    'scene' : '$SERVERURL/content/scenes/default.xml',
    'interface' : '$SERVERURL/content/interface/default/default.xml',
  }
  var params = getParamsFromUrl(defaults);
  loadEyes(button, params);``
}

function loadEyesOnExoplanets(button)
{
	var defaults =
	{
		'scene' : '$SERVERURL/content/scenes/exoplanets.xml',
		'interface' : '$SERVERURL/content/interface/empty.xml',
		'document' : '$SERVERURL/content/documents/exo/exo.xml',
		'windowed' : '990,630'
	}
	var params = getParamsFromUrl(defaults);
	loadEyes(button, params);
}

function loadEyesOnTheEarth(button)
{
	var defaults =
	{
		'scene' : '$SERVERURL/content/scenes/eyes_on_the_earth/default.xml',
		'interface' : '$SERVERURL/content/interface/eyes_on_the_earth/default.xml',
		'replacement' : '$DATAAREA~$SERVERURL/data'
	}
	var params = getParamsFromUrl(defaults);
	loadEyes(button, params);
}



function doDownload(dlMethod) {
//	var protocol = Plugin.determineProtocol("download");
	var protocol ="EYES";
	var protocol2 = "";
	if(dlMethod == "manual") {
		protocol2 = "/zip";
	}

	if( BrowserDetect.OS == "Windows") {
		window.open( "https://" + window.location.hostname + "/eyesproduct/" + product + "/os/win" + protocol2, "_self" );
	}
	else if (BrowserDetect.OS == "Mac") {
		window.open( "https://" + window.location.hostname + "/eyesproduct/" + product + "/os/osx" + protocol2, "_self" );
	}
};

function determineExplorerZipName() {
	BrowserDetect.init(); //should be called in the determineManualDownload method before this is run
	if( BrowserDetect.OS == "Windows") {
		return '"NASA\'s Eyes_win.zip"';
	}
	else if (BrowserDetect.OS == "Mac") {
		return '"NASA\'s Eyes_osx.zip"';
	}
	else
	{
		//default name in case of an error
		return '"NASA\'s Eyes_(os).zip"';
	}
}

function determineExplorerFolderName() {
	BrowserDetect.init(); //should be called in the determineManualDownload method before this is run
	if( BrowserDetect.OS == "Windows") {
		return '"explorer-win"';
	}
	else if (BrowserDetect.OS == "Mac") {
		return '"explorer-mac"';
	}
	else
	{
		//default name in case of an error
		return '"explorer-(os)"';
	}
}

function determineExplorerAppName() {
	BrowserDetect.init(); //should be called in the determineManualDownload method before this is run
	if( BrowserDetect.OS == "Windows") {
		return '"explorer-win.exe"';
	}
	else if (BrowserDetect.OS == "Mac") {
		return '"explorer-mac.app"';
	}
	else
	{
		//default name in case of an error
		return '"explorer-(os)"';
	}
}


var title_zipInstallation = 'Alternative Download';
var msg_zipInstallation = '<ol> <li> Click <a id="directDownloadLink"  href="javascript:void(0);" onclick="doDownload(\'manual\');">here</a> to manually download the required files. </li> <li> Unzip the file named ' + determineExplorerZipName() + ' to reveal a folder called ' + determineExplorerFolderName() + ' in which you will find the application entitled ' + determineExplorerAppName() + '. </li>';

if( BrowserDetect.OS == "Windows")
	msg_zipInstallation += '<li>If you want to move the application to another location make sure you move the entire ' + determineExplorerFolderName() + ' folder . You must leave all folder contents together.  </li>';
msg_zipInstallation+= '<li> If you continue to experience problems installing Eyes, and have confirmed that the zip file is not being quarantined by your anti-virus software, feel free to <a href="mailto:eotss@jpl.nasa.gov">contact us</a>. </li> </ol> <span style="color:yellow"> Disclaimer: Certain features (such as automatic updates) are unavailable using this method. We recommend using the main download link if possible.  </span>';
