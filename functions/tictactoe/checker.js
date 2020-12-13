module.exports = (e) => {
    let win = false;
    if(e.charAt(2) === e.charAt(6) && e.charAt(6) === e.charAt(10)) {
        if(e.charAt(2) === "X") {
            win = true;
        } else {
            win = true;
        }
    }
    if(e.charAt(28) === e.charAt(32) && e.charAt(32) === e.charAt(36)) {
        if(e.charAt(28) === "X") {
            win = true;
        } else {
            win = true;
        }
    }
    if(e.charAt(54) === e.charAt(58) && e.charAt(58) === e.charAt(62)) {
        if(e.charAt(54) === "X") {
            win = true;
        } else {
            win = true;
        }
    }


    
    if(e.charAt(2) === e.charAt(28) && e.charAt(28) === e.charAt(54)) {
        if(e.charAt(2) === "X") {
            win = true;
        } else {
            win = true;
        }
    }
    if(e.charAt(6) === e.charAt(32) && e.charAt(32) === e.charAt(58)) {
        if(e.charAt(6) === "X") {
            win = true;
        } else {
            win = true;
        }
    }
    if(e.charAt(10) === e.charAt(36) && e.charAt(36) === e.charAt(62)) {
        if(e.charAt(10) === "X") {
            win = true;
        } else {
            win = true;
        }
    }

    
    if(e.charAt(2) === e.charAt(32) && e.charAt(32) === e.charAt(62)) {
        if(e.charAt(28) === "X") {
            win = true;
        } else {
            win = true;
        }
    }
    if(e.charAt(10) === e.charAt(32) && e.charAt(32) === e.charAt(54)) {
        if(e.charAt(10) === "X") {
            win = true;
        } else {
            win = true;
        }
    }
    return win;
}