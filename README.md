# Travel Blog

## Table of Contents

- [Project Introduction](#project-introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Deployment](#deployment)
  - [Version Control](#version-control)
- [Development Tools](#development-tools)
- [Running the project](#running-the-project)
- [Deployment of the project](#deployment-of-the-project)
- [Copyright](#copyright)

## Project Introduction

The purpose of this project was to create a travel blog. The blog was developed with React and Next.js based on a Figma design. I used Strapi as a headless CMS for content management and API integration.

## Features

- Designed interface based on a custom Figma design.
- The three latest blog posts on homepage.
- Date, day and post title visible at first glance
- Responsive layout for optimal viewing on all devices.
- Dynamic content management using Strapi as a headless CMS.
- Integrated API for fetching content.

## Technologies Used

### Frontend

- React
- Next.js
- SCSS and BEM

### Backend

- Strapi (headless CMS)
- REST API

### Deployment

- Frontend: Vercel
- Backend: Heroku

### Version Control

- GitHub

## Development Tools

To maintain consistent and well-formatted code, I used the [Prettier Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) in Visual Studio Code.

## Running the project

Follow these steps to run the project locally:

1. Clone the repository

```
git clone https://github.com/leadryx97/travel-blog.git
```

2. Install the dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

4. Open your browser and navigate to http://localhost:3000 to view the application.

**Note:** Ensure Strapi is set up and running locally or deployed, and that you have the necessary environment variables configured for the API URLs.

## Deployment of the project

- The frontend is deployed on [Vercel](https://vercel.com/).
- The backend is hosted on [Heroku](https://www.heroku.com/home).

## Copyright

© 2024 Lea Ritter. All rights reserved.
