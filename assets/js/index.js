class MineSweeperGame {
  constructor(rows = 10, columms = 10, mines = 10) {
    this.rows = rows;
    this.columms = columms;
    this.mines = mines;
    this.numberOfCells = rows * columms;
    this.numberOfMinesForCounter = mines;
    this.clickscount = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.timerIdForStop;
    this.cell;
    this.cellWithOutBomb;
    this.currentCell;
    this.minesField = new Array(this.rows);
    this.counterOfMarkedKittens = 0;
    this.counterForRestCellsWithOutBombs = 0;
    this.mainContainer = document.createElement("div");
    this.toolsScoreContainer = document.createElement("div");
    this.durationAndGameContainer = document.createElement("div");
    this.title = document.createElement("div");
    this.tools = document.createElement("div");
    this.score = document.createElement("div");
    this.durationOnGame = document.createElement("div");
    this.game = document.createElement("div");
    this.counterOfMines = document.createElement("div");
    this.counterOfTime = document.createElement("div");
    this.numberOfLeftClicks = document.createElement("div");
    //result button
    this.resultWindow = document.createElement("div");
    this.resultOKButton = document.createElement("div");
    this.resultText = document.createElement("div");
    //settings
    this.buttonStartNewGame = document.createElement("div");
    this.settigsTitle = document.createElement("div");
    this.sizeOfGame = document.createElement("div");
    this.sizeOfGameTitle = document.createElement("div");
    this.sizeForm = document.createElement("form");
    this.sizeEasyTitle = document.createElement("label");
    this.sizeEasy = document.createElement("input");
    this.sizeMediumTitle = document.createElement("label");
    this.sizeMedium = document.createElement("input");
    this.sizeHardTitle = document.createElement("label");
    this.sizeHard = document.createElement("input");
    this.numberOfMines = document.createElement("div");
    this.numberOfMinesTitle = document.createElement('div');
    this.numberOfMinesInput = document.createElement('input');
  }

  receiveMineSweeperGame() {
    this.mainContainer.classList.add("container");
    this.toolsScoreContainer.classList.add("container_tools");
    this.title.classList.add("title_block");
    this.title.textContent = "Kitten's MineSweeper";
    this.tools.classList.add("tools_block");
    this.numberOfLeftClicks.classList.add("number_clicks");
    this.numberOfLeftClicks.textContent = `Number of movements: ${this.clickscount}`;
    this.counterOfMines.classList.add("counter_mines");
    this.counterOfMines.textContent = `Number of hidden dreaming cats: 0`;
    this.counterOfTime.classList.add("counter_times");
    this.counterOfTime.textContent = `Duration: 00:00 min`;
    this.durationAndGameContainer.classList.add("container_game");
    this.durationOnGame.classList.add("duration_block");
    this.game.classList.add("game_block");
    this.game.style.gridTemplateColumns = `repeat(${this.columms}, auto)`;
    this.game.style.gridTemplateRows = `repeat(${this.rows}, auto)`;
    document.body.prepend(this.mainContainer);
    this.mainContainer.append(this.durationAndGameContainer);
    this.mainContainer.append(this.toolsScoreContainer);
    this.toolsScoreContainer.append(this.title);
    this.toolsScoreContainer.append(this.tools);
    this.durationAndGameContainer.append(this.durationOnGame);
    this.durationOnGame.append(this.counterOfTime);
    this.durationOnGame.append(this.numberOfLeftClicks);
    this.durationOnGame.append(this.counterOfMines);
    this.durationAndGameContainer.append(this.game);
    this.receiveSettingsBlock();
    this.receiveStartGameButton();
  }

  receiveSettingsBlock() {
    this.settigsTitle.classList.add("tools_title");
    this.settigsTitle.textContent = "Settings";
    this.sizeOfGame.classList.add("size_block");
    this.sizeOfGameTitle.classList.add("size_title");
    this.sizeOfGameTitle.textContent = `Size of game:`;
    this.tools.append(this.settigsTitle);
    this.tools.append(this.sizeOfGame);
    this.sizeOfGame.append(this.sizeOfGameTitle);
    this.sizeForm.classList.add("size_form");
    this.sizeOfGame.append(this.sizeForm);
    this.sizeEasyTitle.textContent = "10 x 10";
    this.sizeEasyTitle.setAttribute("for", "10");
    this.sizeEasy.setAttribute("id", "10");
    this.sizeEasy.checked = true;
    this.sizeEasy.setAttribute("type", "radio");
    this.sizeEasy.setAttribute("name", "size");
    this.sizeForm.append(this.sizeEasy);
    this.sizeForm.append(this.sizeEasyTitle);
    this.sizeMediumTitle.textContent = "15 x 15";
    this.sizeMediumTitle.setAttribute("for", "15");
    this.sizeMedium.setAttribute("id", "15");
    this.sizeMedium.setAttribute("type", "radio");
    this.sizeMedium.setAttribute("name", "size");
    this.sizeForm.append(this.sizeMedium);
    this.sizeForm.append(this.sizeMediumTitle);
    this.sizeHardTitle.textContent = "25 x 25";
    this.sizeHardTitle.setAttribute("for", "25");
    this.sizeHard.setAttribute("id", "25");
    this.sizeHard.setAttribute("type", "radio");
    this.sizeHard.setAttribute("name", "size");
    this.sizeForm.append(this.sizeHard);
    this.sizeForm.append(this.sizeHardTitle);
    this.numberOfMines.classList.add("number_mines_block");
    this.tools.append(this.numberOfMines);
    this.numberOfMinesTitle.classList.add('number_mines_title');
    this.numberOfMinesTitle.textContent = `Number of kittens: ${this.mines} kittens`;
    this.numberOfMines.append(this.numberOfMinesTitle);
    this.numberOfMinesInput.setAttribute('id', 'numberOfMines');
    this.numberOfMinesInput.setAttribute('type', 'range');
    this.numberOfMinesInput.setAttribute('value', this.mines);
    this.numberOfMinesInput.setAttribute('min', 10);
    this.numberOfMinesInput.setAttribute('max', 99);
    this.numberOfMinesInput.setAttribute('step', 1);
    this.numberOfMines.append(this.numberOfMinesInput);
  }

  receiveStartGameButton() {
    this.buttonStartNewGame.classList.add("start_button");
    this.buttonStartNewGame.textContent = "Start new game";
    this.toolsScoreContainer.append(this.buttonStartNewGame);
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

  receiveNumberOfClicks(event) {
    if (document.body.children[0].classList.contains("window_result")) {
      event.stopImmediatePropagation();
      return;
    }
    this.clickscount += 1;
    this.numberOfLeftClicks.textContent = `Number of movements: ${this.clickscount}`;
    if (this.clickscount === 1) {
      setTimeout(function() {
        gameMiner.countTime();
      }, 0);
      this.timerIdForStop = setInterval(function() {
        gameMiner.countTime();
      }, 1000);
    }
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
      this.counterOfMines.textContent = `Number of hidden dreaming cats: ${this.numberOfMinesForCounter}`;
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
      this.game.children[i].textContent = this.minesField[currentCellRow][
        currentCellColumn
      ];
    }
  }

  openCell(event) {
    // console.log(event);
    // console.log(event.target);
    if (document.body.children[0].classList.contains("window_result")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
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
        if (
          !this.currentCell.classList.contains("opened") &&
          !this.currentCell.classList.contains("marked")
        ) {
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
            this.makeResultMessage(
              cellCurrentRowPosition,
              cellCurrentColumnPosition
            );
            this.openResultWindow();
          }
          if (
            this.minesField[cellCurrentRowPosition][
              cellCurrentColumnPosition
            ] !== "m" &&
            this.minesField[cellCurrentRowPosition][
              cellCurrentColumnPosition
            ] !== 0
          ) {
            this.currentCell.textContent = this.minesField[
              cellCurrentRowPosition
            ][cellCurrentColumnPosition];
            this.makeDigitsColorful(
              cellCurrentRowPosition,
              cellCurrentColumnPosition
            );
            this.makeValidationForWinningForRestUnOpenedSells(
              cellCurrentRowPosition,
              cellCurrentColumnPosition
            );
          }
          if (
            this.minesField[cellCurrentRowPosition][
              cellCurrentColumnPosition
            ] === 0
          ) {
            // console.log(this);
            this.openCellsAroundEmptyCell(
              cellCurrentRowPosition,
              cellCurrentColumnPosition
            );
            this.makeValidationForWinningForRestUnOpenedSells(
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
          if (this.numberOfMinesForCounter === 0) {
            // console.log(this.numberOfMinesForCounter);
            this.makeValidationForWinningForMarkedSells(
              cellCurrentRowPosition,
              cellCurrentColumnPosition
            );
          }
        } else if (this.currentCell.classList.contains("marked")) {
          console.log("very bad");
          this.currentCell.classList.toggle("marked");
          this.currentCell.children[0].remove();
          this.countOfRestMines();
          if (this.numberOfMinesForCounter === 0) {
            // console.log(this.numberOfMinesForCounter);
            this.makeValidationForWinningForMarkedSells(
              cellCurrentRowPosition,
              cellCurrentColumnPosition
            );
          }
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
      this.counterOfMines.textContent = `Number of hidden dreaming cats: ${this.numberOfMinesForCounter}`;
    } else if (!this.currentCell.classList.contains("marked")) {
      this.numberOfMinesForCounter = this.numberOfMinesForCounter + 1;
      this.counterOfMines.textContent = `Number of hidden dreaming cats: ${this.numberOfMinesForCounter}`;
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
            this.game.children[i].innerHTML = this.minesField[
              cellCurrentRowPosition - 1
            ][cellCurrentColumnPosition - 1];
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
            this.game.children[i].innerHTML = this.minesField[
              cellCurrentRowPosition - 1
            ][cellCurrentColumnPosition];
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
            this.game.children[i].innerHTML = this.minesField[
              cellCurrentRowPosition - 1
            ][cellCurrentColumnPosition + 1];
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
            this.game.children[i].innerHTML = this.minesField[
              cellCurrentRowPosition
            ][cellCurrentColumnPosition - 1];
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
            this.game.children[i].innerHTML = this.minesField[
              cellCurrentRowPosition
            ][cellCurrentColumnPosition + 1];
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
            this.game.children[i].innerHTML = this.minesField[
              cellCurrentRowPosition + 1
            ][cellCurrentColumnPosition - 1];
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
            this.game.children[i].innerHTML = this.minesField[
              cellCurrentRowPosition + 1
            ][cellCurrentColumnPosition];
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
            this.game.children[i].innerHTML = this.minesField[
              cellCurrentRowPosition + 1
            ][cellCurrentColumnPosition + 1];
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

  countTime() {
    if (this.seconds > 60) {
      this.minutes = this.minutes + 1;
      this.seconds = 0;
    }
    this.seconds = this.seconds + 1;
    // console.log(this.counterOfTime);
    if (this.seconds < 10) {
      this.counterOfTime.textContent = `Duration: 0${this.minutes}:0${this.seconds} min`;
    } else if (this.seconds >= 10) {
      this.counterOfTime.textContent = `Duration: 0${this.minutes}:${this.seconds} min`;
    } else if (this.minutes >= 10 && this.seconds < 10) {
      this.counterOfTime.textContent = `Duration: ${this.minutes}:0${this.seconds} min`;
    } else if (this.minutes >= 10 && this.seconds >= 10) {
      this.counterOfTime.textContent = `Duration: ${this.minutes}:${this.seconds} min`;
    }
  }

  openResultWindow() {
    this.resultWindow.classList.add("window_result");
    this.resultText.classList.add("result_text");
    this.resultOKButton.classList.add("button_ok");
    this.resultOKButton.textContent = "OK";
    this.resultWindow.append(this.resultText);
    this.resultWindow.append(this.resultOKButton);
    document.body.prepend(this.resultWindow);
  }

  makeResultMessage(cellCurrentRowPosition, cellCurrentColumnPosition) {
    clearInterval(this.timerIdForStop);
    if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] ===
        "m" &&
      this.counterOfMarkedKittens !== this.mines
    ) {
      this.resultText.textContent = `Opps!!! Your woke up a kitten and he scratched you. Sorry, but the game is over. Be more cauful next time. Good luck)`;
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] ===
        "m" &&
      this.counterOfMarkedKittens === this.mines &&
      this.numberOfMinesForCounter === 0
    ) {
      this.resultText.textContent = `Cogratulations!!!! You found all kittens and  didn't wake up them`;
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] !==
        "m" &&
      this.counterForRestCellsWithOutBombs === this.numberOfCells - this.mines
    ) {
      this.resultText.textContent = `Cogratulations!!!! You found all kittens and  didn't wake up them`;
    }
  }

  pressOKonCloseWindow() {
    clearInterval(this.timerIdForStop);
    console.log(this.game.children.length);
    if (document.body.children[0].classList.contains("window_result")) {
      document.body.children[0].remove();
    }
    for (let i = this.numberOfCells - 1; i >= 0; i--) {
      // console.log(this.game.children.length);
      this.game.children[i].remove();
    }
    this.numberOfCells = this.rows * this.columms;
    this.receiveMineSweeperBoard();
    this.seconds = 0;
    this.minutes = 0;
    this.clickscount = 0;
    this.numberOfMinesForCounter = this.mines;
    this.minesField = new Array(this.rows);
    this.numberOfLeftClicks.textContent = `Number of movements: ${this.clickscount}`;
    this.counterOfMines.textContent = `Number of hidden dreaming cats: 0`;
    this.counterOfTime.textContent = `Duration: 00:00 min`;
  }

  makeValidationForWinningForMarkedSells(
    cellCurrentRowPosition,
    cellCurrentColumnPosition
  ) {
    for (let i = 0; i < this.game.children.length; i++) {
      if (this.game.children[i].classList.contains("marked")) {
        let rowPositionOfMarkedCell = parseInt(
          this.game.children[i].dataset.position.split(",")[0]
        );
        let columnPositionOfMarkedCell = parseInt(
          this.game.children[i].dataset.position.split(",")[1]
        );
        if (
          this.minesField[rowPositionOfMarkedCell][
            columnPositionOfMarkedCell
          ] === "m"
        ) {
          this.counterOfMarkedKittens += 1;
        }
      }
    }
    if (this.counterOfMarkedKittens === this.mines) {
      this.makeResultMessage(cellCurrentRowPosition, cellCurrentColumnPosition);
      this.openResultWindow();
    }
    this.counterOfMarkedKittens = 0;
  }

  makeValidationForWinningForRestUnOpenedSells(
    cellCurrentRowPosition,
    cellCurrentColumnPosition
  ) {
    for (let i = 0; i < this.game.children.length; i++) {
      let rowPositionOfMarkedCell = parseInt(
        this.game.children[i].dataset.position.split(",")[0]
      );
      let columnPositionOfMarkedCell = parseInt(
        this.game.children[i].dataset.position.split(",")[1]
      );
      if (this.game.children[i].classList.contains("opened")) {
        if (
          this.minesField[rowPositionOfMarkedCell][
            columnPositionOfMarkedCell
          ] !== "m"
        ) {
          this.counterForRestCellsWithOutBombs += 1;
        }
      }
    }
    // console.log(this.counterForRestCellsWithOutBombs);
    if (
      this.counterForRestCellsWithOutBombs ===
      this.numberOfCells - this.mines
    ) {
      console.log(this.counterForRestCellsWithOutBombs);
      this.makeResultMessage(cellCurrentRowPosition, cellCurrentColumnPosition);
      this.openResultWindow();
    }
    this.counterForRestCellsWithOutBombs = 0;
  }

  setNewSizeOfField(event) {
    if (this.sizeEasy.checked) {
      this.rows = parseInt(this.sizeEasy.getAttribute("id"));
      this.columms = parseInt(this.sizeEasy.getAttribute("id"));
      console.log(typeof this.rows);
    } else if (this.sizeMedium.checked) {
      this.rows = parseInt(this.sizeMedium.getAttribute("id"));
      this.columms = parseInt(this.sizeMedium.getAttribute("id"));
      console.log(this.rows);
    } else if (this.sizeHard.checked) {
      this.rows = parseInt(this.sizeHard.getAttribute("id"));
      this.columms = parseInt(this.sizeHard.getAttribute("id"));
      console.log(this.rows);
    }
  }
  setNewSizwOFGameGrid() {
    this.game.style.gridTemplateColumns = `repeat(${this.columms}, auto)`;
    this.game.style.gridTemplateRows = `repeat(${this.rows}, auto)`;
  }

  setNewNumberOfMines() {
    console.log(this.numberOfMinesInput.value);
    this.mines = this.numberOfMinesInput.value;
    console.log(this.mines);
    this.numberOfMinesInput.setAttribute('value', this.mines);
    this.numberOfMinesTitle.textContent = `Number of kittens: ${this.mines} kittens`;
    this.numberOfMinesForCounter = this.mines;
  }
}

