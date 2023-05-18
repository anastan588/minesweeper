class MineSweeperGame {
  constructor(rows = 10, columms = 10, mines = 10) {
    this.rows = rows;
    this.columms = columms;
    this.mines = mines;
    this.numberOfCells = rows * columms;
    this.numberOfMinesForCounter = mines;
    this.clickscount = 0;
    this.productiveClicksCount =0;
    this.seconds = 0;
    this.minutes = 0;
    this.timerIdForStop;
    this.cell;
    this.cellWithOutBomb;
    this.cellUnderClick;
    this.currentCell;
    this.markForRangeEvent = 0;
    this.winGame = 0;
    this.minesField = new Array(this.rows);
    this.counterOfMarkedKittens = 0;
    this.counterForRestCellsWithOutBombs = 0;
    this.audioForOpenCell = new Audio("./assets/audio/opensound.mp3");
    this.audioForFlagCell = new Audio("./assets/audio/flagsound.mp3");
    this.audioForMineCell = new Audio("./assets/audio/kitten2sound.mp3");
    console.log(this.audioForOpenCell);
    this.mainContainer = document.createElement("div");
    this.toolsScoreContainer = document.createElement("div");
    this.durationAndGameContainer = document.createElement("div");
    this.title = document.createElement("div");

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
    this.tools = document.createElement("div");
    this.settigsTitle = document.createElement("div");
    this.settingsCommonBlock = document.createElement("div");
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
    this.numberOfMinesTitle = document.createElement("div");
    this.numberOfMinesInput = document.createElement("input");
    this.theme = document.createElement("div");
    this.themeTitle = document.createElement("div");
    this.themeForm = document.createElement("form");
    this.whiteThemeTitle = document.createElement("label");
    this.whiteThemeInput = document.createElement("input");
    this.blackThemeTitle = document.createElement("label");
    this.blackThemeInput = document.createElement("input");
    this.sound = document.createElement("div");
    this.soundTitle = document.createElement("div");
    this.soundForm = document.createElement("form");
    this.onSoundTitle = document.createElement("label");
    this.onSoundInput = document.createElement("input");
    this.offSoundTitle = document.createElement("label");
    this.offSoundInput = document.createElement("input");
    // results block
    this.resultsBlock = document.createElement("div");
    this.resultsTitle = document.createElement("div");
    this.resultsTable = document.createElement("div");
    this.resultsTableLine = document.createElement("div");
    this.resultsItemName = document.createElement("div");
    this.resultsItemClicks = document.createElement("div");
    this.resultsItemDuration = document.createElement("div");
    // results name
    this.resultsName;
    // results Input
    this.resultsInputBlock = document.createElement("div");
    this.resultsInputBlockTitle = document.createElement("div");
    this.resultsInputBlockInput = document.createElement("input");
    this.resultsInputBlockSubmit = document.createElement("div");
  }

  receiveMineSweeperGame() {
    this.mainContainer.classList.add("container");
    this.toolsScoreContainer.classList.add("container_tools");
    this.title.classList.add("title_block");
    this.title.textContent = "Kitten's MineSweeper";
    this.numberOfLeftClicks.classList.add("number_clicks");
    this.numberOfLeftClicks.textContent = `Number of movements: ${this.productiveClicksCount}`;
    this.counterOfMines.classList.add("counter_mines");
    this.counterOfMines.textContent = `Number of hidden dreaming cats: 0`;
    this.counterOfTime.classList.add("counter_times");
    this.counterOfTime.textContent = `Duration: 00:00 seconds`;
    this.durationAndGameContainer.classList.add("container_game");
    this.durationOnGame.classList.add("duration_block");
    this.game.classList.add("game_block");
    this.game.style.gridTemplateColumns = `repeat(${this.columms}, auto)`;
    this.game.style.gridTemplateRows = `repeat(${this.rows}, auto)`;
    document.body.prepend(this.mainContainer);
    this.mainContainer.append(this.durationAndGameContainer);
    this.mainContainer.append(this.toolsScoreContainer);
    this.toolsScoreContainer.append(this.title);
    this.durationAndGameContainer.append(this.durationOnGame);
    this.durationOnGame.append(this.counterOfTime);
    this.durationOnGame.append(this.numberOfLeftClicks);
    this.durationOnGame.append(this.counterOfMines);
    this.durationAndGameContainer.append(this.game);
    this.receiveStartGameButton();
    this.receiveSettingsBlock();
    this.receiveResultsBlock();
  }

  receiveStartGameButton() {
    this.buttonStartNewGame.classList.add("start_button");
    this.buttonStartNewGame.textContent = "Start new game";
    this.toolsScoreContainer.append(this.buttonStartNewGame);
  }

  receiveSettingsBlock() {
    this.tools.classList.add("tools_block");
    this.toolsScoreContainer.append(this.tools);
    this.settigsTitle.classList.add("tools_title");
    this.settigsTitle.textContent = "Settings";
    this.tools.append(this.settigsTitle);
    this.settingsCommonBlock.classList.add("settings_container");
    this.tools.append(this.settingsCommonBlock);
    this.sizeOfGame.classList.add("size_block");
    this.sizeOfGameTitle.classList.add("size_title");
    this.sizeOfGameTitle.textContent = `Size of game:`;
    this.theme.classList.add("theme_block");
    this.settingsCommonBlock.append(this.theme);
    this.sound.classList.add("sound_block");
    this.settingsCommonBlock.append(this.sound);
    this.themeTitle.classList.add("theme_title");
    this.themeTitle.textContent = "Theme of game:";
    this.theme.append(this.themeTitle);
    this.themeForm.classList.add("theme_form");
    this.theme.append(this.themeForm);
    this.blackThemeTitle.textContent = "dark style";
    this.blackThemeTitle.setAttribute("for", "black");
    this.blackThemeInput.setAttribute("id", "black");
    this.blackThemeInput.setAttribute("type", "radio");
    this.blackThemeInput.setAttribute("name", "theme");
    this.blackThemeInput.checked = true;
    this.themeForm.append(this.blackThemeInput);
    this.themeForm.append(this.blackThemeTitle);
    this.whiteThemeTitle.textContent = "light style";
    this.whiteThemeTitle.setAttribute("for", "white");
    this.whiteThemeInput.setAttribute("id", "white");
    this.whiteThemeInput.setAttribute("type", "radio");
    this.whiteThemeInput.setAttribute("name", "theme");
    this.themeForm.append(this.whiteThemeInput);
    this.themeForm.append(this.whiteThemeTitle);
    this.soundTitle.classList.add("sound_title");
    this.soundTitle.textContent = "Sound:";
    this.sound.append(this.soundTitle);
    this.soundForm.classList.add("sound_form");
    this.sound.append(this.soundForm);
    this.onSoundTitle.textContent = "on";
    this.onSoundTitle.setAttribute("for", "on");
    this.onSoundInput.setAttribute("id", "on");
    this.onSoundInput.setAttribute("type", "radio");
    this.onSoundInput.setAttribute("name", "sound");
    this.onSoundInput.checked = true;
    this.soundForm.append(this.onSoundInput);
    this.soundForm.append(this.onSoundTitle);
    this.offSoundTitle.textContent = "off";
    this.offSoundTitle.setAttribute("for", "off");
    this.offSoundInput.setAttribute("id", "off");
    this.offSoundInput.setAttribute("type", "radio");
    this.offSoundInput.setAttribute("name", "sound");
    this.soundForm.append(this.offSoundInput);
    this.soundForm.append(this.offSoundTitle);
    this.settingsCommonBlock.append(this.sizeOfGame);
    this.sizeOfGame.append(this.sizeOfGameTitle);
    this.sizeForm.classList.add("size_form");
    this.sizeOfGame.append(this.sizeForm);
    this.sizeEasyTitle.textContent = "10x10";
    this.sizeEasyTitle.setAttribute("for", "10");
    this.sizeEasy.setAttribute("id", "10");
    this.sizeEasy.checked = true;
    this.sizeEasy.setAttribute("type", "radio");
    this.sizeEasy.setAttribute("name", "size");
    this.sizeForm.append(this.sizeEasy);
    this.sizeForm.append(this.sizeEasyTitle);
    this.sizeMediumTitle.textContent = "15x15";
    this.sizeMediumTitle.setAttribute("for", "15");
    this.sizeMedium.setAttribute("id", "15");
    this.sizeMedium.setAttribute("type", "radio");
    this.sizeMedium.setAttribute("name", "size");
    this.sizeForm.append(this.sizeMedium);
    this.sizeForm.append(this.sizeMediumTitle);
    this.sizeHardTitle.textContent = "25x25";
    this.sizeHardTitle.setAttribute("for", "25");
    this.sizeHard.setAttribute("id", "25");
    this.sizeHard.setAttribute("type", "radio");
    this.sizeHard.setAttribute("name", "size");
    this.sizeForm.append(this.sizeHard);
    this.sizeForm.append(this.sizeHardTitle);
    this.numberOfMines.classList.add("number_mines_block");
    this.settingsCommonBlock.append(this.numberOfMines);
    this.numberOfMinesTitle.classList.add("number_mines_title");
    this.numberOfMinesTitle.textContent = `Number of kittens: ${this.mines} kittens`;
    this.numberOfMines.append(this.numberOfMinesTitle);
    this.numberOfMinesInput.setAttribute("id", "numberOfMines");
    this.numberOfMinesInput.setAttribute("type", "range");
    this.numberOfMinesInput.setAttribute("value", this.mines);
    this.numberOfMinesInput.setAttribute("min", 10);
    this.numberOfMinesInput.setAttribute("max", 99);
    this.numberOfMinesInput.setAttribute("step", 1);
    this.numberOfMines.append(this.numberOfMinesInput);
  }

  receiveResultsBlock() {
    this.resultsBlock.classList.add("results_block");
    this.toolsScoreContainer.append(this.resultsBlock);
    this.resultsTitle.classList.add("results_title");
    this.resultsTitle.textContent = "Results";
    this.resultsBlock.append(this.resultsTitle);
    this.resultsTable.classList.add("results_table");
    this.resultsBlock.append(this.resultsTable);
    this.resultsTableLine.classList.add("results_line");
    this.resultsTable.append(this.resultsTableLine);
    this.resultsItemName.classList.add("results_item");
    this.resultsItemName.textContent = "Name";
    this.resultsTableLine.append(this.resultsItemName);
    this.resultsItemClicks.classList.add("results_item");
    this.resultsItemClicks.textContent = "Clicks";
    this.resultsTableLine.append(this.resultsItemClicks);
    this.resultsItemDuration.classList.add("results_item");
    this.resultsItemDuration.textContent = "Time";
    this.resultsTableLine.append(this.resultsItemDuration);
  }

  makeNoteInResults() {
    if (this.resultsTable.children.length >= 10) {
      this.resultsTable.children[1].remove();
    }
    let resultsTableLine = document.createElement("div");
    resultsTableLine.classList.add("results_line");
    this.resultsTable.append(resultsTableLine);
    let resultsItemName = document.createElement("div");
    resultsItemName.classList.add("results_item");
    resultsItemName.textContent = this.resultsName;
    resultsTableLine.append(resultsItemName);
    let resultsItemClicks = document.createElement("div");
    resultsItemClicks.classList.add("results_item");
    resultsItemClicks.textContent = this.productiveClicksCount;
    resultsTableLine.append(resultsItemClicks);
    let resultsItemDuration = document.createElement("div");
    resultsItemDuration.classList.add("results_item");
    resultsItemDuration.textContent = `${this.counterOfTime.textContent.slice(
      10,
      15
    )}`;
    resultsTableLine.append(resultsItemDuration);
  }

  receiveMineSweeperBoard() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columms; j++) {
        this.cell = document.createElement("div");
        this.cell.dataset.position = `${i},${j}`;
        this.cell.classList.add("cell");
        if (this.whiteThemeInput.checked) {
          this.cell.style.background = "#fafafa";
        }
        this.game.append(this.cell);
      }
    }
  }

  receiveNumberOfClicks(event) {
    if (
      document.body.children[0].classList.contains("window_result") ||
      this.markForRangeEvent !== 0
    ) {
      event.stopImmediatePropagation();
      return;
    }
    if (event.target.tagName == "DIV") {
      this.cellUnderClick = event.target;
      console.log(this.cellUnderClick);
    } else {
      this.cellUnderClick = event.target.parentNode;
      console.log(this.cellUnderClick);
    }
    if (
      !this.cellUnderClick.classList.contains("opened") &&
      !this.cellUnderClick.classList.contains("marked")
    ) {
      this.productiveClicksCount += 1;
      console.log(this.productiveClicksCount);
      this.numberOfLeftClicks.textContent = `Number of movements: ${this.productiveClicksCount}`;
    }
    this.clickscount += 1;
    if (this.clickscount === 1) {
      setTimeout(function () {
        gameMiner.countTime();
        console.log('start');
      }, 0);
      this.timerIdForStop = setInterval(function () {
        gameMiner.countTime();
      }, 1000);
    }
  }

  receiveMinesField(event) {
    // console.log(event);
    console.log(event.target);
    if (
      !this.cell &&
      !this.cell.contains.classList.contains("opened") &&
      event.type === "click"
    ) {
      return;
    } else {
      this.cellWithOutBomb = event.target;
      let cellWithOutBombRowPosition = parseInt(
        this.cellWithOutBomb.dataset.position.split(",")[0]
      );
      let cellWithOutBombColumnPosition = parseInt(
        this.cellWithOutBomb.dataset.position.split(",")[1]
      );
      // console.log(cellWithOutBombRowPosition);
      // console.log(cellWithOutBombColumnPosition);
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
        // console.log("ghbjkhdfjf");
        rowPosition = Math.round(Math.random() * (this.rows - 1));
        columnPosition = Math.round(Math.random() * (this.columms - 1));
      }
      this.minesField[rowPosition][columnPosition] = "m";
    }
    // console.log(this.minesField);
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
    // console.log(this.markForRangeEvent);
    if (
      document.body.children[0].classList.contains("window_result") ||
      (this.markForRangeEvent !== 0 && this.productiveClicksCount > 0)
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    } else {
      if (event.target.tagName == "IMG ") {
        event.preventDefault();
      }
      if (
        (!this.cell &&
          !this.cell.contains.classList.contains("cell") &&
          event.type === "click") ||
        (!this.cell &&
          !this.cell.contains.classList.contains("cell") &&
          event.type === "contextmenu")
      ) {
        event.preventDefault();
        return;
      } else {
        if (event.target.tagName == "DIV") {
          this.currentCell = event.target;
          console.log(this.currentCell);
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
            this.currentCell.style.background = "#c8c8c8";
            if (
              this.minesField[cellCurrentRowPosition][
                cellCurrentColumnPosition
              ] === "m"
            ) {
              this.audioForMineCell.play();
              let image = document.createElement("img");
              image.classList.add("mine");
              if (this.whiteThemeInput.checked) {
                image.src = "./assets/icons/blackkitten.png";
              } else if (this.blackThemeInput.checked) {
                image.src = "./assets/icons/blindkitten.png";
              }

              this.currentCell.append(image);
              this.openRestSellsOfFieldIfMine();
              this.currentCell.style.background = "red";
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
              this.audioForOpenCell.play();
              this.currentCell.textContent =
                this.minesField[cellCurrentRowPosition][
                  cellCurrentColumnPosition
                ];
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
              this.audioForOpenCell.play();
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
            this.audioForFlagCell.play();
            // console.log("hello");
            this.currentCell.classList.toggle("marked");
            let image = document.createElement("img");
            image.classList.add("flag");
            if (this.blackThemeInput.checked) {
              image.src = "./assets/icons/blindpaw.png";
            } else if (this.whiteThemeInput.checked) {
              image.src = "./assets/icons/blackpaw.png";
            }
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
            this.audioForFlagCell.play();
            // console.log("very bad");
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
  }

  countOfRestMines() {
    // console.log(this.currentCell);
    if (this.currentCell.classList.contains("marked")) {
      this.numberOfMinesForCounter = this.numberOfMinesForCounter - 1;
      // console.log(this.numberOfMinesForCounter);
      // console.log(this.mines);
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
          currentCellOnCheck = this.game.children[i];
          // console.log(this.game.children[i]);
          // console.log(currentCellOnCheck);
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
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
            // console.log(currentCellOnCheck);
            this.makeDigitsColorful(
              cellCurrentRowPosition - 1,
              cellCurrentColumnPosition - 1,
              currentCellOnCheck
            );
          }
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
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
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
            this.makeDigitsColorful(
              cellCurrentRowPosition - 1,
              cellCurrentColumnPosition,
              currentCellOnCheck
            );
          }
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
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
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

            this.makeDigitsColorful(
              cellCurrentRowPosition - 1,
              cellCurrentColumnPosition + 1,
              currentCellOnCheck
            );
          }
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
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
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

            this.makeDigitsColorful(
              cellCurrentRowPosition,
              cellCurrentColumnPosition - 1,
              currentCellOnCheck
            );
          }
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
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
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
            this.makeDigitsColorful(
              cellCurrentRowPosition,
              cellCurrentColumnPosition + 1,
              currentCellOnCheck
            );
          }
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
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
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
            this.makeDigitsColorful(
              cellCurrentRowPosition + 1,
              cellCurrentColumnPosition - 1,
              currentCellOnCheck
            );
          }
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
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
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

            this.makeDigitsColorful(
              cellCurrentRowPosition + 1,
              cellCurrentColumnPosition,
              currentCellOnCheck
            );
          }
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
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
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

            this.makeDigitsColorful(
              cellCurrentRowPosition + 1,
              cellCurrentColumnPosition + 1,
              currentCellOnCheck
            );
          }
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
    // console.log(this.currentCell);
    // console.log(currentCellOnCheck);
    if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 1
    ) {
      // console.log(cellCurrentRowPosition, cellCurrentColumnPosition);
      // console.log(this.currentCell);
      // console.log(currentCellOnCheck);
      if (this.currentCell.textContent === "1") {
        this.currentCell.classList.add("one");
      }
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("one");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 2
    ) {
      // console.log(this.currentCell);
      if (this.currentCell.textContent === "2") {
        this.currentCell.classList.add("two");
      }
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("two");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 3
    ) {
      // console.log(this.currentCell);
      if (this.currentCell.textContent === "3") {
        this.currentCell.classList.add("three");
      }

      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("three");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 4
    ) {
      console.log(this.currentCell);
      if (this.currentCell.textContent === "4") {
        this.currentCell.classList.add("four");
      }

      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("four");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 5
    ) {
      console.log(this.currentCell);
      if (this.currentCell.textContent === "5") {
        this.currentCell.classList.add("five");
      }

      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("five");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 6
    ) {
      console.log(this.currentCell);
      if (this.currentCell.textContent === "6") {
        this.currentCell.classList.add("six");
      }

      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("six");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 7
    ) {
      console.log(this.currentCell);
      if (this.currentCell.textContent === "7") {
        this.currentCell.classList.add("seven");
      }
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("seven");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 8
    ) {
      console.log(this.currentCell);
      if (this.currentCell.textContent === "8") {
        this.currentCell.classList.add("eight");
      }

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
      this.counterOfTime.textContent = `Duration: 0${this.minutes}:0${this.seconds} seconds`;
    } else if (this.seconds >= 10) {
      this.counterOfTime.textContent = `Duration: 0${this.minutes}:${this.seconds} seconds`;
    } else if (this.minutes >= 10 && this.seconds < 10) {
      this.counterOfTime.textContent = `Duration: ${this.minutes}:0${this.seconds} seconds`;
    } else if (this.minutes >= 10 && this.seconds >= 10) {
      this.counterOfTime.textContent = `Duration: ${this.minutes}:${this.seconds} seconds`;
    }
  }

  openResultWindow() {
    clearInterval(this.timerIdForStop);
    this.resultWindow.classList.add("window_result");
    this.resultText.classList.add("result_text");
    this.resultOKButton.classList.add("button_ok");
    this.resultOKButton.textContent = "OK";
    this.resultWindow.append(this.resultText);
    this.resultWindow.append(this.resultOKButton);
    document.body.prepend(this.resultWindow);
  }
  openInputWindowForName() {
    this.resultsInputBlock.classList.add("window_name");
    console.log(this.winGame);
    this.resultsInputBlockTitle.classList.add("window_name_title");
    this.resultsInputBlockTitle.textContent = "Enter your name";
    this.resultsInputBlockInput.setAttribute("id", "player");
    this.resultsInputBlockInput.setAttribute("type", "text");
    this.resultsInputBlockSubmit.classList.add("button_submit");
    this.resultsInputBlockSubmit.textContent = "Submit";
    this.resultsInputBlock.append(this.resultsInputBlockTitle);
    this.resultsInputBlock.append(this.resultsInputBlockInput);
    this.resultsInputBlock.append(this.resultsInputBlockSubmit);
    document.body.prepend(this.resultsInputBlock);
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
      this.resultText.textContent = `Cogratulations!!!! You found all kittens in ${this.counterOfTime.textContent.slice(
        10
      )} and ${this.productiveClicksCount} clicks and  didn't wake up them`;
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] !==
        "m" &&
      this.counterForRestCellsWithOutBombs === this.numberOfCells - this.mines
    ) {
      this.resultText.textContent = `Cogratulations!!!! You found all kittens in ${this.counterOfTime.textContent.slice(
        10
      )} and ${this.productiveClicksCount} clicks and  didn't wake up them`;
    }
  }

  pressOKonCloseWindow(event) {
    console.log(this.game.children.length);
    if (document.body.children[0].classList.contains("window_result")) {
      document.body.children[0].remove();
    }
    if (this.winGame !== 0) {
      console.log(this.winGame);
      this.openInputWindowForName();
    } else {
      this.resetAllResultsOfGame(event);
    }
  }

  pressSubmitButtonOnNameWindow() {
    this.resultsName = this.resultsInputBlockInput.value;
    console.log(this.resultsName);
    this.makeNoteInResults();
    if (document.body.children[0].classList.contains("window_name")) {
      document.body.children[0].remove();
    }
    this.resetAllResultsOfGame(event);
  }

  resetAllResultsOfGame(event) {
    for (let i = this.numberOfCells - 1; i >= 0; i--) {
      // console.log(this.game.children.length);
      this.game.children[i].remove();
    }
    // console.log(event.type);
    if (event.type === "click") {
      this.setNewSizeOfField(event);
      this.setNewNumberOfMines(event);
    }
    this.setNewSizwOFGameGrid();
    this.numberOfCells = this.rows * this.columms;
    this.receiveMineSweeperBoard();
    this.seconds = 0;
    this.minutes = 0;
    this.clickscount = 0;
    this.productiveClicksCount =0;
    console.log(this.clickscount);
    this.numberOfMinesForCounter = this.mines;
    this.minesField = new Array(this.rows);
    this.numberOfLeftClicks.textContent = `Number of movements: ${this.productiveClicksCount}`;
    this.counterOfMines.textContent = `Number of hidden dreaming cats: 0`;
    this.counterOfTime.textContent = `Duration: 00:00 min`;
    this.markForRangeEvent = 0;
    this.winGame = 0;
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
    if (
      this.counterOfMarkedKittens === this.mines &&
      this.counterForRestCellsWithOutBombs === this.numberOfCells - this.mines
    ) {
      this.makeResultMessage(cellCurrentRowPosition, cellCurrentColumnPosition);
      this.openResultWindow();
      this.winGame = 1;
    }
    this.counterOfMarkedKittens = 0;
    this.counterForRestCellsWithOutBombs = 0;
  }

  makeValidationForWinningForRestUnOpenedSells(
    cellCurrentRowPosition,
    cellCurrentColumnPosition
  ) {
    this.countCellsWithOutClassOpened(
      cellCurrentRowPosition,
      cellCurrentColumnPosition
    );
    // console.log(this.counterForRestCellsWithOutBombs);
    if (
      this.counterForRestCellsWithOutBombs ===
      this.numberOfCells - this.mines
    ) {
      console.log(this.counterForRestCellsWithOutBombs);
      this.makeResultMessage(cellCurrentRowPosition, cellCurrentColumnPosition);
      this.openResultWindow();
      this.winGame = 1;
    }
    this.counterForRestCellsWithOutBombs = 0;
    // clearInterval(this.timerIdForStop);
  }

  openRestSellsOfFieldIfMine() {
    for (let i = 0; i < this.game.children.length; i++) {
      let rowPositionOfCell = parseInt(
        this.game.children[i].dataset.position.split(",")[0]
      );
      let columnPositionOfCell = parseInt(
        this.game.children[i].dataset.position.split(",")[1]
      );
      if (!this.game.children[i].classList.contains("marked")) {
        this.game.children[i].style.background = "#c8c8c8";
        // console.log(this.game.children[i]);
        // console.log(rowPositionOfCell, columnPositionOfCell);
        if (this.minesField[rowPositionOfCell][columnPositionOfCell] === "m") {
          // console.log(this.game.children[i]);
          if (this.game.children[i].children.length === 0) {
            this.game.children[i].classList.add("opened");
            let image = document.createElement("img");
            image.classList.add("mine");
            if (this.whiteThemeInput.checked) {
              image.src = "./assets/icons/blackkitten.png";
            } else if (this.blackThemeInput.checked) {
              image.src = "./assets/icons/blindkitten.png";
            }
            this.game.children[i].append(image);
          }
        }
        if (
          this.minesField[rowPositionOfCell][columnPositionOfCell] !== "m" &&
          this.minesField[rowPositionOfCell][columnPositionOfCell] !== 0
        ) {
          this.game.children[i].textContent =
            this.minesField[rowPositionOfCell][columnPositionOfCell];
          // console.log(this.game.children[i]);
          this.game.children[i].classList.add("opened");
          if (this.minesField[rowPositionOfCell][columnPositionOfCell] === 1) {
            this.game.children[i].classList.add("one");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 2
          ) {
            this.game.children[i].classList.add("two");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 3
          ) {
            this.game.children[i].classList.add("three");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 4
          ) {
            this.game.children[i].classList.add("four");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 5
          ) {
            this.game.children[i].classList.add("five");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 6
          ) {
            this.game.children[i].classList.add("six");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 7
          ) {
            this.game.children[i].classList.add("seven");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 8
          ) {
            this.game.children[i].classList.add("eight");
          }
        }
        if (this.minesField[rowPositionOfCell][columnPositionOfCell] === 0) {
          this.game.children[i].classList.add("opened");
        }
      } else if (this.game.children[i].classList.contains("marked")) {
        if (this.minesField[rowPositionOfCell][columnPositionOfCell] !== "m") {
          let firstCrossLine = document.createElement("div");
          firstCrossLine.classList.add("cross1");
          let secondCrossLine = document.createElement("div");
          secondCrossLine.classList.add("cross2");
          this.game.children[i].append(firstCrossLine);
          this.game.children[i].append(secondCrossLine);
        }
      }
    }
  }

  countCellsWithOutClassOpened(
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
  }
  setNewSizeOfField(event) {
    clearInterval(this.timerIdForStop);
    if (this.sizeEasy.checked) {
      this.rows = parseInt(this.sizeEasy.getAttribute("id"));
      this.columms = parseInt(this.sizeEasy.getAttribute("id"));
      // console.log(typeof this.rows);
    } else if (this.sizeMedium.checked) {
      this.rows = parseInt(this.sizeMedium.getAttribute("id"));
      this.columms = parseInt(this.sizeMedium.getAttribute("id"));
      // console.log(this.rows);
    } else if (this.sizeHard.checked) {
      this.rows = parseInt(this.sizeHard.getAttribute("id"));
      this.columms = parseInt(this.sizeHard.getAttribute("id"));
      console.log(this.rows);
    }
    this.markForRangeEvent = 1;
    // console.log(this.markForRangeEvent);
    if (event.type === "change") {
      clearInterval(this.timerIdForStop);
      this.pressOKonCloseWindow(event);
    }

    if (this.clickscount === 0) {
    }
  }
  setNewSizwOFGameGrid() {
    this.game.style.gridTemplateColumns = `repeat(${this.columms}, auto)`;
    this.game.style.gridTemplateRows = `repeat(${this.rows}, auto)`;
  }

  setNewNumberOfMines(event) {
    console.log(this.numberOfMinesInput.value);
    this.mines = this.numberOfMinesInput.value;
    console.log(this.mines);
    this.numberOfMinesInput.setAttribute("value", this.mines);
    this.numberOfMinesTitle.textContent = `Number of kittens: ${this.mines} kittens`;
    this.numberOfMinesForCounter = this.mines;
    this.markForRangeEvent = 1;
    if (event.type === "change") {
      clearInterval(this.timerIdForStop);
      this.pressOKonCloseWindow(event);
    }

    if (this.clickscount === 0) {
    }
  }

  setWhiteTheme() {
    document.body.style.background = `url(./assets/images/blacktheme.jpg)`;
    document.body.style.backgroundPosition = "cover";
    document.body.style.backgroundSize = "100% 100%";
    this.durationAndGameContainer.style.color = "#FFFFFF";
    this.toolsScoreContainer.style.color = "#FFFFFF";
    this.buttonStartNewGame.style.color = "#000000";
    for (let i = 0; i < this.game.children.length; i++) {
      if (!this.game.children[i].classList.contains("opened")) {
        this.game.children[i].style.background = "#fafafa";
      }
      if (this.game.children[i].classList.contains("marked")) {
        this.game.children[i].children[0].remove();
        let image = document.createElement("img");
        image.classList.add("flag");
        image.src = "./assets/icons/blackpaw.png";
        this.game.children[i].append(image);
      }
    }
    this.resultsTitle.style.background = "#fafafa";
    this.resultsTitle.style.color = "#000000";
    this.settigsTitle.style.background = "#fafafa";
    this.settigsTitle.style.color = "#000000";
    this.settingsCommonBlock.style.background = "#fafafa";
    this.settingsCommonBlock.style.color = "#000000";
    this.buttonStartNewGame.style.background = "#fafafa";
    this.buttonStartNewGame.style.color = "#000000";
    this.resultWindow.style.background = "#fafafa";
    this.resultWindow.style.color = "#000000";
    this.resultsTable.style.background = "#fafafa";
    this.resultsTable.style.color = "#000000";
    this.resultsInputBlock.style.background = "#fafafa";
    this.resultsInputBlock.style.color = "#000000";
  }

  setBlackTheme() {
    document.body.style.background = `url(./assets/images/whitetheme.jpg)`;
    document.body.style.backgroundPosition = "cover";
    document.body.style.backgroundSize = "100% 100%";
    this.durationAndGameContainer.style.color = "#000000";
    this.toolsScoreContainer.style.color = "#000000";
    for (let i = 0; i < this.game.children.length; i++) {
      if (!this.game.children[i].classList.contains("opened")) {
        this.game.children[i].style.background = "#000000";
      }
      if (this.game.children[i].classList.contains("marked")) {
        this.game.children[i].children[0].remove();
        let image = document.createElement("img");
        image.classList.add("flag");
        image.src = "./assets/icons/blindpaw.png";
        this.game.children[i].append(image);
      }
    }
    this.resultsTitle.style.background = "#000000";
    this.resultsTitle.style.color = "#FFFFFF";
    this.settigsTitle.style.background = "#000000";
    this.settigsTitle.style.color = "#FFFFFF";
    this.settingsCommonBlock.style.background = "#000000";
    this.settingsCommonBlock.style.color = "#FFFFFF";
    this.buttonStartNewGame.style.background = "#000000";
    this.buttonStartNewGame.style.color = "#FFFFFF";
    this.resultWindow.style.background = "#000000";
    this.resultWindow.style.color = "#FFFFFF";
    this.resultsTable.style.background = "#000000";
    this.resultsTable.style.color = "#FFFFFF";
    this.resultsInputBlock.style.background = "#000000";
    this.resultsInputBlock.style.color = "#FFFFFF";
  }

  setSoundVolumeOn(event) {
    this.audioForMineCell.volume = 1;
    this.audioForFlagCell.volume = 1;
    this.audioForOpenCell.volume = 1;
  }
  setSoundVolumeOff(event) {
    this.audioForMineCell.volume = 0;
    this.audioForFlagCell.volume = 0;
    this.audioForOpenCell.volume = 0;
    console.log(this.audioForOpenCell.volume);
  }

  openSettings(event) {
    this.settingsCommonBlock.classList.toggle('settigs_open');
    this.sizeOfGame.classList.toggle('size_open');
  }
}

