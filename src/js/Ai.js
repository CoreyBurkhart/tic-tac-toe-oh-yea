
export default class Ai {

  //gets the current state and returns a position to make the move
  chooseIndex(gameState) {
    //logic for how to make the move goes here
    //pshhh why not have it be random?! i like winning!
    //there needs to be a place to mark in the array or else this wont work
    let index,
        check = gameState.indexOf('');

    if(check === -1) {
      index = null;
    }
    else {
      do {
        //get a random number 0 to 8
        let r = Math.floor(Math.random() * 9);
        if (gameState[r] === '') {
          index = r;
        } else {
          index = false;
        }
      } while (!index);
    }

    //returns index of the array it should mark
    return index;
  }
}
