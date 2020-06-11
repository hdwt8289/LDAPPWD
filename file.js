// const phantom = require('phantom');

// (async function() {
//   const instance = await phantom.create();
//   const page = await instance.createPage();
//   await page.on('onResourceRequested', function(requestData) {
//     console.info('Requesting', requestData.url);
//   });

//   const status = await page.open('https://stackoverflow.com/');
//   const content = await page.property('content');
//   console.log(content);

//   await instance.exit();
// })();



var phantom = require('phantom');

phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        page.open("http://127.0.0.1:3000/#/JobListResume").then(function(status) {
          console.log(status);  
          page.property('viewportSize',{width: 1000, height: 1300});
            page.render('./test10000.pdf').then(function(){
                console.log('Page rendered');
                ph.exit();
            });
        });
    });
});

