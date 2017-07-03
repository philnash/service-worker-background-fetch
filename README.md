# Service Worker Background Fetch

A proof of concept to see the [background fetch API](https://github.com/WICG/background-fetch) working.

## Prerequisites

At the time of publishing, the background fetch API is only available in [Chrome Canary](https://www.google.com/chrome/browser/canary.html) or in regular Chrome with the experimental web platform features flag turned on in Chrome's chrome://flags settings. Before trying to run this example, make sure you have one of those options.

## Fetching in the background

With the application running, open [http://localhost:3000](http://localhost:3000) (alternatively, you can visit a [live example of this hosted on Glitch](https://fan-hubcap.glitch.me/). You will see that the image takes ~10 seconds to show up on the page. If you click on "Start download" the background fetch api will start to download the image and store it using the caches API. It will ask for permission to send notifications too. You can navigate away from this tab while that background fetch is completed. When the download completes, you will be notified by a push notification.

Once the background fetch API has stored the image in the cache, it will be served by the service worker, so it will load immediately. You can empty the cache and try again with the "Empty cache" button.

## Running this application

This application is written in Node.js. To get it running yourself do the following:

* Clone the repo

```bash
git clone https://github.com/philnash/service-worker-background-fetch.git
cd service-worker-background-fetch
```

* Install the dependencies

```bash
npm install
```

* Run the server

```bash
npm start
```

You can now visit the app at [http://localhost:3000](http://localhost:3000).