let gameMiner = new MineSweeperGame();
// console.log(gameMiner);
gameMiner.receiveMineSweeperGame();
gameMiner.receiveMineSweeperBoard();
gameMiner.game.addEventListener("click", (event) => {
  gameMiner.receiveNumberOfClicks(event);
  // console.log(gameMiner.clickscount);
  if (gameMiner.clickscount === 1) {
    gameMiner.receiveMinesField(event);
  }
  gameMiner.openCell(event);
});
gameMiner.game.addEventListener("contextmenu", (event) => {
  gameMiner.openCell(event);
});
gameMiner.resultOKButton.addEventListener("click", (event) => {
  gameMiner.pressOKonCloseWindow(event);
});
gameMiner.buttonStartNewGame.addEventListener("click", (event) => {
  gameMiner.setNewSizwOFGameGrid();
  gameMiner.pressOKonCloseWindow(event);
});
gameMiner.resultsInputBlockSubmit.addEventListener("click", (event) => {
  gameMiner.pressSubmitButtonOnNameWindow(event);
});

gameMiner.settigsTitle.addEventListener('click', (event) => {
  gameMiner.openSettings(event);
})

gameMiner.sizeEasy.addEventListener("change", (event) => {
  // console.log(event);
  gameMiner.setNewSizeOfField(event);
});
gameMiner.sizeMedium.addEventListener("change", (event) => {
  // console.log(event);
  gameMiner.setNewSizeOfField(event);
});
gameMiner.sizeHard.addEventListener("change", (event) => {
  // console.log(event);
  gameMiner.setNewSizeOfField(event);
});
gameMiner.numberOfMinesInput.addEventListener("change", (event) => {
  // console.log(event);
  gameMiner.setNewNumberOfMines(event);
});
gameMiner.whiteThemeInput.addEventListener("change", (event) => {
  gameMiner.setWhiteTheme(event);
});
gameMiner.blackThemeInput.addEventListener("change", (event) => {
  gameMiner.setBlackTheme(event);
});

gameMiner.onSoundInput.addEventListener("change", (event) => {
  gameMiner.setSoundVolumeOn(event);
});
gameMiner.offSoundInput.addEventListener("change", (event) => {
  gameMiner.setSoundVolumeOff(event);
});
