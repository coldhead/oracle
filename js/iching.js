const remoteURL = () => `/?${ Math.random() }`;

// Arrays of 0s and 1s, LSB at index 0.
const hexagram = [];
const movingLines = [];

const poeticNames = (n) => {
  if (n > hexagrams.length - 1) return '';
  return hexagrams[ binaryToWen[n] ].names;
}

const reading = () => {
  const arrayToBinary = (m, line, index) => {
    return m + line * (2 ** index);
  };

  const first = hexagram.reduce(arrayToBinary, 0);
  const moving = movingLines.reduce(arrayToBinary, 0);
  const second = first ^ moving

  return [
    hexagrams[ binaryToWen[ first ] - 1 ],
    moving,
    hexagrams[ binaryToWen[ second] - 1]
  ];
}

// Toss 3 coins to find a line.
const throwLine = function () {
  const coins = new Array(3);

  const saveCoin = (i) => {
    coins[i] = coinToss();
  };

  // This is where the magic happens.
  const toss = (i) => {
    return fetch(remoteURL()).then( () => saveCoin(i) ).catch( () => saveCoin(i) );
  };

  const readLine = () => {
    const sum = coins.reduce( (m, c) => c + m );
    const lines = {
      6: [0, 1], // Old Yin
      7: [1, 0], // Young Yang
      8: [0, 0], // Young Yin
      9: [1, 1]  // Old Yang
    };

    const [line, moving] =  lines[ sum ];
    hexagram.push( line );
    movingLines.push( moving );
  };

  // LSB is index 0
  return Promise.all(
    [toss(0), toss(1), toss(2)]
  ).then(readLine).catch(readLine);
};

const coinToss = (function () {
  const startTime = new Date();

  return function () {
    return (new Date() - startTime) & 1 ? 3 : 2; // 0 or 1
  }
})();

// The Trough of Despond: Opposite of the Ballmer Peak
const binaryString = (n) => {
  const string = n.toString(2).split('').reverse();
  const bits = (new Array(6)).fill('0');
  return bits.map( (bit, index) => string[index] || bit ).reverse().join('');
}

const ncrHexagram = (n) => {
  if (n >= hexagrams.length) return '';
  return '&#' + (19904 + binaryToWen[n] - 1) + ';';
}

const binaryToWen = [];
hexagrams.forEach( h => binaryToWen[ h.value ] = h.number );
