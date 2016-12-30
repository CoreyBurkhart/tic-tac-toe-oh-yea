

export default class utils {

  static getClickLocation (event) {
    const x = event.nativeEvent.offsetX,
        y = event.nativeEvent.offsetY;

    return {x: x, y: y};
  }

  static find (loc, boxNum, size) {
    let x=0, y=0;

    if(loc) {
      x = loc.x;
      y = loc.y;
    }

    const _offset = Math.round(size / 25);

    //i can't believe i wrote this... not proud of below, but it works.
    if(loc) {
      if(x < (size / 3)) {
        if (y < (size / 3)) {
          return 0;
        } else if ((size / 3) < y && y < (2 * size / 3)) {
          return 3;
        } else if(y > (2 * size / 3)) {
          return 6;
        }
      }
      //col 2
      else if ((size / 3) < x && x < (2 * size / 3)) {
        if (y < (size / 3)) {
          return 1;
        } else if ((size / 3) < y && y < (2 * size / 3)) {
          return 4;
        } else if(y > (2* size / 3)){
          return 7;
        }
      }
      //col 3
      else if (x > (2 * size / 3)){
        if (y < (size / 3)) {
          return 2;
        } else if ((size / 3) < y && y < (2 * size / 3)) {
          return 5;
        } else if(y > (2 * size / 3)){
          return 8;
        }
      }
    }

    if(!loc && typeof boxNum === 'number') {
      if(boxNum === 0 || boxNum === 3 || boxNum === 6) {
        if (boxNum === 0) {
          return {x: _offset, y: _offset};
        } else if (boxNum === 3) {
          return {x: _offset, y: size / 3 + _offset};
        } else if(boxNum === 6){
          return {x: _offset, y: 2 * size / 3 + _offset};
        }
      }
      //col 2
      else if (boxNum === 1 || boxNum === 4 || boxNum === 7) {
        if (boxNum === 1) {
          return {x: size / 3 + _offset, y: _offset};
        } else if (boxNum === 4) {
          return {x: size / 3 + _offset, y: size / 3 + _offset};
        } else if(boxNum === 7){
          return {x: size / 3 + _offset, y: 2 * size / 3 + _offset};
        }
      }
      //col 3
      else if (boxNum === 2 || boxNum === 5 || boxNum === 8){
        if (boxNum === 2) {
          return {x: 2 * size / 3 + _offset, y: _offset};
        } else if (boxNum === 5) {
          return {x: 2 * size / 3 + _offset, y: size / 3 + _offset};
        } else if(boxNum === 8){
          return {x: 2 * size / 3 + _offset, y: 2 * size / 3 + _offset};
        }
      }
    }
  }

  static emptyArray() {
      let a = [];
      for(var i = 0; i < 9; i++) {
        a.push('');
      }
      return a;
    }

  static getCanvasSize () {
      let width = window.innerWidth,
          height = window.innerHeight;

      //size is the lesser of the 2
      let size = width > height ? height : width;
      return size / 2;
    }
}
