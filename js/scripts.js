const handlerCategories = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    handlerTabCategories(data);
};

const handlerTabCategories = (categories) => {
    const tabContainer = document.getElementById('tab-container');
    categories.data.forEach(category => {
        // console.log(category.category);
        const span = document.createElement('span');
        span.innerHTML = `
        <a onclick="handlerShowCategories('${category.category_id}')" class="tab btn mx-2 normal-case hover:bg-[#FF1F3D] hover:text-white">${category.category}</a> 
        `;
        tabContainer.appendChild(span);
    });
};

const handlerAllCategoriesActive = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const data = await response.json();
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    data.data.forEach(categories =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <figure><img class="rounded-lg h-52 w-full" src="${categories.thumbnail}" alt="image" /></figure>
        <div class="flex mt-5">
            <div class="avatar mr-3">
                <div class="w-10 h-10 rounded-full">
                    <img src="${categories.authors[0].profile_picture}" />
                </div>
                </div>
          <div>
            <h2 class="card-title">${categories.title}</h2>
          <p class="flex items-center my-2">${categories.authors[0].profile_name} <span class="ml-2 ${categories.authors[0]?.verified? 'block' : 'hidden'}"><img src="./images/blue-tick.png" alt="blue tick"></span></p>
          <p>${categories.others.views}</p>
          </div>
        </div>
        `;
        cardContainer.appendChild(div);
    })
}
handlerAllCategoriesActive();

const handlerShowCategories = async (categories_id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categories_id}`);
    const data = await response.json();
    // console.log(data.data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    data.data.forEach(categories =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <figure><img class="rounded-lg h-52 w-full" src="${categories.thumbnail}" alt="image" /></figure>
        <div class="flex mt-5">
            <div class="avatar mr-3">
                <div class="w-10 h-10 rounded-full">
                    <img src="${categories.authors[0].profile_picture}" />
                </div>
                </div>
          <div>
            <h2 class="card-title">${categories.title}</h2>
          <p class="flex items-center my-2">${categories.authors[0].profile_name} <span class="ml-2 ${categories.authors[0]?.verified? 'block' : 'hidden'}"><img src="./images/blue-tick.png" alt="blue tick"></span></p>
          <p>${categories.others.views}</p>
          </div>
        </div>
        `;
        cardContainer.appendChild(div);
    })


}

handlerCategories();