var fs = require('fs');
var path = require('path');

var walk = function(dir, done) 
{
  	var results = [];

  	fs.readdir(dir, function(err, list) 
  	{
    	if (err)
    	{  
      		return done(err);
    	}
    	var pending = list.length;
    	if (!pending) 
    	{
      		return done(null, results);
    	}
    	list.forEach(function(file) 
    	{
      		file = path.resolve(dir, file);
      		fs.stat(file, function(err, stat) 
      		{
        		if (stat && stat.isDirectory()) 
        		{
          			walk(file, function(err, res) 
          			{
            			results = results.concat(res);
			            if (!--pending) 
			            {
			              	done(null, results);
			            }
          			});
        		} 
        		else 
        		{
          			results.push(file);
          			if (!--pending) 
          			{
            			done(null, results);
          			}
        		} 
      		});
    	});
  	});
};

walk('./download/20151211', function(err, data)
{
  	if (err) 
  	{  
    	fs.writeFile('error.txt', err, function(e)
    	{
    		if (e)
			{
				return console.error(e);
			}
			else
			{
				console.log('error.txt is generated..');
			}	
	    });
  	}
//  	else
//  	{
//       	fs.writeFile('file_directory_list.txt', data, function(e)
//      	{
//	        	if (e)
//		    	{
//			    	return console.error(e);
//   			}
//	    		else
//		    	{
//			    	console.log('file_directory_list.txt is generated..');
//    			}	
//      	});
//  	}
	var file = fs.createWriteStream('file_directory_list.txt');
	file.on('error', function(){});
	data.forEach(function(d)
	{
		file.write(d + '\r\n');
	});
	file.end();
});


// var walk    = require('walk');
// var files   = [];
// Walker options
// var walker  = walk.walk('./test', { followLinks: false });
// walker.on('file', function(root, stat, next) 
// {
    // Add this file to the list of files
    // files.push(root + '/' + stat.name);
    // next();
// });
// walker.on('end', function() 
// {
//     console.log(files);
// });
