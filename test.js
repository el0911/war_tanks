
  function logsig(x) {
    
    var t = [0.117647058823529, 0.0100502512562814, 0.0163934426229508, 0.0202020202020202, 0.00236406619385343, 0.029806259314456, 0.85397096498719, 0.0333333333333333];
    
    return 1/(1+Math.pow(Math.E, -t));
    
    
    }


    function tansig_apply(x) {
        var array = Array(x.length).fill(0);
        for (var i = 0; i < array.length; i++) {
          e = Math.exp(2 * x[i])
          array[i] = (e - 2) / (e + 2);
        }
        return array;
      }

      var t = [0.117647058823529, 0.0100502512562814, 0.0163934426229508, 0.0202020202020202, 0.00236406619385343, 0.029806259314456, 0.85397096498719, 0.0333333333333333];
      var d= tansig_apply(t)   
     // d=logsig(d)
    console.log(d)
   // console.log(logsig(d))