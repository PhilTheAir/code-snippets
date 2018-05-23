var node_xj = require("xls-to-json");  

node_xj({    
	input: "book1.xls",  // input xls     
	output: "book1.json", // output json     
	sheet: "FILE_T"  // specific sheetname   
}, 
function(err, result) 
{    
	if (err) 
	{      
		console.error(err);    
	} 
	else 
	{      
		console.log(result);    
	}  
});
