Very, very simple tool to copy directories with configuration defined in a JSON file. One use for it is to copy modules from other projects during the build process, allowing code to be seperated out simply. 

Install with `npm install -g dimple`

## Config
Create the file `dimple.json` in your directory.

Specify at least one group - containing `sourceBaseDir`, `targetBaseDir` and `copyDirs` (either `*` to copy all sub-directories or else an array containing the names of all directories in source directory to copy to the target directory. The config file can contain as many groups as you like.

### Example
```
{
  "some_directories_to_copy": {
    "sourceBaseDir": "<path>",
    "targetBaseDir": "<path>",
    "copyDirs": [
      "<dir_name>",
      "<dir_name"
    ]
  },
  "some_more_directories_to_copy": {
    "sourceBaseDir": "<path>",
    "targetBaseDir": "<path>",
    "copyDirs": "*"
  }
}
```

## Run
Just execute `dimple` from the command line in your project folder and the directories will be copied over.

Run `dimple watch` if you wish to copy directories and then continue to watch for any changes in those directories. When changes are detected the directory will be copied to the target again.

To cleanup the target directory, run `dimple clean`. This will remove all directories specified in `copyDirs` from target directories.
