# S3 analyzer

Tool to analyze content stored on AWS S3.

## Usage

Run the command line version to print the size of a bucket:
```bash
node main <region> <bucket>
```

Run the web UI:
```bash
node server
```


## Features

Feature                                                           | Status
----------------------------------------------------------------- | ------
Select the AWS region to use                                      | done
Sum up the size of all objects in one bucket                      | done
Web UI                                                            | in progress
Sum up the size of all objects with a common prefix in one bucket | planned
