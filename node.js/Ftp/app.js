var df = require('dateformat');
var mkdir = require('mkdirp');
var ftpClient = require('ftp-client');
var fs = require('fs');
var unzip = require('unzip2');

var config = 
{
	host: '84.81.145.14',  
	port: 21, 			// defaults to 21   
	user: 'sndata', 	// defaults to 'anonymous'   
	password: 'Kfptjzyy6sn' // defaults to '@anonymous' 
};

var options = 
{        
	logging: 'basic'  
};    

var client = new ftpClient(config, options);

var yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
var formatter = df(yesterday, "yyyymmdd");

var downloadDir = './download/' + formatter + '/';
mkdir.sync(downloadDir);

var downloadDirGdms = './download/' + formatter + '/gdms_zip/';
mkdir.sync(downloadDirGdms);

var ftpFiles = [];

var fovaFile = 'cs2-' + formatter + '-0125-0000-201081.zip';
var billsFile = 'ODC-' + formatter + '-10-0125-0000.zip';
var gdmFile = 'GDM-0012500000-' + formatter + '-81.zip';
// fova
ftpFiles.push(fovaFile);
// bills
ftpFiles.push(billsFile);
// this and below : summit
ftpFiles.push('BONDTrade' + formatter + '_SYD.csv');
ftpFiles.push('CcySwapTrade' + formatter + '_SYD.csv');
ftpFiles.push('FRATrade' + formatter + '_SYD.csv');
ftpFiles.push('FXOptTrade' + formatter + '_SYD.csv');
ftpFiles.push('FXSWAPTrade' + formatter + '_SYD.csv');
ftpFiles.push('FXTrade' + formatter + '_SYD.csv');
ftpFiles.push('IRSTrade' + formatter + '_SYD.csv');
ftpFiles.push('MMTrade' + formatter + '_SYD.csv');
ftpFiles.push('CUSTOMER' + formatter + '_SYD.csv');
// gdms
ftpFiles.push(gdmFile);

var ftpDir = '/sndata/backup/' + formatter + '/';
var ftpGdmDir = '/sndata/ia/*' + formatter + '*.zip';

client.connect(function () 
{
	client.download(ftpDir, downloadDir, 
	{        
		overwrite: 'all'
	}),
	//client.download(ftpGdmDir, downloadDirGdms, 
	//{        
    //		overwrite: 'all'
	//}), 
	function (result) 
	{        
		console.log(result);    
		
		fs.createReadStream(downloadDir + fovaFile)
  		  .pipe(unzip.Extract({ path: downloadDir + '/fova/' }));

		fs.createReadStream(downloadDir + billsFile)
  		  .pipe(unzip.Extract({ path: downloadDir + '/bills/' }));

  		//fs.createReadStream(downloadDir + gdmFile)
  		  //.pipe(unzip.Extract({ path: downloadDir + '/gdms/' }));
	}
});

// other formats of date:
// var s = new Date().toISOString();
// 2015-11-16T23:09:46.989Z
// or:
// df(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
// Tuesday, November 17th, 2015, 10:09:47 AM

// ftp-client.download:
// download(< String > remoteDir, < String > localDir, < Object > options, < Function > callback) 
// - downloads the contents of remoteDir to localDir if both exist, 
// and executes the callback if one is supplied with the following object as a parameter:
// {    
// 	   downloadedFiles: [(filename)],    
//     errors: 
//     {        
//         (filename): (error)    
//     }
// }
// options is an object with the following possible keys * overwrite (String): 'none', 'older', 'all' 
// - determines which files should be overwritten
//  'older' compares the date of modification of local and remote files

// ftp-client.upload:
// upload(< mixed > source, < String > remoteDir, < Object > options, < Function > callback) 
// - expands the source paths using the glob module, uploads all found files and directories to the specifiedremoteDir , 
// and executes the callback if one is supplied with the following object as a parameter:
// {    
//     uploadedFiles: [(filename)],    
//     uploadedDirectories: [(dirname)],    
//     errors: 
//     {        
//         (filename/dirname): (error)    
// }}
// source can be a string or an array of strings, 
// and options is an object with the following possible keys * overwrite (String): 'none', 'older', 'all' 
// - determines which files should be overwritten 
// * baseDir(String) - local base path relative to the remote directory, 
// e.g. if you want to upload fileuploads/sample.js to public_html/uploads, baseDir has to be set to uploads
// e.g. upload all files from the test directory, overwriting only older files found on the server:
/*
client.upload(['test/**'], '/public_html/test', 
{        
	baseDir: 'test',        
	overwrite: 'older'    
}, 
function (result) 
{        
	console.log(result);    
});     
*/
