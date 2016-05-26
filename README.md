# S3 analyzer

Tool to analyze content stored on AWS S3. The main features consists of retrieving
the size of a bucket and its object count.

## Installation

Install the application using
```bash
npm install
```

## Usage

Provide your AWS credential as explained in the
[AWS documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html)
i.e.
* Loaded from the shared credentials file (`~/.aws/credentials`),
* Loaded from environment variables

Note: AWS profiles are not supported for the time being.

Run the web UI:
```bash
npm start
```

Open up http://localhost:3000 in your browser.

# Architecture

The application consists of a node.js backend that use the AWS SDK to
retrieve the AWS S3 information.
The frontend is composed of [React](https://facebook.github.io/react/)
and [Redux](https://github.com/reactjs/redux). The backend provides a
REST and Websocket API to the frontend.

As the computation of a bucket's size requires to iterate over all of its
objects, the process may take a while. Websockets are used to provide
intermediate results to the user continuously.     

## Features

Feature                                                           | Status
----------------------------------------------------------------- | ------
Select the AWS region to use                                      | done
Sum up the size of all objects in one bucket                      | done
Web UI                                                            | done
Show intermediate results when calculating the size               | done
Sum up the size of all objects with a common prefix in one bucket | planned
Create app based on Electron or similiar.                         | planned
