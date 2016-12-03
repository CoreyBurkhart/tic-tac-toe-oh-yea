import React from 'react';
import ReactDOM from 'react-dom';
import Ai from '../components/Ai';


it('Ai can make move', () => {
  let ai = new Ai();
  //returns proper index
  expect(ai.chooseIndex(['','','','x','o','','x','',''])).toBeGreaterThanOrEqual(0);
  //returns null if no available index
  expect(ai.chooseIndex(['o','o','o','x','o','o','x','o','o'])).toBe(null);
});
