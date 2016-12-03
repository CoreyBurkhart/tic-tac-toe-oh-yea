import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from '../components/Canvas';


it('canvas return the proper coordinates given a box number', () => {
  let props = {team: 'x'};
  let canvas = new Canvas(props);

  expect(canvas.find(false, 0)).toBeInstanceOf(Object);
});
