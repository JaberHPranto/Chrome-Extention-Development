$(function () {
  const quotesApi = "https://quotes.rest/qod?language=en";

  https: fetch(quotesApi)
    .then((res) => res.json())
    .then((data) => {
      const qod = data.contents.quotes[0].quote;
      $("#quote").text(qod);
    });
});
