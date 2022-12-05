import inq from "inquirer";
import axios from "axios";
import uploadImage from "./uploadImage.js";

inq
  .prompt([
    {
      type: "input",
      name: "path",
      message: "Drag and drop your image to terminal and press Enter to upload",
    },
    {
      type: "list",
      name: "nameChoice",
      message: (answers) =>
        `Your're uploading the file with the name: ${answers.path
          .split("\\")
          .pop()}\n Would you like to change it?`,
      choices: ["Yes", "No"],
    },
    {
      type: "input",
      name: "changeName",
      message: "Enter new file name (WITHOUT extension (.jpg .png .etc) )",
      when: (answers) => answers.nameChoice === "Yes",
    },
  ])
  .then((answers) => {
    const origName = answers.path.split(/[\\, /]/).pop();
    const [fileName, fileExtension] = [
      answers.changeName ? answers.changeName : answers.origName.split(".")[1],
      ,
    ];

    uploadImage(answers.path, fileName + "." + fileExtension).then((id) => {
      console.log(`File uploaded with id: ${id}`);
      inq
        .prompt([
          {
            type: "list",
            name: "shorten",
            message: "Would you like to shorten your link?",
            choices: ["Yes", "No"],
          },
        ])
        .then((answers) => {
          if (answers.shorten === "No") {
            process.exit(0);
          }
          const shorty = fileName.replace("_", " ");

          axios
            .post(
              "https://api.tinyurl.com/create",
              {
                url: `https://drive.google.com/file/d/${id}/view`,
                domain: `tiny.one`,
                shorty: shorty,
              },
              {
                params: {
                  api_token:
                    "bReVu13XXAdLhzYXF7DFIjc0mjwVbaD27onYUqBI5Iey8ciKQtZ2dAGx5RTG",
                },
              }
            )
            .then((result) => {
              console.log(result.data.data.tiny_url);
            })
            .catch((error) => {
              console.log(error.responce.data.errors);
            });
        });
    });
  });
