// Main Categories Function
const handlerCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  handlerTabCategories(data);
};
handlerCategories();
// Tab Button Function
const handlerTabCategories = (categories) => {
  const tabContainer = document.getElementById("tab-container");
  categories.data.forEach((category) => {
    // console.log(category.category);
    const span = document.createElement("span");
    span.innerHTML = `
        <a onclick="handlerShowCategories('${category.category_id}')" class="tab py-2 px-5 inline bg-[#25252526] text-[#252525b3] rounded font-medium text-base mt-2 normal-case hover:bg-[#FF1F3D] hover:text-white">${category.category}</a> 
        `;
    tabContainer.appendChild(span);
  });
};
// Show Categories Function
const handlerShowCategories = async (categories_id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categories_id}`
  );
  const data = await response.json();
  // console.log(data.data);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.data.forEach((categories) => {
    const posted_date = postedDate(categories.others.posted_date);
    const div = document.createElement("div");
    div.innerHTML = `
        <figure class="relative">
        <div class="${
          categories.others?.posted_date ? "block" : "hidden"
        } absolute bottom-3 right-3 bg-[#171717] rounded-lg">
            <h3 class="text-white p-2 ">${posted_date}</h3>
        </div>
                <img class="rounded-lg h-52 w-full" src="${
                  categories.thumbnail
                }" alt="image" />
            </figure>
        <div class="flex mt-5">
            <div class="avatar mr-3">
                <div class="w-10 h-10 rounded-full">
                    <img src="${categories.authors[0].profile_picture}" />
                </div>
                </div>
          <div>
            <h2 class="card-title font-bold">${categories.title}</h2>
          <p class="flex items-center my-2">${
            categories.authors[0].profile_name
          } <span class="ml-2 ${
      categories.authors[0]?.verified ? "block" : "hidden"
    }"><img src="./images/blue-tick.png" alt="blue tick"></span></p>
          <p>${categories.others.views} views</p>
          </div>
        </div>
        `;
    cardContainer.appendChild(div);
  });
  const noContentContainer = document.getElementById("no-content-container");
  if (!data.status) {
    noContentContainer.innerHTML = "";
    const div = document.createElement("div");
    div.classList = "flex flex-col justify-center items-center";
    div.innerHTML = `
        <img src="./images/Icon.png" alt="icon">
        <h2 class="font-bold text-3xl text-center mt-8">Oops!! Sorry, There is no <br> content here</h2>
        `;
    noContentContainer.appendChild(div);
  } else {
    noContentContainer.innerHTML = "";
  }
};
// Posted Date Function
const postedDate = (time) => {
  time = Math.floor(time / 60);
  let hours = Math.floor(time / 60);
  let minutes = time % 60;
  return `${hours}hrs ${minutes} min ago`;
};
// All Categories Active Function Call
handlerShowCategories(1000);
// Sort By View Function
const sortByView = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/category/1000"
  );
  const data = await response.json();
  // Remove K Form data.data.array.others.views
  data.data.forEach((removeK) => {
    removeK.others.views = removeK.others.views.slice(0, -1);
  });
  // Sort Data From data.data.array.others.views
  data.data.sort((a, b) => b.others.views - a.others.views);

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.data.forEach((categories) => {
    const posted_date = postedDate(categories.others.posted_date);
    const div = document.createElement("div");
    div.innerHTML = `
          <figure class="relative">
          <div class="${
            categories.others?.posted_date ? "block" : "hidden"
          } absolute bottom-3 right-3 bg-[#171717] rounded-lg">
              <h3 class="text-white p-2 ">${posted_date}</h3>
          </div>
                  <img class="rounded-lg h-52 w-full" src="${
                    categories.thumbnail
                  }" alt="image" />
              </figure>
          <div class="flex mt-5">
              <div class="avatar mr-3">
                  <div class="w-10 h-10 rounded-full">
                      <img src="${categories.authors[0].profile_picture}" />
                  </div>
                  </div>
            <div>
              <h2 class="card-title font-bold">${categories.title}</h2>
            <p class="flex items-center my-2">${
              categories.authors[0].profile_name
            } <span class="ml-2 ${
      categories.authors[0]?.verified ? "block" : "hidden"
    }"><img src="./images/blue-tick.png" alt="blue tick"></span></p>
            <p>${categories.others.views}K views</p>
            </div>
          </div>
          `;
    cardContainer.appendChild(div);
  });
  const noContentContainer = document.getElementById("no-content-container");
  if (!data.status) {
    noContentContainer.innerHTML = "";
    const div = document.createElement("div");
    div.classList = "flex flex-col justify-center items-center";
    div.innerHTML = `
          <img src="./images/Icon.png" alt="icon">
          <h2 class="font-bold text-3xl text-center mt-8">Oops!! Sorry, There is no <br> content here</h2>
          `;
    noContentContainer.appendChild(div);
  } else {
    noContentContainer.innerHTML = "";
  }
};
