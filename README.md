# Utility Studio

![image](https://github.com/Mr-Destructive/utility-studio/assets/40317114/c2135ec3-a9e9-4690-8e20-f1bfbdf5efe1)



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


## Project Demo link

[Utility Studio](https://utility-studio.vercel.app)

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=utility-studio)
Hosted on vercel

## About

### Description

A place for quick and easy access to tasks like document, video, and text summarizing. Users can quickly come and drop their documents, youtube links, text, and web links and generate/extract textual information.


#### Tech Stack

  The Utility Studio is built on a Refine (Next.js) project, leveraging the power of server-side rendering and React components for a smooth user experience. It integrates with Appwrite, a backend serverless platform, to handle various functionalities.

- Refine
- Next JS
- Appwrite (storage and functions)
- Python (cloud functions)
- Material UI


### Preview

A simple demonstration of some of the features.

https://github.com/Mr-Destructive/utility-studio/assets/40317114/98408d74-bf9c-4779-a3c0-c92307e7b751


## License

MIT

## Local dev environment setup

### Prerequisites

- Node Version 18+
- PaLM API access
- Appwrite Cloud/self-hosted setup

## Install Project
 
- Prefered using Node version 18+
- Clone the git repository and checkout to the repo
```
git clone https://github.com/mr-destructive/utility-studio

cd utility-studio
```

- Install dependencies
```
npm install
```

- Start local development server on port `3000` by default
```
npm run dev
```
OR 
customize the default port 
```
npm run dev -- -p 8000
```
This should start the app on [localhost:3000](localhost:3000) or on your set port. 🚀

#### Other useful commands 

- Building the app
```
npm run build
```

- Using swizzle command (to customize any component)

```
npm run refine swizzle
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

1. Register for [MakerSuite](https://makersuite.google.com/app/home) account for access to PaLM API(waiting list)
2. Generate API keys from the [dashboard](https://makersuite.google.com/app/apikey)
3. This will give you access to the PaLM API which powers Google Generative AI technologies like Bard AI, etc.

## Contributing

Report any issues or bugs in the app by creating an issue [here](https://github.com/Mr-Destructive/utility-studio/issues/new/choose)

## References and Credits

This [refine](https://github.com/pankod/refine) project was generated with [superplate](https://github.com/pankod/refine).

To learn more about **refine**, please check out the [Documentation](https://refine.dev/docs)

- **Appwrite Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Material UI** [Docs](https://refine.dev/docs/ui-frameworks/mui/tutorial/)
- **Inferencer** [Docs](https://refine.dev/docs/packages/documentation/inferencer)
- **i18n** [Docs](https://refine.dev/docs/core/providers/i18n-provider/)

For the project-specific dependencies:

- **Appwrite** [Docs](https://appwrite.io/docs)
- **PaLM API** [Docs](https://developers.generativeai.google/products/palm)
