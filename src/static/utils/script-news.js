var actorNames = [
  "Will Smith", "Johnny Depp", "Adam Sandler", "Vin Diesel", "Jackie Chan",
  "Morgan Freeman", "Robin Williams", "Angelina Jolie", "Brad Pitt", "Jim Carrey",
  "Nicholas Cage", "Leonardo DiCaprio", "Jennifer Aniston", "Bruce Willis", "Sandra Bullock",
  "Tom Cruise", "Cameron Diaz", "Eddie Murphy", "Ben Stiller", "Silvester Stallone",
  "Robert De Niro", "Arnold Schwarzenegger", "Tom Hanks", "Scarlett Johansson", "Julia Roberts",
  "Owen Wilson", "Matt Damon", "Megan Fox", "Keanu Reeves", "Orlando Bloom", "George Clooney",
  "Mel Gibson", "Brendan Fraser", "Meryl Streep", "Drew Barrymore", "Anthony Hopkins",
  "Natalie Portman", "Martin Lawrence", "Jack Nicholson", "Richard Gere"
];

function getRandomPositionX() {
  const containerWidth = document.getElementById('container_background').offsetWidth;
  return `${Math.floor(Math.random() * (containerWidth - 100))}px`;
}

function getRandomPositionY() {
  const containerHeight = document.getElementById('container_background').offsetHeight;
  return `${Math.floor(Math.random() * (containerHeight - 200)) + 100}px`;
}

function isOutsideBounds(x, y, containerWidth, containerHeight) {
  const padding = 100;
  return x < padding || x > containerWidth - padding || y < padding || y > containerHeight - padding;
}

function createActorName() {
  const container = document.getElementById('container_background');
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const actorName = document.createElement('div');
  actorName.className = 'actor-name';
  actorName.innerText = actorNames[Math.floor(Math.random() * actorNames.length)];
  let x = parseInt(getRandomPositionX());
  let y = parseInt(getRandomPositionY());
  while (isOutsideBounds(x, y, containerWidth, containerHeight)) {
      x = parseInt(getRandomPositionX());
      y = parseInt(getRandomPositionY());
  }
  actorName.style.left = x + 'px';
  actorName.style.top = y + 'px';
  actorName.classList.add(Math.random() < 0.5 ? 'diagonal-left' : 'diagonal-right');
  container.appendChild(actorName);
  setTimeout(() => {
      actorName.style.opacity = 1;
  }, 100);

  setTimeout(() => {
      actorName.style.opacity = 0;
      setTimeout(() => {
          container.removeChild(actorName);
      }, 1000);
  }, 3000);
}

function createSparkle() {
  const container = document.getElementById('container_background');
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  const x = Math.floor(Math.random() * containerWidth);
  const y = Math.floor(Math.random() * containerHeight);
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  container.appendChild(sparkle);

  const duration = Math.floor(Math.random() * 3000) + 1000;
  const delay = Math.floor(Math.random() * 3000);
  sparkle.animate(
      [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(0)' }],
      { duration, delay, fill: 'both' }
  ).onfinish = () => {
      container.removeChild(sparkle);
  };
}

// Creează nume de actori la intervale de timp
function createActorNamesInterval() {
  setInterval(() => {
      createActorName();
  }, 4000); // Intervalul de timp între apariții
}

function createSparklesInterval() {
  setInterval(() => {
      createSparkle();
  }, 200); // Intervalul de timp între apariții
}

createActorNamesInterval();
createSparklesInterval();