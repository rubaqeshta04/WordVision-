const renderBooks = (data) => {
  const booksContainer = document.getElementById("booksContainer");
  data.items.slice(0, 3).forEach((element) => {
    booksContainer.innerHTML += ` <div
          class="md:w-1/3 w-full flex items-start justify-between gap-10 md:flex-row flex-col"
        >
          <div class="md:w-1/2 w-full">
            <img
              src=${element.volumeInfo.imageLinks.smallThumbnail}
              alt=""
              class="md:w-full w-[300px]"
            />
          </div>
          <div
            class="flex md:items-start justify-center flex-col md:w-2/3 w-full items-center"
          >
            <p class="w-2/3 pt-5 font-semibold text-lg">
             ${element.volumeInfo.title}
            </p>
            <p
              class="mt-5 mt- text-center pt-5 font-semibold text-lg text-gray-800 mb-5"
            >
              ${element.volumeInfo.authors || "Wise Publications"} 
            </p>
            <a
              href=${element.volumeInfo.previewLink}
              class="bg-pink-500 hover:bg-pink-600 text-black font-semibold md:px-4 px-2 md:py-2 py-1 rounded-2xl transition duration-300"
              >Click To Read</a
            >
          </div>
        </div>`;
  });
};

const booksApi = "https://www.googleapis.com/books/v1/volumes?q=";
const fetchBooks = async () => {
  const response = await fetch(`${booksApi}3`);
  const data = await response.json();
  renderBooks(data);
};
fetchBooks();
const innerRenderForMovies = (Imgpath, title, average, release) => {
  const moviesContainer = document.getElementById("moviesContainer");
  moviesContainer.innerHTML += `<div
          class="md:w-[330px] w-full flex items-start justify-between gap-10 flex-col"
        >
          <div class="w-full">
            <img
              src=${Imgpath}
              alt=""
              class="md:w-full w-[300px]"
            />
          </div>
          <div class="flex justify-center flex-col w-full items-center">
            <p class="pt-5 font-semibold text-lg text-center">
              ${title === "10" ? "random" : title}
            </p>
            <p
              class="mt-5 mt- text-center pt-5 font-semibold text-lg text-gray-800 mb-5"
            >
              ${average}
            </p>
             <p
              class="mt-5 mt- text-center pt-5 font-semibold text-lg text-gray-800 mb-5"
            >
              ${release}
            </p>
            
            >
          </div>
        </div>`;
};

const renderMovies = (Data) => {
  Data.results.slice(0, 11).forEach((element) => {
    const title = element.title;
    const average = element.vote_average;
    const release = element.release_date;
    const preImgPath = "https://image.tmdb.org/t/p/w1280";
    if (element.poster_path == null) {
      const Imgpath = "movie-poster-template.jpg";
      innerRenderForMovies(Imgpath, title, average, release);
    } else {
      let newImg = preImgPath + element.poster_path;
      innerRenderForMovies(newImg, title, average, release);
    }
  });
};

const moviesApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=e4e72d82643e224bf78695be0b5602cd&query=";
const fetchMovies = async (APILink) => {
  const moviesResponse = await fetch(`${APILink}random`);
  const Data = await moviesResponse.json();
  renderMovies(Data);
};
fetchMovies(moviesApi);
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  moviesContainer.textContent = "";
  const searchMoviesApi = moviesApi + searchInput.value;

  const fetchSearchMovies = async () => {
    const searchMoviesResponse = await fetch(searchMoviesApi);
    const data = await searchMoviesResponse.json();
    renderMovies(data);
    searchInput.value = "";
  };
  fetchSearchMovies();
});
