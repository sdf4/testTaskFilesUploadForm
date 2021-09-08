class FilesUploadForm extends HTMLFormElement {
  files = [];
  fileNames = [];
  formData;

  constructor() {
    super();
    this.addEventListener("change", this.changeFile);
    this.addEventListener("submit", this.submitHandler);
    this.formData = new FormData();
  }

  async submitHandler(event) {
    event.preventDefault();

    let data;
    try {
      data = await loadFiles(this.formData);
    } catch (e) {
      console.error(e);
      return;
    }
    this.clearFormData();

    this.updateFileList();
  }

  async updateFileList() {
    let filesList;
    try {
      filesList = await getFiles();
    } catch (e) {
      console.error(e);
      return;
    }

    let cList = $("ul.filesList");
    cList.empty();

    $.each(filesList, function (i) {
      let fileLink = filesList[i];
      let filename = fileLink.split("/uploads/")[1];

      let li = $("<li/>").appendTo(cList);
      let a = $("<a/>")
        .addClass("fileLink")
        .attr("href", fileLink)
        .text(decodeURI(filename))
        .appendTo(li);
      let button = $("<button/>")
        .addClass("btn btn-default btn-xs")
        .attr("onclick", `deleteFile("${filename}"); window.location.reload();`)
        .text("x")
        .appendTo(li);
    });
  }

  changeFile(event) {
    if (event.target.name == "fileInput") {
      if (!event.target.hasAttribute("multiple")) {
        this.clearFormData();
      }
      this.saveFilesInfo(event.target.files);
      $("#fileName").val(this.fileNames.join(";"));
    }
  }

  saveFilesInfo(files) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
      this.fileNames.push(files[i].name);
      this.formData.append("files-form1", files[i]);
    }
  }

  clearFormData() {
    this.formData = new FormData();
    this.files = [];
    this.fileNames = [];
    $("#fileName").val("");
  }

  connectedCallback() {
    this.updateFileList();
  }
}

customElements.define("files-upload-form", FilesUploadForm, {
  extends: "form",
});
