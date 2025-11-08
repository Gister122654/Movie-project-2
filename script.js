const STUDIO_GHIBLI_APP = "https://ghibliapi.vercel.app/films";

window.onload = function () {
  taiPhim();
};

async function taiPhim() {
  try {
    document.getElementById("movielist").innerHTML = "<p>Loading films...</p>";
    const response = await fetch(STUDIO_GHIBLI_APP);
    if (!response.ok) throw new Error("Can't load data");
    const data = await response.json();
    renderFilms(data);
  } catch (error) {
    document.getElementById("movielist").innerHTML = "<p>Can't load films</p>";
    console.error(error);
  }
}

function renderFilms(films) {
  const html = films
    .map(
      (phim) => `
        <div class="movie-card"> 
          <img src="${phim.image}" alt="${phim.title}">
          <h3>${phim.title}</h3>
          <p><strong>Year:</strong> ${phim.release_date}</p>
          <p><strong>Director:</strong> ${phim.director}</p>
          <p><strong>Score:</strong> ${phim.rt_score}/100</p>
          <p><strong>Description:</strong> ${phim.description}</p>
        </div>
      `
    )
    .join("");
  document.getElementById("movielist").innerHTML = html;
}

