# Utility Studio

> A quick one-stop place for some extraction or summarisation of content. 

Perform extraction of information from web, youtube, or document links, download video/audio from youtube links, and summarize the text content.

## Features
- Youtube 
  - Audio
  - Video
  - Subtitles
- Documents
  - PDF/docx text extraction
  - Text summarizer
- Text
  - Text summarizer
- Links
  - Link information extractor


## Demo

A simple demonstration of some of the features.

https://github.com/Mr-Destructive/utility-studio/assets/40317114/98408d74-bf9c-4779-a3c0-c92307e7b751


<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/refine_logo.png"  align="center" />
    </a>
</div>
<br/>

This [refine](https://github.com/pankod/refine) project was generated with [superplate](https://github.com/pankod/refine).

## Tech Stack

- Refine
- Next JS
- Appwrite (storage and functions)
- Python (cloud functions)
- Material UI

## Getting Started

**refine** is a React-based framework for building data-intensive applications in no time ✨

Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to admin panels, B2B applications and dashboards.

## Available Scripts

### Running the development server.

```bash
    npm run dev
```

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```

## Learn More

To learn more about **refine**, please check out the [Documentation](https://refine.dev/docs)

- **Appwrite Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Material UI** [Docs](https://refine.dev/docs/ui-frameworks/mui/tutorial/)
- **Inferencer** [Docs](https://refine.dev/docs/packages/documentation/inferencer)
- **i18n** [Docs](https://refine.dev/docs/core/providers/i18n-provider/)

## License

MIT

## Local dev environment setup

- Prefered using Node version 18+

```
git clone https://github.com/mr-destructive/utility-studio
cd utility-studio
npm install
npm run dev
```

### Additional Setup

- Appwrite project

1. Go to [cloud.appwrite.io](https://cloud.appwrite.io) and register for an account.
2. Create a project and name it whatever you like, I have chosen `utility-studio-test` so choose a different one.
3. From the appwrite [cli](https://appwrite.io/docs/command-line), deploy the functions with `appwrite deploy function`.
4. Create buckets for `audio`, `video`, and `document` storage.
5. Grab the token keys for the web platform and configure them as the environment variables.
6. Create the `.env` file and paste all the credentials as mentioned in the `sample.env` file.

- PaLM API

1. Register for [MakerSuite]() account on PaLM
2. 
