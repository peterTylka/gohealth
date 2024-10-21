# GO HEALTH project

## TODO / Improvements

- FE tests
- FE error handling - e.g on failed create / delete snackbar message
- maybe spinners
- polish UI
- pagination
- code cleanup / refactor ?

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Build your container: `docker build -t nextjs-docker .`.
1. Run your container: `docker run -p 3000:3000 nextjs-docker`.

## Brainstorming / Proposal

use Nextjs - for BE API + FE React

### BE endpoints

#### get all issues

GET /api/issues
return

- on success - 200 + all issues from csv files {description: string; link: string, parentIssueId?: string, ID: string, CreationTimestamp: string }[]
- on fail - 500 + {error: "errror description"}

#### create new issue

POST /api/issues + payload {description: string; link: string, parentIssueId?: string }

- create new row in csv
- check if parentIssueId exists
  - if yes use it
  - if not return error

return

- on success - 201 + whole new issue {description: string; link: string, parentIssueId?: string, ID: string, CreationTimestamp: string }
- on fail - 400 + {error: "errror description"}

#### close issue

DELETE /api/issues/${issueId}
return

- on success - 204
- on fail - 400 + {error: "errror description"}

### FE React

- simple table with delete buttons in issues' rows
- add button, will show form for addition of new issue + save it

## SWE Home Assignemnt in NodeJS and React

A NodeJS + React application that will track system bugs in a CSV. User is able to do in the UI:

- create a new issue with params:

  - parent issue id - string
  - description - string
  - link - url to the log

- close the existing issue:
  - by entering the existing issue

I.e. the spreadsheet table

| ID  | Description                                          | Status | CreationTimestamp | Link      |
| --- | ---------------------------------------------------- | ------ | ----------------- | --------- |
| I-1 | Customer 360 Job is not ingesting into Search Engine | Closed | 2024-05-01T11:02  | yahoo.com |
| I-2 | Databricks Job is failing on parsing DoB             | Open   | 2024-05-07T11:02  | yahoo.com |

Use:

- git (github, gitlab, anything personal)
- nodejs
- docker - the user is able to build the image a start the application
- react for front-end

Nice to see:

- use the facade layer so the app is no directly coupled to use of CSV file (i.e. can be later Google Cloud / Spreadsheet, Office365, Jira, ...)
- usage of latest features, webhooks, ES6
- understanding of TDD and BDD
- tests (both be + fe)
