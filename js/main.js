const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchStates = async searchText => {
    const res = await fetch('../data/states.json');
    const states = await res.json();

    console.log(states);

    //Get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    console.log(matches);

    outputHtml(matches);
};

    //Show results in HTML
    const outputHtml = matches => {
        if(matches.length > 0) {
            const html = matches.map(match => `
            <div class="card bg-light mb-1">
                <h4>${match}</h4>
            </div>
            `
            ).join('');
            matchList.innerHTML = html;
        }
    }





search.addEventListener('input', () => searchStates(search.value));

////////////////
const countdown = document.querySelector('.countdown');

// Set Launch Date (ms)
const launchDate = new Date('Jun 1, 2020 13:00:00').getTime();

// Update every second
const intvl = setInterval(() => {
  // Get todays date and time (ms)
  const now = new Date().getTime();

  // Distance from now and the launch date (ms)
  const distance = launchDate - now;

  // Time calculation
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display result
  countdown.innerHTML = `
  <div>${days}<span>Dias</span></div> 
  <div>${hours}<span>Horas</span></div>
  <div>${mins}<span>Minutos</span></div>
  <div>${seconds}<span>Segundos</span></div>
  `;

  // If launch date is reached
  if (distance < 0) {
    // Stop countdown
    clearInterval(intvl);
    // Style and output text
    countdown.style.color = '#17a2b8';
    countdown.innerHTML = 'Launched!';
  }
}, 1000);