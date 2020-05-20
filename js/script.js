const allSquares = document.querySelectorAll(`td`),
    allBlankSquares = document.querySelectorAll(`.blank`),
    nextPieces = document.querySelector(`.next-turn`),
    getScore = document.querySelector(`.get-score`),
    howToPlay = document.querySelector(`.how-to-play`),
    settingGame = document.querySelector(`.setting-game`),
    setRangeOpt1 = document.querySelector(`.setting-game .final-score-range .option.one`),
    setRangeOpt2 = document.querySelector(`.setting-game .final-score-range .option.two`),
    setRangeOpt3 = document.querySelector(`.setting-game .final-score-range .option.three`),
    setModeOpt1 = document.querySelector(`.setting-game .mode-type .option.one`),
    setModeOpt2 = document.querySelector(`.setting-game .mode-type .option.two`),
    confirmSetting = document.querySelector(`.setting-game .confirm-setting`);

const sPieces = {
    kind: `S`,
    color: `salmon`
}

const oPieces = {
    kind: `O`,
    color: `orange`
}

const p1 = {
    name: `P1`,
    steps: 0,
    score: 0,
    color: `darkblue`,
    area: document.querySelector(`.p1-area`),
    scoreBoard: document.querySelector(`.p1-score`)
}

const p2 = {
    name: `P2`,
    steps: 0,
    score: 0,
    color: `maroon`,
    area: document.querySelector(`.p2-area`),
    scoreBoard: document.querySelector(`.p2-score`)
}

let p1IsNext = true;
let turnAgain = false;
let combo = 1;
let modeClassic = true;
let finalScore = 33;

function appendSetting() {
    settingGame.style.display = `block`;
}

function setPropsOnSetting(main, ...other) {
    main.style.border = `3px solid black`;
    for (const o of other) {
        o.style.border = `3px solid azure`;
    }
}

function piecesIsNext() {
    let setNextPieces = (pieces) => {
        nextPieces.innerText = pieces.kind;
        nextPieces.style.backgroundColor = pieces.color;
    }
    if (p1IsNext) {
        if (p1.steps % 2 == 0) {
            setNextPieces(sPieces);
        } else if (p1.steps % 2 != 0) {
            setNextPieces(oPieces);
        }
    } else {
        if (p2.steps % 2 == 0) {
            setNextPieces(oPieces);
        } else if (p2.steps % 2 != 0) {
            setNextPieces(sPieces);
        }
    }
}

function whoIsNext() {
    if (p1IsNext) {
        p1.area.style.backgroundColor = p1.color;
        p2.area.style.backgroundColor = `grey`;
    } else {
        p2.area.style.backgroundColor = p2.color;
        p1.area.style.backgroundColor = `grey`;
    }
}

function turnIn() {
    let addTurn = (player, pieces) => {
        allBlankSquares.forEach(bs => {
            bs.removeEventListener(`click`, turnIn);
        });
        this.innerText = pieces.kind;
        this.style.backgroundColor = pieces.color;
        this.style.boxShadow = `0 3px 3px midnightblue`;
        this.classList.replace(`blank`, `filled`);
        player.steps++;
        checkingRules(player);
        if (turnAgain) {
            return gamePlay();
        }
        combo = 1;
        p1IsNext = !p1IsNext;
        return gamePlay();
    }
    turnAgain = false;
    if (this.innerText != ``) {
        return gamePlay();
    } else if (p1IsNext) {
        if (p1.steps % 2 == 0) {
            addTurn(p1, sPieces);
        } else if (p1.steps % 2 != 0) {
            addTurn(p1, oPieces);
        }
    } else {
        if (p2.steps % 2 == 0) {
            addTurn(p2, oPieces);
        } else if (p2.steps % 2 != 0) {
            addTurn(p2, sPieces);
        }
    }
}

function checkingRules(player) {
    checkingRows(player);
    checkingColomns(player);
    checkingDiagonals(player);
    checkingWinner(player);
}

function checkingRows(player) {
    for (let ir = 0; ir < 9; ir++) {
        for (let ic = 0; ic < 9; ic++) {
            if (
                document.querySelector(`.row-${ir+1} .col-${ic+1}`).innerText == sPieces.kind &&
                document.querySelector(`.row-${ir+1} .col-${ic+2}`).innerText == oPieces.kind &&
                document.querySelector(`.row-${ir+1} .col-${ic+3}`).innerText == sPieces.kind
            ) {
                if (modeClassic) {
                    if (
                        !document.querySelector(`.row-${ir+1} .col-${ic+1}`).classList.contains(`scored`) ||
                        !document.querySelector(`.row-${ir+1} .col-${ic+2}`).classList.contains(`scored`) ||
                        !document.querySelector(`.row-${ir+1} .col-${ic+3}`).classList.contains(`scored`)
                    ) {
                        addScoreAndAddProps(
                            document.querySelector(`.row-${ir+1} .col-${ic+1}`),
                            document.querySelector(`.row-${ir+1} .col-${ic+2}`),
                            document.querySelector(`.row-${ir+1} .col-${ic+3}`),
                            player
                        );
                    }
                } else {
                    addScoreAndResetProps(
                        document.querySelector(`.row-${ir+1} .col-${ic+1}`),
                        document.querySelector(`.row-${ir+1} .col-${ic+2}`),
                        document.querySelector(`.row-${ir+1} .col-${ic+3}`),
                        player
                    );
                };
            };
        };
    };
};

