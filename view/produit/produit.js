const url_string = window.location.href;
const url = new URL(url_string);
const id = url.searchParams.get("id");

console.log(id);






