async function loadFiles(formData) {
  return $.ajax({
    type: "POST",
    url: "/files",
    data: formData,
    processData: false,
    contentType: false,
  }).then((response) => response);
}

async function getFiles(formData) {
  return $.ajax({
    type: "GET",
    url: "/files",
  }).then((response) => response);
}

async function deleteFile(filename) {
  $.ajax({
    type: "DELETE",
    url: `/files/${filename}`,
    contentType: "application/json; charset=utf-8",
  }).then((response) => response);
}
