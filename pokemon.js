// Function to fetch Pokémon data from the API
async function fetchPokemon() {

    // input th element 
    const input = document.getElementById('js-pokemonInput');
    const pokemonName = input.value.trim().toLowerCase();
    const container = document.getElementById('js-pokemonContainer');
    container.innerHTML = '';  // clears the container

    // checks input, makes sure theres a message if nothing is put in before submission 
    if (!pokemonName) {
        showError('Oopsiiie! Please enter a Pokémon name or ID.');
        return;
    }

    try {
        // Fetch Pokémon data from the API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // Check the response if it isnt right them this error will pop up
        if (!response.ok) throw new Error('what?! Pokémon not found. Try again! Please :)');

        // Parse the response to JSON
        const data = await response.json();

        // Get the image and type of the Pokémon
        const pokemonImage = data.sprites.front_default;

        const pokemonType = data.types.map(typeInfo => typeInfo.type.name).join(', ');

        // Generate the HTML content with the Pokémon's details (image displayed twice, for person preference)
        const html = `

            <div class="pokemon-card">
                <h2>${data.name} (#${data.id})</h2>
                <img src="${pokemonImage}" alt="${data.name}">
                <img src="${pokemonImage}" alt="${data.name} again">
                <p>Type: ${pokemonType}</p>
            </div>
        `;

        // Inject HTML into the container
        container.innerHTML = html;



    } catch (error) {
        // Handle errors and show a message 
        showError(error.message);
    }
}

// Function to trigger search on Enter key press
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        fetchPokemon();  // Call fetch function
    }
}

// Function displays error messages
function showError(message) {

    const container = document.getElementById('js-pokemonContainer');
    container.innerHTML = `<p class="error">${message} (check your spelling!)</p>`;
}
