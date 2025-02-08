# Project comments

## Disclaimer

The overall architecture of the E2E framework is presented in finished way. But some of the tests have not all the verifications, and some even not implemented at all due to lack of the time and extensive scope of the work.

## Notice for the each challenge

### Challenge 1

I'm not exactly sure what we are trying to check here, since reflecting the text is not the same as reversing it. I did the test that verifies text reversal from the 'Admin panel', because it was mentioned in the challenge description. But the real verification should be focused on checking the canvas, yet this verification is possible only with screenshot testing (visual testing). Even then, it would have problems on CI/CD, since the machine there wouldn't have a camera and the canvas wouldn't be displayed. I'm sure there could be a solution, but it's highly specific and would require more time for investigation.

### Challenge 2

This challenge was pretty straightforward, and especially helpful was the ability to set the timeout to zero using the 'Admin panel'. Yet I cannot be 100% sure that this mechanism would not jeopardize the integrity of testing, because it might use another logical branch in the code. Also, I might notice that this mechanism works not every time for some reason, and the test might fail. But do not worry, because rerun should mitigate this issue.

### Challenge 3

The most problematic one, and the only comment is that I do not have the possibility to reset data and should take into consideration previous purchases. It's not a huge problem, but something that could be improved in order to reduce test complexity and maintenance cost.

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
