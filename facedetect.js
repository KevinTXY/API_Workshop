async function processImage() {

    // Replace the subscriptionKey string value with your valid subscription key.
    var subscriptionKey = "<KEY>";


    var uriBase = "URI";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
    };


    var sourceImageUrl = document.getElementById("inputImage").value;
    //document.getElementById("sourceImage").src = sourceImageUrl
    // Display the image.

    // EXTRA
    var img = new Image();
    canv = document.getElementById('sourceImage') ;
    ctx = canv.getContext('2d');
    img.src = sourceImageUrl;
    img.onload = function() {
        canv.height = img.height;
        canv.width = img.width;
        ctx.drawImage(img, 0, 0)
    }
    //END EXTRA


    const response = await fetch(uriBase + "?" + $.param(params), {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key':subscriptionKey
        },
        body: JSON.stringify({url: sourceImageUrl})
    });
    
    const data = await response.json();
    document.getElementById("responseTextArea").value = JSON.stringify(data,null, 2);
    drawBox(data, ctx)


}




function drawBox(data, ctx) {
    ctx.beginPath()
    ctx.lineWidth="3"
    ctx.strokeStyle = "blue"
    face = data[0].faceRectangle
    faceattr = data[0].faceAttributes
    ctx.rect(face.left, face.top, face.width, face.height)
    ctx.stroke();
    ctx.font = "20px Arial"
    ctx.fillStyle = "red"
    ctx.fillText("Age: " + faceattr.age, face.top + 60, face.left - 30 )
}


/*  CANVAS SETUP 
    <canvas id="sourceImage" width="400" />


    var img = new Image();
    canv = document.getElementById('sourceImage') ;
    ctx = canv.getContext('2d');
    img.src = sourceImageUrl;
    img.onload = function() {
        canv.height = img.height;
        canv.width = img.width;
        ctx.drawImage(img, 0, 0)
    }


    
    // CALL WITH REQUESTS
            request.post(options, (error, response, body) => {
               if (error)
               {
                   alert('error')
                   return
               } 
               let res = JSON.stringify(JSON.parse(body), null, ' ');
               $("#responseTextArea").val(res);
    
    
            });
        }



    // Perform the REST API call with AJAX
    $.ajax({
        url: uriBase + "?" + $.param(params),
        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "POST",
        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    }).done(function(data) {
        // Show formatted JSON on webpage.
        //drawBox(data, ctx)
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
    })*/