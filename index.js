const express = require("express");
const fs = require("fs");

const app = express();

app.get("/:target/:arch/:current_version", (req, res) => {
  let { target, arch, current_version } = req.params;

  fs.readFile("updater.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(204);
    }

    const jsonData = JSON.parse(data);

    if (current_version < jsonData.version) {
      res.status(200).send(jsonData[`${target}-${arch}`]);
    }
    res.status(204);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
