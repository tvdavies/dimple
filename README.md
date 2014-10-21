Very, very simple tool to copy directories with configuration defined in a JSON file. One use for it is to copy modules from other projects during the build process, allowing code to be seperated out simply. 

Install with `npm install -g dimple`

## Config
Create the file `dimple.json` in your directory.

Specify at least one group - containing `sourceDir`, `targetDir` and `copyDirs` (an array containing the names of all directories in source directory to copy to the target directory. The config file can contain as many groups as you like.

### Example
```
{
  "some_directories_to_copy": {
    "sourceDir": "<path>",
    "targetDir": "<path>",
    "copyDirs": [
      "<dir_name>",
      "<dir_name"
    ]
  }
}
```

## Run
Just execute `dimple` from the command line in your project folder and the directories will be copied over.
