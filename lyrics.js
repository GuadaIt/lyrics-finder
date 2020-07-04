const searchForm = document.querySelector('.searchForm');
const searchParam_input = document.querySelector('.search-query');
const suggestions_list = document.getElementById('suggestions');
const lyrics_section = document.getElementById('lyrics');
const apiURL = 'https://api.lyrics.ovh';
let searchInput;

const saveUserInput = e => {
  searchInput = e.target.value;
};

const fetchSuggestions = e => {
  lyrics_section.innerHTML = ``;
  suggestions_list.innerHTML = ``;
  e.preventDefault();

  fetch(`${apiURL}/suggest/${searchInput}`)
  .then(res => res.json())
  .then(info => {
    info.data.forEach((songInfo, key) => {
      suggestions_list.innerHTML += `
       <li id="${songInfo.artist.name}" title="${songInfo.title}">
         ${songInfo.title} - ${songInfo.artist.name}
       </li>
      `;
    });    
    suggestions_list.childNodes.forEach(child => child.addEventListener('click', e => fetchLyrics(e)));
  });
};

const fetchLyrics = e => {
  suggestions_list.innerHTML = ``;
  fetch(`${apiURL}/v1/${e.target.id}/${e.target.title}`)
  .then(res => res.json())
  .then(info => {
    if (info.error) return lyrics_section.innerHTML = '<h3>Sorry, no lyrics were found.</h3>';
    let lyrics = info.lyrics.replace(/\n/g, '<br/>');
    lyrics_section.innerHTML = `
    <h3> ${e.target.id} - ${e.target.title} </h3> 
    <p>${lyrics}</p>
    `;
  });  
};

const main = () => {
  searchParam_input.addEventListener('change', saveUserInput);
  searchForm.addEventListener('submit', fetchSuggestions);  
};

main();