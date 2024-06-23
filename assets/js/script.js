let isDarkMode = false;
const icon = document.getElementById('theme-toggle-icon');
const copyIcon = document.getElementById('copy-icon');
const speakIcon = document.getElementById('volume-icon');
const shareIcon = document.getElementById('share-icon');
const toolTip = document.getElementById('tooltip');

icon.addEventListener('click', function () {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);

    if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

async function fetchJoke() {
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const joke = await response.json();
        displayJoke(joke);
    } catch (error) {
        console.error('Error: Cant fetch joke');
    }
}

function displayJoke(joke) {
    let jokeText = document.querySelector('.joke-text');
    jokeText.textContent = `${joke.setup} - ${joke.punchline}`;
}

copyIcon.addEventListener('click', () => {
    let jokeText = document.querySelector('.joke-text').textContent;
    navigator.clipboard.writeText(jokeText).then(() => {
        toolTip.style.marginLeft = '-34px';
        toolTip.textContent = 'Copied';
        setTimeout(() => {
            toolTip.textContent = 'Copy to clipboard';
            toolTip.style.marginLeft = '-70px';
        }, 1500);
    });
})

speakIcon.addEventListener('click', () => {
    let jokeText = document.querySelector('.joke-text').textContent;
    const speech = new SpeechSynthesisUtterance(jokeText)
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
})

shareIcon.addEventListener('click', () => {
    let jokeText = document.querySelector('.joke-text').textContent;
    url = `https://api.whatsapp.com/send?text=${encodeURIComponent(jokeText)}`;
    window.open(url, '_blank');
})

fetchJoke();