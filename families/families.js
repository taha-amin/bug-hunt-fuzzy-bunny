import { 
    checkAuth, 
    deleteBunny, 
    getFamilies, 
    logout,
} from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

// I could refactor this into some render functions. However, it becomes complicated since I need to call displayFamilies from inside each bunny's click handler.
function displayFamilies(families) {
    familiesEl.textContent = '';
    
    for (let family of families) {
        const familyEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const bunniesEl = document.createElement('div');

        bunniesEl.classList.add('bunnies');
        familyEl.classList.add('family');

        nameEl.textContent = family.name;

        for (let bunny of family.fuzzy_bunnies) {
            const bunnyEl = document.createElement('div');

            bunnyEl.classList.add('bunny');
            bunnyEl.textContent = bunny.name;
            
            bunnyEl.addEventListener('click', async() => {
                await deleteBunny(bunny.id);

                const updatedFamilies = await getFamilies();

                displayFamilies(updatedFamilies);            
            });
            bunniesEl.append(bunnyEl);
        }

        familyEl.append(nameEl, bunniesEl);
        familiesEl.append(familyEl);
    }
}

window.addEventListener('load', async() => {
    const families = await getFamilies();

    displayFamilies(families);
});