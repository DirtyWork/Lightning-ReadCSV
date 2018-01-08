({
	readCSV : function(cmp) {
		var fileInput = cmp.find("file").getElement();
    	var file = fileInput.files[0];
        
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = loadHandler;
        reader.onerror = errorHandler;
        
        function loadHandler(event) {
          var csv = event.target.result;
          processData(csv);
        }

        function processData(csv) {
            var allLines = csv.split(/\r\n|\n/);
            cmp.set("v.headers", allLines[0].split(','));
            var lines = [];
            for (var i=1; i<allLines.length; i++) {
                var data = allLines[i].split(',');
                var tarr = [];
                for (var j=0; j<data.length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
            }
            cmp.set("v.data", lines);
        }

        function errorHandler(evt) {
          if(evt.target.error.name == "NotReadableError") {
              alert("Canno't read file !");
          }
        }
	}
})