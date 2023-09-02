const handlerCategories = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    handlerShowCategories(data);
};

const handlerShowCategories = (categories) => {
    const tabContainer = document.getElementById('tab-container');
    categories.data.forEach(category => {
        console.log(category.category);
        const span = document.createElement('span');
        span.innerHTML = `
        <a class="tab btn mx-2 normal-case hover:bg-[#FF1F3D] hover:text-white">${category.category}</a> 
        `;
        tabContainer.appendChild(span);
    });
}

handlerCategories();