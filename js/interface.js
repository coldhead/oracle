window.addEventListener('load', () => {
  let thingsToDo = 6;

  const button = document.getElementById('throw');

  // TODO: Links need 0 padding for the URLs
  const showReading = () => {
    if (hexagram.length !== 6) return;

    const [first, moving, second] = reading();
    document.querySelector('#first .hexagram').innerHTML = ncrHexagram(first.value);
    document.querySelector('#first .title').innerHTML = first.names.join(' / ');
    document.querySelector('#first a').setAttribute('href', `http://www.sacred-texts.com/ich/ic${ binaryToWen[first.value] }.htm`);

    document.querySelector('#second .hexagram').innerHTML = ncrHexagram(second.value);
    document.querySelector('#second .title').innerHTML = second.names.join(' / ');
    document.querySelector('#second a').setAttribute('href', `http://www.sacred-texts.com/ich/ic${ binaryToWen[second.value] }.htm`);
  };

  const plural = (count) => count === 1 ? '' : 's';

  button.addEventListener('click', function () {
    throwLine().then(showReading).catch(showReading);
    thingsToDo--;
    button.innerHTML = `Click this ${thingsToDo} time${ plural(thingsToDo) }`;
    if (thingsToDo <= 0) {
      button.style.display = 'none';
    }
  });

});
