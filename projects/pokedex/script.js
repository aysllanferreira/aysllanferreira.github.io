let pokeIni = 0;

const getPoke = document.querySelector('#pokemons');
const getNextBtn = document.querySelector('#next');
const getPrevBtn = document.querySelector('#prev');
const getFooter = document.querySelector('#footer');
getPrevBtn.disabled = true;
getPrevBtn.style.opacity = '50%';


const showPokes = async ({ abis, names, sprite, stats }) => {

    const capName = names.charAt(0).toUpperCase() + names.slice(1);

    const createDiv = document.createElement('div');
    createDiv.id = 'cards';
    getPoke.appendChild(createDiv);

    const createH1 = document.createElement('h1');
    createH1.className = 'pokeName';

    const image = document.createElement('img');

    const createPar = document.createElement('p');
    createPar.className = 'pokeSkills';

    const createStats = document.createElement('p');
    createStats.className = 'pokeStats'

    createH1.innerHTML = await capName;
    image.src =  sprite;

    if(abis.length < 2) createPar.innerHTML = `Skills: ${abis[0].ability.name}`;
    else createPar.innerHTML = `Skills: ${abis[0].ability.name} | ${abis[1].ability.name}`;
    

    createStats.innerText = `${stats[0].stat.name.toUpperCase()}: ${stats[0].base_stat}
    ${stats[1].stat.name.toUpperCase()}: ${stats[1].base_stat}
    ${stats[2].stat.name.toUpperCase()}: ${stats[2].base_stat}
    ${stats[3].stat.name.toUpperCase()}: ${stats[3].base_stat}
    ${stats[4].stat.name.toUpperCase()}: ${stats[4].base_stat}
    ${stats[5].stat.name.toUpperCase()}: ${stats[5].base_stat}`;
    
    createDiv.appendChild(createH1);
    createDiv.appendChild(image);
    createDiv.appendChild(createPar);
    createDiv.appendChild(createStats)

}

const fetchPoke = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154';
    const res = await fetch(url);
    const { results } = await res.json();
    results.splice(pokeIni, 12).forEach(async (e) => {
        const newRes = await fetch(e.url);
        const { name, sprites, abilities, stats } = await newRes.json();
        // showPokes(name, sprites)
        const object = {
            names : name,
            sprite : sprites.front_default,
            abis : abilities,
            stats : stats,
        }
        showPokes(object)
        return object;
    });  
}

const copyright = () => {
    const getYear = new Date().getFullYear();
    const genH1 = document.createElement('h1')
    getFooter.appendChild(genH1);
    genH1.innerHTML = `Made with <span class='heart'>❤</span> by: Aysllan Ferreira <br> <span class='copy'>Copyright ${getYear}</span>`;
}

getNextBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    pokeIni += 12;
    getPoke.innerHTML = '';
    fetchPoke();
    getPrevBtn.disabled = false;
    getPrevBtn.style.opacity = '100%';
})

getPrevBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    pokeIni -= 12;
    getPoke.innerHTML = '';
    fetchPoke();
    if(pokeIni > 0) {
        getPrevBtn.style.opacity = '100%';
        getPrevBtn.disabled = false;
    } else {
        getPrevBtn.disabled = true;
        getPrevBtn.style.opacity = '50%';
    }
})

fetchPoke();
copyright();