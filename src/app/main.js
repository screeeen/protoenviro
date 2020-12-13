import { setup, frame, win, onkey } from './game';
import { levels } from './maps/levels';

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback, element) {
        window.setTimeout(callback, 1000 / 60);
      }
  }
  
  var life = 3;
  var currentLvl = 0;
  var inProgress = false;
  
  function init() {

  }

  function startGame() {
    // Menus.showCanvas();
    life = 3;
    setup(levels[currentLvl]);
    // Menus.removeEndScreen();
  }

  function finishCurrentLvl() {
    // Menus.addEndScreen();
  
    if (currentLvl === levels.length - 1) {
      finishedLastLevel();
      return;
    }
  
    currentLvl++;
  
    setTimeout(() => {
    //   showPreLevelScreen();
      setTimeout(() => {
        // Menus.removeEndScreen();
      }, 1000);
    }, 100);
  }

  function finishGameOver() {
    currentLvl = 0;
    Menus.addEndScreen();
  
    setTimeout(() => {
      Menus.gameOver();
      setTimeout(() => {
        Menus.removeText('gameOver');
        inProgress = false;
        init();
      }, 4000);
    }, 700);
  }

  function finishedLastLevel() {
    currentLvl = 0;
    setTimeout(() => {
      Menus.endGame();
      setTimeout(() => {
        Menus.removeText('endGameTitle');
        Menus.removeText('endGameSubtitle');
        Menus.removeText('madeByText');
        inProgress = false;
        init();
      }, 7000);
    }, 700);
  }

  function resetCurrentMap() {
    life--;
    setup(levels[currentLvl]);
  }

  init();
  frame();

    document.addEventListener('keydown', (ev) => {
    if (ev.keyCode === 32 && !inProgress) {
        startGame()
        return;
    }
    return onkey(ev, ev.keyCode, true);
    }, false);

    document.addEventListener('keyup', (ev) => {
    if (ev.keyCode === 32 && !inProgress) return;
    return onkey(ev, ev.keyCode, false);
    }, false);

export { resetCurrentMap, finishCurrentLvl, finishGameOver, life };