function checkingColomns(player) {
    for (let ic = 0; ic < 11; ic++) {
        for (let ir = 0; ir < 7; ir++) {
            if (
                document.querySelector(`.row-${ir+1} .col-${ic+1}`).innerText == sPieces.kind &&
                document.querySelector(`.row-${ir+2} .col-${ic+1}`).innerText == oPieces.kind &&
                document.querySelector(`.row-${ir+3} .col-${ic+1}`).innerText == sPieces.kind
            ) {
                if (modeClassic) {
                    if (
                        !document.querySelector(`.row-${ir+1} .col-${ic+1}`).classList.contains(`scored`) ||
                        !document.querySelector(`.row-${ir+2} .col-${ic+1}`).classList.contains(`scored`) ||
                        !document.querySelector(`.row-${ir+3} .col-${ic+1}`).classList.contains(`scored`)
                    ) {
                        addScoreAndAddProps(
                            document.querySelector(`.row-${ir+1} .col-${ic+1}`),
                            document.querySelector(`.row-${ir+2} .col-${ic+1}`),
                            document.querySelector(`.row-${ir+3} .col-${ic+1}`),
                            player
                        );
                    }
                } else {
                    addScoreAndResetProps(
                        document.querySelector(`.row-${ir+1} .col-${ic+1}`),
                        document.querySelector(`.row-${ir+2} .col-${ic+1}`),
                        document.querySelector(`.row-${ir+3} .col-${ic+1}`),
                        player
                    );
                };
            };
        };
    };
};

function checkingDiagonals(player) {
    //Diagonal 1
    for (let ir = 0; ir < 7; ir++) {
        for (let ic = 0; ic < 9; ic++) {
            if (
                document.querySelector(`.row-${ir+1} .col-${ic+3}`).innerText == sPieces.kind &&
                document.querySelector(`.row-${ir+2} .col-${ic+2}`).innerText == oPieces.kind &&
                document.querySelector(`.row-${ir+3} .col-${ic+1}`).innerText == sPieces.kind
            ) {
                if (modeClassic) {
                    if (
                        !document.querySelector(`.row-${ir+1} .col-${ic+3}`).classList.contains(`scored`) ||
                        !document.querySelector(`.row-${ir+2} .col-${ic+2}`).classList.contains(`scored`) ||
                        !document.querySelector(`.row-${ir+3} .col-${ic+1}`).classList.contains(`scored`)
                    ) {
                        addScoreAndAddProps(
                            document.querySelector(`.row-${ir+1} .col-${ic+3}`),
                            document.querySelector(`.row-${ir+2} .col-${ic+2}`),
                            document.querySelector(`.row-${ir+3} .col-${ic+1}`),
                            player
                        );
                    }
                } else {
                    addScoreAndResetProps(
                        document.querySelector(`.row-${ir+1} .col-${ic+3}`),
                        document.querySelector(`.row-${ir+2} .col-${ic+2}`),
                        document.querySelector(`.row-${ir+3} .col-${ic+1}`),
                        player
                    );
                };
            };
        };
    };
    //Diagonal 2
    for (let ir = 0; ir < 7; ir++) {
        for (let ic = 12; ic > 3; ic--) {
            if (
                document.querySelector(`.row-${ir+1} .col-${ic-3}`).innerText == sPieces.kind &&
                document.querySelector(`.row-${ir+2} .col-${ic-2}`).innerText == oPieces.kind &&
                document.querySelector(`.row-${ir+3} .col-${ic-1}`).innerText == sPieces.kind
            ) {
                if (modeClassic) {
                    if (
                        !document.querySelector(`.row-${ir+1} .col-${ic-3}`).classList.contains(`scored`) ||
                        !document.querySelector(`.row-${ir+2} .col-${ic-2}`).classList.contains(`scored`) ||
                        !document.querySelector(`.row-${ir+3} .col-${ic-1}`).classList.contains(`scored`)
                    ) {
                        addScoreAndAddProps(
                            document.querySelector(`.row-${ir+1} .col-${ic-3}`),
                            document.querySelector(`.row-${ir+2} .col-${ic-2}`),
                            document.querySelector(`.row-${ir+3} .col-${ic-1}`),
                            player
                        );
                    }
                } else {
                    addScoreAndResetProps(
                        document.querySelector(`.row-${ir+1} .col-${ic-3}`),
                        document.querySelector(`.row-${ir+2} .col-${ic-2}`),
                        document.querySelector(`.row-${ir+3} .col-${ic-1}`),
                        player
                    );
                };
            };
        };
    };
};

