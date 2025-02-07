# Project comments

## Found issues & bugs

1. Max lenght of the text is 29 isnstead of 30
1. Text is absent on the middle project on Product page
1. Month index 0-based in querry params for the /report API call
1. Sometimes (I was undable effectevly localise the issue) free products doesn't provided after set timeout to zero
1. Project does require propar accessibility and test attributes
1. Downloaded csv file doesn't have a header row

## Postman

As a demonstration, I also added 8 checks for just one request in Postman. You can check it by importing
a Postman collection from `./challenge-materials/Server API with Tests.postman_collection.json` and opening
Get Products => Tests => Post-response tab. This will give you an idea of how test verifications can be organized
in one place. However, this approach has its own limitations.
