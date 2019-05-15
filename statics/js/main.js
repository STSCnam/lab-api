'use strict'

window.onload = () => {
    let searchInput = document.querySelector('input[name="artist"]');
    let searchForm = document.querySelector('.search-form');

    searchForm.onsubmit = e => {
        e.preventDefault();
        searchAlbums(searchInput)
    };
};

async function searchAlbums(input) {
    let artist = input.value;

    if (artist === '') return;

    let data = await fetch('/api/deezer/albums?q=' + artist).then(res => res.json());

    showResults(data);

    input.value = '';
}

function showResults(data) {
    let resultBox = document.querySelector('.result-box');
    
    if (data.total === 0)
        return resultBox.innerHTML = `<p class="result-error">No result found for this research.</p>`;

    resultBox.innerHTML = `<h1>${data.total} results</h1>`;

    for (let album of data.data) {
        resultBox.innerHTML += `
            <div class="album">
                <a href="${album.link}" target="_blank">
                    <div class="album-img">
                        <img src="${album.cover_medium}" alt="${album.cover_medium}" />
                    </div>

                    <div class="album-description">
                        <p class="album-title">${album.title}</p>
                        <p class="album-artist">${album.artist.name}</p>
                    </div>
                </a>
            </div>
        `;
    }
}