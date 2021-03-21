let http = function(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        if (options.contenttype == "text") {
          return res.text();
        }
        return res.json();
      })
      .then(data => {
        resolve && resolve(data);
      })
      .catch(err => {
        console.log("i can not get data", err);
        reject && reject(err);
      });
  });
};

export default http;
