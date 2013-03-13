var fs = require('fs');
 
function readInFile(pathname) 
{
 
	function processFile(err, data) 
	{

		var array = data.toString().split("\n");
					
		var header;
 
		var inSection = false;
		var gotHeader = false;
		var objArr = [];
		var lineNo = 0;
		var line = "";
 
		for(i in array) {
			var s = array[i];
            if (s.indexOf("[wr_ende]")>=0)
			{
				inSection = false;
			}
			if (inSection)
			{
				if (gotHeader)
				{
					line = s.split(";");
					lineNo++;
                    var myData = {};
					for (var i = 0; i < line.length; i++)
					{
						
						myData[header[i]] = line[i];
					}
					console.log("Obj: " + myData.TIMESTAMP)
					objArr.push(myData);
				}
				if (s.indexOf("INTERVAL")>=0)
				{
					header = s.split(";");
					console.log("header: " + header)
					gotHeader = true;
				}
			}
			if (s.indexOf("[wr]")>=0)
			{
				inSection = true;
			}
		}
	}
 
	console.log("file: " + pathname);
	fs.readFile(pathname, 'UTF-8', processFile);
}
 
exports.start = readInFile;