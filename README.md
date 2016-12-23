# m

## About
A custom slash command integration.

* See it live here: 
	** Reason for this is because I made requests to an API that I'm building for one of my own projects, and it's not yet deployed. https://www.youtube.com/watch?v=-KOa3QwPsgo


## How it works?
I'm not 100% certain about what goes on within the client editor, but I do know that on my end, there were two routes that I needed to take care of. The two routes (in routes.js) were:

* `/typeahead` - This was a get-request with the query string parameters: input text the user has typed, user, and time-zone. A request to this endpoint was made for every character the user typed, so as to provide the first position ranking result per every keystroke the user made. 

* `/resolver` - This was also a get-request with the query string parameters: input text the user has typed, user, and time-zone. However, what differs is that the query string parameters are specifically for the first position ranking result for the final user-selected entry from the list of items the `/typeahead` results created. 


Within the `utils.js` file, you'll find the route-handlers I had for both routes. For both of them, I had to make a request to my scraping service for the data. Once the data was received, I was then able to properly format them for display. 

A lot of the high-level planning was taken from the /giphy example provided: https://github.com/mixmaxhq/giphy-mixmax-app , and what ended up happening was that I ended up spending more time building up my scraping services' endpoints to properly handle the constant requests. 


## Primary Back-End Technologies Used:
* Express
* Axios
* Bluebird

## Startup (** won't fully work as scraping service isn't deployed yet)
* `npm install` to install the package dependencies
* `npm start` to run server
* Run Chrome in insecure mode: http://developer.mixmax.com/docs/variables-in-templates#insecure-content-https-request-blocked-when-develo
