 var areaindex = [];
        for (var i = 0; i < 22; i++) {
            for (var j = 0; j < 10; j++)
                areaindex[i * 10 + j] = 0;
        }
        var Irotate = 0, Zrotate = 0, Srotate = 0, Irotatex = 0, Zrotatex = 0, Srotatex = 0, score = 0, pausecontrol = 0, ghostcontrol = 0;
        var random, spacecontrol, leftcontrol, rigthcontrol, downcontrol, upcontrol, finish, rotate;
        var temp = {}, temptop = {}, templeft = {}, temprotatetop = {}, temprotateleft = {}, ghost = {};
        document.onkeydown = keyPress;
        function keyPress(e) {
            if (e.keyCode === 37 || e.keyCode === 100) {// --> left arrow
                if (spacecontrol != 1 && leftcontrol == 0 && rightcontrol == 0 && pausecontrol == 0 && downcontrol == true) {
                    finish = true;
                    var control = 0;
                    if (temp[0].style.left != "0px" && temp[1].style.left != "0px" && temp[2].style.left != "0px" && temp[3].style.left != "0px"
                        && areaindex[temptop[0] * 10 + templeft[0] - 1] != 1 && areaindex[temptop[1] * 10 + templeft[1] - 1] != 1 &&
                        areaindex[temptop[2] * 10 + templeft[2] - 1] != 1 && areaindex[temptop[3] * 10 + templeft[3] - 1] != 1) {
                        control = 1;
                        document.getElementById("audio").play();
                        for (var i = 0; i < 4; i++) {
                            temp[i].style.left = parseInt(temp[i].style.left) - 25 + "px";
                            templeft[i] = templeft[i] - 1;
                        }
                        Ghost();
                    }
                    var cccontrol = 0;
                    if (control == 1) {
                        for (var i = 0; i < 4; i++) {
                            if (areaindex[temptop[i] * 10 + templeft[i] + 10] == 1)
                                cccontrol++;
                        }
                    }
                    if (cccontrol == 0)
                        finish = false;
                    else {
                        finish = true;
                        leftcontrol = 1;
                    }
                }
            }
            if (e.keyCode === 39 || e.keyCode === 102) {// --> right arrow
                if (spacecontrol != 1 && rightcontrol == 0 && leftcontrol == 0 && pausecontrol == 0 && downcontrol == true) {
                    finish = true;
                    var control = 0;
                    if (temp[0].style.left != "225px" && temp[1].style.left != "225px" && temp[2].style.left != "225px" && temp[3].style.left != "225px"
                        && areaindex[temptop[0] * 10 + templeft[0] + 1] != 1 && areaindex[temptop[1] * 10 + templeft[1] + 1] != 1
                        && areaindex[temptop[2] * 10 + templeft[2] + 1] != 1 && areaindex[temptop[3] * 10 + templeft[3] + 1] != 1) {
                        control = 1;
                        document.getElementById("audio").play();
                        for (var i = 0; i < 4; i++) {
                            temp[i].style.left = parseInt(temp[i].style.left) + 25 + "px";
                            templeft[i] = templeft[i] + 1;
                        }
                        Ghost();
                    }
                    var cccontrol = 0;
                    if (control == 1) {
                        for (var i = 0; i < 4; i++) {
                            if (areaindex[temptop[i] * 10 + templeft[i] + 10] == 1)
                                cccontrol++;
                        }
                    }
                    if (cccontrol == 0)
                        finish = false;
                    else {
                        rightcontrol = 1;
                        finish = true;
                    }
                }
            }
            if (e.keyCode === 40 || e.keyCode === 98) {// --> down arrow
                if (downcontrol == true && spacecontrol == 0 && rightcontrol == 0 && leftcontrol == 0 && pausecontrol == 0) {
                    finish = true;
                    for (var i = 0; i < 4; i++) {
                        temp[i].style.top = parseInt(temp[i].style.top) + 25 + "px";
                        temptop[i] = temptop[i] + 1;
                    }
                    Ghost();
                    finish = false;
                    document.getElementById("audio").play();
                    for (var i = 0; i < 4; i++) {
                        if (areaindex[temptop[i] * 10 + templeft[i] + 10] == 1 || temptop[i] > 20) {
                            finish = true;
                            downcontrol = false;
                        }
                    }
                }
            }
            if (e.keyCode === 32 || e.keyCode === 96) {// --> space
                if (spacecontrol != 1 && pausecontrol == 0) {
                    spacecontrol = 1;
                    var cccontrol = 1;
                    while (cccontrol != 0) {
                        finish = true;
                        if (areaindex[temptop[0] * 10 + templeft[0] + 10] != 1 && areaindex[temptop[1] * 10 + templeft[1] + 10] != 1 && areaindex[temptop[2] * 10 + templeft[2] + 10] != 1 && areaindex[temptop[3] * 10 + templeft[3] + 10] != 1) {
                            for (var i = 0; i < 4; i++) {
                                temptop[i] = temptop[i] + 1;
                                temp[i].style.top = temptop[i] * 25 + "px";
                            }
                            document.getElementById("audio").play();
                            if (temptop[0] > 20 || temptop[1] > 20 || temptop[2] > 20 || temptop[3] > 20) {
                                for (var i = 0; i < 4; i++) {
                                    temp[i].style.top = temptop[i] * 25 + "px";
                                    cccontrol = 0;
                                }
                            }
                        }
                        else cccontrol = 0;
                    }
                }
            }
            if (e.keyCode === 27) {// --> escape
                if (pausecontrol == 1) {
                    pausecontrol = 0;
                    document.getElementById("gamepaused").style.visibility = "hidden";
                    document.body.style.backgroundColor = "grey";
                    document.getElementById("box").style.border = "1px solid black";
                }
                else {
                    pausecontrol++;
                    document.getElementById("gamepaused").style.visibility = "visible";
                    document.body.style.backgroundColor = "black";
                    document.getElementById("box").style.border = "1px solid white";
                }
            }
            if (e.keyCode === 38 || e.keyCode === 104) {// up arrow
                if (downcontrol == true && spacecontrol == 0 && rightcontrol == 0 && leftcontrol == 0 && pausecontrol == 0) {
                    finish = true;
                    rotate = true;
                    var x = 0;
                    var y = 0;
                    for (var i = 0; i < 4; i++) {
                        x = x + parseInt(temp[i].style.left) + (25 / 2);
                        y = y + parseInt(temp[i].style.top) + (25 / 2);
                    }
                    x = x / 4;
                    y = y / 4;
                    if (random == 5 || random == 1 || random == 6 || random == 7) {
                        if (x % 25 != 0) {
                            var kalan = x % 25;
                            x = x + (25 - kalan);
                        }
                    }
                    else {
                        if (x % 25 != 0) {
                            var kalan = x % 25;
                            x = x - kalan;
                        }
                    }
                    if (y % 25 != 0) {
                        var kalan = y % 25;
                        y = y - kalan;
                    }
                    for (var i = 0; i < 4; i++) {
                        var temptoppx = (y - (parseInt(temp[i].style.top) + (25 / 2))) / (25 / 2);
                        var templefttx = ((parseInt(temp[i].style.left) + (25 / 2)) - x) / (25 / 2);
                        var temptemptopx = temptoppx;
                        var temptempleftx = templefttx;

                        var tutx = temptoppx;
                        temptoppx = 0 - templefttx;
                        templefttx = tutx;

                        temprotatetop[i] = temptop[i];
                        temprotateleft[i] = templeft[i];
                        if ((temptoppx > 0 && templefttx > 0) || (temptoppx < 0 && templefttx < 0)) {
                            temprotatetop[i] = temprotatetop[i] + ((temptemptopx + temptempleftx) / 2);
                            temprotateleft[i] = temprotateleft[i] + (((temptemptopx - temptempleftx) / 2) - 1);
                        }
                        if ((temptoppx < 0 && templefttx > 0) || (temptoppx > 0 && templefttx < 0)) {
                            temprotatetop[i] = temprotatetop[i] + ((temptemptopx + temptempleftx) / 2);
                            temprotateleft[i] = temprotateleft[i] + (((temptemptopx - temptempleftx) / 2) - 1);
                        }
                    }
                    if (random == 1) {
                        Irotatex++;
                        if (Irotatex == 2) {
                            for (var i = 0; i < 4; i++)
                                temprotatetop[i] = temprotatetop[i] + 1;
                            Irotatex = 0;
                        }
                    }
                    if (random == 3) {
                        for (var i = 0; i < 4; i++)
                            temprotateleft[i] = temprotateleft[i] + 2;
                    }
                    if (random == 4) {
                        Zrotatex++;
                        if (Zrotatex == 2) {
                            for (var i = 0; i < 4; i++)
                                temprotateleft[i] = temprotateleft[i] + 1;
                            Zrotatex = 0;
                        }
                    }
                    if (random == 5) {
                        Srotatex++;
                        if (Srotatex == 2) {
                            for (var i = 0; i < 4; i++)
                                temprotatetop[i] = temprotatetop[i] + 1;
                            Srotatex = 0;
                        }
                    }
                    if (random == 7 || random == 6) {
                        for (var i = 0; i < 4; i++) {
                            temprotatetop[i] = temprotatetop[i] + 1;
                            temprotateleft[i] = temprotateleft[i] + 1;
                        }
                    }
                    if (random == 4 || random == 1 || random == 2 || random == 5) {
                        for (var i = 0; i < 4; i++)
                            temprotateleft[i] = temprotateleft[i] + 1;
                    }
                    for (var i = 0; i < 4; i++) {
                        if (areaindex[temprotatetop[i] * 10 + temprotateleft[i]] == 1 || temprotatetop[i] > 21 || temprotateleft[i] < 0 || temprotateleft[i] > 9)
                            rotate = false;
                    }

                    if (rotate == true) {
                        document.getElementById("audio").play();
                        for (var i = 0; i < 4; i++) {
                            var temptopp = (y - (parseInt(temp[i].style.top) + (25 / 2))) / (25 / 2);
                            var templeftt = ((parseInt(temp[i].style.left) + (25 / 2)) - x) / (25 / 2);
                            var temptemptop = temptopp;
                            var temptempleft = templeftt;

                            var tut = temptopp;
                            temptopp = 0 - templeftt;
                            templeftt = tut;
                            if ((temptopp > 0 && templeftt > 0) || (temptopp < 0 && templeftt < 0)) {
                                temp[i].style.top = parseInt(temp[i].style.top) + ((temptemptop + temptempleft) * (25 / 2)) + "px";
                                temp[i].style.left = parseInt(temp[i].style.left) + ((temptemptop - temptempleft) * (25 / 2)) - 25 + "px";
                                temptop[i] = temptop[i] + ((temptemptop + temptempleft) / 2);
                                templeft[i] = templeft[i] + (((temptemptop - temptempleft) / 2) - 1);
                            }
                            if ((temptopp < 0 && templeftt > 0) || (temptopp > 0 && templeftt < 0)) {
                                temp[i].style.top = parseInt(temp[i].style.top) + ((temptemptop + temptempleft) * (25 / 2)) + "px";
                                temp[i].style.left = parseInt(temp[i].style.left) + ((temptemptop - temptempleft) * (25 / 2)) - 25 + "px";
                                temptop[i] = temptop[i] + ((temptemptop + temptempleft) / 2);
                                templeft[i] = templeft[i] + (((temptemptop - temptempleft) / 2) - 1);
                            }
                        }
                        if (random == 1) {
                            Irotate++;
                            if (Irotate == 2) {
                                for (var i = 0; i < 4; i++) {
                                    temp[i].style.top = parseInt(temp[i].style.top) + 25 + "px";
                                    temptop[i] = temptop[i] + 1;
                                }
                                Irotate = 0;
                            }
                        }
                        if (random == 3) {
                            for (var i = 0; i < 4; i++) {
                                temp[i].style.left = parseInt(temp[i].style.left) + 50 + "px";
                                templeft[i] = templeft[i] + 2;
                            }
                        }
                        if (random == 4) {
                            Zrotate++;
                            if (Zrotate == 2) {
                                for (var i = 0; i < 4; i++) {
                                    temp[i].style.left = parseInt(temp[i].style.left) + 25 + "px";
                                    templeft[i] = templeft[i] + 1;
                                }
                                Zrotate = 0;
                            }
                        }
                        if (random == 5) {
                            Srotate++;
                            if (Srotate == 2) {
                                for (var i = 0; i < 4; i++) {
                                    temp[i].style.top = parseInt(temp[i].style.top) + 25 + "px";
                                    temptop[i] = temptop[i] + 1;
                                }
                                Srotate = 0;
                            }
                        }
                        if (random == 7 || random == 6) {
                            for (var i = 0; i < 4; i++) {
                                temp[i].style.left = parseInt(temp[i].style.left) + 25 + "px";
                                temp[i].style.top = parseInt(temp[i].style.top) + 25 + "px";
                                temptop[i] = temptop[i] + 1;
                                templeft[i] = templeft[i] + 1;
                            }
                        }
                        if (random == 4 || random == 1 || random == 2 || random == 5) {
                            for (var i = 0; i < 4; i++) {
                                temp[i].style.left = parseInt(temp[i].style.left) + 25 + "px";
                                templeft[i] = templeft[i] + 1;
                            }
                        }
                        Ghost();
                    }
                    finish = false;
                    for (var i = 0; i < 4; i++) {
                        if (areaindex[temptop[i] * 10 + templeft[i] + 10] == 1 || temptop[i] > 20)
                            finish = true;
                    }
                }
            }
        }
        function del() {
            for (var i = 0; i < 22; i++) {
                var index = 0;
                for (var j = 0; j < 10; j++) {
                    if (areaindex[i * 10 + j] == 1)
                        index++;
                    if (index == 10) {
                        score = score + 10;
                        bul(i);
                    }
                }
            }
        }
        function bul(elem) {
            document.getElementById("score").innerHTML = "Score: " + score;
            document.getElementById("audiodel").play();
            var div = document.getElementsByClassName("div");
            var box = document.getElementById("box");
            for (var i = 0; i < div.length; i++) {
                if (parseInt(div[i].style.top) == 25 * elem) {
                    box.removeChild(div[i]);
                    i--;
                }
            }
            for (var i = 0; i < 10; i++)
                areaindex[elem * 10 + i] = 0;
            for (var i = 0; i < div.length; i++) {
                if (parseInt(div[i].style.top) < 25 * elem && parseInt(div[i].style.top) > 25)
                    div[i].style.top = parseInt(div[i].style.top) + 25 + "px";
            }
            for (var j = 219; j >= 0; j--) {
                if ((elem * 10) >= j && areaindex[j] == 1) {
                    areaindex[j] = 0;
                    areaindex[j + 10] = 1;
                }
            }
        }
        function Ghost() {
            var ghostleft = {};
            var ghosttop = {};
            if (ghostcontrol == 0) {
                for (var i = 0; i < 4; i++) {
                    ghost[i] = document.createElement("div");
                    document.getElementById("box").appendChild(ghost[i]);
                    ghost[i].style.position = "absolute";
                    ghost[i].style.backgroundColor = "grey";
                    ghost[i].style.width = "25px";
                    ghost[i].style.height = "25px";
                }
            }
            ghostcontrol++;
            var cccontrol = 1;
            for (var i = 0; i < 4; i++) {
                ghosttop[i] = temptop[i];
                ghostleft[i] = templeft[i];
                ghost[i].style.left = ghostleft[i] * 25 + "px";
            }
            while (cccontrol != 0) {
                if (areaindex[ghosttop[0] * 10 + ghostleft[0] + 10] != 1 && areaindex[ghosttop[1] * 10 + ghostleft[1] + 10] != 1 && areaindex[ghosttop[2] * 10 + ghostleft[2] + 10] != 1 && areaindex[ghosttop[3] * 10 + ghostleft[3] + 10] != 1) {
                    for (var i = 0; i < 4; i++) {
                        ghosttop[i] = ghosttop[i] + 1;
                        ghost[i].style.top = ghosttop[i] * 25 + "px";
                    }
                    if (ghosttop[0] > 20 || ghosttop[1] > 20 || ghosttop[2] > 20 || ghosttop[3] > 20) {
                        for (var i = 0; i < 4; i++) {
                            ghost[i].style.top = ghosttop[i] * 25 + "px";
                            cccontrol = 0;
                        }
                    }
                }
                else cccontrol = 0;
            }
        }
        window.addEventListener("load", Tetris);
        function Tetris() {
            document.getElementById("audio").volume = 0.01;
            document.getElementById("audiodel").volume = 0.01;
            score++;
            document.getElementById("score").innerHTML = "Score: " + score;
            leftcontrol = 0, rightcontrol = 0, spacecontrol = 0, finish = false, downcontrol = true;
            var box = document.getElementById("box");
            var I = [[3, 0], [4, 0], [5, 0], [6, 0], ["cyan"]];
            var O = [[4, 0], [5, 0], [4, 1], [5, 1], ["yellow"]];
            var T = [[3, 0], [4, 0], [5, 0], [4, 1], ["purple"]];
            var Z = [[3, 0], [4, 0], [4, 1], [5, 1], ["red"]];
            var S = [[4, 0], [5, 0], [3, 1], [4, 1], ["green"]];
            var L = [[3, 0], [4, 0], [5, 0], [3, 1], ["orange"]];
            var J = [[3, 0], [4, 0], [5, 0], [5, 1], ["blue"]];
            var div = [];
            for (var i = 0; i < 4; i++) {
                div[i] = document.createElement("div");
                div[i].className = "div";
                box.appendChild(div[i]);
                div[i].style.width = "25px";
                div[i].style.height = "25px";
                div[i].style.position = "absolute";
                div[i].style.zIndex = 1;
                temp[i] = div[i];
            }
            random = parseInt(Math.random() * 7 + 1);
            if (random == 1) {
                for (var i = 0; i < 4; i++) {
                    div[i].style.backgroundColor = "cyan";
                    div[i].style.left = parseInt(I[i][0] * 25) + "px";
                    div[i].style.top = parseInt(I[i][1] * 25) + "px";
                    templeft[i] = I[i][0];
                    temptop[i] = I[i][1];
                }
            }
            if (random == 2) {
                for (var i = 0; i < 4; i++) {
                    div[i].style.backgroundColor = "yellow";
                    div[i].style.left = parseInt(O[i][0] * 25) + "px";
                    div[i].style.top = parseInt(O[i][1] * 25) + "px";
                    templeft[i] = O[i][0];
                    temptop[i] = O[i][1];
                }
            }
            if (random == 3) {
                for (var i = 0; i < 4; i++) {
                    div[i].style.backgroundColor = "purple";
                    div[i].style.left = parseInt(T[i][0] * 25) + "px";
                    div[i].style.top = parseInt(T[i][1] * 25) + "px";
                    templeft[i] = T[i][0];
                    temptop[i] = T[i][1];
                }
            }
            if (random == 4) {
                for (var i = 0; i < 4; i++) {
                    div[i].style.backgroundColor = "red";
                    div[i].style.left = parseInt(Z[i][0] * 25) + "px";
                    div[i].style.top = parseInt(Z[i][1] * 25) + "px";
                    templeft[i] = Z[i][0];
                    temptop[i] = Z[i][1];
                }
            }
            if (random == 5) {
                for (var i = 0; i < 4; i++) {
                    div[i].style.backgroundColor = "green";
                    div[i].style.left = parseInt(S[i][0] * 25) + "px";
                    div[i].style.top = parseInt(S[i][1] * 25) + "px";
                    templeft[i] = S[i][0];
                    temptop[i] = S[i][1];
                }
            }
            if (random == 6) {
                for (var i = 0; i < 4; i++) {
                    div[i].style.backgroundColor = "orange";
                    div[i].style.left = parseInt(L[i][0] * 25) + "px";
                    div[i].style.top = parseInt(L[i][1] * 25) + "px";
                    templeft[i] = L[i][0];
                    temptop[i] = L[i][1];
                }
            }
            if (random == 7) {
                for (var i = 0; i < 4; i++) {
                    div[i].style.backgroundColor = "blue";
                    div[i].style.left = parseInt(J[i][0] * 25) + "px";
                    div[i].style.top = parseInt(J[i][1] * 25) + "px";
                    templeft[i] = J[i][0];
                    temptop[i] = J[i][1];
                }
            }
            Ghost();
            for (var i = 0; i < 4; i++) {// --> game over
                if (areaindex[temptop[i] * 10 + templeft[i]] == 1 || areaindex[4] == 1 || areaindex[5] == 1) {
                    document.getElementById("gameover").style.visibility = "visible";
                    document.getElementById("score").style.color = "white";
                    document.body.style.backgroundColor = "black";
                    document.getElementById("box").style.border = "1px solid white";
                    for (var i = 0; i < 4; i++)
                        box.removeChild(div[i]);
                    finish = true;
                    return;
                }
            }
            var control = 0;
            MoveDiv();
            function MoveDiv() {
                control++;
                if (control > 1 && finish == false && pausecontrol == 0) {
                    for (var i = 0; i < 4; i++) {
                        temp[i].style.top = parseInt(temp[i].style.top) + 25 + "px";
                        temptop[i] = temptop[i] + 1;
                        del();
                    }
                }
                Ghost();
                var time = setTimeout(MoveDiv, 700);
                for (var i = 0; i < 4; i++) {
                    if (parseInt(temp[i].style.top) >= 525 || areaindex[temptop[i] * 10 + templeft[i] + 10] == 1) {
                        for (var j = 0; j < 4; j++)
                            areaindex[temptop[j] * 10 + templeft[j]] = 1;
                        clearTimeout(time);
                        Tetris();
                        return;
                    }
                }
            }
        }