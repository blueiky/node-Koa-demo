(function () {
    
    $.ajax({
        url: '/api/banner',
        success: function (data) {
            var htmlStr;
            // console.log(data)
            var ismovie = JSON.parse(data)
            for(let item in ismovie){
                htmlStr += `<div data-src="/${ismovie[item].img}">
                <div class="camera_caption fadeFromTop">
                    <h1>${ismovie[item].mname}</h1>
                    <span>${ismovie[item].brief}</span>
                </div>
            </div>`
            }
        }
    })

})();