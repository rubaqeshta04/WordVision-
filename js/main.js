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
