# NodeJS Web Scraper

This is a technical challenge for a job application I have made.
You can enter a url in the form and you will get some information about the website entered, such as:

- The title of the page
- Number of links on the page that the user can click on
- Number of unique domains that the links go to
- Whether Google Analytics is available on the page
- Whether the page was served in a secure manner

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure that you have [NodeJS](https://nodejs.org/en/) installed:

```
node --version
```

Make sure that you have [git](https://git-scm.com/) installed:

```
git --version
```

### Installing

Clone this repository:

```
git clone https://github.com/marco-iann/web-scraper-js.git
```

Navigate to the repository folder, then install npm packages

```
npm install
```

### Running development server

```
npm start
```

Open your browser and go to the following address

```
localhost:9090
```

### Running the tests

```
npm test
```

## Built With

- [Express JS](https://expressjs.com/) - The web framework used
- [Cheerio](https://www.npmjs.com/package/cheerio) - Web scraping library
- [Axios](https://www.npmjs.com/package/axios) - Used to make requests
- [Bulma](https://bulma.io/) - CSS Framework Used

## Author

- **Marco F. Iannuzzi** - _Initial work_ - [marco-iann](https://github.com/marco-iann)
