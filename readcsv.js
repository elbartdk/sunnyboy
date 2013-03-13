var fs = require('fs');
var mongo = require('mongodb');

function readInFile(pathname)
{

	function processFile(err, myData)
	{
		var array = myData.toString().split("\n");

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
					myData = {};
					for (var i = 0; i < line.length; i++)
					{
						myData[header[i]] = line[i];
					}
					console.log("Obj: " + myData.TIMESTAMP);
					objArr.push(myData);
				}
				if (s.indexOf("INTERVAL")>=0)
				{
					header = s.split(";");
					console.log("header: " + header);
					gotHeader = true;
				}
			}
			if (s.indexOf("[wr]")>=0)
			{
				inSection = true;
			}
		}
		return objArr;
	}

	console.log("file: " + pathname);

	var db = new mongo.db('Sunnyboy', new mongo.Server('localhost', 27017, {}), {});

	db.open(function(err, client){
        client.createCollection("data", function(err, col) {
        client.collection("data", function(err, col) {
                var o = fs.readFile(pathname, 'UTF-8', processFile);
                for (var i = 0; i < o.length; i++) {
                    col.insert({o:i}, function() {});
                }
            });
        });
	});




}

exports.start = readInFile;