function checkingWinner(player) {
    setTimeout(() => {
        if (player.score >= finalScore) {
            alert(`${player.name} Menang !!!`);
            resetSettings();
        } else if (document.querySelectorAll(`.filled`).length == allSquares.length) {
            if (p1.score > p2.score) {
                alert(`${p1.name} Menang !!!`);
            } else if (p1.score < p2.score) {
                alert(`${p2.name} Menang !!!`);
            } else {
                alert(`Imbang !!!`);
            }
            resetSettings();
        }
    }, 800);
}

function addScoreAndAddProps(obj1, obj2, obj3, player) {
    setTimeout(() => {
        addProps(obj1, obj2, obj3)
    }, 330);
    player.score += 3 * combo;
    player.scoreBoard.innerText = player.score;
    combo++;
    getScore.play();
    turnAgain = true;
}

function addScoreAndResetProps(obj1, obj2, obj3, player) {
    setTimeout(() => {
        resetProps(obj1, obj2, obj3);
    }, 700);
    player.score += 3 * combo;
    player.scoreBoard.innerText = player.score;
    combo++;
    getScore.play();
    turnAgain = true;
}

function addProps(...obj) {
    for (const o of obj) {
        setTimeout(() => {
            o.style.transform = ``;
        }, 370);
        if (matchMedia(`(max-width: 600px)`).matches) {
            o.style.transform = `rotate(-90deg) scale(1.5) translateY(-15px)`;
        } else {
            o.style.transform = `scale(1.5) translateY(-15px)`;
        }
        o.style.backgroundColor = `black`;
        o.classList.add(`scored`);
    };
};

function resetProps(...obj) {
    for (const o of obj) {
        o.innerText = ``;
        o.style.backgroundColor = `grey`;
        o.style.boxShadow = `0 0 0 midnightblue`;
        o.classList.replace(`filled`, `blank`);
        o.classList.remove(`scored`);
    };
};

function resetObject(...obj) {
    for (const o of obj) {
        o.steps = 0;
        o.score = 0;
        o.scoreBoard.innerText = o.score;
    };
};

function resetSettings() {
    resetProps(...allSquares);
    resetObject(p1, p2);
    turnAgain = false;
    combo = 1;
    p1IsNext = !p1IsNext;
    return gamePlay();
};

function gamePlay() {
    if (p1.steps == 0 && p2.steps == 0) {
        document.querySelector(`.brand`).addEventListener(`click`, appendSetting)
    } else if (p1.steps == 1 || p2.steps == 1) {
        document.querySelector(`.brand`).removeEventListener(`click`, appendSetting);
    }
    piecesIsNext();
    whoIsNext();
    allBlankSquares.forEach(bs => {
        bs.addEventListener(`click`, turnIn);
    });
};

howToPlay.addEventListener(`click`, () => {
    alert(`
    Classic SOS\n\n

    - Bentuk kata SOS dari setiap huruf yang disediakan secara horizontal, vertikal, atau diagonal,\n
    - Mode Standar : Setiap kata yang terbentuk akan hilang,\n
    - Mode Klasik : Setiap kata yang terbentuk tidak akan hilang dan dapat menjadi acuan untuk membentuk kata lainnya,\n
    - Setiap kata yang terbentuk memiliki 3 poin,\n
    - Apabila dapat membentuk kata secara beruntun, maka poin yang didapatkan dilipatgandakan sebanyak kata yang terbentuk beruntun,\n
    - Pemain yang terlebih dahulu mencapai ${finalScore} poin atau lebih, adalah pemenangnya,\n
    - Apabila papan permainan sudah penuh sebelum mencapai ${finalScore} poin, maka yang memiliki poin terbanyak adalah pemenangnya,\n
    - Klik logo kalUnite di sebelah kiri untuk pengaturan.\n\n


    Selamat Bermain,\n
    kalUnite
    `);
});

setModeOpt1.addEventListener(`click`, () => {
    modeClassic = false;
    setPropsOnSetting(setModeOpt1, setModeOpt2);
});
setModeOpt2.addEventListener(`click`, () => {
    modeClassic = true;
    setPropsOnSetting(setModeOpt2, setModeOpt1);
});
setRangeOpt1.addEventListener(`click`, () => {
    finalScore = 33;
    setPropsOnSetting(setRangeOpt1, setRangeOpt2, setRangeOpt3)
});
setRangeOpt2.addEventListener(`click`, () => {
    finalScore = 66;
    setPropsOnSetting(setRangeOpt2, setRangeOpt1, setRangeOpt3)
});
setRangeOpt3.addEventListener(`click`, () => {
    finalScore = 99;
    setPropsOnSetting(setRangeOpt3, setRangeOpt1, setRangeOpt2)
});

confirmSetting.addEventListener(`click`, () => {
    settingGame.style.display = `none`;
})

// * execute program here
gamePlay();