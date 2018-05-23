var fs = require("fs");

fs.readFile("xml.js", "utf8", function (error, file)
{
    if (error)
    {
        throw error;
    }
    console.log("File is read!");
});
console.log("Node.js cannot be blocked!");