let gameMiner = new MineSweeperGame();
// console.log(gameMiner);
gameMiner.receiveMineSweeperGame();
gameMiner.receiveMineSweeperBoard();
gameMiner.game.addEventListener("click", event => {
  gameMiner.receiveNumberOfClicks(event);
  // console.log(gameMiner.clickscount);
  if (gameMiner.clickscount === 1) {
    gameMiner.receiveMinesField(event);
  }
  gameMiner.openCell(event);
});
gameMiner.game.addEventListener("contextmenu", event => {
  gameMiner.openCell(event);
});
gameMiner.resultOKButton.addEventListener("click", event => {
  gameMiner.pressOKonCloseWindow(event);
});
gameMiner.buttonStartNewGame.addEventListener("click", event => {
  gameMiner.setNewSizwOFGameGrid();
  gameMiner.pressOKonCloseWindow(event);
});

gameMiner.sizeEasy.addEventListener("change", event => {
  // console.log(event);
  gameMiner.setNewSizeOfField(event);
});
gameMiner.sizeMedium.addEventListener("change", event => {
  // console.log(event);
  gameMiner.setNewSizeOfField(event);
});
gameMiner.sizeHard.addEventListener("change", event => {
  // console.log(event);
  gameMiner.setNewSizeOfField(event);
});

gameMiner.numberOfMinesInput.addEventListener("change", event => {
  // console.log(event);
  gameMiner.setNewNumberOfMines(event);
});
