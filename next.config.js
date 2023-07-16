const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  experimental: {
    newNextLinkBehavior: true,
  },
  env: {
    PALM_API_KEY: process.env.PALM_API_KEY,
    APPWRITE_API_ENDPOINT: process.env.APPWRITE_API_ENDPOINT,
    APPWRITE_PROJECT: process.env.APPWRITE_PROJECT,
    APPWRITE_TOKEN_KEY: process.env.APPWRITE_API_KEY,
    AUDIO_FUNCTION_ID: process.env.AUDIO_FUNCTION_ID,
    VIDEO_FUNCTION_ID: process.env.VIDEO_FUNCTION_ID,
    SUBTITLE_FUNCTION_ID: process.env.SUBTITLE_FUNCTION_ID,
    DOCUMENT_FUNCTION_ID: process.env.DOCUMENT_FUNCTION_ID,
    AUDIO_BUCKET_ID: process.env.AUDIO_BUCKET_ID,
    VIDEO_BUCKET_ID: process.env.VIDEO_BUCKET_ID,
    DOCUMENT_BUCKET_ID: process.env.DOCUMENT_BUCKET_ID,
  },
};
