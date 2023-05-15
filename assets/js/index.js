class MineSweeperGame {
  constructor(rows = 10, columms = 10, mines = 10) {
    this.rows = rows;
    this.columms = columms;
    this.mines = mines;
    this.numberOfMinesForCounter = mines;
    this.clickscount = 0;
    this.mainContainer = document.createElement("div");
    this.titleToolsScoreContainer = document.createElement("div");
    this.durationAndGameContainer = document.createElement("div");
    this.title = document.createElement("div");
    this.tools = document.createElement("div");
    this.score = document.createElement("div");
    this.durationOnGame = document.createElement("div");
    this.game = document.createElement("div");
    this.counterOfMines = document.createElement("div");
    this.cell;
    this.cellWithOutBomb;
    this.currentCell;
    this.minesField = new Array(this.rows);
  }

  receiveMineSweeperGame() {
    this.mainContainer.classList.add("container");
    this.titleToolsScoreContainer.classList.add("container_main");
    this.title.classList.add("title_block");
    this.title.textContent = "Kitten MineSweeper";
    this.tools.classList.add("tools_block");
    this.counterOfMines.classList.add("counter_mines");
    this.counterOfMines.textContent = `Number of hidden cats: ${this.numberOfMinesForCounter}`;
    this.durationAndGameContainer.classList.add("container_game");
    this.durationOnGame.classList.add("duration_block");
    this.game.classList.add("game_block");
    this.game.style.gridTemplateColumns = `repeat(${this.columms}, 1fr)`;
    this.game.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
    document.body.prepend(this.mainContainer);
    this.mainContainer.append(this.titleToolsScoreContainer);
    this.titleToolsScoreContainer.append(this.title);
    this.titleToolsScoreContainer.append(this.tools);
    this.mainContainer.append(this.durationAndGameContainer);
    this.durationAndGameContainer.append(this.durationOnGame);
    this.durationOnGame.append(this.counterOfMines);
    this.durationAndGameContainer.append(this.game);
  }

  receiveMineSweeperBoard() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columms; j++) {
        this.cell = document.createElement("div");
        this.cell.dataset.position = `${i},${j}`;
        this.cell.classList.add("cell");
        this.game.append(this.cell);
      }
    }
  }

  receiveNumberOfClicks() {
    this.clickscount += 1;
  }

  receiveMinesField(event) {
    console.log(event);
    console.log(event.target);
    if (!this.cell && event.type === "click") {
      return;
    } else {
      this.cellWithOutBomb = event.target;
      let cellWithOutBombRowPosition = parseInt(
        this.cellWithOutBomb.dataset.position.split(",")[0]
      );
      let cellWithOutBombColumnPosition = parseInt(
        this.cellWithOutBomb.dataset.position.split(",")[1]
      );
      console.log(cellWithOutBombRowPosition);
      console.log(cellWithOutBombColumnPosition);
      for (let i = 0; i < this.minesField.length; i++) {
        this.minesField[i] = new Array();
      }
      for (let i = 0; i < this.minesField.length; i++) {
        for (let j = 0; j < this.columms; j++) {
          this.minesField[i].push(0);
        }
      }
      this.receiveMines(
        cellWithOutBombRowPosition,
        cellWithOutBombColumnPosition
      );
      console.log(this.minesField);
      this.receiveNumberOfMinesAround();
      // this.fillMinesBoardFromMinesField();
    }
  }

  receiveMines(cellWithOutBombRowPosition, cellWithOutBombColumnPosition) {
    for (let k = this.mines; k > 0; k--) {
      // console.log(this.mines);
      // console.log(k);
      let rowPosition = Math.round(Math.random() * (this.rows - 1));
      let columnPosition = Math.round(Math.random() * (this.columms - 1));
      // console.log(typeof cellWithOutBombRowPosition);
      // console.log(columnPosition);
      while (
        this.minesField[rowPosition][columnPosition] === "m" ||
        (rowPosition === cellWithOutBombRowPosition &&
          columnPosition === cellWithOutBombColumnPosition)
      ) {
        console.log("ghbjkhdfjf");
        rowPosition = Math.round(Math.random() * (this.rows - 1));
        columnPosition = Math.round(Math.random() * (this.columms - 1));
      }
      this.minesField[rowPosition][columnPosition] = "m";
    }
    console.log(this.minesField);
    let count = 0;
    for (let i = 0; i < this.minesField.length; i++) {
      for (let j = 0; j < this.minesField[i].length; j++) {
        if (this.minesField[i][j] === "m") {
          count++;
        }
      }
    }
    console.log(count);
  }

  receiveNumberOfMinesAround() {
    console.log(this.minesField);
    for (let i = 0; i < this.minesField.length; i++) {
      for (let j = 0; j < this.minesField[i].length; j++) {
        let countMinesAround = 0;
        if (this.minesField[i][j] !== "m") {
          if (i > 0 && j > 0 && this.minesField[i - 1][j - 1] === "m") {
            countMinesAround = countMinesAround + 1;
            // console.log("[i - 1][j - 1]");
          }
          if (i > 0 && this.minesField[i - 1][j] === "m") {
            countMinesAround = countMinesAround + 1;
            // console.log("[i - 1][j]");
          }
          if (
            i > 0 &&
            j < this.minesField[i].length - 1 &&
            this.minesField[i - 1][j + 1] === "m"
          ) {
            countMinesAround = countMinesAround + 1;
            // console.log("[i - 1][j + 1]");
          }
          if (j > 0 && this.minesField[i][j - 1] === "m") {
            countMinesAround = countMinesAround + 1;
            // console.log("[i][j - 1]");
          }
          if (
            j < this.minesField[i].length - 1 &&
            this.minesField[i][j + 1] === "m"
          ) {
            countMinesAround = countMinesAround + 1;
            // console.log("[i][j + 1]");
          }
          if (
            i < this.minesField.length - 1 &&
            j > 0 &&
            this.minesField[i + 1][j - 1] === "m"
          ) {
            countMinesAround = countMinesAround + 1;
            // console.log("[i + 1][j - 1]");
          }
          if (
            i < this.minesField.length - 1 &&
            this.minesField[i + 1][j] === "m"
          ) {
            countMinesAround = countMinesAround + 1;
            // console.log("[i + 1][j]");
          }
          if (
            i < this.minesField.length - 1 &&
            j < this.minesField[i].length - 1 &&
            this.minesField[i + 1][j + 1] === "m"
          ) {
            countMinesAround = countMinesAround + 1;
            // console.log("[i + 1][j + 1]");
          }
          this.minesField[i][j] = countMinesAround;
        }
      }
    }
  }

  fillMinesBoardFromMinesField() {
    console.log(this.game.children.length);
    for (let i = 0; i < this.game.children.length; i++) {
      let currentCellRow = parseInt(
        this.game.children[i].dataset.position.split(",")[0]
      );
      let currentCellColumn = parseInt(
        this.game.children[i].dataset.position.split(",")[1]
      );
      this.game.children[i].textContent =
        this.minesField[currentCellRow][currentCellColumn];
    }
  }

  openCell(event) {
    // console.log(event);
    // console.log(event.target);
    if (event.target.tagName == "IMG ") {
      event.preventDefault();
    }
    if (
      (!this.cell && event.type === "click") ||
      (!this.cell && event.type === "contextmenu")
    ) {
      console.log("ds[j;e");
      event.preventDefault();
      return;
    } else {
      if (event.target.tagName == "DIV") {
        this.currentCell = event.target;
      } else {
        this.currentCell = event.target.parentNode;
        console.log(this.currentCell);
      }
      let cellCurrentRowPosition = parseInt(
        this.currentCell.dataset.position.split(",")[0]
      );
      let cellCurrentColumnPosition = parseInt(
        this.currentCell.dataset.position.split(",")[1]
      );
      if (event.type === "click") {
        if (!this.currentCell.classList.contains("opened")) {
          this.currentCell.classList.add("opened");
          if (
            this.minesField[cellCurrentRowPosition][
              cellCurrentColumnPosition
            ] === "m"
          ) {
            let image = document.createElement("img");
            image.classList.add("mine");
            image.src = "./assets/icons/whitecat.png";
            this.currentCell.append(image);
          }
          if (
            this.minesField[cellCurrentRowPosition][
              cellCurrentColumnPosition
            ] !== "m" &&
            this.minesField[cellCurrentRowPosition][
              cellCurrentColumnPosition
            ] !== 0
          ) {
            this.currentCell.textContent =
              this.minesField[cellCurrentRowPosition][
                cellCurrentColumnPosition
              ];
            this.makeDigitsColorful(
              cellCurrentRowPosition,
              cellCurrentColumnPosition
            );
          }
          if (
            this.minesField[cellCurrentRowPosition][
              cellCurrentColumnPosition
            ] === 0
          ) {
            console.log(this);
            this.openCellsAroundEmptyCell(
              cellCurrentRowPosition,
              cellCurrentColumnPosition
            );
          } else {
            return;
          }
        }
      } else if (event.type === "contextmenu") {
        event.preventDefault();
        if (
          !this.currentCell.classList.contains("marked") &&
          !this.currentCell.classList.contains("opened")
        ) {
          console.log("hello");
          this.currentCell.classList.toggle("marked");
          let image = document.createElement("img");
          image.classList.add("flag");
          image.src = "./assets/icons/whitepaw.png";
          this.currentCell.append(image);
          this.countOfRestMines();
        } else if (this.currentCell.classList.contains("marked")) {
          console.log("very bad");
          this.currentCell.classList.toggle("marked");
          this.currentCell.children[0].remove();
          this.countOfRestMines();
        }
      }
    }
  }

  countOfRestMines() {
    console.log(this.currentCell);
    if (this.currentCell.classList.contains("marked")) {
      this.numberOfMinesForCounter = this.numberOfMinesForCounter - 1;
      console.log(this.numberOfMinesForCounter);
      console.log(this.mines);
      this.counterOfMines.textContent = `Number of hidden cats: ${this.numberOfMinesForCounter}`;
    } else if (!this.currentCell.classList.contains("marked")) {
      this.numberOfMinesForCounter = this.numberOfMinesForCounter + 1;
      this.counterOfMines.textContent = `Number of hidden cats: ${this.numberOfMinesForCounter}`;
    }
  }

  openCellsAroundEmptyCell(cellCurrentRowPosition, cellCurrentColumnPosition) {
    let currentCellOnCheckStart = new Object();
    let currentCellOnCheckStartDataset = [];
    currentCellOnCheckStartDataset.push(cellCurrentRowPosition.toString());
    currentCellOnCheckStartDataset.push(cellCurrentColumnPosition.toString());
    currentCellOnCheckStartDataset = currentCellOnCheckStartDataset.join(",");
    // console.log(currentCellOnCheckStartDataset);
    for (let i = 0; i < this.game.children.length; i++) {
      if (
        currentCellOnCheckStartDataset ===
        this.game.children[i].dataset.position
      ) {
        this.game.children[i].dataset.cheked = true;
        currentCellOnCheckStart = this.game.children[i];
      }
    }
    // console.log(currentCellOnCheckStart);
    // console.log(!!currentCellOnCheckStart.dataset.cheked);
    if (
      cellCurrentRowPosition > 0 &&
      cellCurrentColumnPosition > 0 &&
      this.minesField[cellCurrentRowPosition - 1][
        cellCurrentColumnPosition - 1
      ] !== "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition - 1).toString());
      currentDataSet.push((cellCurrentColumnPosition - 1).toString());
      currentDataSet = currentDataSet.join(",");
      // console.log(
      //   this.minesField[cellCurrentRowPosition - 1][
      //     cellCurrentColumnPosition - 1
      //   ]
      // );
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          this.game.children[i].classList.add("opened");
          if (
            this.minesField[cellCurrentRowPosition - 1][
              cellCurrentColumnPosition - 1
            ] !== 0
          ) {
            this.game.children[i].innerHTML =
              this.minesField[cellCurrentRowPosition - 1][
                cellCurrentColumnPosition - 1
              ];
          }
          currentCellOnCheck = this.game.children[i];
          this.makeDigitsColorful(
            cellCurrentRowPosition - 1,
            cellCurrentColumnPosition - 1,
            currentCellOnCheck
          );
        }
      }
      // console.log(currentCellOnCheck);
      // console.log(!currentCellOnCheck.dataset.cheked);
      if (
        this.minesField[cellCurrentRowPosition - 1][
          cellCurrentColumnPosition - 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition - 1,
          cellCurrentColumnPosition - 1
        );
      }
    }

    if (
      cellCurrentRowPosition > 0 &&
      this.minesField[cellCurrentRowPosition - 1][cellCurrentColumnPosition] !==
        "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition - 1).toString());
      currentDataSet.push(cellCurrentColumnPosition.toString());
      currentDataSet = currentDataSet.join(",");
      // console.log(
      //   this.minesField[cellCurrentRowPosition - 1][cellCurrentColumnPosition]
      // );
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          this.game.children[i].classList.add("opened");
          if (
            this.minesField[cellCurrentRowPosition - 1][
              cellCurrentColumnPosition
            ] !== 0
          ) {
            this.game.children[i].innerHTML =
              this.minesField[cellCurrentRowPosition - 1][
                cellCurrentColumnPosition
              ];
          }
          currentCellOnCheck = this.game.children[i];
          this.makeDigitsColorful(
            cellCurrentRowPosition - 1,
            cellCurrentColumnPosition,
            currentCellOnCheck
          );
        }
      }
      if (
        this.minesField[cellCurrentRowPosition - 1][
          cellCurrentColumnPosition
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition - 1,
          cellCurrentColumnPosition
        );
      }
    }
    if (
      cellCurrentRowPosition > 0 &&
      cellCurrentColumnPosition <
        this.minesField[cellCurrentRowPosition].length - 1 &&
      this.minesField[cellCurrentRowPosition - 1][
        cellCurrentColumnPosition + 1
      ] !== "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition - 1).toString());
      currentDataSet.push((cellCurrentColumnPosition + 1).toString());
      // console.log(
      //   this.minesField[cellCurrentRowPosition - 1][
      //     cellCurrentColumnPosition + 1
      //   ]
      // );
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          this.game.children[i].classList.add("opened");
          if (
            this.minesField[cellCurrentRowPosition - 1][
              cellCurrentColumnPosition + 1
            ] !== 0
          ) {
            this.game.children[i].innerHTML =
              this.minesField[cellCurrentRowPosition - 1][
                cellCurrentColumnPosition + 1
              ];
          }

          currentCellOnCheck = this.game.children[i];
          this.makeDigitsColorful(
            cellCurrentRowPosition - 1,
            cellCurrentColumnPosition + 1,
            currentCellOnCheck
          );
        }
      }
      if (
        this.minesField[cellCurrentRowPosition - 1][
          cellCurrentColumnPosition + 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition - 1,
          cellCurrentColumnPosition + 1
        );
      }
    }
    if (
      cellCurrentColumnPosition > 0 &&
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition - 1] !==
        "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push(cellCurrentRowPosition.toString());
      currentDataSet.push((cellCurrentColumnPosition - 1).toString());
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          this.game.children[i].classList.add("opened");
          if (
            this.minesField[cellCurrentRowPosition][
              cellCurrentColumnPosition - 1
            ] !== 0
          ) {
            this.game.children[i].innerHTML =
              this.minesField[cellCurrentRowPosition][
                cellCurrentColumnPosition - 1
              ];
          }

          currentCellOnCheck = this.game.children[i];
          this.makeDigitsColorful(
            cellCurrentRowPosition,
            cellCurrentColumnPosition - 1,
            currentCellOnCheck
          );
        }
      }
      if (
        this.minesField[cellCurrentRowPosition][
          cellCurrentColumnPosition - 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition,
          cellCurrentColumnPosition - 1
        );
      }
    }
    if (
      cellCurrentColumnPosition <
        this.minesField[cellCurrentRowPosition].length - 1 &&
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition + 1] !==
        "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push(cellCurrentRowPosition.toString());
      currentDataSet.push((cellCurrentColumnPosition + 1).toString());
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          this.game.children[i].classList.add("opened");
          if (
            this.minesField[cellCurrentRowPosition][
              cellCurrentColumnPosition + 1
            ] !== 0
          ) {
            this.game.children[i].innerHTML =
              this.minesField[cellCurrentRowPosition][
                cellCurrentColumnPosition + 1
              ];
          }

          currentCellOnCheck = this.game.children[i];
          this.makeDigitsColorful(
            cellCurrentRowPosition,
            cellCurrentColumnPosition + 1,
            currentCellOnCheck
          );
        }
      }
      if (
        this.minesField[cellCurrentRowPosition][
          cellCurrentColumnPosition + 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition,
          cellCurrentColumnPosition + 1
        );
      }
    }
    if (
      cellCurrentRowPosition < this.minesField.length - 1 &&
      cellCurrentColumnPosition > 0 &&
      this.minesField[cellCurrentRowPosition + 1][
        cellCurrentColumnPosition - 1
      ] !== "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition + 1).toString());
      currentDataSet.push((cellCurrentColumnPosition - 1).toString());
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          this.game.children[i].classList.add("opened");
          if (
            this.minesField[cellCurrentRowPosition + 1][
              cellCurrentColumnPosition - 1
            ] !== 0
          ) {
            this.game.children[i].innerHTML =
              this.minesField[cellCurrentRowPosition + 1][
                cellCurrentColumnPosition - 1
              ];
          }

          currentCellOnCheck = this.game.children[i];
          this.makeDigitsColorful(
            cellCurrentRowPosition + 1,
            cellCurrentColumnPosition - 1,
            currentCellOnCheck
          );
        }
      }
      if (
        this.minesField[cellCurrentRowPosition + 1][
          cellCurrentColumnPosition - 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition + 1,
          cellCurrentColumnPosition - 1
        );
      }
    }
    if (
      cellCurrentRowPosition < this.minesField.length - 1 &&
      this.minesField[cellCurrentRowPosition + 1][cellCurrentColumnPosition] !==
        "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition + 1).toString());
      currentDataSet.push(cellCurrentColumnPosition.toString());
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          this.game.children[i].classList.add("opened");
          if (
            this.minesField[cellCurrentRowPosition + 1][
              cellCurrentColumnPosition
            ] !== 0
          ) {
            this.game.children[i].innerHTML =
              this.minesField[cellCurrentRowPosition + 1][
                cellCurrentColumnPosition
              ];
          }

          currentCellOnCheck = this.game.children[i];
          this.makeDigitsColorful(
            cellCurrentRowPosition + 1,
            cellCurrentColumnPosition,
            currentCellOnCheck
          );
        }
      }
      if (
        this.minesField[cellCurrentRowPosition + 1][
          cellCurrentColumnPosition
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition + 1,
          cellCurrentColumnPosition
        );
      }
    }
    if (
      cellCurrentRowPosition < this.minesField.length - 1 &&
      cellCurrentColumnPosition <
        this.minesField[cellCurrentRowPosition].length - 1 &&
      this.minesField[cellCurrentRowPosition + 1][
        cellCurrentColumnPosition + 1
      ] !== "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition + 1).toString());
      currentDataSet.push((cellCurrentColumnPosition + 1).toString());
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          this.game.children[i].classList.add("opened");
          if (
            this.minesField[cellCurrentRowPosition + 1][
              cellCurrentColumnPosition + 1
            ] !== 0
          ) {
            this.game.children[i].innerHTML =
              this.minesField[cellCurrentRowPosition + 1][
                cellCurrentColumnPosition + 1
              ];
          }

          currentCellOnCheck = this.game.children[i];
          this.makeDigitsColorful(
            cellCurrentRowPosition + 1,
            cellCurrentColumnPosition + 1,
            currentCellOnCheck
          );
        }
      }
      if (
        this.minesField[cellCurrentRowPosition + 1][
          cellCurrentColumnPosition + 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition + 1,
          cellCurrentColumnPosition + 1
        );
      }
    }
  }

  makeDigitsColorful(
    cellCurrentRowPosition,
    cellCurrentColumnPosition,
    currentCellOnCheck
  ) {
    if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 1
    ) {
      this.currentCell.classList.add("one");
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("one");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 2
    ) {
      this.currentCell.classList.add("two");
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("two");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 3
    ) {
      this.currentCell.classList.add("three");
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("three");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 4
    ) {
      this.currentCell.classList.add("four");
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("four");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 5
    ) {
      this.currentCell.classList.add("five");
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("five");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 6
    ) {
      this.currentCell.classList.add("six");
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("six");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 7
    ) {
      this.currentCell.classList.add("seven");
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("seven");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 8
    ) {
      this.currentCell.classList.add("eight");
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("eight");
      }
    }
  }
}

let gameMiner = new MineSweeperGame();
console.log(gameMiner);
gameMiner.receiveMineSweeperGame();
gameMiner.receiveMineSweeperBoard();
gameMiner.game.addEventListener("click", (event) => {
  gameMiner.receiveNumberOfClicks();
  // console.log(gameMiner.clickscount);
  if (gameMiner.clickscount === 1) {
    gameMiner.receiveMinesField(event);
  }
  gameMiner.openCell(event);
});
gameMiner.game.addEventListener("contextmenu", (event) => {
  gameMiner.openCell(event);
});
